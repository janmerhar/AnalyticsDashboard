<template>
  <form-search @search="(filter) => searchEvents(filter, 1)"></form-search>
  <v-container fluid>
    <!--  -->
    <v-row>
      <v-col cols="1">
        <v-btn @click="prevPage()">
          <v-icon icon="mdi-arrow-left"></v-icon>
        </v-btn>
      </v-col>
      <v-col cols="10"></v-col>
      <v-col cols="1">
        <v-btn @click="nextPage()">
          <v-icon icon="mdi-arrow-right"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!--  -->
    <v-row dense class="align-start">
      <v-col v-for="event in events" :key="event.id">
        <card-event
          :event="(event as Event)"
          @edit="editEvent"
          @delete="removeEvent(event)"
        ></card-event>
      </v-col>
    </v-row>
  </v-container>
  <input-form
    :dialog="isOpen"
    :inserted-event="(insertedEvent as Event)"
    :mode="insertMode"
    :errors="errors"
    @close="closeInput"
    @confirm="async (newId, newEvent) => insertUpdateAPI(newId, newEvent)"
  ></input-form>
  <!-- @confirm="isOpen = false" -->
  <button-fab @click="addEvent"></button-fab>

  <!-- <snackbar-alert :snackbar="isOpen"></snackbar-alert> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Event, EventFilter } from "@/entities/Event";
import CardEvent from "@/components/CardEvent.vue";
import FormSearch from "@/components/FormSearch.vue";
import InputForm from "@/components/InputForm.vue";
import ButtonFab from "@/components/ButtonFab.vue";

import { getCurrentInstance } from "vue";
import { onMounted } from "vue";
import { parse } from "path";
import { errorMonitor } from "events";

const $http = getCurrentInstance()?.appContext.config.globalProperties.$http;

const page = ref<number>(1);
const searchParams = ref<EventFilter>({});
const errors = ref<string[]>([]);

const searchEvents = async (eventFilter: EventFilter, page: number = 1) => {
  searchParams.value = eventFilter;
  events.value = await Event.fetchAll($http, eventFilter, page);
};

const nextPage = async () => {
  const fetchedEvents = await Event.fetchAll(
    $http,
    searchParams.value,
    page.value + 1
  );

  if (fetchedEvents.length > 0) {
    page.value++;
    events.value = fetchedEvents;
  }
};

const prevPage = async () => {
  if (page.value > 1) {
    await searchEvents(searchParams.value, page.value - 1);
    page.value--;
  }
};

onMounted(async () => {
  searchEvents({});
});

const events = ref<Event[]>();

const isOpen = ref<boolean>(false);

const insertedEvent = ref<Event>(
  new Event({
    id: 0,
    name: "",
    description: "",
    type: "app",
    priority: 0,
  })
);

const insertMode = ref<"add" | "edit">("add");

const openInput = () => {
  isOpen.value = !isOpen.value;
};

const closeInput = () => {
  errors.value = [];
  isOpen.value = false;

  insertedEvent.value = new Event({
    id: 0,
    name: "",
    description: "",
    type: "app",
    priority: 0,
  });
};

const addEvent = () => {
  insertedEvent.value = new Event({
    id: 0,
    name: "Name",
    description: "",
    type: "app",
    priority: 0,
  });

  insertMode.value = "add";
  openInput();
};

const editEvent = (event: Event) => {
  insertedEvent.value = new Event({
    id: event.id,
    name: event.name,
    description: event.description,
    type: event.type,
    priority: event.priority,
  });

  insertMode.value = "edit";
  openInput();
};

const removeEvent = async (event: Event) => {
  await Event.deleteOne($http, event);
  await searchEvents({});
};

const insertUpdateAPI = async (newId: number | string, event: Event) => {
  newId = parseInt(newId as string);
  const errorsEvent = event.isValid();

  if (errorsEvent?.length > 0) {
    errors.value = errorsEvent;
    return;
  }

  try {
    if (insertMode.value === "add") {
      await event.save($http);
    } else {
      await event.update($http, newId);
    }

    await searchEvents(searchParams.value, page.value);
    closeInput();
  } catch (e) {
    errors.value = ["id"];
  }
};

const snackbar = ref<Object>({ isOpen: false, text: "test", timeout: 3000 });
</script>
