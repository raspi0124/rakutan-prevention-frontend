<script setup lang="ts">
  onMounted(() => {
    console.log("mounted");
    const $auth = useAuth();
    console.log($auth.user);
  });
</script>

<template>
  <div>Page: index</div>
</template>

<style scoped></style>
