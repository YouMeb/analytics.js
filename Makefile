BIN := node_modules/.bin
DUO := $(BIN)/duo
SRC := $(shell find lib/ -type f -name '*.js')

include dependencies.mk

build: build/index.js

build/index.js: node_modules $(SRC)
	@duo -s Analytics index.js

node_modules:
	@npm i

lint: eslint

clean:
	@- rm -rf components build
