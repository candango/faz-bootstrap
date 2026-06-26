import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: {
            "faz/src": "faz",
        },
        conditions: ["development", "browser"],
    },
    test: {
        environment: "jsdom",
    },
});
