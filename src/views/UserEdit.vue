<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="user.name" type="text" name="name" class="form-control" placeholder="Enter Name" required>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img v-if="user.image" :src="user.image" class="d-block img-thumbnail mb-3" width="200" height="200">

        <input id="image" type="file" name="image" accept="image/*" class="form-control-file"
          @change="handleFileChange">
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? '資料更新中...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      user: {
        id: -1,
        image: '',
        name: '',
        email: ''
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser (user) {
      if (user.id === -1) return
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
  created() {
    if (this.currentUser.id === -1) return
    const { id } = this.$route.params
    this.setUser(id)
  },
  beforeRouteUpdate (to, from, next) {
    if (this.currentUser.id === -1) return
    const { id } = to.params
    this.setUser(id)
    next()
  },
  methods: {
    setUser (userId) {
      const { id, image, name, email } = this.currentUser
      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: 'not-found' })
        return
      }

      this.user = {
        ...this.user,
        id,
        name,
        email,
        image
      }
    },
    handleFileChange(e) {
      const { files } = e.target
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this.user.image = imageURL
    },
    async handleSubmit(e) {
      try {
        if (!this.user.name) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫姓名'
          })
          return
        }

        const form = e.target
        const formData = new FormData(form)
        this.isProcessing = true
        // TODO: 透過 API 向伺服器更新使用者
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData
        })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.$router.push({ name: 'user', params: { id: this.user.id } })
        Toast.fire({
          icon: 'success',
          title: '更新使用者資料成功'
        })
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }
}
</script>