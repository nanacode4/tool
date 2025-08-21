from django.db import models

class Discuss(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tags = models.JSONField(default=list)
    likes = models.IntegerField(default=0)
    time = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Reply(models.Model):
    discuss = models.ForeignKey(Discuss, related_name='replies', on_delete=models.CASCADE)
    replier = models.CharField(max_length=100)
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.replier}'s reply"
