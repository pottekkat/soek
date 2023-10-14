package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/pottekkat/soek/pkg/soek"
)

var index []map[string]interface{}

func main() {
	// Reference: https://www.aaron-powell.com/posts/2019-02-06-golang-wasm-3-interacting-with-js-from-go/
	// Also see: https://dev.to/x1unix/go-webassembly-internals-part-1-14aj
	w := make(chan bool)
	js.Global().Set("callSearch", js.FuncOf(callSearch))
	<-w
}

// callSearch exposes the functionality of soek.Search to JavaScript
func callSearch(this js.Value, args []js.Value) interface{} {
	err := json.Unmarshal([]byte(args[1].String()), &index)
	if err != nil {
		println("could not unmarshal JSON: %s\n", err)
		return nil
	}
	key := args[0].String()
	matches := soek.Search(key, index)
	jsArray := js.Global().Get("Array").New(len(matches))
	for i, val := range matches {
		jsArray.SetIndex(i, js.ValueOf(val))
	}
	return jsArray
}
