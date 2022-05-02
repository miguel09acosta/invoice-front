<template>
    <Transition name="fade">
        <div
            v-if="showing"
            class="overflow-y-auto  mt-0 z-40 fixed w-full h-screen flex items-start justify-center bg-gray-500 bg-opacity-75"
            @click.self="close"
        >
            <div class="relative mt-4 w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <button
                    aria-label="close"
                    class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
                    @click.prevent="close"
                >
                    ×
                </button>
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        showing: {
            required: true,
            type: Boolean
        }
    },
    watch: {
        showing(value) {
            if (value) {
                return document.querySelector('body').classList.add('overflow-hidden');
            }

            document.querySelector('body').classList.remove('overflow-hidden');
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
