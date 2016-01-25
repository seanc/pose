babel = node_modules/.bin/babel
ava = node_modules/.bin/ava
eslint = node_modules/.bin/eslint

build:
	$(babel) src -d out

lint:
	eslint src

test: build lint
	ava
