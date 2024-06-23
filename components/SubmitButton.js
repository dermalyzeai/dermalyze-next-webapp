import React, { useEffect } from 'react';
import { RunMain } from '../public/scripts/script.js';

function SubmitButton() {
  const submitClick = () => {
    var x;
    x = RunMain(false);
  };

  useEffect(() => {
    const dropContainer = document.getElementById("dropcontainer");
    const fileInput = document.getElementById("uploadedImg");

    if (dropContainer && fileInput) {
      dropContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      dropContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
        }
      });
    }
  }, []);

  return (
    <div className="d-grid gap-2 col-6 mx-auto" id="appMiddle">
      <button
        type="button"
        className="btn btn-primary"
        value="Run Dermalyze"
        onClick={submitClick}
      >
        Run Dermalyze
      </button>
    </div>
  );
}

export default SubmitButton;
