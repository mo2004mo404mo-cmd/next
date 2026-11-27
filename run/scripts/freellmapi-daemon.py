#!/usr/bin/env python3
"""Double-fork daemon launcher for the standalone FreeLLM API sidecar.

Runs freellmapi/server/dist/index.js as a proper daemon (double-fork +
setsid + reparent to init) so it survives across sandbox tool calls, the
same way the embedded postgres and the next dev daemon do.

The Next.js app (running under MEDQ_MINIMAL_BOOT=1, which skips the in-process
sidecar) reaches this standalone sidecar via the freellmapiUpstream() fallback
chain in src/lib/freellmapi-embedded.ts:
  1. FREELLMAPI_UPSTREAM env (unset)
  2. embedded ephemeral port (none — MEDQ_MINIMAL_BOOT skipped it)
  3. http://127.0.0.1:3002  <-- THIS daemon
So /freellm, /freellmapi and /v1 on port 3000 proxy through to here.
"""
import os, sys, resource

APP = "/tmp/my-project/freellmapi/server"
LOG = "/tmp/my-project/.zscripts/freellmapi.log"

# --- first fork ---
pid = os.fork()
if pid > 0:
    sys.exit(0)

os.setsid()

# --- second fork ---
pid = os.fork()
if pid > 0:
    os._exit(0)

# grandchild = daemon
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

os.open("/dev/null", os.O_RDONLY)
logfd = os.open(LOG, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)
os.dup2(logfd, 2)

env = dict(os.environ)
# Standalone sidecar listens on its default 3002 (from config). Ensure no
# leakage of the Next.js PORT=3000 into the sidecar.
env.pop("PORT", None)
env.pop("HOST", None)
env["NEXT_TELEMETRY_DISABLED"] = "1"

os.chdir(APP)
try:
    os.execvpe("node", ["node", "dist/index.js"], env)
except Exception:
    import traceback
    traceback.print_exc(file=sys.stderr)
