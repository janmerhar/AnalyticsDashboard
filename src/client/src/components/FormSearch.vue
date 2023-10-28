<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="eventFilter.query"
          :label="$t(`FormSearch.input.label.${eventFilter.searchby}`)"
          type="text"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          @click:append-inner="$emit('search', eventFilter)"
          @keydown.enter="$emit('search', eventFilter)"
        >
          <!-- :label="eventFilter.searchby" -->
          <template v-slot:prepend>
            <v-switch
              :label="$t('FormSearch.switch.id')"
              true-value="id"
              false-value="name"
              v-model="eventFilter.searchby"
              inset
              hide-details
            ></v-switch>
          </template>

          <template v-slot:append>
            <v-menu :close-on-content-click="false" class="menu-width">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="mt-n2">
                  <v-icon icon="mdi-filter-variant"></v-icon>
                </v-btn>
              </template>

              <!--  -->
              <v-card class="custom-card">
                <v-container fluid>
                  <v-row dense
                    ><v-col
                      ><v-btn
                        block
                        :class="{
                          'bg-grey-darken-1': eventFilter.order == 'asc',
                        }"
                        @click="setSort('asc')"
                        >{{ $t("FormSearch.dropdown.sortorder.asc") }}</v-btn
                      ></v-col
                    >
                    <v-col
                      ><v-btn
                        block
                        :class="{
                          'bg-grey-darken-1': eventFilter.order == 'desc',
                        }"
                        @click="setSort('desc')"
                        >{{ $t("FormSearch.dropdown.sortorder.desc") }}</v-btn
                      ></v-col
                    >
                  </v-row>
                  <v-row dense
                    ><v-col class="v-col-4">{{
                      $t("FormSearch.dropdown.sortby.name")
                    }}</v-col>
                    <v-col
                      ><v-select
                        id="sortby"
                        :items="sortItems"
                        v-model="eventFilter.sort"
                      ></v-select
                    ></v-col>
                  </v-row>
                  <v-row dense
                    ><v-col class="v-col-4">{{
                      $t("FormSearch.dropdown.type.name")
                    }}</v-col>
                    <v-col
                      ><v-select
                        id="type"
                        :items="sortType"
                        v-model="eventFilter.type"
                      ></v-select
                    ></v-col>
                  </v-row>
                  <v-row dense
                    ><v-col class="v-col-4">{{
                      $t("FormSearch.dropdown.priority.name")
                    }}</v-col>
                    <v-col
                      ><v-select
                        id="priority"
                        :items="sortPriority"
                        v-model="eventFilter.priority"
                      ></v-select
                    ></v-col>
                  </v-row>
                </v-container>
              </v-card>
              <!--  -->
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EventFilter } from "@/entities/Event";
import { FilterSortOrder } from "@/entities/Event";

defineEmits(["search"]);

const eventFilter = ref<EventFilter>({ searchby: "name", order: "asc" });

const sortItems = ref<string[]>(["", "type", "priority", "name"]);
const sortType = ref<string[]>(["", "crosspromo", "liveops", "app", "ads"]);
const sortPriority = ref<(number | null)[]>([
  null,
  ...Array.from({ length: 11 }, (_, i) => i),
]);

const setSort = (sort: string) => {
  eventFilter.value.order = sort as FilterSortOrder;
};
</script>

<style scoped>
.custom-card {
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
