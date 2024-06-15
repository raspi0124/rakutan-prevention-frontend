<script setup lang="ts">
  const isLoggedin = ref(false);
  const user = ref(null);

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
    <link rel="stylesheet" href="main-style.css" />
  </head>

  <body>
    <headerNavi :isLoggedin="isLoggedin" :user="user" />

    <v-main>
      <v-container
        class="fill-height d-flex flex-column justify-center align-center text-center"
      >
        <div class="triangle"></div>
        <v-typography class="page-title" variant="h3">Tsuku-Alert</v-typography>
        <v-typography class="exp" variant="body1">
          <span class="bold">「Tsuku-Alert」</span>は筑波大生のための<span
            class="bold"
            >スマート授業通知システム</span
          >です。
        </v-typography>
        <v-typography class="exp" variant="body1">
          <span class="bold">授業場所・時間・出席確認</span>を通知します。
        </v-typography>

        <v-row class="mt-4" justify="center" no-gutters>
          <v-col class="d-flex justify-center" cols="12" sm="auto">
            <v-btn class="btn-1" large href="#">履修登録確認</v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12" sm="auto">
            <v-btn class="btn-2" large href="#">出欠席確認</v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-4" justify="center" no-gutters>
          <v-col class="d-flex justify-center" cols="12" sm="auto">
            <v-btn class="btn-3" large href="#">アラーム設定</v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12" sm="auto">
            <v-btn class="btn-4" large href="#">その他の設定</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </body>
</template>

<style scoped>
  .page-title {
    color: #165b6a;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .exp {
    color: black;
    font-size: 1rem;
    margin-bottom: 10px;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .triangle {
    width: 0;
    height: 0;
    border-right: 30vw solid transparent;
    border-left: 30vw solid transparent;
    border-top: 15vw solid #e5e5e5;
    margin-bottom: 20px;
  }

  .btn-1 {
    background: #beffb8;
    color: #5e845b;
  }

  .btn-2 {
    background: #ffb8c2;
    color: #8e646c;
  }

  .btn-3 {
    background: #fff8b8;
    color: #8e8a61;
  }

  .btn-4 {
    background: #b8ddff;
    color: #576979;
  }

  .bold {
    font-weight: bold;
    color: #165b6a;
  }

  .mt-4 {
    margin-top: 2rem !important;
  }

  @media (max-width: 600px) {
    .page-title {
      font-size: 2rem;
    }
    .exp {
      font-size: 0.875rem;
    }
    .triangle {
      border-right: 45vw solid transparent;
      border-left: 45vw solid transparent;
      border-top: 22.5vw solid #e5e5e5;
    }
  }
</style>
