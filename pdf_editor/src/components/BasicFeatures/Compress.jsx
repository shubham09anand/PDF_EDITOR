// src/App.js
import React, { useEffect, useState } from 'react';
import { loadWasm } from './wasmLoader';

function App() {
  const [wasmInstance, setWasmInstance] = useState(null);

  useEffect(() => {
    const initWasm = async () => {
      const instance = await loadWasm();
      setWasmInstance(instance);
    };

    initWasm();
  }, []);

  const callHello = () => {
    if (wasmInstance) {
      wasmInstance.exports.hello();
    }
  };

  return (
    <div>
      <h1>WebAssembly Example</h1>
      <button onClick={callHello}>Call WebAssembly Function</button>
    </div>
  );
}

export default App;
