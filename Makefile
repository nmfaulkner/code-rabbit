.PHONY: build watch test setup type-check clean

# Install dependencies
setup:
	yarn install

# Build the TypeScript code
build: setup
	yarn build

# Start development server with hot-reload
watch:
	yarn dev

# Run tests
test: setup
	yarn test
