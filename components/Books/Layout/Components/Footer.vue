<template>
    <footer class="bg-gray-200">
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            <a href="#" class="text-xl font-bold text-gray-500 hover:text-gray-400">InvoiceSis</a>
            <p @click="changeFooter" class="py-2 text-gray-500 sm:py-0">{{dateFooter}}</p>
        </div>
    </footer>
</template>

<script>
export default {
    props: ['labelFooter'],
    data() {
        return {
            footer: 'Todos los derechos reservados',
            english: false
        }
    },
    //cuando necesito acciones sobre la data en vez de llamar footer llamo changeFooter que me devuelve un
    //dato proveninete de un calculo
    computed: {
        dateFooter() {
            const date = new Date().getFullYear();
            return this.footer+' '+date;
        }
    },

    methods: {
        changeFooter() {
            this.english = !this.english;
            this.english? this.footer = 'All right reserved'
                : this.footer = 'Todos los derechos reservados'
        }
    },
}
</script>
