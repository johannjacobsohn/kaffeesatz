export KAFFEESATZTESTDB := coffeedb_test

setup:
	npm install

test:
	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"
	node_modules/.bin/mocha

jshint:
	node_modules/.bin/jshint .

.PHONY: test
