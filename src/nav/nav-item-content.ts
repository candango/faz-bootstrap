import { FazElement } from "faz";


export class FazBsNavItemContent extends FazElement {
    show() {
        const contentSpan = document.createElement("span");
        this.appendChild(contentSpan);
    }
}
