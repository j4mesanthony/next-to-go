import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FilterOptions from "../FilterOptions.vue";

describe("FilterOptions.vue", () => {
    it("renders all available options", () => {
        const wrapper = mount(FilterOptions, {
            props: {
                modelValue: [1, 2],
                options: [
                    { id: 1, name: "Option #1" },
                    { id: 2, name: "Option #2" },
                ],
            },
        });

        expect(wrapper.get(`[data-test-id="1"]`));
        expect(wrapper.get(`[data-test-id="2"]`));
        expect(wrapper.get(`[data-test-id="select-1"]`));
        expect(wrapper.get(`[data-test-id="select-2"]`));
    });

    it("selects all options if none selected in props on mount", () => {
        const wrapper = mount(FilterOptions, {
            props: {
                modelValue: [],
                options: [
                    { id: 1, name: "Option #1" },
                    { id: 2, name: "Option #2" },
                ],
            },
        });

        const selectEvent = wrapper.emitted("update:modelValue");
        expect(selectEvent).toHaveLength(1);
        expect(selectEvent[0]).toEqual([[1, 2]]);
    });

    it("renders 2 options with one selected and then clicks to select other option", async () => {
        const wrapper = mount(FilterOptions, {
            props: {
                modelValue: [1],
                options: [
                    { id: 1, name: "Option #1" },
                    { id: 2, name: "Option #2" },
                ],
            },
        });

        // Test that both options exist
        expect(wrapper.get(`[data-test-id="1"]`));
        expect(wrapper.get(`[data-test-id="2"]`));

        // Option #1 should be selected
        expect(wrapper.get(`[data-test-id="select-1"]`).element.checked).toBe(true);

        // Option #2 should not be selected
        expect(wrapper.get(`[data-test-id="select-2"]`).element.checked).toBe(false);

        // Click Option #2 and test that it is now selected
        await wrapper.get(`[data-test-id="select-2"]`).trigger("click");
        const selectEvent = wrapper.emitted("update:modelValue");

        expect(selectEvent).toHaveLength(1);
        expect(selectEvent[0]).toEqual([[1, 2]]);
    });
});
