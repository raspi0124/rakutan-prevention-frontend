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
  <header-navi :isLoggedin="isLoggedin" :user="user" />
  <v-main>
    <triangleBanner title="履修の登録" paragraph="履修の登録を行います。" />
    <v-container>
      <v-row justify="center">
        <v-col class="text-center">
          <v-btn class="for-button" outlined>春A</v-btn>
          <v-btn class="for-button" outlined>春B</v-btn>
          <v-btn class="for-button" outlined>春C</v-btn>
          <v-btn class="for-button" outlined>秋A</v-btn>
          <v-btn class="for-button" outlined>秋B</v-btn>
          <v-btn class="for-button" outlined>秋C</v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col>
          <v-table>
            <thead>
              <tr>
                <th class="color">科目番号</th>
                <th class="color">曜日時限</th>
                <th class="color">科目名</th>
                <th class="color">教室名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GExxxxx</td>
                <td>月56</td>
                <td><a href="">ABC概論</a></td>
                <td>7Axxx</td>
              </tr>
              <tr>
                <td>GExxxxx</td>
                <td>火34</td>
                <td><a href="">DEF演習</a></td>
                <td>7Cxxx</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
  .triangle {
    position: relative;
    width: 0;
    height: 0;
    border-style: solid;
    border-right: 350px solid transparent;
    border-left: 350px solid transparent;
    border-top: 150px solid #e5e5e5;
    border-bottom: 0;
  }

  .for-button {
    margin: 8px 4px;
  }

  .color {
    color: #1b5461;
  }
</style>
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
