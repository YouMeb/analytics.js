BIN := node_modules/.bin
MOCHA := $(BIN)/mocha
SRC := ./lib/*.js
TEST := ./test/*.js

include dependencies.mk

analytics.js: $(SRC)
	@duo -S lib/index.js > $@

lint: eslint

test: 
	@$(MOCHA) $(TEST)
