import { FazBsInputGroupText } from "./group-text";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsInputGroup extends FazBsElement {

    private group: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["input-group"];
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
        this.group = <div id={this.id} class={this.classNames}>{this.content}</div>;
        render(() => this.group, this);
    }
}

customElements.define("faz-bs-input-group", FazBsInputGroup);
customElements.define("faz-bs-input-group-text", FazBsInputGroupText);
