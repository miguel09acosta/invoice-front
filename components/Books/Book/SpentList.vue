<template>
  <div>
    <p class="w-full animate-pulse mb-8 px-2 font-medium py-1 bg-indigo-200 text-lg rounded-md text-indigo-500">Clic en cualquiera para editar</p>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 mt-6">
      <div>
        <button v-for="spend in booksSpends" @click="showFormMethod(spend.id)" class="m-2 capitalize text-gray-600 focus:outline-none sm:my-2 sm:mx-2">
          <span class="mr-2 p-1 bg-red-400 text-sm rounded-md text-white">♦ agotado</span>
          {{`${spend.tittle}`}} <span class="mr-1 font-bold text-md px-1 rounded-md text-indigo-400">De</span>{{`${spend.author}`}}
        </button>
      </div>
      <div v-if="showForm">

      </div>
      <!--<pre class="mt-8 p-2 bg-gray-200 whitespace-pre text-sm">{{ booksSpends }}</pre>-->
    </div>
  </div>
</template>

<script>
import * as BooksApi from "@/utils/booksApi";


export default {
  name: "SpentList",
  components: {},
  data() {
    return {
      showForm : false,
      idBook: null,
      booksSpends: {}
    }
  },

  async mounted() {
    const params = {
      'exhausted': 1,
    }
    const response2 = await BooksApi.index(params)
    this.booksSpends = response2.data.records

  },
  methods: {
    showFormMethod(idbook){
      this.idBook = idbook
      this.showForm = !(this.showForm)
    },
  }
}
</script>
