import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """
    Idempotently creates a superuser from DJANGO_SUPERUSER_* env vars.

    Safe to run on every deploy: no-ops if the vars aren't set, and no-ops
    if a user with that username already exists (unlike the built-in
    `createsuperuser --noinput`, which errors in that case and would abort
    the Render build).
    """

    help = 'Creates a superuser from DJANGO_SUPERUSER_USERNAME/EMAIL/PASSWORD if one does not already exist.'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', '')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not username or not password:
            self.stdout.write('DJANGO_SUPERUSER_USERNAME/PASSWORD not set — skipping.')
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Superuser "{username}" already exists — skipping.')
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f'Created superuser "{username}".'))
