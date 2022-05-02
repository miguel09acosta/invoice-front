<template>
    <header>



      <card-modal key="modalw1" :showing="showModalWelcome" @close="showModalWelcome = false">
          <h1 class="capitalize w-3/4 w-3/4 mt-4 title-font sm:text-1xl text-3xl mb-4 font-medium text-gray-900">{{`Hola ${$nuxt.$auth.user? $nuxt.$auth.user.name:''}`}}</h1>
          <p>
            <br><span class="text-sm px-3 bg-indigo-100 text-gray-800 rounded-full">{{'Actualizamos nuestro contenido! '}}</span>
          </p>
        </card-modal>
        <card-modal key="modal1" :showing="showModal" @close="showModal = false">
            <user-form :new-user="true"></user-form>
        </card-modal>
        <card-modal key="modal2" :showing="showModal2" @close="showModal2 = false">
            
        </card-modal>
        <card-modal key="modal3" :showing="showModal3" @close="showModal3 = false">
            <user-form :new-user="false"></user-form>
        </card-modal>
        <card-modal key="modal4" :showing="showModal4" @close="showModal4 = false">
          <spent-list></spent-list>
        </card-modal>
        <div class="container mx-auto px-6 py-3">
            <div class="flex items-center justify-between">
                <div class="hidden w-full text-gray-600 md:flex md:items-center">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
                    </svg>
                    <span class="mx-1 text-sm">{{ locate }}</span>
                    <div v-if="user.rol == 1 || user.rol == 2">
                        <button @click="showModal3=true" class="underline text-gray-600 focus:outline-none sm:my-2 sm:mx-2">
                            Crear Usuarios
                        </button>
                    </div>
                </div>
                <div class="w-full text-gray-700 md:text-center text-2xl font-semibold">
                    {{titleHome}}
                </div>
                <div class="flex items-center justify-end w-full">
                    <button class="text-gray-600 focus:outline-none sm:mx-2">
                      
                    </button>
                    <div v-if="user">
                        <button @click="showModal=true" class="text-gray-600 focus:outline-none sm:my-2 sm:mx-2">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        <button  @click="logout"><span class="text-gray-600 focus:outline-none sm:mb-1 sm:mx-2 " >Logout</span></button>
                    </div>
                    <div v-else>
                        <a  :href="'login'"><span class="text-gray-600 focus:outline-none sm:mx-3 " >Login</span></a>
                        <a  :href="'register'"><span class="text-gray-600 focus:outline-none sm:mx-3 " >Registrarse</span></a>
                    </div>

                    <div class="flex sm:hidden">
                        <button @click="isOpen = !isOpen" type="button" class="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <nav :class="isOpen ? '' : 'hidden'" class="sm:flex sm:justify-center sm:items-center mt-4">
                <div class="flex flex-col sm:flex-row">
                    <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Home</a>
                    <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Tienda</a>
                    <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Categorias</a>
                    <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Contacto</a>
                    <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Acerca de</a>
                </div>
            </nav>
            <div class="relative mt-6 w-2/3 mx-auto">

            </div>
        </div>
    </header>
</template>

<script>
import * as UserApi from '~/utils/userApi'
import CardModal from "./CardModal"
import UserForm from "./forms/UserForm"
import SpentList from "@/components/Books/Book/SpentList";
import {confApi} from "@/utils/environments";

export default {
    components: {SpentList, UserForm, CardModal},
    props: ['titleHeader'],
    data() {
        return {
            urapi:confApi.URL_SPA,
            cartOpen: false,
            isOpen: false,
            locate: 'CO',
            titleHome: 'InvoiceSis',
            showModal: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            showModalWelcome: false,
            user: {}
        }
    },

    async mounted() {
      this.showModalWelcome = ($nuxt.$auth.loggedIn);
      const response = await UserApi.userget()
      this.user = response.data
    },

    methods: {
        async logout() {
          await $nuxt.$auth.logout('local')
          window.location = '/'
        },
    }
}
</script>
