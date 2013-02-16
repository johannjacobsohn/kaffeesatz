#!/bin/bash
cd "$( dirname "${BASH_SOURCE[0]}" )"
npm install &> /dev/null
node_modules/.bin/mocha
