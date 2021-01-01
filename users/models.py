from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, rank, surname, password, PMC, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('PMC', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, rank, surname, password, PMC, **other_fields)

    def create_user(self, email, rank, surname, password, PMC, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, rank=rank,
                          surname=surname, PMC=PMC **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    
    ranks = (
        ("2Lt","2Lt"),
        ("Lt","Lt"),
        ("Capt","Capt"),
        ("Maj","Maj"),
        ("Lt Col","Lt Col"),
        ("Guest","Guest")
    )

    email = models.EmailField(_('email address'), unique=True)
    rank = models.CharField(max_length=150, choices=ranks)
    surname = models.CharField(max_length=150)
    PMC = models.BooleanField(default=False)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['rank', 'surname']

    def __str__(self):
        return self.rank + " " + self.surname




# from django.db import models
# from django.contrib.auth.models import User
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib import admin

# # Create your models here.
# class UserProfile(models.Model):
#     """Adds more fields to the standard User model"""
#     ranks = (
#         ("2Lt","2Lt"),
#         ("Lt","Lt"),
#         ("Capt","Capt"),
#         ("Maj","Maj"),
#         ("Lt Col","Lt Col"),
#         ("Guest","Guest")
#     )
    
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     rank = models.CharField(max_length = 10, choices=ranks)
#     pmc = models.BooleanField(default=False)
    
#     # DEVICE DATA (ADD TO VIEWS.REGISTER)
#     # ip_address = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # isp = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # provider = models.CharField(default='Unknown', max_length=200, null=True, blank=True)
#     # region = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # country = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # city = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # os = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # client = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
#     # device = models.CharField(default='Unknown', max_length=100, null=True, blank=True)
    
#     def __str__(self):
#         return f'{self.user.username} Profile'
    
#     # Not sure if this is needed...?
#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
    
# class UserProfileInline(admin.StackedInline):
#     """Adds the additional fields to the admin interface"""
#     model = UserProfile
#     can_delete = False
#     verbose_name_plural = "profile"

# class UserAdmin(BaseUserAdmin):
#     """Adds Rank and PMC to the User admin page info list display"""
#     inline = (UserProfileInline, )
#     list_display = ['username','get_rank','get_pmc']
    
#     def get_rank(self, obj):
#         return obj.profile.rank
#     get_rank.admin_order_field = "Rank"
#     get_rank.short_description = "Rank"
    
#     def get_pmc(self, obj):
#         return obj.profile.rank
#     get_pmc.admin_order_field = "PMC"
#     get_pmc.short_description = "President of the Mess Committee"