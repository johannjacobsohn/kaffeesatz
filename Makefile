export KAFFEESATZTESTDB := coffeedb_test

setup:
	git submodule update --init --recursive
	$(MAKE) setup -C server
	$(MAKE) setup -C admin
	$(MAKE) setup -C app

test:
	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"

	$(MAKE) test -C server
	$(MAKE) test -C admin
	$(MAKE) test -C app

	mongo $(KAFFEESATZTESTDB) --eval "db.dropDatabase()"

jshint: 
	$(MAKE) jshint -C server
	$(MAKE) jshint -C admin
	$(MAKE) jshint -C app

deploy:
	af update

.PHONY: test




