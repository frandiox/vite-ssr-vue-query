import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr/vue";
import { QueryClient, hydrate, dehydrate } from "vue-query";

export default viteSSR(App, { routes }, ({ app, initialState }) => {
  // Create a new VueQuery client inside the main hook (once per request)
  const client = new QueryClient();
  // Since VueQuery does not support plugin-like installation,
  // we must provide it manually so it can be used later in the app root.
  app.provide("vueQueryClient", client);

  // Sync initialState with the client cache:
  if (import.meta.env.SSR) {
    // This is a placeholder that will return the VueQuery state during SSR.
    // See how JSON.stringify works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
    initialState.vueQueryState = { toJSON: () => dehydrate(client) };
  } else {
    hydrate(client, initialState.vueQueryState);
  }
});
