<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.commentsLength }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
  "restaurant": {
    "id": 1,
    "name": "Stephanie Kozey",
    "tel": "(300) 390-7270 x3608",
    "address": "50907 Hegmann Street",
    "opening_hours": "08:00",
    "description": "Quia consequatur fugiat beatae velit ipsum est perferendis nostrum libero. Nobis sit aspernatur repellendus modi ea.",
    "image": "https://loremflickr.com/320/240/restaurant,food/?random=68.27400712675275",
    "viewCounts": 1,
    "createdAt": "2022-10-04T13:09:52.000Z",
    "updatedAt": "2022-10-04T13:12:58.000Z",
    "CategoryId": 1,
    "Category": {
      "id": 1,
      "name": "中式料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    "Comments": [
      {
        "id": 51,
        "text": "Ipsum repudiandae fugit quisquam.",
        "UserId": 1,
        "RestaurantId": 1,
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z",
        "User": {
          "id": 1,
          "name": "root",
          "email": "root@example.com",
          "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
          "isAdmin": true,
          "image": null,
          "createdAt": "2022-10-04T13:09:52.000Z",
          "updatedAt": "2022-10-04T13:09:52.000Z"
        }
      },
      {
        "id": 101,
        "text": "Praesentium atque delectus rerum.",
        "UserId": 1,
        "RestaurantId": 1,
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z",
        "User": {
          "id": 1,
          "name": "root",
          "email": "root@example.com",
          "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
          "isAdmin": true,
          "image": null,
          "createdAt": "2022-10-04T13:09:52.000Z",
          "updatedAt": "2022-10-04T13:09:52.000Z"
        }
      },
      {
        "id": 1,
        "text": "Voluptatum ut facere ut dolor.",
        "UserId": 2,
        "RestaurantId": 1,
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z",
        "User": {
          "id": 2,
          "name": "user1",
          "email": "user1@example.com",
          "password": "$2a$10$k2KMcDkKZ9S6vCzCXs6uEOZ/lf.Hhd4XjBnAw8aO7CrwlwDdThPy.",
          "isAdmin": false,
          "image": null,
          "createdAt": "2022-10-04T13:09:52.000Z",
          "updatedAt": "2022-10-04T13:09:52.000Z"
        }
      }
    ]
  }
}
export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        commentsLength: 0,
        viewCounts: 0
      }
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log(restaurantId)
      const { restaurant } = dummyData
      const { id, name, Category, Comments, viewCounts } = restaurant
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryName: Category ? Category.name : '未分類',
        commentsLength: Comments.length,
        viewCounts
      }
    }
  }
}
</script>