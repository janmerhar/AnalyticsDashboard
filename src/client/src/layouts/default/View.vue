<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col v-if="!isMobile" md="2" class="pa-0 ma-0"></v-col>
        <v-col xs="12" md="8">
          <router-view />
        </v-col>
        <v-col v-if="!isMobile" md="2" class="pa-0 ma-0"></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { name } = useDisplay();


const isMobile = computed(() => {
  return name.value === "xs" || name.value === "sm";
});

</script>
