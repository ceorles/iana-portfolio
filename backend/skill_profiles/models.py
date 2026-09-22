from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from skills.models import Skill


class SkillProfile(models.Model):
    """A skill together with its displayed self-assessed proficiency."""

    skill = models.OneToOneField(Skill, on_delete=models.CASCADE, related_name='profile')
    proficiency = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text='Visual self-assessment, not a measured score.',
    )
    summary = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.skill.name} ({self.proficiency}%)'
