import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

 
export class FazBsNavbarCollapse extends FazBsElement {

    private collapse: JSX.Element;

    get classNames() {
        const classes = ["collapse navbar-collapse"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join("");
    }

    get contentChild() {
        return this.collapse as ChildNode;
    }

    disconnect() {
        (this.collapse as Node).parentNode?.removeChild(this.collapse as Node);
    }

    show() {
        this.collapse = <div id={`faz-bs-navbar-collapse-${this.id}`} class={this.classNames}></div>;
        render(() => this.collapse, this.parent()?.contentChild as Node);
    }
}
