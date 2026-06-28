import { delay, http, HttpResponse } from "msw";

import { baseItems, filterItemsByQuery } from "./data";

export const handlers = [
    http.get("/items", async ({ request }) => {
        const query = new URL(request.url).searchParams.get("q") ?? "";
        await delay(350);
        return HttpResponse.json(filterItemsByQuery(query));
    }),
    http.post("/save", async ({ request }) => {
        const data = await request.json() as { [key: string]: string };
        const errors: Record<string, string[]> = {};

        if (data.email === "") {
            errors.email = ["Missing email"];
        }
        if (data.description === "") {
            errors.description = ["Missing description"];
        }

        await delay(150);

        if (Object.keys(errors).length > 0) {
            return HttpResponse.json({ errors }, { status: 400 });
        }

        return HttpResponse.json({ message: "Data saved." });
    })
];

export { baseItems, filterItemsByQuery };
