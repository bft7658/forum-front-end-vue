<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <a href="#">
          <img :src="user.image ? user.image : 'https://loremflickr.com/320/240/dog'" width="140px" height="140px">
        </a>
        <h2>{{user.name}}</h2>
        <span class="badge badge-secondary">追蹤人數：{{user.FollowerCount}}</span>
        <p class="mt-3">
          <button v-if="user.isFollowed" @click.stop.prevent="deleteFollowed" type="button" class="btn btn-danger">
            取消追蹤
          </button>
          <button v-else @click.stop.prevent="addFollowed" type="button" class="btn btn-primary">
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'

const dummyTopUsers = {
  "users": [
    {
      "id": 1,
      "name": "root",
      "email": "root@example.com",
      "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
      "isAdmin": true,
      "image": null,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 2,
      "name": "user1",
      "email": "user1@example.com",
      "password": "$2a$10$k2KMcDkKZ9S6vCzCXs6uEOZ/lf.Hhd4XjBnAw8aO7CrwlwDdThPy.",
      "isAdmin": false,
      "image": null,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 3,
      "name": "user2",
      "email": "user2@example.com",
      "password": "$2a$10$SKf4G1ILWN.vpjeTKcffMOoop4ZURC1QDkifhAOsYOYSN2XANdh6i",
      "isAdmin": false,
      "image": null,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    }
  ]
}

export default {
  components: {
    NavTabs
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchTopUser()
  },
  methods: {
    fetchTopUser() {
      const { users } = dummyTopUsers
      this.users = users
    },
    addFollowed() {
      this.user = {
        ...this.user,
        isFollowed: true
      }
    },
    deleteFollowed() {
      this.user = {
        ...this.user,
        isFollowed: false
      }
    }
  }
}
</script>