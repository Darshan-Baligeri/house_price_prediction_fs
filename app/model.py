import pickle
import pandas as pd

# Load the trained models
with open('models/model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


def make_prediction(input_data):
    # Convert input data to DataFrame for prediction
    input_df = pd.DataFrame([input_data])

    # Predict using the models
    prediction = model.predict(input_df)

    # Return prediction (assuming a regression models)
    return prediction[0]
