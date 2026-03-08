import { FazBsElement } from "../bs-element";
import { FazBsGridRow } from "./grid-row";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGridCol extends FazBsElement {

    private colItem: JSX.Element;

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

    get classNames() {
        let classes = [""];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    renderCol(): JSX.Element {
        if ((this.parent() as FazBsGridRow)?.isHead) {
            this.colItem = <th id={`faz-bs-col-${this.id}`} class={this.classNames}></th>;
            return this.colItem;
        }
        this.colItem = <td id={`faz-bs-row-${this.id}`} class={this.classNames}></td>;
        return this.colItem;
    }

    show(): void {
        render(() => this.renderCol(), this);
    }
}
