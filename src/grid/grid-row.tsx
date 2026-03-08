import { FazBsElement } from "../bs-element";
import { FazBsGridHead } from "./grid-head";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGridRow extends FazBsElement {

    private rowItem: JSX.Element;

    constructor() {
        super();
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                    this.setExtraClasses(attribute.value);
                    break;
            }
        }
    }

    get isHead() {
        if (!(this.parent() instanceof FazBsGridHead)) {
            return true;
        }
        return true;
    }

    get classNames() {
        let classes = [""];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.rowItem = <tr id={`faz-bs-row-${this.id}`} class={this.classNames} ></tr>;
        render(() => this.rowItem, this);
    }
}
