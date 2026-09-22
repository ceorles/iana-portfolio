from django.contrib import admin

from .models import EducationRecord


@admin.register(EducationRecord)
class EducationRecordAdmin(admin.ModelAdmin):
    list_display = ('school_name', 'level', 'start_year', 'end_year', 'order')
    list_filter = ('level',)
    ordering = ('order', 'start_year')
