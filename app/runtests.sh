#!/bin/bash
cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install
tools/minify.sh
node_modules/.bin/mocha
