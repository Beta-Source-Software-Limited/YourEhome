"""Database models for properties, agents, and prospective customer requests."""
from django.db import models
from django.utils.text import slugify


class Agent(models.Model):
    name = models.CharField(max_length=120)
    title = models.CharField(max_length=120, default="Property Advisor")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    photo_url = models.URLField(max_length=800, blank=True)
    years_experience = models.PositiveSmallIntegerField(default=1)
    biography = models.TextField(blank=True)
    display_order = models.PositiveSmallIntegerField(default=0)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Property(models.Model):
    class Status(models.TextChoices):
        SALE = "sale", "For Sale"
        RENT = "rent", "For Rent"
        SOLD = "sold", "Sold"

    class Kind(models.TextChoices):
        HOUSE = "house", "House"
        APARTMENT = "apartment", "Apartment"
        VILLA = "villa", "Villa"
        LAND = "land", "Land"
        COMMERCIAL = "commercial", "Commercial"

    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=220, unique=True)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.SALE)
    property_type = models.CharField(max_length=15, choices=Kind.choices, default=Kind.HOUSE)
    price = models.DecimalField(max_digits=14, decimal_places=2)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=30, blank=True)
    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    area_sqft = models.PositiveIntegerField(default=0)
    image_url = models.URLField(max_length=800)
    # Extra pictures are saved as a JSON string array to avoid extra dependencies.
    gallery = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True, related_name="properties")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-featured", "-created_at"]
        indexes = [models.Index(fields=["status", "city"], name="re_prop_status_city_idx"), models.Index(fields=["price"], name="re_prop_price_idx")]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Inquiry(models.Model):
    class Category(models.TextChoices):
        PROPERTY = "property", "Property inquiry"
        CONSULTATION = "consultation", "Consultation request"
        CONTACT = "contact", "General contact"

    category = models.CharField(max_length=20, choices=Category.choices, default=Category.CONTACT)
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="inquiries")
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField(max_length=3000)
    preferred_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.get_category_display()}"
