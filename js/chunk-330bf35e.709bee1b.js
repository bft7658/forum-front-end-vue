(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-330bf35e"],{be6c:function(t,e,a){"use strict";var s=a("2fa3");e["a"]={categories:{get(){return s["b"].get("/admin/categories")},create({name:t}){return s["b"].post("/admin/categories",{name:t})},update({categoryId:t,name:e}){return s["b"].put("/admin/categories/"+t,{name:e})},delete({categoryId:t}){return s["b"].delete("/admin/categories/"+t)}},restaurants:{getDetail({restaurantId:t}){return s["b"].get("/admin/restaurants/"+t)},create({formData:t}){return s["b"].post("/admin/restaurants",t)},get(){return s["b"].get("/admin/restaurants")},delete({restaurantId:t}){return s["b"].delete("/admin/restaurants/"+t)},update({restaurantId:t,formData:e}){return s["b"].put("/admin/restaurants/"+t,e)}},users:{get(){return s["b"].get("/admin/users")},update({userId:t,isAdmin:e}){return s["b"].put("admin/users/"+t,{isAdmin:e})}}}},f91c:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container py-5"},[t.isLoading?e("Spinner"):e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("h1",[t._v(t._s(t.restaurant.name))]),e("span",{staticClass:"badge badge-secondary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),e("div",{staticClass:"col-md-4"},[e("img",{staticClass:"img-responsive center-block",staticStyle:{width:"250px","margin-bottom":"25px"},attrs:{src:t._f("emptyImage")(t.restaurant.image)}}),e("div",{staticClass:"well"},[e("ul",{staticClass:"list-unstyled"},[e("li",[e("strong",[t._v("Opening Hour:")]),t._v(" "+t._s(t.restaurant.openingHours)+" ")]),e("li",[e("strong",[t._v("Tel:")]),t._v(" "+t._s(t.restaurant.tel)+" ")]),e("li",[e("strong",[t._v("Address:")]),t._v(" "+t._s(t.restaurant.address)+" ")])])])]),e("div",{staticClass:"col-md-8"},[e("p",[t._v(t._s(t.restaurant.description))])])]),e("hr"),e("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v("回上一頁")])],1)},r=[],n=(a("d9e2"),a("2375")),i=a("2708"),d=a("be6c"),o=a("2fa3"),u={mixins:[i["a"]],components:{Spinner:n["a"]},data(){return{restaurant:{id:-1,name:"",categoryName:"",image:"",openingHours:"",tel:"",address:"",description:""},isLoading:!0}},beforeRouteUpdate(t,e,a){const{id:s}=t.params;this.fetchRestaurant(s),a()},created(){const{id:t}=this.$route.params;this.fetchRestaurant(t)},methods:{async fetchRestaurant(t){try{this.isLoading=!0;const{data:e}=await d["a"].restaurants.getDetail({restaurantId:t});if("error"===e.status)throw new Error(e.message);const{id:a,name:s,Category:r,image:n,opening_hours:i,tel:o,address:u,description:c}=e.restaurant;this.restaurant={...this.restaurant,id:a,name:s,categoryName:r?r.name:"未分類",image:n,openingHours:i,tel:o,address:u,description:c},this.isLoading=!1}catch(e){this.isLoading=!1,o["a"].fire({icon:"error",title:"無法取得餐廳資料，請稍後再試"})}}}},c=u,m=a("2877"),l=Object(m["a"])(c,s,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-330bf35e.709bee1b.js.map