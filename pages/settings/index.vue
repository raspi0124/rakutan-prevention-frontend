<script setup lang="ts">
  import { useApi } from "@/composables/useApi";
  const { $toast } = useNuxtApp();
  const { getAccount, updateAccount, sendmesms } = useApi();
  //Data
  const isLoggedin = ref(false);
  const user = ref(null);
  const name = ref("");
  const email = ref("");
  const phone_number = ref("");

  const validatePhoneNumber = (value: string) => {
    if (!value) return "電話番号を入力してください";
    if (!/^[0-9]{10,11}$/.test(value))
      return "電話番号は10桁または11桁の数字で入力してください";
    return true;
  };
  const getAndInsertPhoneNumber = async () => {
    console.log("TEST");
    const response = await getAccount(user.value.sub);
    phone_number.value = response.data.phone_number;
  };

  const submit = () => {
    console.log(user.value.sub, phone_number.value);
    if (validatePhoneNumber(phone_number.value) === true) {
      updateAccount(user.value.sub, phone_number.value).then((response) => {
        if (response.status === 200) {
          console.log("Success");
          $toast.success("保存しました");
          // Send sms
          sendmesms().then((response) => {
            if (response.status === 200) {
              console.log("Success");
              $toast.success("SMSの発信に成功しました");
            } else {
              console.log("Failed");
              $toast.error("SMSの発信に失敗しました");
            }
          });
        } else {
          console.log("Failed");
          $toast.error("保存に失敗しました");
        }
      });
    } else {
      $toast.error(validatePhoneNumber(phone_number.value));
    }
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
    <title>設定 | Tsuku-Alert</title>
  </head>
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
                  :rules="[validatePhoneNumber]"
                ></v-text-field>
              </v-form>
              <div class="d-flex justify-end">
                <v-btn color="secondary" to="/settings/call"
                  >テスト通話を行う (先着順! 課金が切れ次第終了!!)</v-btn
                >
              </div>
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
