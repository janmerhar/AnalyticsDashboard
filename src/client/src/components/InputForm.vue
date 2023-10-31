<template>
  <v-form fast-fail @submit.prevent>
    <v-row justify="center">
      <v-dialog v-model="isOpen" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{
              mode == "edit"
                ? $t("InputForm.update.title")
                : $t("InputForm.insert.title")
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <!-- ID, Name -->
                <v-col cols="12" sm="4">
                  <v-text-field
                    :label="$t('InputForm.input[0].name')"
                    :rules="validateRules.id()"
                    v-model="localEvent.id"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-text-field
                    :label="$t('InputForm.input[1].name')"
                    :rules="validateRules.notEmpty()"
                    v-model="localEvent.name"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Priority, Type -->
                <v-col cols="12" sm="4">
                  <v-select
                    :label="$t('InputForm.input[2].name')"
                    :items="sortPriority"
                    v-model="localEvent.priority"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-select
                    :label="$t('InputForm.input[3].name')"
                    :items="sortType"
                    :rules="validateRules.notEmpty()"
                    v-model="localEvent.type"
                    required
                  ></v-select>
                </v-col>

                <!-- Description -->
                <v-col cols="12">
                  <v-textarea
                    :label="$t('InputForm.input[4].name')"
                    :rules="validateRules.notEmpty()"
                    v-model="(localEvent.description as string)"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!--  -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- 
                TODO
                SEND EMIT TO Main
                for dissmisal
             -->
            <v-btn color="blue-darken-1" variant="text" @click="$emit('close')">
              {{ $t("InputForm.close.button") }}
            </v-btn>

            <!-- 
                TODO
                SEND EMIT TO Main 
                for inserting
            -->
            <v-btn
              type="submit"
              color="blue-darken-1"
              variant="text"
              @click.prevent="$emit('confirm', insertedEvent.id, localEvent)"
            >
              {{
                mode == "edit"
                  ? $t("InputForm.update.button")
                  : $t("InputForm.insert.button")
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sortType = ref<string[]>(["crosspromo", "liveops", "app", "ads"]);
const sortPriority = ref<(number | null)[]>([
  ...Array.from({ length: 11 }, (_, i) => i),
]);

import { Event } from "@/entities/Event";
import { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  insertedEvent: {
    type: Object as PropType<Event>,
    required: true,
  },
  mode: {
    type: String as PropType<"add" | "edit">,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

defineEmits(["close", "confirm"]);

const isOpen = computed({
  get: () => props.dialog,
});

const localEvent = ref<Event | null>(
  new Event({
    id: 2,
    name: "Testaa",
    description: "Testa",
    type: "ads",
    priority: 1,
  })
);

import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const invalidId = ref<boolean>(props.errors.includes("id"));

const validateRules = ref({
  id: () => {
    return [
      (v: number) => !invalidId.value || t("InputForm.validate.id.fail"),
      (v: number) => !!v || t("InputForm.validate.required"),
      (v: number) => (v && v > 0) || t("InputForm.validate.id.pattern"),
    ];
  },
  notEmpty: () => {
    return [(v: string) => !!v || t("InputForm.validate.required")];
  },
});
</script>
