<template>
  <v-layout-item model-value position="bottom" class="text-end" size="100">
    <div class="ma-5">
      <VBtn
        icon="mdi-plus"
        size="large"
        color="primary"
        elevation="10"
        @click="$emit('add')"
      />
    </div>
  </v-layout-item>
</template>

<script setup lang="ts">
defineEmits(["add"]);
</script>
