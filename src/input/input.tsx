import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsInput extends FazBsElement {

    private input: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["form-control"];
        const active = this.active;
        const disabled = this.disabled;

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind) {
            classes.push("list-group-item-" + this.kind);
        }
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
    }

    show() {
        this.input = <input id={`${this.id}`} class={this.classNames}></input>;
        render(() => this.input, this);
    }
}

customElements.define("faz-bs-input", FazBsInput);
