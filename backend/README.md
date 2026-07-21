# House Price Prediction API

A small FastAPI backend that serves predictions from an already-trained
house price model (`house_price.pkl`). The model itself was trained in
`house_price_prediction.ipynb` and is **not** retrained or modified here —
this project only wraps it in an HTTP API.

## Project Overview

- Loads the trained scikit-learn pipeline and the list of known locations
  once, when the app starts.
- Exposes two endpoints: `/health` (status check) and `/predict`
  (returns a predicted price for a given property).
- Validates every request with Pydantic before it reaches the model.
- Returns clear HTTP status codes for bad input (`422`), unknown
  locations (`400`), and model failures (`500`).

## Project Structure

```
backend/
│
├── app.py                 # FastAPI app: endpoints and request handling
├── model_loader.py         # Loads the .pkl model and locations.json once
├── schemas.py               # Pydantic request/response models
├── house_price.pkl          # Trained model (provided, not modified)
├── locations.json           # Known locations (provided, not modified)
├── requirements.txt
├── README.md
│
└── tests/
      ├── test_health.py
      └── test_predict.py
```

## Installation

### 1. Create a virtual environment

```bash
python3 -m venv venv
```

Activate it:

```bash
# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

> **Note:** `scikit-learn` is pinned to `1.6.1` because that is the exact
> version used to train and pickle the model. Using a different version
> can produce warnings or, in some cases, prevent the model from loading.

## Running the API

Make sure `house_price.pkl` and `locations.json` are in the same folder
as `app.py`, then start the server:

```bash
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### Swagger Documentation

Interactive API docs (Swagger UI):
`http://127.0.0.1:8000/docs`

Alternative docs (ReDoc):
`http://127.0.0.1:8000/redoc`

## Running Tests

```bash
pytest tests/ -v
```

## Example Requests

### GET /health

```bash
curl http://127.0.0.1:8000/health
```

**Response**

```json
{
  "status": "ok"
}
```

### POST /predict

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
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
        "total_floors": 10
      }'
```

**Response**

```json
{
  "predicted_price": 6237616.84
}
```

### Field Reference

| Field                | Type    | Allowed values / notes                                                                                                      |
|-----------------------|---------|--------------------------------------------------------------------------------------------------------------------------|
| `location`            | string  | Must be one of the values in `locations.json` (e.g. `pune`, `bangalore`, `Other`, ...)                                     |
| `area_sqft`            | float   | Must be greater than 0                                                                                                     |
| `Transaction`          | string  | `New Property`, `Resale`, `Other`, `Unknown`                                                                               |
| `Furnishing`           | string  | `Furnished`, `Semi-Furnished`, `Unfurnished`, `Unknown`                                                                    |
| `facing`               | string  | `East`, `West`, `North`, `South`, `North - East`, `North - West`, `South - East`, `South -West`, `Unknown`                 |
| `Ownership`            | string  | `Freehold`, `Leasehold`, `Co-operative Society`, `Power Of Attorney`, `Unknown`                                            |
| `Bathroom`             | int     | 0 to 11                                                                                                                     |
| `Balcony`              | int     | 0 to 11                                                                                                                     |
| `car_parking_count`    | int     | 0 to 10                                                                                                                    |
| `current_floor`        | int     | 0 or more                                                                                                                   |
| `total_floors`         | int     | 0 or more                                                                                                                   |

### Error Responses

Invalid or missing field (Pydantic validation failure):

```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "area_sqft"],
      "msg": "Field required"
    }
  ]
}
```
→ HTTP `422`

Unknown location:

```json
{
  "detail": "Unknown location 'atlantis'. Valid locations are: [...]"
}
```
→ HTTP `400`
