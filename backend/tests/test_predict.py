"""
test_predict.py
----------------
Checks that POST /predict returns a valid prediction for good input,
and returns proper error responses for bad input.
"""

from fastapi.testclient import TestClient

from app import app

client = TestClient(app)

VALID_PAYLOAD = {
    "location": "pune",
    "area_sqft": 1200,
    "Transaction": "New Property",
    "Furnishing": "Semi-Furnished",
    "facing": "East",
    "Ownership": "Freehold",
    "Bathroom": 2,
    "Balcony": 2,
    "car_parking_count": 1,
    "current_floor": 3,
    "total_floors": 10,
}


def test_predict_returns_200_for_valid_input():
    response = client.post("/predict", json=VALID_PAYLOAD)
    assert response.status_code == 200


def test_predict_returns_numeric_price():
    response = client.post("/predict", json=VALID_PAYLOAD)
    body = response.json()
    assert "predicted_price" in body
    assert isinstance(body["predicted_price"], float)
    assert body["predicted_price"] > 0


def test_predict_rejects_unknown_location():
    payload = {**VALID_PAYLOAD, "location": "atlantis"}
    response = client.post("/predict", json=payload)
    assert response.status_code == 400


def test_predict_rejects_missing_field():
    payload = {**VALID_PAYLOAD}
    del payload["area_sqft"]
    response = client.post("/predict", json=payload)
    assert response.status_code == 422


def test_predict_rejects_invalid_enum_value():
    payload = {**VALID_PAYLOAD, "Furnishing": "Not A Real Value"}
    response = client.post("/predict", json=payload)
    assert response.status_code == 422


def test_predict_rejects_negative_area():
    payload = {**VALID_PAYLOAD, "area_sqft": -50}
    response = client.post("/predict", json=payload)
    assert response.status_code == 422
