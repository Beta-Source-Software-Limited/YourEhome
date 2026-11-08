# Initial database schema for YourEhome.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="Agent",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("title", models.CharField(default="Property Advisor", max_length=120)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("photo_url", models.URLField(blank=True, max_length=800)),
                ("years_experience", models.PositiveSmallIntegerField(default=1)),
                ("biography", models.TextField(blank=True)),
                ("display_order", models.PositiveSmallIntegerField(default=0)),
                ("active", models.BooleanField(default=True)),
            ],
            options={"ordering": ["display_order", "name"]},
        ),
        migrations.CreateModel(
            name="Property",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=180)),
                ("slug", models.SlugField(max_length=220, unique=True)),
                ("description", models.TextField()),
                ("status", models.CharField(choices=[("sale", "For Sale"), ("rent", "For Rent"), ("sold", "Sold")], default="sale", max_length=10)),
                ("property_type", models.CharField(choices=[("house", "House"), ("apartment", "Apartment"), ("villa", "Villa"), ("land", "Land"), ("commercial", "Commercial")], default="house", max_length=15)),
                ("price", models.DecimalField(decimal_places=2, max_digits=14)),
                ("address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=100)),
                ("postal_code", models.CharField(blank=True, max_length=30)),
                ("bedrooms", models.PositiveSmallIntegerField(default=0)),
                ("bathrooms", models.PositiveSmallIntegerField(default=0)),
                ("area_sqft", models.PositiveIntegerField(default=0)),
                ("image_url", models.URLField(max_length=800)),
                ("gallery", models.JSONField(blank=True, default=list)),
                ("featured", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("agent", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="properties", to="realestate.agent")),
            ],
            options={"ordering": ["-featured", "-created_at"]},
        ),
        migrations.CreateModel(
            name="Inquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("category", models.CharField(choices=[("property", "Property inquiry"), ("consultation", "Consultation request"), ("contact", "General contact")], default="contact", max_length=20)),
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("message", models.TextField(max_length=3000)),
                ("preferred_date", models.DateField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_resolved", models.BooleanField(default=False)),
                ("property", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="inquiries", to="realestate.property")),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.AddIndex(model_name="property", index=models.Index(fields=["status", "city"], name="re_prop_status_city_idx")),
        migrations.AddIndex(model_name="property", index=models.Index(fields=["price"], name="re_prop_price_idx")),
    ]
