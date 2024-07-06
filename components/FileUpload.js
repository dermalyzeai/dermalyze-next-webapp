import React, { useState } from "react";

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="g-col-4 text-center">
        <label htmlFor="file" className="sr-only" style={{textAlign: 'center'}}>
          Choose a file
        </label>
        &nbsp; &nbsp; &nbsp;
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {/* {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )} */}
    </>
  );
};

export default SingleFileUploader;
