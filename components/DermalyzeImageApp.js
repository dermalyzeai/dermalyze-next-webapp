// components/FileUpload.js

import { useState } from "react";
import Canvas from "./Canvas";
import { RunMainPrediction } from "../utils/predictionHelper";
import { LoadingSpinner } from "./LoadingSpinner";
//import { ProgressBar } from "react-bootstrap";

const DermalyzeImageBlock = ({ questFunc }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      size: file.size,
      progress: 0,
    }));
    setFiles(uploadedFiles);
  };

  const handleUpload = async () => {
    await RunMainPrediction(questFunc);
  };

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
    <div className="col-md-7"> {/* Adjust the width here */}
      <div className="card shadow-sm p-4">
        <div className="card-body">
          <h5 className="card-title text-center">Try Dermalyze!</h5>
          
            <div style={{ textAlign: 'center', height: '500px' }}>
                <Canvas />
            </div>

          <div className="upload-box border rounded text-center p-4 mt-3 mb-4">
            <input
              type="file"
              className="d-none"
              id="file-upload"
              multiple
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="d-block"
              style={{ cursor: "pointer" }}
            >
              <div className="upload-icon mb-3">
                <i className="bi bi-cloud-upload-fill" style={{ fontSize: "3rem" }}></i>
              </div>
              <span className="upload-text">Drop your image here</span> <br />
              <div className="btn btn-outline-primary mt-2">Browse</div>
            </label>
            {/* <p className="mt-2 text-muted">Files must be .pdf, .doc, or .docx and not exceed 2MB</p> */}
          </div>

          {files.length > 0 && (
  <div className="file-list mb-4">
    {files.map((file, index) => (
      <div key={index} className="file-item mb-3 d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center mx-auto" style={{ textAlign: 'center' }}>
          <i className="bi bi-file-earmark-fill me-2"></i>
          {file.name}
        </div>
      </div>
    ))}
  </div>
)}


          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={files.length === 0}
          >
            Run Dermalyze 
          </button>
        </div>
        {/* <LoadingSpinner /> */}
      </div>
    </div>
    </div>
    </div>
  );
};

export default DermalyzeImageBlock;
