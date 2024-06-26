<script setup lang="ts">
  import { useApi } from "@/composables/useApi";

  const isLoggedin = ref(false);
  const user = ref(null);
  const { listClasses, registerClass } = useApi();
  const classes = ref();
  const search = ref("");
  const { $toast } = useNuxtApp();

  const classheader = [
    {
      title: "科目番号",
      value: "class_id",
      align: "start",
      sortable: true,
    },
    {
      title: "授業名",
      value: "class_name",
      align: "start",
      sortable: false,
    },
    {
      title: "時限",
      value: "class_period",
      align: "start",
      sortable: false,
    },
    {
      title: "教室",
      value: "class_room",
      align: "start",
      sortable: false,
    },
    {
      title: "学期",
      value: "class_semester",
      align: "start",
      sortable: false,
    },
    {
      title: "アクション",
      value: "actions",
      align: "center",
      sortable: false,
    },
  ];

  const filteredClasses = computed(() => {
    if (!classes.value) return [];
    return classes.value
      .filter((classItem: { class_name: string }) =>
        classItem.class_name.toLowerCase().includes(search.value.toLowerCase())
      )
      .map((classItem: { class_semester: string }) => {
        const class_semester = classItem.class_semester
          .split("")
          .map((semester: string) => {
            if (semester === "S") return "春";
            if (semester === "F") return "秋";
            if (semester === "A") return "A";
            if (semester === "B") return "B";
            if (semester === "C") return "C";
            return semester;
          })
          .join("");
        return { ...classItem, class_semester };
      });
  });

  const regClass = async (class_id: string) => {
    console.log(class_id);
    try {
      const response = await registerClass(class_id);
      if (response.status === 200) {
        console.log("Success");
        $toast.success("履修登録をしました");
      } else {
        console.log("Failed");
        $toast.error("履修登録に失敗しました");
      }
    } catch (error) {
      console.error("Error in regClass:", error);
      $toast.error("履修登録に失敗しました: " + error);
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
      <v-text-field
        v-model="search"
        label="授業名で検索する"
        outlined
        dense
        class="mb-4"
      ></v-text-field>
      <v-data-table
        :items="filteredClasses"
        :items-per-page="5"
        :headers="classheader"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>履修登録</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/attendances">出欠登録</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" @click="regClass(item.class_id)">登録</v-btn>
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
