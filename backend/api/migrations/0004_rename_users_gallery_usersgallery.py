from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_users_gallery_usersfavourites'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Users_Gallery',
            new_name='UsersGallery',
        ),
    ]
