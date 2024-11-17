from flask import render_template, request, jsonify
from app import app
from app.model import make_prediction

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = {key: float(value) for key, value in request.form.items()}
        prediction = make_prediction(input_data)
        prediction = abs(prediction*1000)
        prediction = int(prediction)
        return render_template('form.html', prediction=prediction, input_data=input_data)
    except Exception as e:
        return jsonify(error=str(e)), 400
