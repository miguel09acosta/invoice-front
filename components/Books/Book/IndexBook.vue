<template>
    <base-home>
        <main class="my-8">
            <div class="container mx-auto px-6">
                <transaction></transaction>
            </div>
        </main>
    </base-home>
</template>

<script>
import BaseHome from "../Layout/BaseHome";
import Transaction from "./Transaction";
export default {
    name: 'indexBook',
    components: {Transaction, BaseHome}
}
</script>
