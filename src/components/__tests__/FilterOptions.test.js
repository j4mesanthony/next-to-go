import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FilterOptions from "../FilterOptions.vue";

describe("FilterOptions.vue", () => {
    const options = [
        { id: 1, name: "Option #1" },
        { id: 2, name: "Option #2" },
    ];

    it("renders all options", () => {
        const wrapper = mount(FilterOptions, { props: { modelValue: [1, 2], options } });
        options.forEach((opt) => {
            expect(wrapper.get(`[data-test-id='${opt.id}']`)).toBeDefined();
            expect(wrapper.get(`[data-test-id='select-${opt.id}']`)).toBeDefined();
        });
    });

    it("selects all if none selected", () => {
        const wrapper = mount(FilterOptions, { props: { modelValue: [], options } });
        const emitted = wrapper.emitted("update:modelValue");

        expect(emitted[0]).toEqual([[1, 2]]);
    });

    it("selects option on click", async () => {
        const wrapper = mount(FilterOptions, { props: { modelValue: [1], options } });

        expect(wrapper.get("[data-test-id='select-1']").classes()).toContain("isActive");
        expect(wrapper.get("[data-test-id='select-2']").classes()).not.toContain("isActive");

        await wrapper.get("[data-test-id='select-2']").trigger("click");
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([[1, 2]]);
    });

    it("deselects option on click", async () => {
        const wrapper = mount(FilterOptions, { props: { modelValue: [1, 2], options } });

        options.forEach((opt) => {
            expect(wrapper.get(`[data-test-id='select-${opt.id}']`).classes()).toContain("isActive");
        });

        await wrapper.get("[data-test-id='select-1']").trigger("click");
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([[2]]);
    });
});
