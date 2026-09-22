from django.contrib import admin

from .models import SkillProfile


@admin.register(SkillProfile)
class SkillProfileAdmin(admin.ModelAdmin):
    list_display = ('skill', 'proficiency', 'is_featured', 'order')
    ordering = ('order',)
