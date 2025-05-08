from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import User, Categories, Idea, UsersFavourites, UsersGallery
import json

# Users
class UserTestCase(APITestCase):
    def setUp(self):
        self.admnin_user = User.objects.create_user(username='admin', password='adminpassword', is_staff=True)
        self.regular_user = User.objects.create_user(username='user', password='userpassword', is_staff=False)
        self.client = APIClient()

    def test_get_users_list_by_admin(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 2)

    def test_get_users_list_by_regular_user(self):
        self.client.login(username='user', password='userpassword')
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_user(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-list')
        data = {
            'username': 'newuser',
            'email' : 'newuser@example.com',
            'password': 'newpassword',
        }
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_make_admnin_by_admin(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-make-admin', args=[self.regular_user.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.regular_user.refresh_from_db()
        self.assertTrue(self.regular_user.is_staff)

    def test_remove_admnin_by_admin(self):
        self.regular_user.is_staff=True
        self.regular_user.save()
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-remove-admin', args=[self.regular_user.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.regular_user.refresh_from_db()
        self.assertFalse(self.regular_user.is_staff)

    def test_make_admnin_by_regular_user(self):
        self.client.login(username='user', password='userpassword')
        url = reverse('user-make-admin', args=[self.regular_user.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_remove_admnin_by_regular_user(self):
        self.client.login(username='user', password='userpassword')
        url = reverse('user-remove-admin', args=[self.regular_user.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_make_admin_invalid_user(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-make-admin', args=[99999])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_remove_admin_invalid_user(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('user-remove-admin', args=[99999])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#Categories
class CategoriesTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(username='admin', password='adminpassword', is_staff=True)
        self.client.login(username='admin', password='adminpassword')
        self.category = Categories.objects.create(category_name='Test Category')

    def test_get_categories(self):
        url = reverse('categories-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(cat['category_name'] =='Test Category' for cat in response.data))

    def test_get_category_details(self):
        url = reverse('categories-detail', args=[self.category.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['category_name'], 'Test Category')

    def test_get_random_idea_from_category(self):
        url = reverse('categories-random-idea', args=[self.category.id])
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_404_NOT_FOUND])

    def test_get_invalid_category(self):
        url = reverse('categories-detail', args=[99999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#Ideas
class IdeasTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(username='admin', password='adminpassword', is_staff=True)
        self.regular_user = User.objects.create_user(username='user', password='userpassword', is_staff=False)
        self.category = Categories.objects.create(category_name='Test Category')
        self.idea = Idea.objects.create(category=self.category, picture=None, alternative_text='Test Idea')

    def test_get_ideas(self):
        url = reverse('ideas-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(idea['alternative_text'] == 'Test Idea' for idea in response.data))

    def test_create_idea_admin(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('ideas-list')
        data = {
            'category': self.category.id,
            'picture': None,
            'alternative_text': 'New Idea'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Idea.objects.filter(alternative_text='New Idea').exists())

    def test_create_idea_non_admin(self):
        self.client.login(username='user', password='userpassword')
        url = reverse('ideas-list')
        data = {
            'category': self.category.id,
            'picture': None,
            'alternative_text': 'New Idea'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_idea_admin(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('ideas-detail', args=[self.idea.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Idea.objects.filter(id=self.idea.id).exists())

    def test_delete_idea_non_admin(self):
        self.client.login(username='user', password='userpassword')
        url = reverse('ideas-detail', args=[self.idea.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_idea_not_found(self):
        self.client.login(username='admin', password='adminpassword')
        url = reverse('ideas-detail', args=[9999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#Favourites
class FavouritesTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='user1password')
        self.user2 = User.objects.create_user(username='user2', password='user2password')
        self.category = Categories.objects.create(category_name='Test Category')
        self.idea1 = Idea.objects.create(category=self.category, picture=None, alternative_text='Idea 1')
        self.idea2 = Idea.objects.create(category=self.category, picture=None, alternative_text='Idea 2')
        # user1 ma w ulubionych idea1
        self.fav1 = UsersFavourites.objects.create(user=self.user1, idea=self.idea1)

    def test_get_favourites_authenticated(self):
        self.client.login(username='user1', password='user1password')
        url = reverse('favourites-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['idea_id'], self.idea1.id)

    def test_get_favourites_unauthenticated(self):
        url = reverse('favourites-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_add_favourite(self):
        self.client.login(username='user1', password='user1password')
        url = reverse('favourites-list')
        data = {'idea_id': self.idea2.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UsersFavourites.objects.filter(user=self.user1, idea=self.idea2).exists())

    def test_add_favourite_unauthenticated(self):
        url = reverse('favourites-list')
        data = {'idea_id': self.idea2.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_favourite(self):
        self.client.login(username='user1', password='user1password')
        url = reverse('favourites-detail', args=[self.idea1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(UsersFavourites.objects.filter(user=self.user1, idea=self.idea1).exists())

    def test_delete_favourite_other_user(self):
        self.client.login(username='user2', password='user2password')
        url = reverse('favourites-detail', args=[self.idea1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_favourite_unauthenticated(self):
        url = reverse('favourites-detail', args=[self.idea1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#UserGallery
class GalleryTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='pass1')
        self.user2 = User.objects.create_user(username='user2', password='pass2')
        self.category = Categories.objects.create(category_name='Test Category')
        self.idea = Idea.objects.create(category=self.category, picture=None, alternative_text='Idea for Gallery')
        self.gallery_item = UsersGallery.objects.create(
            user=self.user1,
            idea=self.idea,
            title='Gallery Item 1',
            description='Description 1',
            date='2023-01-01T00:00:00Z'
        )

    def test_get_gallery_authenticated(self):
        self.client.login(username='user1', password='pass1')
        url = reverse('gallery-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Gallery Item 1')

    def test_get_gallery_unauthenticated(self):
        url = reverse('gallery-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_add_gallery_item(self):
        self.client.login(username='user1', password='pass1')
        url = reverse('gallery-list')
        data = {
            'idea': self.idea.id,
            'title': 'New Gallery Item',
            'description': 'New Description',
            'date': '2023-02-01T00:00:00Z'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UsersGallery.objects.filter(user=self.user1, title='New Gallery Item').exists())

    def test_add_gallery_item_unauthenticated(self):
        url = reverse('gallery-list')
        data = {
            'idea': self.idea.id,
            'title': 'New Gallery Item',
            'description': 'New Description',
            'date': '2023-02-01T00:00:00Z'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_gallery_item(self):
        self.client.login(username='user1', password='pass1')
        url = reverse('gallery-detail', args=[self.gallery_item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(UsersGallery.objects.filter(id=self.gallery_item.id).exists())

    def test_delete_gallery_item_other_user(self):
        self.client.login(username='user2', password='pass2')
        url = reverse('gallery-detail', args=[self.gallery_item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_gallery_item_unauthenticated(self):
        url = reverse('gallery-detail', args=[self.gallery_item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
