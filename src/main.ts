import App from "./App.vue";
import routes from "./routes";
import viteSSR from "vite-ssr/vue";
import { QueryClient, hydrate, dehydrate } from "vue-query";

export default viteSSR(
  App,
  {
    routes,
    transformState(state, defaultTransformer) {
      if (import.meta.env.SSR) {
        // Dehydrate client cache in server
        state.vueQuery = dehydrate(state.vueQuery);
      }

      return defaultTransformer(state);
    }
  },
  ({ app, initialState }) => {
    // Create VueQuery client
    const client = new QueryClient();
    // Hydrate existing state in browser
    if (!import.meta.env.SSR) hydrate(client, initialState.vueQuery);
    // Save reference to the client
    initialState.vueQuery = client;
  }
);
