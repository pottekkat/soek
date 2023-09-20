setup:
	npm install terser -g

compress-js:
	terser ./scripts/soek.js -o ./dist/soek.min.js --compress --mangle

build-dev: compress-js
	tinygo build -o ./dist/soek.wasm -target wasm ./main.go

build-production: compress-js
	tinygo build -o ./dist/soek.wasm -target wasm -no-debug -panic trap ./main.go
