setup:
	npm install

test:
	node_modules/.bin/mocha

lint:
	node_modules/.bin/jshint .

coverage: mk-cov test-cov clean

clean:
	@rm -r source-cov

test-cov:
	@MAKE_COV=1 node_modules/.bin/mocha -R html-cov > coverage.html

mk-cov:
	@jscoverage source source-cov

.PHONY: test
