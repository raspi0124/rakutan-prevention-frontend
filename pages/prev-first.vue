<script setup lang="ts">
  definePageMeta({
    auth: false,
  });
</script>
<template>
  <head>
    <meta charset="UTF-8" />
    <title>Tsuku-Alert</title>
    <link rel="stylesheet" href="first-style.css" />
  </head>

  <body>
    <header>
      <h2 class="title">Tsuku-Alert</h2>
      <ul></ul>
    </header>

    <div class="triangle"></div>
    <div class="smart"><img src="/smartphone.png" /></div>
    <center><p class="page-title">Tsuku-Alert</p></center>
    <p align="center" class="explain">
      「Tsuku-Alert」は筑波大生のためのスマート通知システムです。<br />
      授業前に科目名・教室名などを通知し、<br />自身の出欠席状況を管理することができます。
    </p>
    <a class="for-button" href="/login"> 今すぐ始める </a>
  </body>
</template>
