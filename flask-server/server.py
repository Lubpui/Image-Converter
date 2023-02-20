from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)

@app.route("/convert", methods=["POST"])
def convert():
    image = request.files["image"]
    img = Image.open(image)
    img = img.convert("L")
    output = io.BytesIO()
    img.save(output, format="PNG")
    output.seek(0)
    return send_file(output, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)
