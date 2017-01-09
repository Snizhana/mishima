from django.db import models


class Story(models.Model):
    header = models.TextField()
    subheader = models.TextField()
    text = models.TextField()

    def __str__(self):
        return self.header
