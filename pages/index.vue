<script setup lang="ts">
  const isLoggedin = ref(false);
  const user = ref(null);

  definePageMeta({
    auth: false,
  });

  onMounted(async () => {
    console.log("mounted");
    const $auth = useAuth();
    const token = $auth.$storage.memory["_token.auth0"];
    console.log(token);
    console.log($auth.user);
    if ($auth.user) {
      isLoggedin.value = true;
      user.value = $auth.user;
    } else {
      isLoggedin.value = false;
    }
  });
</script>

<template>
  <head>
    <meta charset="UTF-8" />
    <title>ホーム | Tsuku-Alert</title>
  </head>

  <body>
    <headerNavi :isLoggedin="isLoggedin" :user="user" />

    <v-main>
      <v-container
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <triangleBanner
          title="Tsuku-Alert"
          paragraph="「Tsuku-Alert」は筑波大生のためのスマート授業通知システムです。授業場所・時間・出席確認を通知します。"
        />

        <v-row class="mt-4" justify="center">
          <!-- First Button -->
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-btn class="btn-1" size="x-large" block href="#"
              >履修登録確認</v-btn
            >
          </v-col>
          <!-- Second Button -->
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-btn class="btn-2" size="x-large" block to="/attendances"
              >出欠席確認</v-btn
            >
          </v-col>
          <!-- Third Button -->
          <v-col cols="12" sm="12" md="6" lg="4">
            <v-btn class="btn-3" size="x-large" block to="/settings"
              >設定</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </body>
</template>

<style scoped>
  .btn-1 {
    bottom: 200px;
    padding: 50px 70px;
    background: #beffb8;
    color: #5e845b;
    font-size: 30px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
  }

  .btn-2 {
    bottom: 200px;
    padding: 50px 70px;
    background: #ffb8c2;
    color: #8e646c;
    font-size: 30px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
  }

  .btn-3 {
    bottom: 200px;
    padding: 50px 70px;
    background: #b8ddff;
    color: #576979;
    font-size: 30px;
    font-weight: bold;
    border-radius: 10px;
    border: none;
  }
  .mt-4 {
    margin-top: 16rem !important;
  }
</style>
