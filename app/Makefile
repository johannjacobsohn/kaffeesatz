export KAFFEESATZTESTDB := coffeedb_test

setup:
	tools/minify.sh
	npm install

test:
	node ../app &
	node_modules/.bin/mocha-phantomjs http://localhost:1234/app/test/runner.html -s localToRemoteUrlAccessEnabled=true -s webSecurityEnabled=false

lint:
	node_modules/.bin/jshint .

coverage: mk-cov test-cov clean

mk-cov:
	@jscoverage source source-cov

test-cov:
	node_modules/.bin/mocha-phantomjs http://localhost:1234/app/test/coverage-runner.html -R json-cov | \
	grep -v enyo.kind | \
	node_modules/.bin/json2htmlcov > coverage.html

clean:
	@rm -r source-cov

clean-dev:
	rm -r node_modules
	npm install --production

.PHONY: test
