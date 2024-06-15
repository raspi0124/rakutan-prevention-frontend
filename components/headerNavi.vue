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
    <v-app-bar-title
      @click="$router.push('/')"
      style="color: #165b6a; cursor: pointer; font-weight: bold"
      >Tsuku-Alert</v-app-bar-title
    >
    <v-menu v-if="user" v-model:open="menu" offset-y>
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" @click="menu = !menu" style="cursor: pointer">
          <v-img :src="user.picture" />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item @click="menu = false">
          <v-list-item-content>
            <v-list-item-title
              style="cursor: pointer"
              @click="$router.push('/settings')"
              >設定</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="menu = false">
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <span v-else>
      <NuxtLink to="/login">
        <v-btn x-large color="primary" text>ログイン</v-btn>
      </NuxtLink>
    </span>
  </v-app-bar>
</template>

<style scoped></style>
