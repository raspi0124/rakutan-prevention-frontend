<script setup lang="ts">
  const props = defineProps<{
    isLoggedin: Ref<boolean>;
    user: Ref<{
      sub: string;
      given_name: string;
      family_name: string;
      nickname: string;
      name: string;
      picture: string;
      updated_at: string;
      email: string;
      email_verified: boolean;
    } | null>;
  }>();

  onMounted(() => {
    console.log("mounted");
    console.log(props.isLoggedin);
    console.log(props.user);
  });

  const menu = ref(false);
</script>

<template>
  <v-app-bar :style="{ height: '80px' }" elevation="0" class="px-4 pt-1">
    <a class="title">Tsuku-Alert</a>
    <v-menu v-if="user" v-model:open="menu" offset-y>
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" @click="menu = !menu" style="cursor: pointer">
          <v-img :src="user.picture" />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item @click="menu = false">
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="menu = false">
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="menu = false">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <span v-else>
      <NuxtLink to="/login">ログイン</NuxtLink>
    </span>
  </v-app-bar>
</template>

<style scoped></style>
