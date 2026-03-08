import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsCalendar extends FazBsElement {

    private divElement: JSX.Element;

    constructor() {
        super();
    }

    get classNames() {
        let classes = [];
        const active = this.active();
        const disabled = this.disabled();

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind()) {
            classes.push("link-" + this.kind());
        }
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        console.log(classes)
        return classes.join(" ");
    }

    get baseClass(): string {
        return "faz-bs-calendar";
    }

    show() {
        this.divElement = <div id={`faz-bs-calendar-${this.id}`} class={this.classNames}></div>;
        render(() => this.divElement, this);
    }
}

customElements.define("faz-bs-calendar", FazBsCalendar);
