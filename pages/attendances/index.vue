<script setup lang="ts">
  import { useApi } from "@/composables/useApi";
  const { $toast } = useNuxtApp();
  const { getAccount, listClassRegistrations, updateRegisteredClass } =
    useApi();
  //Data
  const isLoggedin = ref(false);
  const user = ref(null);
  const attendances = ref(null);
  const headers = [
    { title: "科目番号", value: "class_id" },
    { title: "欠席回数", value: "absences", sortable: true },
    { title: "出欠席確認", value: "actions", sortable: false },
  ];
  const allItems = ref([]);
  const dialog = ref(false);
  const updateAttendanceLoading = ref(false);

  const absenceValidation = (value: number) => {
    if (!value) return "欠席回数を入力してください";
    if (!/^[0-9]*$/.test(value.toString())) return "数字で入力してください";
    return true;
  };
  const getAndInsertAttendances = async () => {
    try {
      console.log("TEST");
      const response = await listClassRegistrations(user.value.sub);
      console.log(response);
      if (response) {
        attendances.value = response.data;
      } else {
        console.error("listClassRegistrations returned undefined or null");
      }
    } catch (error) {
      console.error("Error in listClassRegistrations:", error);
    }
  };
  const DialogupdateAttendance = (item) => {
    dialog.value = true;
  };

  const updateAttendance = async (class_id, absences) => {
    updateAttendanceLoading.value = true;
    try {
      if (absenceValidation(absences) !== true) {
        $toast.error(absenceValidation(absences));
        updateAttendanceLoading.value = false;
        return;
      }
      console.log("TEST");
      const response = await updateRegisteredClass(
        user.value.sub,
        class_id,
        absences
      );
      console.log(response);
      if (response.status === 200) {
        console.log("200");
        $toast.success("更新しました!");
        dialog.value = false;
        updateAttendanceLoading.value = false;
      } else {
        console.error("updateAttendance returned undefined or null");
        $toast.error("更新に失敗しました");
      }
    } catch (error) {
      console.error("Error in updateAttendance:", error);
      $toast.error("更新に失敗しました");
    }
  };

  const getChipColor = (absences) => {
    if (absences === 0) {
      return "success";
    } else if (absences <= 2) {
      return "warning";
    } else {
      return "error";
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
      getAndInsertAttendances();
    } else {
      isLoggedin.value = false;
    }
  });
</script>

<template>
  <head>
    <meta charset="UTF-8" />
    <title>出欠更新 | Tsuku-Alert</title>
  </head>
  <v-main>
    <headerNavi :isLoggedin="isLoggedin" :user="user" />
    <triangleBanner title="出欠席確認" paragraph="" />
    <v-container v-if="attendances">
      <v-row justify="center">
        <v-col>
          <v-data-table
            :headers="headers"
            :items="attendances"
            item-key="class_id"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>出欠席確認</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/registrations"
                  >履修を登録する</v-btn
                >
              </v-toolbar>
            </template>
            <template v-slot:item.absences="{ item }">
              <v-chip :color="getChipColor(item.absences)" dark>{{
                item.absences
              }}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                flat
                color="primary"
                text
                @click="DialogupdateAttendance(item.class_id)"
              >
                出欠更新
              </v-btn>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title class="headline">欠席回数の変更</v-card-title>
                  <v-combobox
                    v-model="item.absences"
                    :items="[0, 1, 2, 3, 4, 5]"
                    label="欠席回数"
                    :rules="[absenceValidation]"
                  ></v-combobox>
                  <v-card-actions>
                    <v-btn color="red" text @click="dialog = false">
                      キャンセル
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="updateAttendance(item.class_id, item.absences)"
                      :loading="updateAttendanceLoading"
                    >
                      送信して閉じる
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col>
          <v-alert type="info">講義等の登録がありません</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
