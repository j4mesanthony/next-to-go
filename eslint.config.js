import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        extends: ["js/recommended"],
        files: ["**/*.{js,vue}"],
        ignores: ["dist/**"],
        languageOptions: { globals: globals.browser },
        plugins: { js },
    },
    pluginVue.configs["flat/essential"],
]);
