<template>
  <div class="flex flex-col h-screen justify-between">
    <HeaderLand></HeaderLand>

    <main class="my-8 mb-6 sm:grid sm:gap-4 sm:grid-cols-2">

      <div class="mx-5 md:px-8 w-full">
        <shop-detail v-if="showNow" :shop-info="shopAllInfo"></shop-detail>
      </div>

      <div class="mx-5 w-3/2">
        <pay-form v-if="showNow" :id-buy="shopAllInfo.buy.id"></pay-form>
      </div>
    </main>

    <div class="w-full">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin";
import Footer from "@/components/Books/Layout/Components/Footer";
import HeaderLand from "@/components/Books/Layout/Components/HeaderLand";
import Signin from "@/components/Books/Layout/Signin";
import ShopDetail from "@/components/Books/Book/ShopDetail";
import * as BuysApi from "@/utils/buysApi";
import PayForm from "@/components/Books/Layout/Components/forms/PayForm";
export default {
  name: "payment",
  components: {PayForm, ShopDetail, Signin, HeaderLand, Footer, FormLogin},

  data() {
    return {
      showNow : false,
      shopAllInfo : {olo:'pedo'}
    }
  },

  async mounted() {
    if ($nuxt.$auth.loggedIn){
      const response = await BuysApi.index()
      this.shopAllInfo = response.data
      this.showNow = true
      if (this.shopAllInfo.buy.total == 0){
        alert('Debe seleccionar minimo un producto')
        window.location.replace('/')
      }
    } else {
      alert('Debe logearse y/o seleccionar minimo un producto')
      window.location.replace('/')
    }
  },

  methods: {
  }
}
</script>
