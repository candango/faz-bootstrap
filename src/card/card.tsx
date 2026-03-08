import { FazBsCardBody } from "./card-body";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export class FazBsCard extends FazBsElement {

    private card: JSX.Element | undefined;

    constructor() {
        super();
    }

    get baseClass(): string {
        return "card";
    }

    get classPrefix(): string {
        return "text-bg";
    }

    show() {
        this.card = <div id={`faz-bs-card-${this.id}`} class={this.classNames}>{this.content}</div>;
        render(() => this.card, this);
    }
}

customElements.define("faz-bs-card", FazBsCard);
customElements.define("faz-bs-card-body", FazBsCardBody);
