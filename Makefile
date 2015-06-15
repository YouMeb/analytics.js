BIN := node_modules/.bin
MOCHA := $(BIN)/mocha
SRC := $(shell find lib/ -type f -name '*.js')
TEST := ./test/*.js

include dependencies.mk

build: analytics.js

analytics.js: $(SRC)
	@duo -s Analytics -S index.js > $@

lint: eslint

test: 
	@$(MOCHA) $(TEST)

clean:
	@- rm -rf components analytics.js
