<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">
        最新動態
      </h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>  
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import NewestRestaurants from './../components/NewestRestaurants'
import NewestComments from './../components/NewestComments'
import Spinner from './../components/Spinner'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

// const dummyData = {
//   "restaurants": [
//     {
//       "id": 1,
//       "name": "Stephanie Kozey",
//       "tel": "(300) 390-7270 x3608",
//       "address": "50907 Hegmann Street",
//       "opening_hours": "08:00",
//       "description": "Quia consequatur fugiat beatae velit ipsum est perferendis nostrum libero. Nobis sit aspernatur repellendus modi ea.",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=68.27400712675275",
//       "viewCounts": 1,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:12:58.000Z",
//       "CategoryId": 1,
//       "Category": {
//         "id": 1,
//         "name": "中式料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 2,
//       "name": "Dora Schiller",
//       "tel": "345-969-0688",
//       "address": "2332 Fabian Bridge",
//       "opening_hours": "08:00",
//       "description": "non",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.683018430167383",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 2,
//       "Category": {
//         "id": 2,
//         "name": "日本料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 3,
//       "name": "Samanta Pacocha",
//       "tel": "610.159.0524 x5266",
//       "address": "208 Jovanny Stream",
//       "opening_hours": "08:00",
//       "description": "architecto adipisci non",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.86650834601485",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 1,
//       "Category": {
//         "id": 1,
//         "name": "中式料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 4,
//       "name": "Misty Heaney",
//       "tel": "(610) 490-2605 x3910",
//       "address": "419 Cortez Roads",
//       "opening_hours": "08:00",
//       "description": "Ea animi voluptas et dolor. Repudiandae ut sit doloremque. Repellat tempora similique. Harum accusantium rerum qui placeat nihil necessitatibus eius.",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.23126625430645",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 2,
//       "Category": {
//         "id": 2,
//         "name": "日本料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 5,
//       "name": "Nicola Prohaska",
//       "tel": "074.166.9392",
//       "address": "903 Nettie Skyway",
//       "opening_hours": "08:00",
//       "description": "maxime quia et",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.40040828699378",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 4,
//       "Category": {
//         "id": 4,
//         "name": "墨西哥料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 6,
//       "name": "Mertie Douglas",
//       "tel": "139-689-2066",
//       "address": "996 Wehner Rue",
//       "opening_hours": "08:00",
//       "description": "Blanditiis voluptatem autem voluptate. Quia in vel ipsam dolores consequatur assumenda. Nesciunt atque beatae ducimus dicta est quam facere. Dolorem nesciunt dolores qui incidunt deleniti corporis perspiciatis. Laborum cumque in a facilis non cumque fuga molestiae. Qui velit est.",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=48.79311929030254",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 3,
//       "Category": {
//         "id": 3,
//         "name": "義大利料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 7,
//       "name": "Dominic Daugherty",
//       "tel": "(338) 528-6343 x56978",
//       "address": "69828 Kreiger Row",
//       "opening_hours": "08:00",
//       "description": "temporibus",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.868275365141033",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 5,
//       "Category": {
//         "id": 5,
//         "name": "素食料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 8,
//       "name": "Adrienne Gusikowski",
//       "tel": "1-325-179-0990 x7366",
//       "address": "603 Irving Circle",
//       "opening_hours": "08:00",
//       "description": "Vero et qui consequatur minus.\nPerspiciatis officia ducimus incidunt ut consectetur aspernatur deserunt.\nQuidem iure neque animi sit corporis temporibus et voluptatem.\nVel provident aliquid perspiciatis adipisci accusamus et.\nAut qui et quod et magni est aut est delectus.",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.21984595278269",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 2,
//       "Category": {
//         "id": 2,
//         "name": "日本料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 9,
//       "name": "Emmet Leffler",
//       "tel": "057.574.6079",
//       "address": "042 Wilderman Freeway",
//       "opening_hours": "08:00",
//       "description": "rerum",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.471674534542565",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 4,
//       "Category": {
//         "id": 4,
//         "name": "墨西哥料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     },
//     {
//       "id": 10,
//       "name": "Carmela Hegmann",
//       "tel": "263-265-3638 x4844",
//       "address": "03854 Lowe Fork",
//       "opening_hours": "08:00",
//       "description": "Optio consequatur earum.\nLibero sint dolores cum.\nVoluptatibus qui dolor qui natus.",
//       "image": "https://loremflickr.com/320/240/restaurant,food/?random=79.6729220129798",
//       "viewCounts": 0,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "CategoryId": 5,
//       "Category": {
//         "id": 5,
//         "name": "素食料理",
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       }
//     }
//   ],
//   "comments": [
//     {
//       "id": 11,
//       "text": "Rem quos cum dolor nemo.",
//       "UserId": 1,
//       "RestaurantId": 11,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 11,
//         "name": "Stan Mayer",
//         "tel": "575.535.2847",
//         "address": "41187 Jaylan Trail",
//         "opening_hours": "08:00",
//         "description": "corrupti possimus omnis",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=95.05358776338832",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 1
//       }
//     },
//     {
//       "id": 32,
//       "text": "Totam tempora dolores consequatur nesciunt commodi.",
//       "UserId": 1,
//       "RestaurantId": 32,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 32,
//         "name": "Lucy Oberbrunner",
//         "tel": "530-353-9130 x78194",
//         "address": "280 Brain Track",
//         "opening_hours": "08:00",
//         "description": "Perferendis eveniet similique non necessitatibus suscipit magni voluptatem iure consequatur. Error aut unde incidunt quod. Porro quo mollitia dolores aliquam doloribus architecto excepturi odit porro. Officia quia et facere sit asperiores magnam ut. Consequuntur mollitia ea.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=29.61242229916008",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 1
//       }
//     },
//     {
//       "id": 48,
//       "text": "Ipsum quam qui nihil.",
//       "UserId": 1,
//       "RestaurantId": 48,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 48,
//         "name": "Thea Collins",
//         "tel": "202-810-5572 x946",
//         "address": "025 Romaguera Circle",
//         "opening_hours": "08:00",
//         "description": "veniam nihil et",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.35230402018017",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 2
//       }
//     },
//     {
//       "id": 71,
//       "text": "Repudiandae consequatur est asperiores voluptas sint.",
//       "UserId": 1,
//       "RestaurantId": 21,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 21,
//         "name": "Jasper Considine",
//         "tel": "881-753-4424 x562",
//         "address": "447 Luella Walk",
//         "opening_hours": "08:00",
//         "description": "eligendi fugit totam",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=96.98372977483129",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 2
//       }
//     },
//     {
//       "id": 95,
//       "text": "Laboriosam temporibus sint illo perferendis est voluptate hic unde suscipit.",
//       "UserId": 1,
//       "RestaurantId": 45,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 45,
//         "name": "Miss Reginald Yundt",
//         "tel": "1-855-566-2990",
//         "address": "7071 Nathanial Ford",
//         "opening_hours": "08:00",
//         "description": "Recusandae nemo iusto quia illo iste sequi. Delectus atque necessitatibus est a dolor iusto. Non vero porro eum fugiat officiis laudantium unde sapiente amet.\n \rUt voluptatum aut delectus. Est est aut est corrupti. Et voluptate ea dolor saepe suscipit atque perferendis vel. Soluta at autem architecto odit.\n \rAtque earum adipisci. Debitis hic facere sunt. Officiis commodi est distinctio odio est. Enim ex sequi consequuntur omnis asperiores aut qui voluptatibus sed. Perspiciatis culpa dicta molestias voluptatum.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.501847005768499",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 5
//       }
//     },
//     {
//       "id": 112,
//       "text": "Atque similique eveniet sapiente eum atque fuga sit numquam quia.",
//       "UserId": 1,
//       "RestaurantId": 12,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 12,
//         "name": "Amira Lesch",
//         "tel": "(991) 081-9761 x737",
//         "address": "39136 Macejkovic Centers",
//         "opening_hours": "08:00",
//         "description": "Qui pariatur vel est et id ullam non omnis ut.\nNatus praesentium quo perferendis qui.\nConsectetur architecto sit sit qui.\nNeque animi harum sint recusandae numquam dicta ullam exercitationem.\nOmnis deserunt debitis dolores.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=27.23668393595826",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 2
//       }
//     },
//     {
//       "id": 129,
//       "text": "Fugiat quisquam aliquid totam ab.",
//       "UserId": 1,
//       "RestaurantId": 29,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 1,
//         "name": "root",
//         "email": "root@example.com",
//         "password": "$2a$10$Ez4oG5iECaJqMFkWrkU1Ne9sRTEzisIVSYE3/P07fpyNlpEC83sNy",
//         "isAdmin": true,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 29,
//         "name": "Dr. Tyshawn Marvin",
//         "tel": "(886) 908-8410",
//         "address": "80884 McKenzie Haven",
//         "opening_hours": "08:00",
//         "description": "Doloribus a rerum tempore repellat vel nam magnam sunt sint.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=66.01663516041403",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 1
//       }
//     },
//     {
//       "id": 6,
//       "text": "Ducimus dolores rem ut optio eum beatae.",
//       "UserId": 2,
//       "RestaurantId": 6,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 2,
//         "name": "user1",
//         "email": "user1@example.com",
//         "password": "$2a$10$k2KMcDkKZ9S6vCzCXs6uEOZ/lf.Hhd4XjBnAw8aO7CrwlwDdThPy.",
//         "isAdmin": false,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 6,
//         "name": "Mertie Douglas",
//         "tel": "139-689-2066",
//         "address": "996 Wehner Rue",
//         "opening_hours": "08:00",
//         "description": "Blanditiis voluptatem autem voluptate. Quia in vel ipsam dolores consequatur assumenda. Nesciunt atque beatae ducimus dicta est quam facere. Dolorem nesciunt dolores qui incidunt deleniti corporis perspiciatis. Laborum cumque in a facilis non cumque fuga molestiae. Qui velit est.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=48.79311929030254",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 3
//       }
//     },
//     {
//       "id": 25,
//       "text": "Quia beatae magnam.",
//       "UserId": 2,
//       "RestaurantId": 25,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 2,
//         "name": "user1",
//         "email": "user1@example.com",
//         "password": "$2a$10$k2KMcDkKZ9S6vCzCXs6uEOZ/lf.Hhd4XjBnAw8aO7CrwlwDdThPy.",
//         "isAdmin": false,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 25,
//         "name": "Timothy Hilpert",
//         "tel": "979.082.7044 x353",
//         "address": "2901 Oswald Mountain",
//         "opening_hours": "08:00",
//         "description": "Aliquam dignissimos quis corporis distinctio mollitia doloribus. Voluptatum libero cupiditate illo ut dolor cupiditate accusantium. Omnis totam rerum iure earum ea beatae aut sint dolor.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=92.20071599954184",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 1
//       }
//     },
//     {
//       "id": 60,
//       "text": "Et ipsam ut recusandae soluta sapiente nobis dolor consequatur pariatur.",
//       "UserId": 2,
//       "RestaurantId": 10,
//       "createdAt": "2022-10-04T13:09:52.000Z",
//       "updatedAt": "2022-10-04T13:09:52.000Z",
//       "User": {
//         "id": 2,
//         "name": "user1",
//         "email": "user1@example.com",
//         "password": "$2a$10$k2KMcDkKZ9S6vCzCXs6uEOZ/lf.Hhd4XjBnAw8aO7CrwlwDdThPy.",
//         "isAdmin": false,
//         "image": null,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z"
//       },
//       "Restaurant": {
//         "id": 10,
//         "name": "Carmela Hegmann",
//         "tel": "263-265-3638 x4844",
//         "address": "03854 Lowe Fork",
//         "opening_hours": "08:00",
//         "description": "Optio consequatur earum.\nLibero sint dolores cum.\nVoluptatibus qui dolor qui natus.",
//         "image": "https://loremflickr.com/320/240/restaurant,food/?random=79.6729220129798",
//         "viewCounts": 0,
//         "createdAt": "2022-10-04T13:09:52.000Z",
//         "updatedAt": "2022-10-04T13:09:52.000Z",
//         "CategoryId": 5
//       }
//     }
//   ]
// }

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data () {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  created () {
    this.fetchFeeds ()
  },
  methods: {
    async fetchFeeds () {
      try {
        this.isLoading = true
        const { data } = await restaurantsAPI.getFeeds()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { restaurants, comments } = data

        this.restaurants = restaurants
        this.comments = comments.filter(comment => comment.Restaurant && comment.text)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得最新動態，請稍後再試'
        })
      }
    }
  }
}
</script>