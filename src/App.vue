<template>
    <div id="app">
        <component :is="component[layout]"></component>
    </div>
</template>

<script setup>
import BasicLayout from "./layouts/BasicLayout.vue";
import UserLayout from "./layouts/UserLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue"
const route = useRoute()
const layout = computed(() => route.meta.layout)
const component = {
    BasicLayout,
    UserLayout
}
</script>
<style scoped>

</style>
