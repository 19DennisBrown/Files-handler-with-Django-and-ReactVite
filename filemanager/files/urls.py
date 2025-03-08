from django.urls import path
from .views import FileListCreateView, FileListView

urlpatterns = [
    path('files/', FileListCreateView.as_view(), name='file-list-create'),
    
    path('files/list/', FileListView.as_view(), name='file-list'),
]