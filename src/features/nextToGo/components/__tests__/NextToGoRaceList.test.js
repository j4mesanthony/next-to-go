import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NextToGoRaceList from "../NextToGoRaceList.vue";

describe("NextToGoRaceList.vue", () => {
    it("renders race data correctly", () => {
        const race1Id = "31057539-361f-47f4-bf13-e53347f6f037";
        const race2Id = "31057539-361f-47f4-bf13-e53347f6f038";

        const data = [
            {
                race_id: race1Id,
                race_name: "BLACKADDER RACING",
                race_number: 5,
                meeting_name: "Oamaru",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 60 },
            },
            {
                race_id: race2Id,
                race_name: "BLACKADDER RACING",
                race_number: 6,
                meeting_name: "Oamaru",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 61 },
            },
        ];

        const wrapper = mount(NextToGoRaceList, {
            props: {
                data,
                categoryIds: ["4a2788f8-e825-4d36-9894-efd4baf1cfae"],
            },
        });

        // Race #1
        const race1 = wrapper.get(`[data-test-id="${race1Id}"]`);
        expect(race1).toBeTruthy();
        expect(race1.text()).toBe(`${data[0].meeting_name} R${data[0].race_number} (Horse)`);
        expect(wrapper.get(`[data-test-id="${race1Id}-startTime"]`).text()).toBe("59s");

        // Race #2
        const race2 = wrapper.get(`[data-test-id="${race2Id}"]`);
        expect(race2).toBeTruthy();
        expect(race2.text()).toBe(`${data[1].meeting_name} R${data[1].race_number} (Horse)`);
        expect(wrapper.get(`[data-test-id="${race2Id}-startTime"]`).text()).toBe("1m 0s");
    });

    it("renders multiple races", () => {
        const data = [
            {
                race_id: "31057539-361f-47f4-bf13-e53347f6f037",
                race_name: "BLACKADDER RACING",
                race_number: 5,
                meeting_name: "Oamaru",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 60 },
            },
            {
                race_id: "31057539-361f-47f4-bf13-e53347f6f321",
                race_name: "BLACKADDER RACING",
                race_number: 9,
                meeting_name: "Healesville",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 60 },
            },
        ];

        const wrapper = mount(NextToGoRaceList, {
            props: {
                data,
                categoryIds: ["4a2788f8-e825-4d36-9894-efd4baf1cfae"],
            },
        });

        expect(wrapper.findAll(`[data-test-id="raceItem"]`)).toHaveLength(2);
    });

    it("only renders races of selected categories", () => {
        const data = [
            {
                race_id: "31057539-361f-47f4-bf13-e53347f6f037",
                race_name: "BLACKADDER RACING",
                race_number: 5,
                meeting_name: "Oamaru",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 60 },
            },
            {
                race_id: "31057539-361f-47f4-bf13-e53347f6f321",
                race_name: "BLACKADDER RACING",
                race_number: 9,
                meeting_name: "Healesville",
                category_id: "9daef0d7-bf3c-4f50-921d-8e818c60fe61", // Greyhound
                advertised_start: { seconds: Math.floor(Date.now() / 1000) + 40 },
            },
        ];

        const wrapper = mount(NextToGoRaceList, {
            props: {
                data,
                categoryIds: ["4a2788f8-e825-4d36-9894-efd4baf1cfae"], // Horse
            },
        });

        expect(wrapper.findAll(`[data-test-id="raceItem"]`)).toHaveLength(1);
    });

    it("only renders races that have not started or are within 1 minute of starting", () => {
        const data = [
            {
                race_id: "31057539-361f-47f4-bf13-e53347f6f037",
                race_name: "BLACKADDER RACING",
                race_number: 5,
                meeting_name: "Oamaru",
                category_id: "4a2788f8-e825-4d36-9894-efd4baf1cfae", // Horse
                advertised_start: 1755228600,
            },
        ];

        const wrapper = mount(NextToGoRaceList, {
            props: {
                data,
                categoryIds: ["4a2788f8-e825-4d36-9894-efd4baf1cfae"],
            },
        });

        // No races are shown (old race data)
        expect(wrapper.findAll(`[data-test-id="raceItem"]`)).toHaveLength(0);
        // Shows "No data" message
        expect(wrapper.get(`[data-test-id="noDataMsg"]`)).toBeDefined();
    });
});
