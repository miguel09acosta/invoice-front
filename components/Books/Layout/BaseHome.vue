<template>
    <div>
        <div x-data="{ cartOpen: false , isOpen: false }" class="bg-white">
            <Header></Header>
            <slot></slot>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Footer from "./Components/Footer";
import Header from "./Components/Header";
export default {
    components: {Header, Footer},
    props: ['books'],
    data() {
        return {
            footer: 'El pepe',
        }
    },
}
</script>
