"""Small API smoke tests (uses Django's configured test database)."""
from django.urls import reverse
from rest_framework.test import APITestCase
from realestate.models import Agent, Property, Inquiry


class RealEstateAPITests(APITestCase):
    def setUp(self):
        self.agent = Agent.objects.create(name="Test Agent")
        self.property = Property.objects.create(
            title="Test House", slug="test-house", description="A house", price=250000,
            address="1 Main Street", city="Austin", state="TX", bedrooms=3,
            bathrooms=2, area_sqft=1900, image_url="https://example.com/photo.jpg", agent=self.agent,
        )

    def test_filter_property_list(self):
        response = self.client.get("/api/properties/?city=Austin&max_price=300000")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)

    def test_property_detail_by_slug(self):
        response = self.client.get("/api/properties/test-house/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "Test House")

    def test_submit_inquiry(self):
        response = self.client.post("/api/inquiries/", {
            "category": "property", "property": self.property.id,
            "name": "Jane Doe", "email": "jane@example.com", "message": "Is this available?",
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Inquiry.objects.count(), 1)

    def test_property_inquiry_requires_property(self):
        response = self.client.post("/api/inquiries/", {
            "category": "property", "name": "Jane Doe", "email": "jane@example.com", "message": "Hello",
        })
        self.assertEqual(response.status_code, 400)
