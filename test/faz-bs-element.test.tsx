import { FazBsElement } from "../src/bs-element";
import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest";
import { createEffect, createRoot } from "solid-js";
import { render } from "solid-js/web";

class TestBsElement extends FazBsElement {
    public doOutlineChanged: boolean = false;
    public doKindChanged: boolean = false;
    public doTargetChanged: boolean = false;
    public doThemeChanged: boolean = false;

    constructor() {
        super();

        createRoot(() => {
            createEffect((prevOutline) => {
                if (this.outline !== prevOutline) {
                    this.doOutlineChanged = true;
                }
            }, false);

            createEffect((prevKind) => {
                if (this.kind !== prevKind) {
                    this.doKindChanged = true;
                }
            }, undefined);

            createEffect((prevTarget) => {
                if (this.target !== prevTarget) {
                    this.doTargetChanged = true;
                }
            }, undefined);

            createEffect((prevTheme) => {
                if (this.theme !== prevTheme) {
                    this.doThemeChanged = true;
                }
            }, undefined);
        });
    }

    get baseClass(): string {
        return "btn";
    }

    show() {
        render(() => <div id={`faz_bs_test_${this.id}`} data-testid={`rendered_div_${this.id}`}>{this.content}</div>, this);
    }
}

if (!customElements.get("faz-bs-test-element")) {
    customElements.define("faz-bs-test-element", TestBsElement);
}

describe("FazBsElement", () => {
    beforeEach(() => {
        vitest.useFakeTimers();
        document.body.innerHTML = "";
    });

    afterEach(() => {
        vitest.useRealTimers();
        document.body.innerHTML = "";
    });

    test("maps bootstrap attributes and classes", () => {
        document.body.innerHTML = `
            <faz-bs-test-element
                id="outer"
                active="true"
                disabled="true"
                kind="primary"
                outline="true"
                target="modal-1"
                theme="dark"
                extra-classes="shadow-lg"
                href="#cta"
            ></faz-bs-test-element>
        `;

        const outerElement = document.getElementById("outer") as TestBsElement;

        expect(outerElement.kind).toBe("primary");
        expect(outerElement.outline).toBeTruthy();
        expect(outerElement.target).toBe("modal-1");
        expect(outerElement.theme).toBe("dark");
        expect(outerElement.doOutlineChanged).toBeTruthy();
        expect(outerElement.doKindChanged).toBeTruthy();
        expect(outerElement.doTargetChanged).toBeTruthy();
        expect(outerElement.doThemeChanged).toBeTruthy();
        expect(outerElement.kindClass()).toBe("btn-outline-primary");
        expect(outerElement.classNames).toContain("btn");
        expect(outerElement.classNames).toContain("active");
        expect(outerElement.classNames).toContain("disabled");
        expect(outerElement.classNames).toContain("btn-outline-primary");
        expect(outerElement.classNames).toContain("shadow-lg");
        expect(outerElement.controlledLink).toBeUndefined();

        outerElement.disabled = false;
        expect(outerElement.controlledLink).toBe("#cta");
    });

    test("renders wrapper content and preserves faz parent-child relationships", async () => {
        document.body.innerHTML = `
            <faz-bs-test-element id="outer">
                <faz-bs-test-element id="inner">Inner text</faz-bs-test-element>
            </faz-bs-test-element>
        `;

        await vitest.runAllTimersAsync();

        const outerElement = document.getElementById("outer") as unknown as FazBsElement;
        const innerElement = document.getElementById("inner") as unknown as FazBsElement;
        const outerDiv = outerElement.contentChild as Element;
        const innerDiv = innerElement.contentChild as Element;

        expect(outerElement.fazChildren.length).toBe(1);
        expect(outerElement.fazChildren[0]).toBe(innerElement);
        expect(innerElement.parent).toBe(outerElement);
        expect(outerDiv.tagName).toBe("DIV");
        expect(innerDiv.tagName).toBe("DIV");
        expect(outerDiv.querySelector("#inner")).toBe(innerElement);
    });
});
