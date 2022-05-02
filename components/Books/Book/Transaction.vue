<template>
    <div v-if="user">
        <p2 class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">rol: {{ user.rol == 1 ? 'Super Admin' : 'Admin' }}</p2><br>
        facturacion
    </div>
</template>

<script>
import * as UserApi from '~/utils/userApi'
import * as TransactionsApi from "@/utils/transactionsApi";
import SkeletonCard from "@/components/UxElements/SkeletonCard";

export default {
    components: {SkeletonCard},
    props:['shopInfo'],
    name: "Transaction",
    data(){
        return {
            user: false,
            skeletonShow : false,
            tranInfo : []
        }
    },
    async mounted() {
        if($nuxt.$auth.loggedIn){
            const response = await UserApi.userget()
            this.user = response.data
        }
        
        this.getTransactions()
    },
    methods: {
        async getTransactions() {
        this.skeletonShow = true
        const response = await TransactionsApi.index()
        /* this.tranInfo = response.data */
        this.skeletonShow = false
        }
    }
}
</script>

<style scoped>

</style>
