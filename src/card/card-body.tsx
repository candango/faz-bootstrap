import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsCardBody extends FazBsElement {

    private cardBody: JSX.Element | undefined;

    constructor() {
        super();
    }

    get baseClass(): string {
        return "card-body";
    }

    show() {
        this.cardBody = <div id={`faz-bs-card-body-${this.id}`} class={this.classNames}>{this.content}</div>;
        render(() => this.cardBody, this);
    }
}
