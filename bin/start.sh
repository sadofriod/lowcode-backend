#!/bin/sh
clear # Clean out put
kill $(lsof -t -i:3002)
tsc
node --inspect dist/src/index.js
# node inspect dist/src/index.js