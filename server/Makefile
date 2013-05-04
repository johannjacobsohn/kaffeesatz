setup:
	npm install

test:
	node_modules/.bin/mocha

lint:
	node_modules/.bin/jshint .

coverage: mk-cov test-cov clean

test-cov:
	@MAKE_COV=1 node_modules/.bin/mocha -R html-cov > coverage.html

mk-cov:
	@jscoverage source source-cov

clean:
	@rm -r source-cov

clean-dev:
	rm -r node_modules
	npm install --production

.PHONY: test
