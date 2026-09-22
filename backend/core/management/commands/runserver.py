from django.contrib.staticfiles.management.commands.runserver import Command as RunserverCommand


class Command(RunserverCommand):
    """
    Overrides the default runserver port.

    This machine has another, unrelated Django project whose dev server
    permanently occupies 127.0.0.1:8000, which silently swallows requests
    meant for this project (including /api/auth/token/, causing 404s that
    look like a routing bug but are actually a port collision). Defaulting
    `manage.py runserver` to 8010 avoids that collision without relying on
    anyone remembering to pass a port on the command line.
    """

    default_port = '8010'
