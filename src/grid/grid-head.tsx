import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsGridHead extends FazBsElement {

    private headItem: JSX.Element | undefined;

    constructor() {
        super();
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                case "extra-classes":
                    this.extraClasses = attribute.value;
                    break;
            }
        }
    }

    get classNames() {
        let classes = [""];
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
    }

    show() {
        this.headItem = <thead id={`faz-bs-head-${this.id}`} class={this.classNames}>{this.content}</thead>;
        render(() => this.headItem, this);
    }
}
