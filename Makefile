VERSION := $(shell node -e "var pkg = require('./package'); console.log(pkg.version);")

#
# Binaries.
#

BIN := node_modules/.bin
DUO := $(BIN)/duo
DOX := $(BIN)/markdox
KARMA := $(BIN)/karma
UGLIFY := $(BIN)/uglifyjs

#
# Files.
#

SRC := $(shell find lib -type f -name '*.js')
TEST := $(shell find test -type f -name '*.js')
TEST_SRC := $(shell find test -type f -name '*.test.js')
DOCS := $(SRC:lib/%.js=docs/%.md)

#
# Main task.
#

all: clean lint build

#
# Dependencies.
#

include dependencies.mk

#
# Helper tasks.
#

build: build/index.min.js

lint: eslint

docs: $(DOCS)

release: clean build
	@aws s3 cp \
		build/index.min.js s3://urad-tracking/release-$(VERSION).js \
		--grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

ifeq ($(TRAVIS_BRANCH), $(filter $(TRAVIS_BRANCH), master development))
# master/development 的時候跑 saucelabs
# 檢查是不是所有指定 browser 都可以通過測試
travis: test-sauce
else
# 其他 branch 只跑 phantom
# 避免 saucelabs 噴錢...
travis: test-phantomjs
endif

#
# Build tasks.
#

build/index.js: node_modules $(SRC)
	@$(DUO) -s Analytics index.js

build/index.min.js: build/index.js
	@$(UGLIFY) $< > $@

#
# Docs tasks.
#

$(DOCS): docs/%.md: lib/%.js
	@-mkdir -p $$(dirname $@)
	$(DOX) --output $@ $<

#
# Tests tasks.
#

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

karma-run:
	$(KARMA) run karma/local.conf.js

test-chrome:
	@$(KARMA) start --single-run \
		--browsers Chrome \
		karma/local.conf.js

test-chromecanary:
	@$(KARMA) start --single-run \
		--browsers ChromeCanary \
		karma/local.conf.js

test-firefox:
	@$(KARMA) start --single-run \
		--browsers Firefox \
		karma/local.conf.js

test-phantomjs:
	@$(KARMA) start --single-run \
		--browsers PhantomJS \
		karma/local.conf.js

test-opera:
	@$(KARMA) start --single-run \
		--browsers Opera \
		karma/local.conf.js

test-safari:
	@$(KARMA) start --single-run \
		--browsers Safari \
		karma/local.conf.js

test-sauce:
	@$(KARMA) start karma/sauce.conf.js

#
# Chore tasks.
#

node_modules:
	@npm i

# 清理自動產生的檔案、目錄
clean:
	@- rm -rf docs components build test/index.js
