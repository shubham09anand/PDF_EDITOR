import React, { useState } from "react";

function Photo() {
  const [file, setFile] = useState();
  const [result, setResult] = useState();

  const upload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        // Now 'base64String' contains the file data as a base64 string
        console.log(base64String);
        setResult(base64String)
        // Here you can perform further actions like sending the base64 string to a server
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="button" onClick={upload}>Upload</button>
      {result}
      
    </div>
  );
}

export default Photo;
