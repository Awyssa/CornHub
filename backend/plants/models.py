# pylint: disable=missing-module-docstring
# pylint: disable=missing-class-docstring
# pylint: disable=missing-function-docstring

from django.db import models

class Plants(models.Model):
    name = models.CharField(max_length=50)
    subspecies = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    sow_month = models.PositiveSmallIntegerField()
    plant_month = models.PositiveSmallIntegerField()
    harvest_month = models.PositiveSmallIntegerField()
    sunlight = models.CharField(max_length=50)
    soil_acidity = models.CharField(max_length=50)
    watering_frequency = models.PositiveSmallIntegerField()
    fertilizing_frequency = models.PositiveSmallIntegerField()
    fertilizer_type = models.CharField(max_length=50)
    germination_temperature = models.PositiveSmallIntegerField()
    image = models.CharField(max_length=300)
    description = models.TextField()
    difficulty = models.PositiveSmallIntegerField()
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_meals',
        on_delete = models.CASCADE
    )
    verified_by_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}, {self.subspecies}"
