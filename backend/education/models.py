from django.db import models


class EducationRecord(models.Model):
    class Level(models.TextChoices):
        PRIMARY = 'primary', 'Primary Education'
        JUNIOR_HIGH = 'junior_high', 'Junior High School'
        SENIOR_HIGH = 'senior_high', 'Senior High School'
        TERTIARY = 'tertiary', 'Tertiary Education'

    level = models.CharField(max_length=20, choices=Level.choices)
    program = models.CharField(
        max_length=200, blank=True, help_text='e.g. "Bachelor of Science in Information Technology (BSIT)"'
    )
    school_name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, blank=True)
    maps_url = models.URLField(blank=True)
    start_year = models.PositiveSmallIntegerField()
    end_year = models.PositiveSmallIntegerField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', 'start_year']

    def __str__(self):
        return f'{self.get_level_display()} — {self.school_name}'
