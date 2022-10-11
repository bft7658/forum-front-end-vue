<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col" width="300">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{name: 'admin-restaurant', params: {id: restaurant.id}}" class="btn btn-link">
            Show
          </router-link>

          <router-link :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}" class="btn btn-link">
            Edit
          </router-link>

          <button @click.stop.prevent="deleteRestaurant(restaurant.id)" type="button" class="btn btn-link">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const dummyData = {
  "restaurants": [
    {
      "id": 1,
      "name": "Stephanie Kozey",
      "tel": "(300) 390-7270 x3608",
      "address": "50907 Hegmann Street",
      "opening_hours": "08:00",
      "description": "Quia consequatur fugiat beatae velit ipsum est perferendis nostrum libero. Nobis sit aspernatur repellendus modi ea.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=68.27400712675275",
      "viewCounts": 2,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-07T11:22:23.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 2,
      "name": "Dora Schiller",
      "tel": "345-969-0688",
      "address": "2332 Fabian Bridge",
      "opening_hours": "08:00",
      "description": "non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.683018430167383",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 3,
      "name": "Samanta Pacocha",
      "tel": "610.159.0524 x5266",
      "address": "208 Jovanny Stream",
      "opening_hours": "08:00",
      "description": "architecto adipisci non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.86650834601485",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 4,
      "name": "Misty Heaney",
      "tel": "(610) 490-2605 x3910",
      "address": "419 Cortez Roads",
      "opening_hours": "08:00",
      "description": "Ea animi voluptas et dolor. Repudiandae ut sit doloremque. Repellat tempora similique. Harum accusantium rerum qui placeat nihil necessitatibus eius.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.23126625430645",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 5,
      "name": "Nicola Prohaska",
      "tel": "074.166.9392",
      "address": "903 Nettie Skyway",
      "opening_hours": "08:00",
      "description": "maxime quia et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.40040828699378",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 6,
      "name": "Mertie Douglas",
      "tel": "139-689-2066",
      "address": "996 Wehner Rue",
      "opening_hours": "08:00",
      "description": "Blanditiis voluptatem autem voluptate. Quia in vel ipsam dolores consequatur assumenda. Nesciunt atque beatae ducimus dicta est quam facere. Dolorem nesciunt dolores qui incidunt deleniti corporis perspiciatis. Laborum cumque in a facilis non cumque fuga molestiae. Qui velit est.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=48.79311929030254",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 7,
      "name": "Dominic Daugherty",
      "tel": "(338) 528-6343 x56978",
      "address": "69828 Kreiger Row",
      "opening_hours": "08:00",
      "description": "temporibus",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.868275365141033",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 8,
      "name": "Adrienne Gusikowski",
      "tel": "1-325-179-0990 x7366",
      "address": "603 Irving Circle",
      "opening_hours": "08:00",
      "description": "Vero et qui consequatur minus.\nPerspiciatis officia ducimus incidunt ut consectetur aspernatur deserunt.\nQuidem iure neque animi sit corporis temporibus et voluptatem.\nVel provident aliquid perspiciatis adipisci accusamus et.\nAut qui et quod et magni est aut est delectus.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.21984595278269",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 9,
      "name": "Emmet Leffler",
      "tel": "057.574.6079",
      "address": "042 Wilderman Freeway",
      "opening_hours": "08:00",
      "description": "rerum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.471674534542565",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 10,
      "name": "Carmela Hegmann",
      "tel": "263-265-3638 x4844",
      "address": "03854 Lowe Fork",
      "opening_hours": "08:00",
      "description": "Optio consequatur earum.\nLibero sint dolores cum.\nVoluptatibus qui dolor qui natus.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=79.6729220129798",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 11,
      "name": "Stan Mayer",
      "tel": "575.535.2847",
      "address": "41187 Jaylan Trail",
      "opening_hours": "08:00",
      "description": "corrupti possimus omnis",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=95.05358776338832",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 12,
      "name": "Amira Lesch",
      "tel": "(991) 081-9761 x737",
      "address": "39136 Macejkovic Centers",
      "opening_hours": "08:00",
      "description": "Qui pariatur vel est et id ullam non omnis ut.\nNatus praesentium quo perferendis qui.\nConsectetur architecto sit sit qui.\nNeque animi harum sint recusandae numquam dicta ullam exercitationem.\nOmnis deserunt debitis dolores.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=27.23668393595826",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 13,
      "name": "Marianne Torp",
      "tel": "1-800-198-3421 x9120",
      "address": "09866 Jonathon Brooks",
      "opening_hours": "08:00",
      "description": "quidem adipisci tempore",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=84.20066630903958",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 14,
      "name": "Keon Fadel",
      "tel": "855.188.1221",
      "address": "87060 Heller Springs",
      "opening_hours": "08:00",
      "description": "Dolorem eum deleniti.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=97.41571594674741",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 15,
      "name": "Jayne Murazik",
      "tel": "838-599-4720",
      "address": "3511 Hudson Mountain",
      "opening_hours": "08:00",
      "description": "neque nulla non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=87.17283096616856",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 16,
      "name": "Sean Koch",
      "tel": "995-144-7787 x40135",
      "address": "33841 Cole Garden",
      "opening_hours": "08:00",
      "description": "Et voluptatibus quaerat eius incidunt ex.\nNecessitatibus modi architecto occaecati eos pariatur.\nEligendi et dolorum autem quam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=39.722839227799575",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 17,
      "name": "Jarrod O'Kon",
      "tel": "644-693-6643 x763",
      "address": "67631 Emil Mill",
      "opening_hours": "08:00",
      "description": "Eos ut labore sapiente non laborum minima labore aut.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=84.1289136186425",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 18,
      "name": "Ms. Ezekiel Ortiz",
      "tel": "1-826-248-7658 x7379",
      "address": "6392 Kris Drives",
      "opening_hours": "08:00",
      "description": "Nihil quisquam numquam voluptates molestiae ut. Dignissimos magnam natus. Quae quo aut sed et occaecati quis. Minus vero natus dolorem laborum. Totam fugiat amet porro corrupti repellendus dolor cum omnis asperiores.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=49.328291019210056",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 19,
      "name": "Alfonso West I",
      "tel": "1-924-709-2394 x24082",
      "address": "539 Lois Pine",
      "opening_hours": "08:00",
      "description": "est iste cupiditate",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=23.878818307609983",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 20,
      "name": "Skye Wuckert",
      "tel": "1-667-380-6694 x630",
      "address": "650 Luettgen Well",
      "opening_hours": "08:00",
      "description": "Optio ut corrupti veniam ut ut quia dicta corrupti ea.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=71.27859147016618",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 21,
      "name": "Jasper Considine",
      "tel": "881-753-4424 x562",
      "address": "447 Luella Walk",
      "opening_hours": "08:00",
      "description": "eligendi fugit totam",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=96.98372977483129",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 22,
      "name": "Darrin Eichmann",
      "tel": "1-324-045-2425",
      "address": "39390 Block Grove",
      "opening_hours": "08:00",
      "description": "At repellat vel amet eum. Velit quo dolore dolor in facilis beatae. Adipisci aut incidunt eos. Sed nobis illo. Culpa voluptatem iure iusto. Qui eum et repellendus.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=8.611903468074079",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 23,
      "name": "Adelbert Beahan",
      "tel": "801.121.6125",
      "address": "42401 Harvey Roads",
      "opening_hours": "08:00",
      "description": "Quia nesciunt enim ea. Dolor excepturi voluptatem alias.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.314231046249894",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 24,
      "name": "Imani Murazik II",
      "tel": "900.886.0925",
      "address": "8747 Carlee Port",
      "opening_hours": "08:00",
      "description": "Maxime eum esse consequatur eaque rerum non et excepturi necessitatibus. Aut quam at occaecati ab dolor. Dolores delectus amet. Dolores nulla et unde porro.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=44.36547036005041",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 25,
      "name": "Timothy Hilpert",
      "tel": "979.082.7044 x353",
      "address": "2901 Oswald Mountain",
      "opening_hours": "08:00",
      "description": "Aliquam dignissimos quis corporis distinctio mollitia doloribus. Voluptatum libero cupiditate illo ut dolor cupiditate accusantium. Omnis totam rerum iure earum ea beatae aut sint dolor.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=92.20071599954184",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 26,
      "name": "Cathrine Borer",
      "tel": "050-514-4667 x88352",
      "address": "79717 Klocko Rapid",
      "opening_hours": "08:00",
      "description": "Excepturi cupiditate vitae.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.691183619819334",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 27,
      "name": "Rickie Bechtelar",
      "tel": "999-103-3955 x980",
      "address": "90366 Cleora Villages",
      "opening_hours": "08:00",
      "description": "Et in voluptatem autem et nobis architecto. Voluptatum esse sit temporibus asperiores quae iusto. Error adipisci minus ut. Illo cumque quod consequatur quos maiores accusantium voluptas. Maxime rerum debitis impedit. Dolorem quod minus illo.\n \rEt deserunt atque repellat repellat quia. Ratione accusamus voluptatem id at. Quae dolor facilis. Labore qui atque adipisci asperiores aut qui perferendis. Quaerat ut illo et rerum id quo accusantium dolores. Voluptates et at provident.\n \rNecessitatibus necessitatibus et minus vel autem explicabo. Ut ab nam qui necessitatibus asperiores eaque veritatis rem assumenda. Dolor voluptas quas veniam rem sint. Pariatur et sit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=68.1005016468004",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 28,
      "name": "Jimmie Stroman",
      "tel": "(556) 665-7736",
      "address": "3087 Christian Points",
      "opening_hours": "08:00",
      "description": "Rerum aut quam repellat distinctio sint. Ea et fuga quae molestiae ea iste nam est impedit. Doloremque dolorum temporibus itaque.\n \rAt repellendus nobis itaque maiores eos debitis ea ab velit. Dolorum molestiae praesentium. Quasi mollitia et nam ratione ea mollitia. Consequatur expedita nam voluptatibus a non.\n \rHarum qui illo. Et quam laboriosam quo corporis cumque nisi beatae harum. Soluta vel dignissimos ut aspernatur modi ab dolor. Et non accusantium fugiat et aspernatur optio omnis unde. Sit quod unde. Ut laborum est maxime.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=62.106145587925596",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 29,
      "name": "Dr. Tyshawn Marvin",
      "tel": "(886) 908-8410",
      "address": "80884 McKenzie Haven",
      "opening_hours": "08:00",
      "description": "Doloribus a rerum tempore repellat vel nam magnam sunt sint.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=66.01663516041403",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 30,
      "name": "Brent Lynch",
      "tel": "977.654.5797 x76410",
      "address": "576 Hudson Flat",
      "opening_hours": "08:00",
      "description": "optio",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=1.4634556866713222",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 31,
      "name": "Eugene Crona",
      "tel": "573-385-4379",
      "address": "13843 Carson Mountain",
      "opening_hours": "08:00",
      "description": "Perspiciatis doloremque qui culpa ea error nihil eius soluta amet. Quidem laboriosam ipsam repellendus voluptas optio et illo nesciunt. Provident mollitia error. Possimus impedit nihil. Ab consequuntur assumenda praesentium. Voluptas aliquam omnis veniam iure.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=41.428626603549226",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 32,
      "name": "Lucy Oberbrunner",
      "tel": "530-353-9130 x78194",
      "address": "280 Brain Track",
      "opening_hours": "08:00",
      "description": "Perferendis eveniet similique non necessitatibus suscipit magni voluptatem iure consequatur. Error aut unde incidunt quod. Porro quo mollitia dolores aliquam doloribus architecto excepturi odit porro. Officia quia et facere sit asperiores magnam ut. Consequuntur mollitia ea.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=29.61242229916008",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 33,
      "name": "Marc Dietrich",
      "tel": "713-369-0462",
      "address": "4307 Barton Dale",
      "opening_hours": "08:00",
      "description": "In et dolorem at dolores fugit dolor. Id nesciunt quia vel qui ducimus deleniti iste voluptates. Labore id quia quisquam aut nihil totam et. Reprehenderit quia ea quam. Ipsa aliquid cum omnis dolorum.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=41.44838273803304",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 34,
      "name": "Maegan Dickens",
      "tel": "1-434-684-1810",
      "address": "87654 Annamae Fall",
      "opening_hours": "08:00",
      "description": "et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=31.36456746718661",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 35,
      "name": "Charles Macejkovic",
      "tel": "(801) 008-9480",
      "address": "9531 Adaline Plain",
      "opening_hours": "08:00",
      "description": "Fugiat sint neque quo.\nOdit hic odio inventore et est.\nDolorum ut dolorem quia dolorem et.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=20.78456088017586",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 36,
      "name": "Grady Runte",
      "tel": "103-042-3399",
      "address": "378 Nayeli Underpass",
      "opening_hours": "08:00",
      "description": "Tempora incidunt sit eveniet voluptas totam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.38815291108247",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 37,
      "name": "Wayne Greenfelder",
      "tel": "347-871-6392",
      "address": "197 Bednar Point",
      "opening_hours": "08:00",
      "description": "similique tempore nisi",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.317501613661955",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 38,
      "name": "Lourdes Schaden",
      "tel": "884.214.1979",
      "address": "2287 Weber Course",
      "opening_hours": "08:00",
      "description": "Illum quidem rerum amet. Esse dolorem facere eaque.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.041176844620332",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 39,
      "name": "Marlin Mitchell",
      "tel": "1-058-667-9840",
      "address": "72913 Willa Camp",
      "opening_hours": "08:00",
      "description": "At ab sapiente omnis doloribus error sint quo occaecati sit. Alias repudiandae quos adipisci doloremque.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=83.33723182645372",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 40,
      "name": "Earlene Purdy",
      "tel": "1-655-852-2223",
      "address": "4702 Ena Forks",
      "opening_hours": "08:00",
      "description": "voluptatem",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.96458268323028",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 41,
      "name": "Jacquelyn Erdman",
      "tel": "084.030.4654 x106",
      "address": "1994 Frami Coves",
      "opening_hours": "08:00",
      "description": "Ducimus et nesciunt odit et ea ipsam. Ipsam dolor ullam sed quis molestiae. Omnis sit consequatur sint consequuntur voluptatum reprehenderit autem qui. Quo consequatur consequuntur ad necessitatibus hic alias et odit ut.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=70.03230742918443",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 42,
      "name": "Effie Schulist",
      "tel": "365.967.5470 x99557",
      "address": "86826 Nicklaus Mill",
      "opening_hours": "08:00",
      "description": "nam",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.911506276599999",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 43,
      "name": "Devonte Dare",
      "tel": "987.233.2804",
      "address": "598 Fernando Pines",
      "opening_hours": "08:00",
      "description": "Qui omnis perferendis quia facilis id qui impedit.\nSunt voluptatem quo.\nDeleniti illum delectus omnis minima ut consequatur dolorum magni.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=67.82288872001814",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 44,
      "name": "Will Muller",
      "tel": "480.110.5178 x32409",
      "address": "03017 Nikolaus Route",
      "opening_hours": "08:00",
      "description": "Omnis ut qui velit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=2.620605135561105",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 45,
      "name": "Miss Reginald Yundt",
      "tel": "1-855-566-2990",
      "address": "7071 Nathanial Ford",
      "opening_hours": "08:00",
      "description": "Recusandae nemo iusto quia illo iste sequi. Delectus atque necessitatibus est a dolor iusto. Non vero porro eum fugiat officiis laudantium unde sapiente amet.\n \rUt voluptatum aut delectus. Est est aut est corrupti. Et voluptate ea dolor saepe suscipit atque perferendis vel. Soluta at autem architecto odit.\n \rAtque earum adipisci. Debitis hic facere sunt. Officiis commodi est distinctio odio est. Enim ex sequi consequuntur omnis asperiores aut qui voluptatibus sed. Perspiciatis culpa dicta molestias voluptatum.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.501847005768499",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 46,
      "name": "Mr. Rudy Rogahn",
      "tel": "535.195.0430 x847",
      "address": "7057 Gutkowski Walk",
      "opening_hours": "08:00",
      "description": "Consectetur est expedita aut repudiandae ea autem tenetur officia ea. Ut molestias fuga mollitia eos exercitationem inventore ut a. Quod et aliquam. Nam non quo amet. Id ducimus sequi non soluta non odio. Ex labore nihil.\n \rVoluptas in deleniti aliquam non. Consequatur ipsa dolorem voluptatibus. Et ut molestias quasi aut consectetur asperiores. Sit est veritatis quia cum quibusdam expedita.\n \rVoluptates mollitia voluptate sed quam sed. Aut similique omnis delectus eos. Porro recusandae voluptas explicabo vero voluptatem non. Autem quibusdam labore ab.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=16.414091915676888",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 47,
      "name": "Clifford Rippin",
      "tel": "227-281-0268",
      "address": "78029 Lauriane Plains",
      "opening_hours": "08:00",
      "description": "voluptatibus inventore nobis",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=35.97639913313817",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 48,
      "name": "Thea Collins",
      "tel": "202-810-5572 x946",
      "address": "025 Romaguera Circle",
      "opening_hours": "08:00",
      "description": "veniam nihil et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.35230402018017",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 49,
      "name": "Roman Boehm",
      "tel": "1-363-690-7930 x753",
      "address": "33793 Louvenia Falls",
      "opening_hours": "08:00",
      "description": "Aut enim voluptatem. Natus qui sapiente ut dignissimos velit numquam. Quae dignissimos placeat non non animi voluptate aliquam ipsum est.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=57.84984819242567",
      "viewCounts": 0,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-04T13:09:52.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    },
    {
      "id": 50,
      "name": "Levi Hoppe",
      "tel": "1-245-532-1617 x98835",
      "address": "826 Hegmann Divide",
      "opening_hours": "08:00",
      "description": "Asperiores eaque asperiores sit voluptatem. Officia saepe quidem consequuntur enim hic nesciunt mollitia sint magnam. Consequatur ut eos tenetur dolore voluptatem. Assumenda voluptatem aut recusandae dolor.\n \rEos ut optio et. Et quisquam magni ipsa veniam ut. Repudiandae eveniet mollitia iure. Nisi blanditiis repellat fuga exercitationem ut. Quidem alias aliquid recusandae neque cupiditate consequatur consequatur perspiciatis accusantium.\n \rRepudiandae voluptas aut error omnis eveniet aliquid eligendi dolor. Sequi accusantium quo culpa. Velit in vel totam voluptatibus et placeat. Adipisci nobis tempora voluptas ipsam. Et dolor et nam et temporibus et dolore aperiam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=31.773755986887785",
      "viewCounts": 2,
      "createdAt": "2022-10-04T13:09:52.000Z",
      "updatedAt": "2022-10-07T07:14:05.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-10-04T13:09:52.000Z",
        "updatedAt": "2022-10-04T13:09:52.000Z"
      }
    }
  ]
}

export default {
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants
    },
    deleteRestaurant(restaurantId) {
      console.log(restaurantId)
      this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
    }
  }
}
</script>