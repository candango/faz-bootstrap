import { FazBsElement } from "../bs-element";
import { render } from "solid-js/web";

export class FazBsNavbarToggler extends FazBsElement {

    get classNames() {
        let classes = ["navbar-toggler"];
        return classes.join(" ");
    }

    show() {
        render(() => <button class={this.classNames}
            id={`faz-bs-navbar-toggler-${this.id}`}
            data-bs-toggle="collapse"
            data-bs-target={`#faz-bs-navbar-collapse-${this.target()}`}>    
        </button> , this);
    }
}
