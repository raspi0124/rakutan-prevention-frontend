<template>
  <v-container class="triangle-container" fill-height>
    <div class="triangle-background"></div>
    <div class="content">
      <h1>{{ title }}</h1>
      <p>{{ paragraph }}</p>
    </div>
  </v-container>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .triangle-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 250px;
  }

  .triangle-background {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-right: 500px solid transparent;
    border-left: 500px solid transparent;
    border-top: 250px solid #e5e5e5;
    border-bottom: 0;
    top: 0;
  }

  .content {
    position: relative;

    color: #000; /* Adjust text color if needed */
  }

  h1,
  p {
    margin: 0;
    padding: 0;
  }
</style>
