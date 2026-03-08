import { FazElement } from "faz/src";


export class FazBsNavItemContent extends FazElement {
    show() {
        const contentSpan = document.createElement("span");
        this.appendChild(contentSpan);
    }
}
