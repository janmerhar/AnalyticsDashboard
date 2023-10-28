import { describe, it as test, expect } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { mount } from "@vue/test-utils";
import FormSearch from "../../src/components/FormSearch.vue";
import { EventFilter } from "../../src/entities/Event";

describe("FormSearch", () => {
  const vuetify = createVuetify({ components, directives });

  const wrapper = mount(FormSearch, {
    global: {
      components: { FormSearch },
      plugins: [vuetify],
      mocks: {
        $t: (msg: string) => msg,
      },
    },
  });

  const eventFilter: EventFilter = {
    searchby: "id",
    query: "1",
    sort: "name",
  };

  test("renders properly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("emits a custom event when a button is clicked", async () => {
    const textfield = wrapper.find("input[type='text']");
    await textfield.trigger("click");

    await textfield.trigger("keydown.enter");

    expect(wrapper.emitted("search")).toBeTruthy();
  });

  test("emits a custom event when a button is clicked and return search options", async () => {
    const textfield = wrapper.find("input[type='text']");
    await textfield.trigger("click");

    await textfield.setValue(eventFilter.query);

    const switchValue = wrapper.find(".v-label--clickable");
    await switchValue.trigger("click");

    wrapper.vm.eventFilter.sort = eventFilter.sort;

    await textfield.trigger("keydown.enter");

    expect(wrapper.emitted("search")).toBeTruthy();
    const emittedData = wrapper.emitted("search")[0][0];

    expect(emittedData.query).toEqual(eventFilter.query);
    expect(emittedData.searchby).toEqual("name");
    expect(emittedData.sort).toEqual(eventFilter.sort);
    expect(emittedData.order).toEqual("asc");
  });
});
