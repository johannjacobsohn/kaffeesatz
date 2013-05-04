setup:
	git submodule update --init --recursive
	$(MAKE) setup -C server
	$(MAKE) setup -C admin
	$(MAKE) setup -C app

test:
	$(MAKE) test -C server
	$(MAKE) test -C admin
	$(MAKE) test -C app

lint: 
	$(MAKE) lint -C server
	$(MAKE) lint -C admin
	$(MAKE) lint -C app

clean-dev:
	$(MAKE) clean-dev -C server
	$(MAKE) clean-dev -C admin
	$(MAKE) clean-dev -C app

deploy: clean-dev
	af update

.PHONY: test




