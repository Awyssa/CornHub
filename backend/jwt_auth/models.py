# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    profile_image = models.CharField(max_length=300, blank=True)
    saved_plants = models.ManyToManyField('plants.Plants', related_name="plants", blank=True)
