from django.db import models

from projects.models import Project


class ProjectMedia(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='media')
    image = models.ImageField(upload_to='projects/media/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Project media'

    def __str__(self):
        return f'{self.project.title} media #{self.pk}'
