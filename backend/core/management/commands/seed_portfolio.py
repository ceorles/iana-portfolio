from django.core.management.base import BaseCommand

from education.models import EducationRecord
from profiles.models import Profile
from projects.models import Project
from services.models import Service
from skill_profiles.models import SkillProfile
from skills.models import Skill
from social_links.models import SocialLink

DLL_MAPS_URL = 'https://maps.google.com/maps?cid=3356680135033761432'


class Command(BaseCommand):
    help = 'Seeds the database with real (non-fake) portfolio content and sample projects.'

    def handle(self, *args, **options):
        self.seed_profile()
        self.seed_education()
        self.seed_services()
        self.seed_skills()
        self.seed_social_links()
        self.seed_sample_projects()
        self.stdout.write(self.style.SUCCESS('Portfolio content seeded.'))

    def seed_profile(self):
        data = dict(
            full_name='Joanne',
            display_name='Joanne',
            title='IT Student',
            school='Dalubhasaan ng Lungsod ng Lucena',
            age=21,
            location='Lucena City, Quezon, Philippines',
            intro=(
                "I'm an IT student who enjoys turning rough ideas into things people can "
                "actually use — with a soft spot for photography, design, and video editing "
                "along the way."
            ),
            about=(
                "I'm currently taking up a Bachelor of Science in Information Technology at "
                "Dalubhasaan ng Lungsod ng Lucena. Alongside development, I'm interested in "
                "photography, UI/UX design, Figma, and video editing, and I like projects that "
                "let me combine the technical and the creative side of building things."
            ),
            is_active=True,
        )
        # Singleton-style: correct the existing profile in place rather than
        # creating a duplicate row if one already exists.
        profile = Profile.objects.order_by('id').first()
        if profile:
            for field, value in data.items():
                setattr(profile, field, value)
            profile.save()
        else:
            Profile.objects.create(**data)

    def seed_education(self):
        records = [
            dict(
                level=EducationRecord.Level.PRIMARY,
                school_name='Reymar Compound Elementary School',
                address='St. Matthew, Barangay Gulang-Gulang, Lucena City, 4301 Quezon, Philippines',
                start_year=2011,
                end_year=2017,
                order=0,
            ),
            dict(
                level=EducationRecord.Level.JUNIOR_HIGH,
                school_name='Quezon National High School',
                address='M.L. Tagarao Street, Barangay Ibabang Iyam, Lucena City, 4301 Quezon Province, Philippines',
                start_year=2017,
                end_year=2021,
                order=1,
            ),
            dict(
                level=EducationRecord.Level.SENIOR_HIGH,
                program='Information and Communications Technology (ICT)',
                school_name='Quezon National High School',
                address='M.L. Tagarao Street, Barangay Ibabang Iyam, Lucena City, 4301 Quezon Province, Philippines',
                start_year=2021,
                end_year=2023,
                order=2,
            ),
            dict(
                level=EducationRecord.Level.TERTIARY,
                program='Bachelor of Science in Information Technology (BSIT)',
                school_name='Dalubhasaan ng Lungsod ng Lucena',
                address='City Hall Annex Compound, Barangay Isabang, Lucena City, Quezon',
                maps_url=DLL_MAPS_URL,
                start_year=2023,
                end_year=None,
                is_current=True,
                order=3,
            ),
        ]
        for record in records:
            EducationRecord.objects.get_or_create(
                level=record['level'], school_name=record['school_name'],
                start_year=record['start_year'], defaults=record,
            )

    def seed_services(self):
        services = [
            dict(title='Photography', description='Capturing moments and subjects with an eye for composition and light.', icon_name='camera', order=0),
            dict(title='UI/UX Design', description='Designing clean, usable interfaces for web and mobile experiences.', icon_name='layout-panel-left', order=1),
            dict(title='Figma Prototyping', description='Building interactive Figma prototypes to test and communicate ideas.', icon_name='figma', order=2),
            dict(title='Video Editing', description='Editing footage into polished, well-paced videos.', icon_name='clapperboard', order=3),
        ]
        for service in services:
            Service.objects.get_or_create(title=service['title'], defaults=service)

    def seed_skills(self):
        skills = [
            dict(name='Photography', category=Skill.Category.MEDIA, icon_name='camera', order=0, proficiency=80, summary='Composition, lighting, and editing for photo work.'),
            dict(name='UI/UX Design', category=Skill.Category.DESIGN, icon_name='layout-panel-left', order=1, proficiency=75, summary='User-centered interface and experience design.'),
            dict(name='Figma', category=Skill.Category.DESIGN, icon_name='figma', order=2, proficiency=78, summary='Wireframing and interactive prototyping.'),
            dict(name='Video Editing', category=Skill.Category.MEDIA, icon_name='clapperboard', order=3, proficiency=72, summary='Cutting and pacing footage into finished videos.'),
        ]
        for entry in skills:
            skill, _ = Skill.objects.get_or_create(
                name=entry['name'],
                defaults=dict(category=entry['category'], icon_name=entry['icon_name'], order=entry['order']),
            )
            SkillProfile.objects.get_or_create(
                skill=skill,
                defaults=dict(proficiency=entry['proficiency'], summary=entry['summary'], order=entry['order']),
            )

    def seed_social_links(self):
        # Clearly-a-placeholder URLs — replace with real profile links from
        # the admin dashboard's Social Links page.
        links = [
            dict(platform=SocialLink.Platform.FACEBOOK, label='Facebook', url='https://facebook.com/replace-with-your-profile', order=0),
            dict(platform=SocialLink.Platform.GITHUB, label='GitHub', url='https://github.com/replace-with-your-username', order=1),
            dict(platform=SocialLink.Platform.DISCORD, label='Discord', url='https://discord.com/users/replace-with-your-id', order=2),
        ]
        for link in links:
            SocialLink.objects.update_or_create(platform=link['platform'], defaults=link)

    def seed_sample_projects(self):
        # Sample/placeholder projects (is_sample=True) so the Projects section
        # isn't empty on first load. Replace these with real work from the
        # admin dashboard whenever ready — the public site already flags
        # them with a "Sample" badge.
        projects = [
            dict(
                title='Task Flow',
                slug='task-flow',
                short_description='Sample project — a task manager with drag-and-drop boards.',
                description='Placeholder sample project demonstrating a Kanban-style task manager. Replace with a real project from the admin dashboard.',
                technologies=['React', 'Django REST Framework', 'PostgreSQL'],
                year='2025',
                is_featured=True,
                is_sample=True,
                order=0,
            ),
            dict(
                title='Campus Connect',
                slug='campus-connect',
                short_description='Sample project — a student community platform concept.',
                description='Placeholder sample project for a student networking concept. Replace with a real project from the admin dashboard.',
                technologies=['React', 'Node.js', 'MongoDB'],
                year='2025',
                is_featured=False,
                is_sample=True,
                order=1,
            ),
            dict(
                title='Lens Log',
                slug='lens-log',
                short_description='Sample project — a photography portfolio gallery concept.',
                description='Placeholder sample project for a photography portfolio gallery. Replace with a real project from the admin dashboard.',
                technologies=['React', 'Figma', 'Cloudinary'],
                year='2024',
                is_featured=False,
                is_sample=True,
                order=2,
            ),
            dict(
                title='Frame & Form',
                slug='frame-and-form',
                short_description='Sample project — a UI/UX case study microsite concept.',
                description='Placeholder sample project for a case-study style microsite presenting a design process. Replace with a real project from the admin dashboard.',
                technologies=['Figma', 'React', 'Framer Motion'],
                year='2024',
                is_featured=False,
                is_sample=True,
                order=3,
            ),
            dict(
                title='Reel Cut',
                slug='reel-cut',
                short_description='Sample project — a short-form video editing showcase concept.',
                description='Placeholder sample project for a video editing showreel concept. Replace with a real project from the admin dashboard.',
                technologies=['Premiere Pro', 'After Effects'],
                year='2023',
                is_featured=False,
                is_sample=True,
                order=4,
            ),
        ]
        for project in projects:
            Project.objects.get_or_create(slug=project['slug'], defaults=project)
