from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def index(request):
    return render(request, 'index.html')


#@login_required
@ensure_csrf_cookie
def chat(request):
    return render(request, 'index.html')