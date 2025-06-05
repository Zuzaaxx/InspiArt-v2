from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_users_gallery_usersgallery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='idea',
            name='alternative_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='idea',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='ideas'),
        ),
    ]
