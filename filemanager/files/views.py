from rest_framework import generics
from .models import File
from .serializers import FileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class FileListCreateView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if request.data['file'].size > 2 * 1024 * 1024:  # 2MB limit
            return Response({"error": "File size exceeds 2MB"}, status=status.HTTP_400_BAD_REQUEST)
        return super().post(request, *args, **kwargs)

class FileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer