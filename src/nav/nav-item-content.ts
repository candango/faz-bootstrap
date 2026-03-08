import { FazElement } from "faz/src";


export class FazBsNavItemContent extends FazElement {
    show() {
        const contentSpam = document.createElement("spam");
        this.appendChild(contentSpam);
    }
}
