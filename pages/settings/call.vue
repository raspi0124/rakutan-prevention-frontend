<script setup lang="ts">
  import { useApi } from "@/composables/useApi";
  const { $toast } = useNuxtApp();
  const { callme, getAccount } = useApi();
  //Data
  const isLoggedin = ref(false);
  const user = ref(null);
  const name = ref("");
  const email = ref("");
  const phone_number = ref("");

  const getAndInsertPhoneNumber = async () => {
    console.log("TEST");
    const response = await getAccount(user.value.sub);
    phone_number.value = response.data.phone_number;
  };

  const submit = () => {
    console.log(user.value.sub, phone_number.value);
    callme().then((response) => {
      if (response.status === 200) {
        console.log("Success");
        $toast.success("リクエストしました");
      } else {
        console.log("Failed");
        $toast.error("リクエストに失敗しました");
      }
    });
  };

  onMounted(async () => {
    console.log("mounted");
    const $auth = useAuth();
    const token = $auth.$storage.memory["_token.auth0"];
    console.log(token);
    console.log($auth.user);
    if ($auth.user) {
      isLoggedin.value = true;
      user.value = $auth.user;
      name.value = user.value.name;
      email.value = user.value.email;
      getAndInsertPhoneNumber();
    } else {
      isLoggedin.value = false;
    }
  });
</script>

<template>
  <head>
    <meta charset="UTF-8" />
    <title>通話テスト | Tsuku-Alert</title>
  </head>
  <v-main>
    <headerNavi :isLoggedin="isLoggedin" :user="user" />
    <triangleBanner
      title="通話"
      paragraph="自分に対して試験的な通話発信を行えます"
    />
    <v-container v-if="user">
      <v-row justify="center">
        <v-col cols="12">
          <v-card flat>
            <v-card-text>
              発信先の電話番号:
              <v-text-field
                label="電話番号"
                v-model="phone_number"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="submit">発信をリクエスト</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
