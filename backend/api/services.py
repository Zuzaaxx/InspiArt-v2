from .models import User

class UserService:
    @staticmethod
    def make_admin(user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_staff = True
            user.save()
            return user
        except User.DoesNotExist:
            return None

    @staticmethod
    def remove_admin(user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_staff = False
            user.save()
            return user
        except User.DoesNotExist:
            return None
