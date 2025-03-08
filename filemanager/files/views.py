from rest_framework import generics
from .models import File
from .serializers import FileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics, status
from rest_framework.response import Response
from .models import File
from .serializers import FileSerializer

class FileListCreateView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def create(self, request, *args, **kwargs):
        # Extract the file and name from the request data
        file = request.data.get('file')
        name = request.data.get('name', 'Untitled File')  # Default name if not provided

        if not file:
            return Response({"error": "File is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new File instance
        file_instance = File(name=name, file=file)
        file_instance.save()

        # Serialize the instance and return the response
        serializer = self.get_serializer(file_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileListView(generics.ListAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer