import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsLink extends FazBsElement {

    private linkElement: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = [];
        const active = this.active;
        const disabled = this.disabled;

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind) {
            classes.push("link-" + this.kind);
        }
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
    }

    show() {
        this.linkElement = <a id={`faz-bs-list-group-${this.id}`} href={this.controlledLink} class={this.classNames}>{this.content}</a>;
        render(() => this.linkElement, this);
    }
}

customElements.define("faz-bs-link", FazBsLink);
