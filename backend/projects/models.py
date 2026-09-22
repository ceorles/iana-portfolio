from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True)
    short_description = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='projects/thumbnails/', blank=True, null=True)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.JSONField(default=list, blank=True, help_text='List of technology names.')
    year = models.CharField(max_length=20, blank=True)
    is_featured = models.BooleanField(default=False)
    is_sample = models.BooleanField(
        default=False, help_text='Marks placeholder/sample projects meant to be replaced later.'
    )
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-is_featured', '-created_at']

    def __str__(self):
        return self.title
