#!/usr/bin/env python3
"""True double-fork daemon launcher for `next dev` in /tmp/my-project.

Mimics what pg_ctl does: double-fork + setsid + reparent to init + close stdio,
so the child is a proper daemon that survives the launcher (and the sandbox's
tool-call cleanup) the same way the embedded postgres does.
"""
import os, sys, resource, traceback

APP = "/tmp/my-project"
LOG = APP + "/.zscripts/dev.log"
DBG = APP + "/.zscripts/daemon.dbg"

def dbg(msg):
    with open(DBG, "a") as f:
        f.write(str(os.getpid()) + " " + msg + "\n")
    try: f.flush()
    except Exception: pass

dbg("launcher start")
# --- first fork ---
pid = os.fork()
if pid > 0:
    dbg("parent %d exiting, child=%d" % (os.getpid(), pid))
    sys.exit(0)  # parent exits immediately

os.setsid()  # child becomes session leader
dbg("child after setsid")

# --- second fork ---
pid = os.fork()
if pid > 0:
    dbg("intermediate %d exiting, grandchild=%d" % (os.getpid(), pid))
    os._exit(0)

dbg("grandchild alive, closing fds")
try:
    maxfd = resource.getrlimit(resource.RLIMIT_NOFILE)[1]
    if maxfd == resource.RLIM_INFINITY:
        maxfd = 1024
except Exception:
    maxfd = 1024
if maxfd > 4096:
    maxfd = 4096
for fd in range(maxfd):
    try:
        os.close(fd)
    except OSError:
        pass

dbg("grandchild reopened stdio")
os.open("/dev/null", os.O_RDONLY)                                   # fd 0
logfd = os.open(LOG, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)  # fd 1
os.dup2(logfd, 2)                                                   # fd 2

env = dict(os.environ)
env["NODE_OPTIONS"] = (env.get("NODE_OPTIONS", "") + " --max-old-space-size=1024").strip()
env["NEXT_TELEMETRY_DISABLED"] = "1"
# Skip the embedded FreeLLM API sidecar + agent worker at boot — the sidecar's
# proxy/gsettings step hangs without a dbus session bus (sandbox recycled),
# which blocks instrumentation and wedges every app route. With this flag the
# Next.js server itself stays up and serves the main MedQ app normally; only
# the AI-Router surfaces (/freellm, /v1) degrade. Sanctioned escape hatch
# documented in src/instrumentation-nodejs.ts.
env["MEDQ_MINIMAL_BOOT"] = "1"

os.chdir(APP)
dbg("grandchild about to execvpe next dev")
try:
    os.execvpe(APP + "/node_modules/.bin/next", ["next", "dev", "-p", "3000"], env)
except Exception as e:
    # execvpe only returns on failure; write traceback to log (fd2)
    traceback.print_exc(file=sys.stderr)
