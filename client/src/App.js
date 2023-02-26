import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("png");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setConverted(null);
      setError(null);
    }
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to convert.");
      return;
    }
    const allowedFormats = ["png", "jpeg", "gif"];
    if (!allowedFormats.includes(format)) {
      setError(`Unsupported output format: ${format}.`);
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("format", format);
    try {
      const response = await fetch(
        "https://lubpui-psychic-eureka-xg9qj95wgjp3p6vg-5000.preview.app.github.dev/convert",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Conversion failed.");
      }
      const data = await response.blob();
      setConverted(URL.createObjectURL(data));
      setError(null);
    } catch (err) {
      setError("Conversion failed.");
    }
  };

  return (
    <div className="App">
      <div className="BGIMG" />
      <div className="content">
        <h1>Image Converter</h1>

        <div className="format-box">
          <label htmlFor="format">Output Format : </label>
          <select id="format" value={format} onChange={handleFormatChange}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="gif">GIF</option>
          </select>
        </div>

        <div className="img-box">
          {image && <img src={URL.createObjectURL(image)} alt="Original" />}
          {converted && <img src={converted} alt="Converted" />}
        </div>
        {error && <p>{error}</p>}
        <div className="button-box">
          <input
            className="btn2"
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          <label className="btn2" for="upload-button">
            <FontAwesomeIcon className="fontAS" icon={faArrowUpFromBracket} />
            upload
          </label>
          <button className="btn" onClick={handleImageUpload}>
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
