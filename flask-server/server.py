from flask import Flask, request, jsonify, send_file
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from flask_cors import CORS
from PIL import Image,ImageFilter
import numpy as np
import io

app = Flask(__name__)
CORS(app)
model = keras.applications.MobileNetV3Large(weights='imagenet')

#Predict function
@app.route('/predict', methods=['POST'])
def predict():
    images = request.files["image"]
    img = Image.open(images)

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)

    decoded_preds = keras.applications.mobilenet_v3.decode_predictions(preds, top=3)[0]

    result = []
    for p in decoded_preds:
        result.append({
            'class' : p[1],
            'prediction': float("{:.2f}".format(p[2]*100))
        })
    return jsonify(result)



#Convert function
@app.route("/convert", methods=["POST"])
def convert():
    imaged = request.files["image"]
    conversion_type = request.form.get("type")
    img = Image.open(imaged)
    if conversion_type == "monochrome":
        img = img.convert("L")
    elif conversion_type == "edge":
        img = img.filter(ImageFilter.FIND_EDGES)
    else:
        return "Invalid conversion type"
    
    output = io.BytesIO()
    img.save(output, format="PNG")
    output.seek(0)
    return send_file(output, mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
