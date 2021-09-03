<script lang="ts">
import { defineComponent } from "vue";
import { useIsoQuery } from "./use-iso-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todoFetcher = async (): Promise<Todo[]> =>
  await fetch("https://jsonplaceholder.cypress.io/todos").then((response) =>
    response.json()
  );

export default defineComponent({
  name: "Content",
  setup() {
    const {
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useIsoQuery("todos", todoFetcher);

    return { isLoading, isError, isFetching, data, error, refetch };
  },
});
</script>

<template>
  <div>
    <button @click="refetch" :disabled="isFetching">
      {{ isFetching ? "Refetching..." : "Refetch" }}
    </button>
    <h2>TODO list</h2>
    <div v-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <ul>
        <li v-for="item in data" :key="item.id">
          {{ item.completed ? "🗹" : "☐" }} {{ item.title }}
        </li>
      </ul>
    </div>
    <div v-else>Nothing to see here...</div>
  </div>
</template>
