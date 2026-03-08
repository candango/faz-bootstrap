import { FazBsElement } from "../bs-element";
import { FazBsListGroupItem } from "./list-group-item";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsListGroup extends FazBsElement {

    private listGroup: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["list-group"];
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
    }

    show() {
        this.listGroup = <ul role={this.fazRole} id={`faz-bs-list-group-${this.id}`} class={this.classNames}>{this.content}</ul>;
        render(() => this.listGroup, this);
    }
}

export { FazBsListGroupItem } from "./list-group-item";

customElements.define("faz-bs-list-group", FazBsListGroup);
customElements.define("faz-bs-list-group-item", FazBsListGroupItem);
