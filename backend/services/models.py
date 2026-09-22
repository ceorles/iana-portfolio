from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icon_name = models.CharField(
        max_length=50, blank=True, help_text='lucide-react icon name, e.g. "camera".'
    )
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
