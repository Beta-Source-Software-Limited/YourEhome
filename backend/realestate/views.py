"""Public read-only listing API and a validated, rate-limited lead form."""
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, permissions, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .models import Agent, Property
from .serializers import AgentSerializer, InquirySerializer, PropertySerializer


class PropertyListView(generics.ListAPIView):
    serializer_class = PropertySerializer
    queryset = Property.objects.select_related("agent").all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status", "property_type", "featured", "city"]
    search_fields = ["title", "city", "state", "address", "description"]
    ordering_fields = ["price", "created_at", "area_sqft"]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        min_price = params.get("min_price")
        max_price = params.get("max_price")
        if min_price:
            try:
                queryset = queryset.filter(price__gte=float(min_price))
            except ValueError:
                pass
        if max_price:
            try:
                queryset = queryset.filter(price__lte=float(max_price))
            except ValueError:
                pass
        return queryset


class PropertyDetailView(generics.RetrieveAPIView):
    serializer_class = PropertySerializer
    queryset = Property.objects.select_related("agent").all()
    lookup_field = "slug"


class AgentListView(generics.ListAPIView):
    serializer_class = AgentSerializer
    pagination_class = None
    queryset = Agent.objects.filter(active=True)


class InquiryThrottle(AnonRateThrottle):
    scope = "inquiry"


class InquiryCreateView(generics.CreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [InquiryThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Thank you! Our team will contact you soon."}, status=status.HTTP_201_CREATED)
