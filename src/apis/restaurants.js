import { apiHelper } from './../utils/helpers'

export default {
  // 向 API 發出請求
  getRestaurants ({ page, categoryId }) {
    // 攜帶 categoryId, page 參數
    const searchParams = new URLSearchParams({ page, categoryId })
    // HTTP Header 攜帶 token
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getFeeds () {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top')
  }
}