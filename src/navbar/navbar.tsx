import { FazBsElement } from "../bs-element";
import { FazBsNavbarBrand } from "./navbar-brand";
import { FazBsNavbarToggler } from "./navbar-toggler";
import { FazBsNavbarCollapse } from "./navbar-collapse";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

 
export class FazBsNavbar extends FazBsElement {

    // private _class: string = ""
    private container: JSX.Element;
    private nav: JSX.Element;

    get classNames() {
        const classes = ["navbar"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        if (this.kind()) {
            classes.push(this.kind() as string);
        }
        return classes.join(" ");
    }

    get contentChild() {
        return this.container as ChildNode;
    }

    renderContainer(): JSX.Element {
        this.container = <div id={`navbar-container-${this.id}`} class="container-fluid"></div>;
        return this.container;
    }

    show() {
        this.nav = <nav id={`navbar-${this.id}`} class={this.classNames}>{this.renderContainer()}</nav>;
        render(() => this.nav, this);
    }
}

export { FazBsNavbarBrand } from "./navbar-brand";
export { FazBsNavbarToggler } from "./navbar-toggler";
export { FazBsNavbarCollapse } from "./navbar-collapse";

customElements.define("faz-bs-navbar", FazBsNavbar);
customElements.define("faz-bs-navbar-brand", FazBsNavbarBrand);
customElements.define("faz-bs-navbar-toggler", FazBsNavbarToggler);
customElements.define("faz-bs-navbar-collapse", FazBsNavbarCollapse);
