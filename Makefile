BIN := node_modules/.bin
MOCHA := $(BIN)/mocha
SRC := $(shell find lib/ -type f -name '*.js')
TEST := ./test/*.js

include dependencies.mk

build: build/index.js

build/index.js: node_modules $(SRC)
	@duo -s Analytics index.js

node_modules:
	@npm i

lint: eslint

test: 
	@$(MOCHA) $(TEST)

clean:
	@- rm -rf components analytics.js
