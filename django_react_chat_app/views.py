from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
    if request.method == 'POST':
        user = authenticate(username = request.POST.get('username', None), password = request.POST.get('password', None))
        if user:
            login(request=request, user=user)
    return render(request, 'index.html')

@login_required
@ensure_csrf_cookie
def chat(request):
    users = User.objects.all()
    return render(request, 'index.html', context={'user':users})