import { afterEach, beforeAll, beforeEach, describe, expect, test, vitest } from "vitest";
import { FazBsInputFilterbox } from "../src/input/filterbox";

const flush = async () => {
    await Promise.resolve();
    await vitest.runAllTimersAsync();
};

describe("FazBsInputFilterbox", () => {
    beforeAll(() => {
        if (!customElements.get("faz-bs-input-filterbox")) {
            customElements.define("faz-bs-input-filterbox", FazBsInputFilterbox);
        }
    });

    beforeEach(() => {
        vitest.useFakeTimers();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        vitest.useRealTimers();
        document.body.innerHTML = "";
    });

    test("sets items through the public setItems API", () => {
        const filterbox = document.createElement(
            "faz-bs-input-filterbox"
        ) as FazBsInputFilterbox;

        filterbox.setItems([
            { name: "Item 1", value: 1 },
            { name: "Other", value: 2 },
        ]);

        expect(filterbox.items).toHaveLength(2);
        expect(filterbox.defaultFilterCallback("Item")).toEqual([
            { name: "Item 1", value: 1 },
        ]);
    });

    test("allows init callback to populate items through setItems", async () => {
        (window as unknown as { initFilterbox: (filterbox: FazBsInputFilterbox) => void }).initFilterbox = (
            filterbox: FazBsInputFilterbox
        ) => {
            filterbox.setItems([{ name: "Item 1", value: 1 }]);
        };

        document.body.innerHTML = `<faz-bs-input-filterbox id="filterbox" initcallback="initFilterbox"></faz-bs-input-filterbox>`;
        await flush();

        const filterbox = document.getElementById(
            "filterbox"
        ) as FazBsInputFilterbox;

        expect(filterbox.items).toEqual([{ name: "Item 1", value: 1 }]);
    });

    test("keeps selected name visible and technical value hidden", async () => {
        document.body.innerHTML = `<faz-bs-input-filterbox id="filterbox" name="item_id"></faz-bs-input-filterbox>`;
        await flush();

        const filterbox = document.getElementById(
            "filterbox"
        ) as FazBsInputFilterbox;

        filterbox.setItems([{ name: "Item 1", value: 1 }]);

        const input = filterbox.querySelector(
            "input[type='text']"
        ) as HTMLInputElement;
        input.value = "Item";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));

        await vitest.advanceTimersByTimeAsync(500);

        const option = filterbox.querySelector(
            "a[item-name='Item 1']"
        ) as HTMLAnchorElement;
        expect(option).not.toBeNull();

        option.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await flush();

        const hidden = filterbox.querySelector(
            "input[type='hidden']"
        ) as HTMLInputElement;

        expect(input.value).toBe("Item 1");
        expect(filterbox.selectedName).toBe("Item 1");
        expect(filterbox.value).toBe("1");
        expect(hidden.name).toBe("item_id");
        expect(hidden.value).toBe("1");
    });

    test("clears selected value when the visible text is edited", async () => {
        document.body.innerHTML = `<faz-bs-input-filterbox id="filterbox"></faz-bs-input-filterbox>`;
        await flush();

        const filterbox = document.getElementById(
            "filterbox"
        ) as FazBsInputFilterbox;

        filterbox.setItems([{ name: "Item 1", value: 1 }]);

        const input = filterbox.querySelector(
            "input[type='text']"
        ) as HTMLInputElement;
        input.value = "Item";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await vitest.advanceTimersByTimeAsync(500);

        const option = filterbox.querySelector(
            "a[item-name='Item 1']"
        ) as HTMLAnchorElement;
        option.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await flush();

        input.value = "Manual text";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await flush();

        const hidden = filterbox.querySelector(
            "input[type='hidden']"
        ) as HTMLInputElement;

        expect(filterbox.selectedName).toBe("");
        expect(filterbox.value).toBe("");
        expect(hidden.value).toBe("");
    });
});
