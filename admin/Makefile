export KAFFEESATZTESTDB := coffeedb_test

setup:
	npm install

test:
	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"
	node_modules/.bin/mocha

lint:
	node_modules/.bin/jshint .

.PHONY: test
