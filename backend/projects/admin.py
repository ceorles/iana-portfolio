from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'is_featured', 'is_sample', 'order')
    list_filter = ('is_featured', 'is_sample')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')
