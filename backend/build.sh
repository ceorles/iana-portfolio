#!/usr/bin/env bash
# Render build command for the Django backend.
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Idempotent: safe to run on every deploy, won't duplicate data or error if
# the admin user / portfolio content already exist.
python manage.py ensure_admin
python manage.py seed_portfolio
