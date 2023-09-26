install-binaryen-wasm-opt:
	# change to match your OS
	wget https://github.com/WebAssembly/binaryen/releases/download/version_116/binaryen-version_116-arm64-macos.tar.gz
	tar -zxvf binaryen-version_116-arm64-macos.tar.gz
	cp binaryen-version_116-arm64-macos/bin/wasm-opt /usr/local/bin/wasm-opt
	rm -rf binaryen-version_116-arm64-macos binaryen-version_116-arm64-macos.tar.gz

setup: install-binaryen-wasm-opt
	npm install terser -g

compress-js:
	terser ./scripts/soek.js -o ./dist/soek.min.js --compress --mangle --keep-fnames --comments "all"

build-dev: compress-js
	tinygo build -o ./dist/soek.wasm -target wasm ./main.go

build-production: compress-js
	tinygo build -o ./dist/soek.wasm -target wasm -no-debug -panic=trap ./main.go
	# shrink size even further: https://www.fermyon.com/blog/optimizing-tinygo-wasm
	# also see: https://tinygo.org/docs/guides/optimizing-binaries/
	# serve files after gzip
	wasm-opt -Oz ./dist/soek.wasm -o ./dist/soek.wasm
