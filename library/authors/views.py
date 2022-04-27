from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet
from .models import Author, Biography, Article, Book
from .serializers import AuthorSerializer, AuthorSerializerBase, BookSerializer, BookSerializerBase


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


# class BiographyModelViewSet(ModelViewSet):
#     queryset = Biography.objects.all()
#     serializer_class = BiographySerializer
#
#
# class ArticleModelViewSet(ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return AuthorSerializerBase
        return AuthorSerializer


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return BookSerializer
        return BookSerializerBase
