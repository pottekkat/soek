package main

import (
	"syscall/js"

	alg "github.com/pottekkat/soek/pkg/algorithms"
)

func main() {
	// Reference: https://www.aaron-powell.com/posts/2019-02-06-golang-wasm-3-interacting-with-js-from-go/
	// Also see: https://dev.to/x1unix/go-webassembly-internals-part-1-14aj
	w := make(chan bool)
	js.Global().Set("callSearch", js.FuncOf(callSearch))
	<-w
}

func callSearch(this js.Value, args []js.Value) interface{} {
	matches := alg.Search(args[0].String(), args[1].String())
	jsArray := js.Global().Get("Array").New(len(matches))
	for i, val := range matches {
		jsArray.SetIndex(i, js.ValueOf(val))
	}
	return jsArray
}
