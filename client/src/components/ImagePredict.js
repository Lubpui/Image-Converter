import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../css/ImagePredict.css";

function ImagePredict() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to convert.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Predict failed.");
      }
      const data = await response.json();
      setPredictions(data);
      setError(null);
      console.log(predictions);
    } catch (err) {
      setError("Predict failed.");
    }
  };

  return (
    <div className="App">
      <div className="BGIMG" />
      <div className="content">
        <h1>Image Predicter</h1>
        <div className="img-box">
          {image && <img src={URL.createObjectURL(image)} alt="Original" />}
          {predictions && (
            <div className="content-box">
              <div className="content-title">
                <h1>Prediction </h1>
                <h1>Probability</h1>
              </div>
              {predictions.map((item, index) => (
                <div className="content-predict">
                  <h1>
                    {index + 1}. {item.class}
                  </h1>
                  <h2>{item.prediction} %</h2>
                </div>
              ))}
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
          <label htmlFor="input-field" className="btn2" for="upload-button">
            <FontAwesomeIcon className="fontAS" icon={faArrowUpFromBracket} />
            upload
          </label>
          <button className="btn" onClick={handleImageUpload}>
            predict
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImagePredict;
