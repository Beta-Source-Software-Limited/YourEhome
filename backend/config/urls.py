"""Top-level API and administrator routes."""
from django.contrib import admin
from django.urls import include, path
from django.http import JsonResponse

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("realestate.urls")),
    path("health/", lambda request: JsonResponse({"status": "ok", "app": "YourEhome"})),
]
admin.site.site_header = "YourEhome Administration"
admin.site.site_title = "YourEhome Admin"
admin.site.index_title = "Manage your real estate website"
