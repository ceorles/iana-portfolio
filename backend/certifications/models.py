from django.db import models


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, blank=True)
    issue_date = models.DateField(null=True, blank=True)
    credential_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', '-issue_date']

    def __str__(self):
        return self.title
