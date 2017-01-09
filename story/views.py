from django.shortcuts import render
from story.models import Story


def index(request):
    context = {}
    context['stories'] = Story.objects.all()

    return render(request, 'index.html', context)
