import "./wasm_exec.js";

const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response = undefined;

  if (WebAssembly.instantiateStreaming) {
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };

    response = await fetchAndInstantiateTask();
  }

  return response;
};

const go = new Go();

// Get the URL of the current script
var scriptURL = new URL(import.meta.url);

// Resolve relative URL to absolute URL
var wasmURL = new URL("./soek.wasm", scriptURL);

export const soekSearch = async (key, indexURL) => {
  const importObject = go.importObject;
  const wasmModule = await wasmBrowserInstantiate(wasmURL, importObject);

  go.run(wasmModule.instance);

  if (!indexURL) {
    console.error("Index URL is undefined");
    return;
  }

  return fetch(indexURL)
    .then((response) => response.json())
    .then((indexJSON) => {
      const index = JSON.stringify(indexJSON);

      return callSearch(key, index);
    });
};
