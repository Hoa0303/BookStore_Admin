<script>
import AppHeader from "@/components/admin/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader v-if="$route.path.includes('/admin')" />
    <div class="container mt-5 d-flex justify-content-center align-items-center">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>