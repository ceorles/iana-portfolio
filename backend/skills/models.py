from django.db import models


class Skill(models.Model):
    class Category(models.TextChoices):
        DESIGN = 'design', 'Design'
        DEVELOPMENT = 'development', 'Development'
        MEDIA = 'media', 'Media'
        OTHER = 'other', 'Other'

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    icon_name = models.CharField(
        max_length=50, blank=True, help_text='lucide-react icon name, e.g. "figma".'
    )
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
