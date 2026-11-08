from django.urls import path
from .views import AgentListView, InquiryCreateView, PropertyDetailView, PropertyListView

urlpatterns = [
    path("properties/", PropertyListView.as_view(), name="properties"),
    path("properties/<slug:slug>/", PropertyDetailView.as_view(), name="property-detail"),
    path("agents/", AgentListView.as_view(), name="agents"),
    path("inquiries/", InquiryCreateView.as_view(), name="inquiries"),
]
