import React, { useState } from "react";
import "../css/ImageConverter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

function ImageConverter() {
  const [image, setImage] = useState(null);
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("png");
  const [type, setType] = useState("monochrome");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setConverted(null);
      setError(null);
      setDownloadUrl(null);
    }
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
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
    formData.append("type", type);
    try {
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Conversion failed.");
      }
      const data = await response.blob();
      setConverted(URL.createObjectURL(data));
      setError(null);
      setDownloadUrl(URL.createObjectURL(data));
    } catch (err) {
      setError("Conversion failed.");
    }
  };

  const handleDownloadClick = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `converted.${format}`;
      a.click();
    }
  };

  return (
    <div className="App">
      <div className="BGIMG" />
      <div className="content">
        <h1>Image Converter</h1>

        <div className="type-box">
          <label>Convert to : </label>
          <select id="type" onChange={handleTypeChange}>
            <option value="monochrome">MonoChrome</option>
            <option value="edge">Edge</option>
          </select>
        </div>

        <div className="img-box">
          {image && <img src={URL.createObjectURL(image)} alt="Original" />}
          {converted && (
            <div className="convert_box">
              <img className="image" src={converted} alt="Converted" />
              <div className="format-box">
                <select
                  id="format"
                  value={format}
                  onChange={handleFormatChange}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              <button className="btnDownload" onClick={handleDownloadClick}>
                <FontAwesomeIcon className="fontAS" icon={faFileArrowDown} />
              </button>
            </div>
          )}
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

export default ImageConverter;
