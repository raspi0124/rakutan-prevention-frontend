<script setup lang="ts">
  import { useApi } from "@/composables/useApi";

  const { getAccount, updateAccount } = useApi();
  //Data
  const isLoggedin = ref(false);
  const user = ref(null);
  const name = ref("");
  const email = ref("");
  const phone_number = ref("");

  const getAndInsertPhoneNumber = async () => {
    console.log("TEST");
    const response = await getAccount(user.value.sub);
    phone_number.value = response.phone_number;
  };

  const submit = () => {
    console.log(user.value.sub, phone_number.value);
    updateAccount(user.value.sub, phone_number.value).then((response) => {
      if (response.status === 200) {
        console.log("Success");
        $toast.success("保存しました");
      } else {
        console.log("Failed");
        $toast.error("保存に失敗しました");
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
  <v-main>
    <headerNavi :isLoggedin="isLoggedin" :user="user" />
    <triangleBanner title="各種設定" paragraph="各種設定等です" />
    <v-container v-if="user">
      <v-row justify="center">
        <v-col cols="12">
          <v-card flat>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="名前"
                  v-model="name"
                  disabled
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  label="メールアドレス"
                  v-model="email"
                  disabled
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  label="電話番号"
                  v-model="phone_number"
                  outlined
                  dense
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="submit">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
