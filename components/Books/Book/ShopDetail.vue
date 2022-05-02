<template>
  <div>
    <div v-if="buyInfo.buy">
      <p class="text-xl">Total: <span class="mr-2 p-1 bg-green-400 text-lg rounded-md text-white"> $ {{buyInfo.buy.total}}</span></p>
      <p class="mt-2 text-xl">Estado <span class="mr-2 p-1 bg-gray-500 text-lg rounded-md text-white"> {{buyInfo.buy.state === 1? 'En proceso' : ''}}</span></p>
    </div>

    <div class="flex items-center mt-6">
      <button :disabled="skeletonShow" class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
        <a :href="`${urapi}/payment`">Comprar Ahora</a>
      </button>
    </div>

    <div class="bg-white">
      <skeleton-card :key="'skeletonSearch3'" v-if="skeletonShow"></skeleton-card>
      <div v-show="!skeletonShow">
        <div v-for="detailShop in buyInfo.detailbuys" class="container my-4 mx-16 px-6 flex items-center">
          <div class="w-1/4">
            <img class="h-full w-full rounded-md object-cover" :src="detailShop.admin_book.path_image" alt="Nike Air">
          </div>
          <div class="mt-5 px-4 ml-8 w-1/2">
            <h3 class="text-gray-700 uppercase text-lg">{{detailShop.admin_book.tittle}}</h3>
            <span class="text-gray-600 mt-3">Autor: {{detailShop.admin_book.author}}<br></span>
            <span class="text-gray-600 mt-3">Número Páginas: {{detailShop.admin_book.pages_number}}<br></span>

            <span class="text-gray-600 mt-3">Editorial: {{detailShop.admin_book.editorial}}<br></span>
            <span class="text-gray-600 mt-3">ISBN: {{detailShop.admin_book.pages_number}}<br><br></span>

            <span class="text-gray-600 mt-3">Valor Unidad: ${{detailShop.admin_book.price}}<br></span>
            <span class="text-gray-600 mt-3">Subtotal: ${{detailShop.subtotal}}</span>
            <hr class="my-3">
            <div class="mt-2">
              <label class="text-gray-700 text-sm">Cantidad:</label>
              <div class="flex items-center mt-1">
                <button :disabled="skeletonShow" @click="addShopCount(detailShop.admin_book.id)" class="text-gray-500 focus:outline-none focus:text-gray-600">
                  <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
                <span class="text-gray-700 text-lg mx-2">{{detailShop.quantity}}</span>
                <button :disabled="skeletonShow" @click="quitShopCount(detailShop.admin_book.id)" class="text-gray-500 focus:outline-none focus:text-gray-600">
                  <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as BooksApi from "@/utils/booksApi";
import * as BuysApi from "@/utils/buysApi";
import SkeletonCard from "@/components/UxElements/SkeletonCard";
import {confApi} from "@/utils/environments";

export default {
  components: {SkeletonCard},
  props:['shopInfo'],
  name: "ShopDetail",
  data(){
    return {
      urapi:confApi.URL_SPA,
      skeletonShow : false,
      buyInfo : this.shopInfo
    }
  },
  methods: {
    async addShopCount(idbook) {
      this.skeletonShow = true
      const response = await BuysApi.create({ data:{id_book:idbook}})
      this.buyInfo = response.data
      this.skeletonShow = false
    },
    async quitShopCount(idbook) {
      this.skeletonShow = true
      const response = await BuysApi.create({ data:{id_book:idbook, delete:true}})
      this.buyInfo = response.data
      this.skeletonShow = false
    }
  }
}
</script>

<style scoped>

</style>
