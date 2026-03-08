import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsAlert extends FazBsElement {

    private alertItem: JSX.Element;

    constructor() {
        super();
    }

    get baseClass(): string {
        return "alert";
    }

    show() {
        this.alertItem = <div role="alert" id={`faz-bs-alert-${this.id}`} class={this.classNames}>{this.content}</div>;
        render(() => this.alertItem, this);
    }
}

customElements.define("faz-bs-alert", FazBsAlert);
