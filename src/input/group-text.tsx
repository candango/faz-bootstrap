import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsInputGroupText extends FazBsElement {

    private groupText: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["input-group-text"];
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
        this.groupText = <span id={this.id} class={this.classNames}>{this.content}</span>;
        render(() => this.groupText, this);
    }
}
