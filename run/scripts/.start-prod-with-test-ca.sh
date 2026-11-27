#!/bin/bash
# Start prod server trusting the mock push CA (TEST ONLY — restart without this after push tests).
cd /home/z/my-project
export NODE_EXTRA_CA_CERTS=/home/z/my-project/scripts/.mock-push-cert.pem
exec node_modules/.bin/next start -p 3000
