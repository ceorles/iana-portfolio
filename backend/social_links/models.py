from django.db import models


class SocialLink(models.Model):
    class Platform(models.TextChoices):
        FACEBOOK = 'facebook', 'Facebook'
        GITHUB = 'github', 'GitHub'
        DISCORD = 'discord', 'Discord'
        OTHER = 'other', 'Other'

    platform = models.CharField(max_length=20, choices=Platform.choices)
    label = models.CharField(max_length=100, blank=True)
    url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label or self.get_platform_display()
