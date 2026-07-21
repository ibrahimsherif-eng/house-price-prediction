"""
test_health.py
---------------
Checks that GET /health responds correctly, confirming the API is up.
"""

from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_returns_ok_status():
    response = client.get("/health")
    assert response.json() == {"status": "ok"}
