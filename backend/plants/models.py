# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Plants(models.Model):
    name = models.CharField(max_length=50)
    subspecies = models.CharField(max_length=50, blank=True)
    type = models.CharField(max_length=50, blank=True)
    sow_month = models.PositiveSmallIntegerField(blank=True)
    plant_month = models.PositiveSmallIntegerField(blank=True)
    harvest_month = models.PositiveSmallIntegerField(blank=True)
    sunlight = models.CharField(max_length=50, blank=True)
    soil_acidity = models.CharField(max_length=50, blank=True)
    watering_frequency = models.PositiveSmallIntegerField(blank=True)
    fertilizing_frequency = models.PositiveSmallIntegerField(blank=True)
    fertilizer_type = models.CharField(max_length=50, blank=True)
    germination_temperature = models.PositiveSmallIntegerField(blank=True)
    image = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    difficulty = models.PositiveSmallIntegerField(blank=True,)
    owner = models.ForeignKey(
        User,
        related_name='created_meals',
        on_delete = models.CASCADE
    )
    verified_by_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"
