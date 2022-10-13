import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 向 API 發出請求
  getRestaurants ({ page, categoryId }) {
    // 攜帶 categoryId, page 參數
    const searchParams = new URLSearchParams({ page, categoryId })
    // HTTP Header 攜帶 token
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getFeeds () {
    return apiHelper.get('/restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top', {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  }
}