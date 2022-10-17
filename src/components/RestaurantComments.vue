<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button v-if="currentUser.isAdmin" @click.stop.prevent="handleDeleteButtonClick(comment.id)" type="button" class="btn btn-danger float-right" :disabled="isProcessing">
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
            {{comment.User.name}}
          </router-link>
        </h3>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">
          {{comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { mapState } from 'vuex'
import commentsAPI from './../apis/comments'
import { Toast } from './../utils/helpers'
import Swal from 'sweetalert2'

export default {
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true
    } 
  },
  data() {
    return {
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async handleDeleteButtonClick (commentId) {
      try {
        this.isProcessing = true
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        if (result.value) {
           // TODO: 請求 API 伺服器刪除 id 為 commentId 的評論
        const { data } = await commentsAPI.delete({ commentId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
        this.$emit('after-delete-comment', commentId)
          
          Swal.fire(
            'Deleted!',
            '移除評論成功',
            'success'
          )
        }
        this.isProcessing = false
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法移除評論，請稍後再試'
        })
      }
    }
  }
}
</script>