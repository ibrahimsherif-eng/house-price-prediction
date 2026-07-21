"""
model_loader.py
----------------
Loads the trained model pipeline (house_price.pkl) and the list of
known locations (locations.json) from disk. Both are loaded once and
cached in memory so every request reuses the same objects instead of
reading from disk again.
"""

import json
import pickle
from pathlib import Path

# Files are expected to sit next to this module.
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "house_price.pkl"
LOCATIONS_PATH = BASE_DIR / "locations.json"


def load_model():
    """Load and return the trained scikit-learn pipeline."""
    with open(MODEL_PATH, "rb") as model_file:
        return pickle.load(model_file)


def load_locations():
    """Load and return the list of known locations."""
    with open(LOCATIONS_PATH, "r") as locations_file:
        return json.load(locations_file)
