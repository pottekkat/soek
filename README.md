# soek

soek is a pure client-side search library built using Go and WebAssembly.

> [!NOTE]  
> This project sucks, and I don't know what I'm doing. But it is open source in the interest of building in public. I hope to make it less sucky as I learn more.
> 
> If you are reading this and think this project sucks, help me out by sharing how to make it suck less.

## Example

The `example` folder contains a sample site that uses soek. To run the example, first build soek by running:

```shell
make setup
make build-production
```

Then serve the files in the example folder and open `index.html` in your browser.

## Development

The `main.go` file is the entrypoint to the library.

The `pkg` folder contains the actual functions that implements soek's search capabilities. You can also use this as a package in Go by running:

```shell
go get github.com/pottekkat/soek/pkg/soek
```

You can then import this as:

```go
import (
	"github.com/pottekkat/soek/pkg/soek"
)
```

The `scripts` folder contains the JavaScript glue code that wraps around this Go-Wasm binary. See the example in `examples` folder to see how it all works together.

To build a development version of soek, run:

```shell
make setup
make build-dev
```

## License

This project is licensed under the Apache License, Version 2.0.
