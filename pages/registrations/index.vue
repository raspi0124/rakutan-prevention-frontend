<script setup lang="ts">
  const isLoggedin = ref(false);
  const user = ref(null);
  import { useApi } from "@/composables/useApi";
  const { $toast } = useNuxtApp();
  const { listClasses } = useApi();
  const classes = ref();
  const search = ref("");
  const headers = {};
  const filteredClasses = computed(() => {
    console.log(classes);
    if (!classes.value) return [];
    return classes.value.filter((classItem) =>
      classItem.class_name.toLowerCase().includes(search.value.toLowerCase())
    );
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
    try {
      const response = await listClasses();
      console.log(response);
      if (response.status === 200) {
        classes.value = response.data;
      } else {
        console.error("listClasses returned undefined or null");
      }
    } catch (error) {
      console.error("Error in listClasses:", error);
    }
  });
</script>
<template>
  <header-navi :isLoggedin="isLoggedin" :user="user" />
  <v-main>
    <triangleBanner title="履修の登録" paragraph="履修の登録を行います。" />
    <v-container>
      <!--Show listClasses result-->
      <v-text-field
        v-model="search"
        label="Search"
        outlined
        dense
        class="mb-4"
      ></v-text-field>
      <v-data-table
        :items="filteredClasses"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>履修登録</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
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
