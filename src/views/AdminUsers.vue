<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{user.email}}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button
              type="button"
              class="btn btn-link"
              v-if="currentUser.id !== user.id"
              :disabled="isProcessing"
              @click.stop.prevent="toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })"
            >
              {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AdminNav from './../components/AdminNav'
import Spinner from './../components/Spinner'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNav,
    Spinner
  },
  data() {
    return {
      users: [],
      isProcessing: false,
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true
        const { data } = await adminAPI.users.get()
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = data.users
        this.isLoading = false
      } catch (error) {
        console.error(error.message)
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '??????????????????????????????????????????'
        })
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        this.isProcessing = true
        const { data } =await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString()
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if(user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin
            }
          }
          return user
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '??????????????????????????????????????????'
        })
      }
    }
  }
}
</script>