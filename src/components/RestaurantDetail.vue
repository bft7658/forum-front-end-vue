<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" :src="restaurant.image | emptyImage"
        style="width: 250px;margin-bottom: 25px;">
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link class="btn btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }">
        Dashboard
      </router-link>

      <button v-if="restaurant.isFavorited" @click.prevent.stop="deleteFavorite(restaurant.id)" :disabled="isProcessing" type="button"
        class="btn btn-danger btn-border mr-2">
        移除最愛
      </button>
      <button v-else @click.prevent.stop="addFavorite(restaurant.id)" :disabled="isProcessing" type="button" class="btn btn-primary btn-border mr-2">
        加到最愛
      </button>
      <button v-if="restaurant.isLiked" @click.prevent.stop="deleteLike(restaurant.id)" :disabled="isProcessing" type="button" class="btn btn-danger like mr-2">
        Unlike
      </button>
      <button v-else @click.prevent.stop="addLike(restaurant.id)" :disabled="isProcessing" type="button" class="btn btn-primary like mr-2">
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFavorite({
          restaurantId
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          // 保留餐廳內原有資料
          ...this.restaurant,
          isFavorited: true
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }

    },
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFavorite({
          restaurantId
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳從最愛移除，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addLike({
          restaurantId
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法按讚，請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteLike({
          restaurantId
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>