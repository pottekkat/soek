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

/**
 * Searches for the given key in the provided index.
 * @param {string} key - The key to search for.
 * @param {string} indexURL - The URL of the index.json file.
 * @returns {Promise} A promise that resolves with the matches of the search results.
 */
export const soekSearch = async ({ key, index }) => {
  const importObject = go.importObject;
  const wasmModule = await wasmBrowserInstantiate(wasmURL, importObject);

  go.run(wasmModule.instance);

  if (!key) {
    console.error("No key provided");
    return;
  }

  if (!index) {
    console.error("No index provided");
    return;
  }

  return callSearch(key, index);
};
