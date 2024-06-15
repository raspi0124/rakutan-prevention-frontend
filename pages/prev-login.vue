<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <title>ログイン | Tsuku-Alart</title>
    </head>
    <headerNavi />
    <body>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-center">ログイン</v-card-title>
              <v-card-text>
                <v-form>
                  <!-- Add your form fields here -->
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" to="/login">ログイン</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </body>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    auth: false,
  });
  onMounted(() => {
    console.log("mounted");
  });
</script>
