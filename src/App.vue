<script lang="ts">
import { defineComponent } from "vue";
import { useQueryProvider } from "vue-query";
import { useContext } from "vite-ssr/vue";
import { VueQueryDevTools } from "vue-query/devtools";

export default defineComponent({
  name: "App",
  components: { VueQueryDevTools },
  setup() {
    const { initialState } = useContext();
    useQueryProvider(initialState.vueQuery);
  },
});
</script>

<template>
  <h1>vue-query example</h1>
  <p>Turn on <b>Slow 3G</b> or <b>Offline</b> in dev-tools and hit Refetch</p>

  <RouterView />

  <VueQueryDevTools :initialIsOpen="true" />
</template>

<style>
ul {
  list-style: none;
}
</style>
