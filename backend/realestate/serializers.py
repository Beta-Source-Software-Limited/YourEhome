"""Explicit serializer fields ensure private administrative fields are not exposed."""
from rest_framework import serializers
from .models import Agent, Property, Inquiry


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ["id", "name", "title", "photo_url", "years_experience", "biography"]


class PropertySerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            "id", "title", "slug", "description", "status", "property_type", "price",
            "address", "city", "state", "postal_code", "bedrooms", "bathrooms",
            "area_sqft", "image_url", "gallery", "featured", "agent", "created_at",
        ]


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ["id", "category", "property", "name", "email", "phone", "message", "preferred_date"]
        read_only_fields = ["id"]

    def validate(self, attrs):
        if attrs.get("category") == Inquiry.Category.PROPERTY and not attrs.get("property"):
            raise serializers.ValidationError({"property": "Please select a property."})
        return attrs
