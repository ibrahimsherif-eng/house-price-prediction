"""
app.py
------
The FastAPI application. It exposes two endpoints:

    GET  /health   -> simple check that the service is running
    POST /predict  -> takes house details and returns a predicted price

The trained model and the list of known locations are loaded once when
the application starts, so every request reuses the same objects
instead of reading from disk each time.
"""

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model_loader import load_locations, load_model
from schemas import HealthResponse, HouseFeatures, PredictionResponse

app = FastAPI(
    title="House Price Prediction API",
    description="Predicts house prices from property details using a trained ML pipeline.",
    version="1.0.0",
)

# Allow the API to be called from any frontend during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loaded once at import time (i.e. once when the app starts).
model = load_model()
known_locations = load_locations()


@app.get("/health", response_model=HealthResponse)
def health_check():
    """Return a simple status so callers can confirm the API is up."""
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict_price(house: HouseFeatures):
    """Validate the input, run it through the model, and return the predicted price."""
    if house.location not in known_locations:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown location '{house.location}'. "
            f"Valid locations are: {known_locations}",
        )

    input_row = build_model_input(house)

    try:
        prediction = model.predict(input_row)
    except Exception as error:
        raise HTTPException(
            status_code=500, detail=f"Model failed to generate a prediction: {error}"
        )

    return {"predicted_price": float(prediction[0])}


def build_model_input(house: HouseFeatures) -> pd.DataFrame:
    """Convert validated request data into the single-row DataFrame the model expects."""
    return pd.DataFrame([{
        "location": house.location,
        "area_sqft": house.area_sqft,
        "Transaction": house.Transaction.value,
        "Furnishing": house.Furnishing.value,
        "facing": house.facing.value,
        "Ownership": house.Ownership.value,
        "Bathroom": house.Bathroom,
        "Balcony": house.Balcony,
        "car_parking_count": house.car_parking_count,
        "current_floor": house.current_floor,
        "total_floors": house.total_floors,
    }])
