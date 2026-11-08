"""Django admin is the content management system for v1."""
from django.contrib import admin
from .models import Agent, Inquiry, Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("title", "city", "status", "property_type", "price", "featured", "created_at")
    list_filter = ("status", "property_type", "featured", "city")
    search_fields = ("title", "address", "city")
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ("featured",)
    autocomplete_fields = ("agent",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Overview", {"fields": ("title", "slug", "description", "status", "property_type", "featured", "agent")}),
        ("Property details", {"fields": ("price", "address", "city", "state", "postal_code", "bedrooms", "bathrooms", "area_sqft")}),
        ("Photography", {"fields": ("image_url", "gallery")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "years_experience", "display_order", "active")
    list_filter = ("active",)
    search_fields = ("name", "title")


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "email", "property", "preferred_date", "created_at", "is_resolved")
    list_filter = ("category", "is_resolved", "created_at")
    search_fields = ("name", "email", "message")
    list_editable = ("is_resolved",)
    readonly_fields = ("category", "property", "name", "email", "phone", "message", "preferred_date", "created_at")

    def has_add_permission(self, request):
        return False
