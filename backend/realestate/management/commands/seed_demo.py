"""Populate a fresh database with fictional demonstration inventory.

Usage: python manage.py seed_demo
Safe to rerun: properties are updated by slug, agents by name.
"""
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from realestate.models import Agent, Property

AGENTS = [
    ("Michael Carter", "Senior Real Estate Advisor", 10, "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=85"),
    ("Emma Brooks", "Luxury Property Specialist", 8, "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=85"),
    ("Daniel Reed", "Investment Advisor", 12, "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85"),
    ("Sophia Nguyen", "Residential Specialist", 7, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85"),
]

# These are fictional properties and demonstration prices, not real offers.
PROPERTIES = [
    ("The Hillside Residence", "Beverly Hills", "CA", 2450000, 4, 4, 3200, "villa", "sale", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85"),
    ("Modern Farmhouse Retreat", "Austin", "TX", 1320000, 3, 2, 2180, "house", "sale", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1100&q=85"),
    ("The Skyline Penthouse", "Miami", "FL", 890000, 2, 2, 1450, "apartment", "sale", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1100&q=85"),
    ("The Oceanview Estate", "Newport Beach", "CA", 3750000, 5, 5, 4800, "villa", "sale", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1100&q=85"),
    ("Parkside Contemporary", "San Diego", "CA", 1175000, 3, 3, 2400, "house", "sale", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=85"),
    ("The West End Loft", "Los Angeles", "CA", 4200, 2, 2, 1350, "apartment", "rent", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1100&q=85"),
    ("Lakefront Family Home", "Seattle", "WA", 1690000, 4, 3, 3150, "house", "sale", "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1100&q=85"),
    ("The Garden Apartment", "Portland", "OR", 3100, 2, 2, 1280, "apartment", "rent", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&q=85"),
]


class Command(BaseCommand):
    help = "Add/update fictional demonstration agents and properties"

    def handle(self, *args, **options):
        agents = []
        for index, (name, title, years, photo) in enumerate(AGENTS):
            agent, _ = Agent.objects.update_or_create(name=name, defaults={
                "title": title, "years_experience": years, "photo_url": photo,
                "display_order": index, "biography": f"{name} helps buyers and sellers navigate the property market with confidence.",
            })
            agents.append(agent)
        for index, (title, city, state, price, bedrooms, bathrooms, area, kind, status, photo) in enumerate(PROPERTIES):
            Property.objects.update_or_create(slug=slugify(title), defaults={
                "title": title, "description": f"Discover {title}, a beautifully curated {kind} in {city}. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.",
                "status": status, "property_type": kind, "price": price,
                "address": f"{120 + index * 38} Example Avenue", "city": city, "state": state,
                "bedrooms": bedrooms, "bathrooms": bathrooms, "area_sqft": area,
                "image_url": photo, "gallery": [], "featured": index < 4,
                "agent": agents[index % len(agents)],
            })
        self.stdout.write(self.style.SUCCESS("Demo content is ready (fictional listings)."))
