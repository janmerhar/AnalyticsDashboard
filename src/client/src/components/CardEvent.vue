<template>
  <v-card class="mx-auto v-card">
    <v-icon
      class="v-card_icon"
      :icon="'mdi-numeric-' + event.priority"
      size="x-large"
    ></v-icon>

    <v-card-title>{{ event.name }}</v-card-title>

    <v-card-subtitle
      >{{ event.id }} <v-icon icon="mdi-circle-small"></v-icon>
      {{ event.type }}</v-card-subtitle
    >

    <v-card-actions>
      <v-btn color="grey-darken-1" variant="text" @click="$emit('edit', event)">
        <v-icon icon="mdi-pencil"></v-icon>
        &nbsp; {{ $t("CardEvent.button.edit") }}
      </v-btn>
      <v-btn color="red" variant="text" @click="$emit('delete', event)">
        <v-icon icon="mdi-delete"></v-icon>
        &nbsp; {{ $t("CardEvent.button.delete") }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>{{ event.description }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { Event } from "@/entities/Event";

defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});

defineEmits(["delete", "edit"]);

const show = ref<boolean>(false);
</script>

<style scoped>
.v-card_icon {
  width: 100%;
  height: 150px;
  font-size: 100px;
  line-height: 100px;
  background-color: rgb(184, 184, 184);
}

.v-card {
  max-width: 350px;
  min-width: 250px;
}
</style>
