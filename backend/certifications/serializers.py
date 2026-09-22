from rest_framework import serializers

from .models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'issue_date', 'credential_url', 'image', 'order']
