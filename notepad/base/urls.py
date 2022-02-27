from unicodedata import name

from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/create/', views.createNote, name="createNote"),
    path('notes/<str:pk>/update/', views.updateNotes, name="updateNote"),
    path('notes/<str:pk>/delete/', views.deleteNote, name="deleteNote"),
    path('notes/<str:pk>/', views.getNote, name="note"),
]
