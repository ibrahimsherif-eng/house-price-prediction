"""
schemas.py
----------
Pydantic models that define the shape of requests and responses
for the API. Keeping these separate from app.py makes validation
rules easy to find and easy to change.
"""

from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Allowed categorical values.
# These come directly from the categories the trained model's OneHotEncoder
# learned during training (see house_price_prediction.ipynb). Any value
# outside these lists would be unknown to the model.
# ---------------------------------------------------------------------------

class TransactionType(str, Enum):
    new_property = "New Property"
    other = "Other"
    resale = "Resale"
    unknown = "Unknown"


class FurnishingType(str, Enum):
    furnished = "Furnished"
    semi_furnished = "Semi-Furnished"
    unfurnished = "Unfurnished"
    unknown = "Unknown"


class FacingType(str, Enum):
    east = "East"
    north = "North"
    north_east = "North - East"
    north_west = "North - West"
    south = "South"
    south_east = "South - East"
    south_west = "South -West"
    unknown = "Unknown"
    west = "West"


class OwnershipType(str, Enum):
    co_operative_society = "Co-operative Society"
    freehold = "Freehold"
    leasehold = "Leasehold"
    power_of_attorney = "Power Of Attorney"
    unknown = "Unknown"


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------

class HouseFeatures(BaseModel):
    """
    All fields required by the trained model pipeline.
    The field names match the columns the model was trained on
    (see feature_columns in the notebook), except `location`, which
    is validated separately against locations.json in app.py.
    """

    location: str = Field(..., description="City the property is located in")
    area_sqft: float = Field(..., gt=0, description="Carpet/super area in square feet")
    Transaction: TransactionType = Field(..., description="Type of transaction")
    Furnishing: FurnishingType = Field(..., description="Furnishing status")
    facing: FacingType = Field(..., description="Direction the property faces")
    Ownership: OwnershipType = Field(..., description="Type of ownership")
    Bathroom: int = Field(..., ge=0, le=11, description="Number of bathrooms")
    Balcony: int = Field(..., ge=0, le=11, description="Number of balconies")
    car_parking_count: int = Field(..., ge=0, le=10, description="Number of parking spots")
    current_floor: int = Field(..., ge=0, description="Floor the property is on")
    total_floors: int = Field(..., ge=0, description="Total floors in the building")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
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
        }
    )


class PredictionResponse(BaseModel):
    """Response returned by POST /predict."""

    predicted_price: float


class HealthResponse(BaseModel):
    """Response returned by GET /health."""

    status: str
