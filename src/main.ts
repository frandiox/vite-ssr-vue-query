import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr/vue";
import { QueryClient, hydrate, dehydrate, VUE_QUERY_CLIENT } from "vue-query";

export default viteSSR(App, { routes }, ({ app, initialState }) => {
  // Create a new VueQuery client inside the main hook (once per request)
  const client = new QueryClient();

  // Sync initialState with the client cache:
  if (import.meta.env.SSR) {
    // This is a placeholder that will return the VueQuery state during SSR.
    // See how JSON.stringify works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
    initialState.vueQueryState = { toJSON: () => dehydrate(client) };
  } else {
    hydrate(client, initialState.vueQueryState);
  }

  client.mount();
  app.provide(VUE_QUERY_CLIENT, client);
});
