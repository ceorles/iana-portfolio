from django.contrib import admin

from .models import ProjectMedia


@admin.register(ProjectMedia)
class ProjectMediaAdmin(admin.ModelAdmin):
    list_display = ('project', 'caption', 'order')
    list_filter = ('project',)
