import { FazBsElement } from "../bs-element";
import { FazBsGridCol } from "./grid-col";
import { FazBsGridHead } from "./grid-head";
import { FazBsGridRow } from "./grid-row";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGrid extends FazBsElement {

    private tableItem: JSX.Element;

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
        let classes = ["table"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.tableItem = <table id={`faz-bs-table-${this.id}`} class={this.classNames}></table>;
        render(() => this.tableItem, this);
    }
}

customElements.define("faz-bs-grid", FazBsGrid);
customElements.define("faz-bs-grid-head", FazBsGridHead);
customElements.define("faz-bs-grid-row", FazBsGridRow);
customElements.define("faz-bs-grid-col", FazBsGridCol);
