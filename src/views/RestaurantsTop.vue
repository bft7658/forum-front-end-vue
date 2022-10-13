<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="card mb-3" style="max-width: 540px;margin: auto;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            <img class="card-img" :src="restaurant.image | emptyImage">
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link class="btn btn-primary mr-2" :to="{ name: 'restaurant', params: { id: restaurant.id } }">
              Show
            </router-link>

            <button v-if="restaurant.isFavorited" type="button" class="btn btn-danger mr-2"
              @click.stop.prevent="deleteFavorite(restaurant.id)">
              移除最愛
            </button>
            <button v-else type="button" class="btn btn-primary" @click.stop.prevent="addFavorite(restaurant.id)">
              加到最愛
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'  
import NavTabs from './../components/NavTabs'

const dummyData = {
  "restaurants": [
    {
      "id": 50,
      "name": "Levi Hoppe",
      "tel": "1-245-532-1617 x98835",
      "address": "826 Hegmann Divide",
      "opening_hours": "08:00",
      "description": "Asperiores eaque asperiores sit voluptatem. Offici",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=31.773755986887785",
      "viewCounts": 2,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-07T07:14:05.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 49,
      "name": "Roman Boehm",
      "tel": "1-363-690-7930 x753",
      "address": "33793 Louvenia Falls",
      "opening_hours": "08:00",
      "description": "Aut enim voluptatem. Natus qui sapiente ut digniss",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=57.84984819242567",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 48,
      "name": "Thea Collins",
      "tel": "202-810-5572 x946",
      "address": "025 Romaguera Circle",
      "opening_hours": "08:00",
      "description": "veniam nihil et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.35230402018017",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 47,
      "name": "Clifford Rippin",
      "tel": "227-281-0268",
      "address": "78029 Lauriane Plains",
      "opening_hours": "08:00",
      "description": "voluptatibus inventore nobis",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=35.97639913313817",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 46,
      "name": "Mr. Rudy Rogahn",
      "tel": "535.195.0430 x847",
      "address": "7057 Gutkowski Walk",
      "opening_hours": "08:00",
      "description": "Consectetur est expedita aut repudiandae ea autem ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=16.414091915676888",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 45,
      "name": "Miss Reginald Yundt",
      "tel": "1-855-566-2990",
      "address": "7071 Nathanial Ford",
      "opening_hours": "08:00",
      "description": "Recusandae nemo iusto quia illo iste sequi. Delect",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.501847005768499",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 44,
      "name": "Will Muller",
      "tel": "480.110.5178 x32409",
      "address": "03017 Nikolaus Route",
      "opening_hours": "08:00",
      "description": "Omnis ut qui velit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=2.620605135561105",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 43,
      "name": "Devonte Dare",
      "tel": "987.233.2804",
      "address": "598 Fernando Pines",
      "opening_hours": "08:00",
      "description": "Qui omnis perferendis quia facilis id qui impedit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=67.82288872001814",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 42,
      "name": "Effie Schulist",
      "tel": "365.967.5470 x99557",
      "address": "86826 Nicklaus Mill",
      "opening_hours": "08:00",
      "description": "nam",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.911506276599999",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 41,
      "name": "Jacquelyn Erdman",
      "tel": "084.030.4654 x106",
      "address": "1994 Frami Coves",
      "opening_hours": "08:00",
      "description": "Ducimus et nesciunt odit et ea ipsam. Ipsam dolor ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=70.03230742918443",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    }
  ]
}

export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs
  },
  data () {
    return {
      restaurants: []
    }
  },
  created () {
    this.fetchTopRestaurants()
  },
  methods: {
    fetchTopRestaurants() {
      this.restaurants = dummyData.restaurants
    },
    addFavorite(restaurantId) {
      this.restaurants = this.restaurants
        .map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          }
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount + 1,
            isFavorited: true
          }
        })
        .sort((a, b) => b.FavoriteCount - a.FavoriteCount)
    },
    deleteFavorite(restaurantId) {
      this.restaurants = this.restaurants
        .map(restaurant => {
          if (restaurant.id !== restaurantId) {
            return restaurant
          }
          return {
            ...restaurant,
            FavoriteCount: restaurant.FavoriteCount - 1,
            isFavorited: false
          }
        })
        .sort((a, b) => b.FavoriteCount - a.FavoriteCount)
    }
  }
}
</script>