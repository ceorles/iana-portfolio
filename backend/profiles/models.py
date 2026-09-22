from django.db import models


class Profile(models.Model):
    """The single portfolio owner profile shown on the public homepage."""

    full_name = models.CharField(max_length=150)
    display_name = models.CharField(
        max_length=150, help_text='The highlighted part of the hero name, e.g. "Iana Berches".'
    )
    title = models.CharField(max_length=150, help_text='e.g. "IT Student"')
    school = models.CharField(max_length=200, blank=True)
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    intro = models.TextField(help_text='Short intro shown in the hero section.')
    about = models.TextField(blank=True, help_text='Longer bio shown in the About section.')
    email = models.EmailField(blank=True)
    photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume = models.FileField(upload_to='profile/resume/', blank=True, null=True)
    is_active = models.BooleanField(
        default=True, help_text='Only the active profile is shown publicly.'
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_active', '-updated_at']

    def __str__(self):
        return self.full_name
