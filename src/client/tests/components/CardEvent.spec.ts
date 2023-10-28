import { describe, it as test, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { mount } from "@vue/test-utils";
import CardEvent from "../../src/components/CardEvent.vue";
import { EventDetailsValid } from "../Event/EventDetailsValid.stub";
import { Event } from "../../src/entities/Event";

describe("CardEvent", () => {
  const vuetify = createVuetify({ components, directives });
  const event = new Event(EventDetailsValid());

  const wrapper = mount(CardEvent, {
    props: { event: event },
    global: {
      components: { CardEvent },
      plugins: [vuetify],
      mocks: {
        $t: (msg: string) => msg,
      },
    },
  });

  test("renders properly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("renders a card", () => {
    expect(wrapper.find(".v-card").exists()).toBe(true);
  });

  test("renders a card title", () => {
    expect(wrapper.find(".v-card-subtitle").text()).toContain(event.id);
    expect(wrapper.find(".v-card-title").text()).toBe(event.name);
    expect(wrapper.find(".v-card-text").text()).toBe(event.description);
    expect(wrapper.find(".v-card-subtitle").text()).toContain(event.type);
    expect(wrapper.find(`.mdi-numeric-${event.priority}`)).toBeTruthy();
    expect(wrapper.find(".v-card-title").text()).toBe(event.name);
  });

  test("emit an event when the edit button is clicked", async () => {
    const button = wrapper.find("button.v-btn.text-grey-darken-1");
    await button.trigger("click");
    expect(wrapper.emitted("edit")).toBeTruthy();

    const emittedData = wrapper.emitted("edit")[0][0];
    expect(emittedData).toEqual(event);
  });

  test("emit an event when the delete button is clicked", async () => {
    const button = wrapper.find("button.v-btn.text-red");
    await button.trigger("click");

    expect(wrapper.emitted("delete")).toBeTruthy();

    const emittedData = wrapper.emitted("delete")[0][0];
    expect(emittedData).toEqual(event);
  });
});
