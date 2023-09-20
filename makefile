setup:
	npm install terser -g

build:
	terser ./scripts/soek.js -o ./dist/soek.min.js --compress --mangle
	tinygo build -o ./dist/soek.wasm -target wasm ./main.go

