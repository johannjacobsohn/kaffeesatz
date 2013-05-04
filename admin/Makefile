export KAFFEESATZTESTDB := coffeedb_test

setup:
	npm install

test:
	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"
	node_modules/.bin/mocha --globals '_$$jscoverage'

lint:
	node_modules/.bin/jshint .

coverage: mk-cov test-cov clean

mk-cov:
	@jscoverage js js-cov

test-cov:
	@MAKE_COV_ADMIN=1 node_modules/.bin/mocha --globals '_$$jscoverage' -R html-cov > coverage.html

clean:
	@rm -r js-cov

clean-dev:
	-rm -r node_modules
	npm install --production

.PHONY: test
