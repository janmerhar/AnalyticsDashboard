import { describe, it as test, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ButtonFab from "../../src/components/ButtonFab.vue";

describe("ButtonFab", () => {
  const wrapper = mount(ButtonFab, {
    global: {
      components: { ButtonFab },
    },
  });

  test("renders properly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("emit an event when the button is clicked", async () => {
    const button = wrapper.find("VBtn");
    await button.trigger("click");
    expect(wrapper.emitted("add")).toBeTruthy();
  });
});
