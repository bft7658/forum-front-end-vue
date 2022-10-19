<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- UserProfileCard -->
      <UserProfileCard :user="user" :is-current-user="currentUser.id === user.id" :initial-is-followed="isFollowed"/>

      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard -->
          <UserFollowingsCard :followings="followings"/>

          <!-- UserFollowersCard -->
          <UserFollowersCard :followers="followers"/>
        </div>
        <div class="col-md-8">
          <!-- UserCommentsCard -->
          <UserCommentsCard :comments="comments"/>

          <!-- UserFavoritedRestaurantsCard -->
          <UserFavoritedRestaurantsCard :favorited-restaurants="favoritedRestaurants"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserProfileCard from './../components/UserProfileCard'
import UserFollowingsCard from './../components/UserFollowingsCard'
import UserFollowersCard from './../components/UserFollowersCard'
import UserCommentsCard from './../components/UserCommentsCard'
import UserFavoritedRestaurantsCard from './../components/UserFavoritedRestaurantsCard'
import Spinner from './../components/Spinner'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers' 

export default {
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner
  },
  data () {
    return {
      user: {
        id: 0,
        image: '',
        name: '',
        email: '',
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: [],
      isLoading: true
    }
  },
  // 從 Vuex 中將登入者的資料取出
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  // 路由轉換時重新取得使用者資料
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.get({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { profile, isFollowed } = data
        const {
          id,
          image,
          name,
          email,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants
        } = profile

        this.user = {
          ...this.user,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length
        }
        this.isFollowed = isFollowed
        this.followings = Followings
        this.followers = Followers
        this.favoritedRestaurants = FavoritedRestaurants
        // 將重複留言的餐廳進行篩選，使其合併代表同一間餐廳
        const commentSet = new Set()
        this.comments = Comments.filter(comment => !commentSet.has(comment.RestaurantId) ? commentSet.add(comment.RestaurantId) : false)
        this.isLoading = false
      } catch (error) {
        console.error(error.message)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  }
}
</script>