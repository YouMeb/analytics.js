BIN := node_modules/.bin
DUO := $(BIN)/duo
KARMA := $(BIN)/karma
SRC := $(shell find lib -type f -name '*.js')
TEST := $(shell find test -type f -name '*.js')
TEST_SRC := $(shell find test -type f -name '*.test.js')

include dependencies.mk

build: build/index.js

build/index.js: node_modules $(SRC)
	@$(DUO) -s Analytics index.js

build/test/index.js: node_modules test/index.js $(SRC) $(TEST)
	@$(DUO) -s Analytics test/index.js

node_modules:
	@npm i

lint: eslint

# 產生 entry point
#
# duojs 需要有個 entry point，
# 只有 entry point 有使用到的檔案才會被載入，
# 所以我們要把所有包含測試的檔案都要加入到 entry point 內
test/index.js: $(TEST_SRC)
	@-rm $@
	@echo "require('./settings');" > $@
	@for fname in $(TEST_SRC); do \
		echo "require('./$${fname#test*/}');" >> $@; \
	done

karma-start:
	@$(KARMA) start karma/local.conf.js

karma-run: build/test/index.js
	$(KARMA) run karma/local.conf.js

test-chrome: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers Chrome \
		karma/local.conf.js

test-chromecanary: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers ChromeCanary \
		karma/local.conf.js

test-firefox: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers Firefox \
		karma/local.conf.js

test-phantomjs: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers PhantomJS \
		karma/local.conf.js

test-opera: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers Opera \
		karma/local.conf.js

test-safari: build/test/index.js
	@$(KARMA) start --single-run \
		--browsers Safari \
		karma/local.conf.js

test-sauce: build/test/index.js
	@$(KARMA) start karma/sauce.conf.js

# 清理自動產生的檔案、目錄
clean:
	@- rm -rf components build test/index.js
