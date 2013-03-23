export KAFFEESATZTESTDB := coffeedb_test

setup:
	tools/minify.sh
	npm install

test:
	mongo coffeedb --eval "db.dropDatabase()"
	node_modules/.bin/mocha-phantomjs http://localhost:1234/app/test/runner.html -s localToRemoteUrlAccessEnabled=true -s webSecurityEnabled=false

lint:
	node_modules/.bin/jshint .

.PHONY: test
