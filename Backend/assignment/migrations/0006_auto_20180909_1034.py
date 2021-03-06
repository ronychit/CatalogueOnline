# Generated by Django 2.1.1 on 2018-09-09 05:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('assignment', '0005_auto_20180909_1000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products_attributes',
            name='attribute',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assignment.Attributes'),
        ),
        migrations.AlterField(
            model_name='products_attributes',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assignment.Product'),
        ),
    ]
