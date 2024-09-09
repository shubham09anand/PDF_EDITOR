// src/wasmLoader.js
export async function loadWasm() {
     const response = await fetch('/wasm/wasm.wasm');
     const wasmArrayBuffer = await response.arrayBuffer();
     const { instance } = await WebAssembly.instantiate(wasmArrayBuffer);
     return instance;
   }
   