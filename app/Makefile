export KAFFEESATZTESTDB := coffeedb_test

setup:
	tools/minify.sh
	npm install

test:
	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"
	tools/minify.sh
	node_modules/.bin/mocha

lint:
	node_modules/.bin/jshint .

.PHONY: test
