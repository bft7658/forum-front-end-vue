<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories"/>

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant"/>
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination 
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantCard from './../components/RestaurantCard'
import RestaurantsNavPills from './../components/RestaurantsNavPills'
import RestaurantsPagination from './../components/RestaurantsPagination'

const dummyData = {
  "restaurants": [
    {
      "id": 1,
      "name": "Stephanie Kozey",
      "tel": "(300) 390-7270 x3608",
      "address": "50907 Hegmann Street",
      "opening_hours": "08:00",
      "description": "Quia consequatur fugiat beatae velit ipsum est per",
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
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 2,
      "name": "Dora Schiller",
      "tel": "345-969-0688",
      "address": "2332 Fabian Bridge",
      "opening_hours": "08:00",
      "description": "non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.683018430167383",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 3,
      "name": "Samanta Pacocha",
      "tel": "610.159.0524 x5266",
      "address": "208 Jovanny Stream",
      "opening_hours": "08:00",
      "description": "architecto adipisci non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.86650834601485",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 4,
      "name": "Misty Heaney",
      "tel": "(610) 490-2605 x3910",
      "address": "419 Cortez Roads",
      "opening_hours": "08:00",
      "description": "Ea animi voluptas et dolor. Repudiandae ut sit dol",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.23126625430645",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 5,
      "name": "Nicola Prohaska",
      "tel": "074.166.9392",
      "address": "903 Nettie Skyway",
      "opening_hours": "08:00",
      "description": "maxime quia et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.40040828699378",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 6,
      "name": "Mertie Douglas",
      "tel": "139-689-2066",
      "address": "996 Wehner Rue",
      "opening_hours": "08:00",
      "description": "Blanditiis voluptatem autem voluptate. Quia in vel",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=48.79311929030254",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 7,
      "name": "Dominic Daugherty",
      "tel": "(338) 528-6343 x56978",
      "address": "69828 Kreiger Row",
      "opening_hours": "08:00",
      "description": "temporibus",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.868275365141033",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 8,
      "name": "Adrienne Gusikowski",
      "tel": "1-325-179-0990 x7366",
      "address": "603 Irving Circle",
      "opening_hours": "08:00",
      "description": "Vero et qui consequatur minus.\nPerspiciatis offici",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.21984595278269",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 9,
      "name": "Emmet Leffler",
      "tel": "057.574.6079",
      "address": "042 Wilderman Freeway",
      "opening_hours": "08:00",
      "description": "rerum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.471674534542565",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 10,
      "name": "Carmela Hegmann",
      "tel": "263-265-3638 x4844",
      "address": "03854 Lowe Fork",
      "opening_hours": "08:00",
      "description": "Optio consequatur earum.\nLibero sint dolores cum.\n",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=79.6729220129798",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "中式料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 3,
      "name": "義大利料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 4,
      "name": "墨西哥料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 5,
      "name": "素食料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 6,
      "name": "美式料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    },
    {
      "id": 7,
      "name": "複合式料理",
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z"
    }
  ],
  "categoryId": "",
  "page": 1,
  "totalPage": [1, 2, 3, 4, 5 ],
  "prev": 1,
  "next": 2
}

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data () {
    return {
      // -1 代表我現在還沒拿到資料
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },
  created () {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = dummyData
      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
    }
  }
}
</script>
