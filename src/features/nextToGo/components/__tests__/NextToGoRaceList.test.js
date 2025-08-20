import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NextToGoRaceList from "../NextToGoRaceList.vue";

describe("NextToGoRaceList.vue", () => {
    const horseCategoryId = "4a2788f8-e825-4d36-9894-efd4baf1cfae";
    const greyhoundCategoryId = "9daef0d7-bf3c-4f50-921d-8e818c60fe61";
    const now = Math.floor(Date.now() / 1000);

    const base = (overrides = {}) => ({
        race_id: "d30b81e5-ec14-410e-bf4c-f958720b1b69",
        race_name: "RAQbred Triad Final 4YO E&G Mobile Pace (G2)E",
        race_number: 1,
        meeting_name: "Albion Park",
        category_id: horseCategoryId,
        advertised_start: { seconds: now + 60 },
        ...overrides,
    });

    it("renders race data", () => {
        const data = [
            base({ race_id: "b70a4404-a8c5-4360-b289-d1644547ee89", race_number: 5 }),
            base({
                race_id: "7a8cd994-e6d0-4220-9a00-7908a76dc098",
                race_number: 6,
                advertised_start: { seconds: now + 125 },
            }),
        ];
        const wrapper = mount(NextToGoRaceList, { props: { data, max: 2, categoryIds: [horseCategoryId] } });

        // Do descriptions show and are formatted as expected?
        expect(wrapper.get('[data-test-id="b70a4404-a8c5-4360-b289-d1644547ee89"]').text()).toContain("Albion Park R5");
        expect(wrapper.get('[data-test-id="7a8cd994-e6d0-4220-9a00-7908a76dc098"]').text()).toContain("Albion Park R6");
        // Test for mins & second output on 2nd race (1m 30s)
        expect(wrapper.get(`[data-test-id="7a8cd994-e6d0-4220-9a00-7908a76dc098-startTime"]`).text()).toMatch(
            /[\d+]m [\d+]s/g
        );
    });

    it("shows correct message when no data", () => {
        const data = [];
        const wrapper = mount(NextToGoRaceList, { props: { data, max: 1, categoryIds: [horseCategoryId] } });

        // Max data set to 1 should the second race should not be shown
        expect(wrapper.get('[data-test-id="noDataMsg"]')).toBeDefined();
        expect(wrapper.get('[data-test-id="noDataMsg"]').text()).toBe("No races");
    });

    it("filters by category", () => {
        const data = [
            base({ race_id: "b70a4404-a8c5-4360-b289-d1644547ee89", category_id: horseCategoryId }),
            base({ race_id: "7a8cd994-e6d0-4220-9a00-7908a76dc098", category_id: greyhoundCategoryId }),
        ];
        const wrapper = mount(NextToGoRaceList, { props: { data, max: 5, categoryIds: [horseCategoryId] } });

        // Only 1 race should exist (greyhound is not valid category)
        expect(wrapper.findAll('[data-test-id="raceItem"]').length).toBe(1);
    });

    it("displays races up to max prop value", () => {
        const data = [
            base({ race_id: "7a8cd994-e6d0-4220-9a00-7908a76dc098" }),
            base({ race_id: "b70a4404-a8c5-4360-b289-d1644547ee89" }),
        ];
        const wrapper = mount(NextToGoRaceList, { props: { data, max: 1, categoryIds: [horseCategoryId] } });

        // Max data set to 1 should the second race should not be shown
        expect(wrapper.findAll('[data-test-id="raceItem"]').length).toBe(1);
    });
});
