from django.contrib import admin
from users.models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'rank', 'surname',)
    list_filter = ('email', 'rank', 'surname', 'is_active', 'PMC')
    ordering = ('-rank',)
    list_display = ('surname', 'rank',
                    'is_active', 'PMC', 'id')
    fieldsets = (
        (None, {'fields': ('rank', 'surname', 'email',)}),
        ('Permissions', {'fields': ('PMC', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'rank', 'surname', 'password1', 'password2', 'is_active', 'PMC')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig)