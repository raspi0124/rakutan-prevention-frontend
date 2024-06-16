<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { useApi } from "@/composables/useApi";

  const { createAccount } = useApi();

  onMounted(async () => {
    const $route = useRoute();
    // if the url has query params "error" and "error_description", then stop the login process, and show the error
    console.log($route.fullPath);
    // The url comes like /login#error=access_denied&error_description=Service not found%3A https%3A%2F%2Frp-api.raspi0124.dev%2F&state=xSxPYRVD3L
    if ($route.fullPath.includes("#error")) {
      const error = $route.query.error as string;
      const error_description = $route.query.error_description as string;
      console.error("Error:", error, error_description);
      return;
    }
    const $auth = useAuth();

    if ($auth.user) {
      console.log("User is logged in");
      $router.push("/");
    }
    console.log("mounted");
    $auth.loginWith("auth0");
  });
</script>

<template>
  <div>ログイン処理中...</div>
</template>

<style scoped></style>
