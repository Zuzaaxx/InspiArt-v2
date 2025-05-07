from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import User, Categories
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
        self.admin_user = User.objects.create_superuser(username='admin', password='adminpassword', is_staff=True)
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