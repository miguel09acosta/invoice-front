<template>
        <index-book></index-book>
</template>

<script>
import IndexBook from "./Book/IndexBook";
export default {
    name: "books",
    components: {IndexBook},
    props: ['auth']
}
</script>
