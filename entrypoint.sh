#!/bin/bash
set -e

echo "Starting Selenium..."
/opt/bin/entry_point.sh &  # Selenium server (background)

echo "Starting static server on port ${PORT:-8081}..."
http-server /app -p "${PORT:-8081}" -a 0.0.0.0 &  # static server (background)

echo "Waiting 5 seconds for services to start..."
sleep 5

if [ "${MODE:-test}" = "test" ]; then
  echo "MODE=test → running Selenium tests..."
  node tests/test_calculatrice.js
  echo "Tests finished."
  # container exits with test status automatically because of 'set -e'
else
  echo "MODE=serve → only serving static app on :${PORT:-8081}"
  # Keep the container alive
  tail -f /dev/null
fi
