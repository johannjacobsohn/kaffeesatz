#!/bin/bash
cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install &> /dev/null
tools/minify.sh &> /dev/null # ignore output
node_modules/.bin/mocha
