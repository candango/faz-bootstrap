import { FazElement } from "faz/src";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";
 
export class FazBsNavbarBrand extends FazElement {

    private brand: JSX.Element | undefined;

    get classNames() {
        let classes = ["navbar-brand"];
        if (this.linkIsVoid) {
            classes.push("mb-0");
            classes.push("h1");
        }
        return classes.join(" ");
    }

    renderBrand(): JSX.Element {
        if (this.linkIsVoid) {
            this.brand = <span id={`faz-bs-navbar-brand-${this.id}`} class={this.classNames}>{this.content}</span>;
        } else {
            this.brand = <a id={`faz-bs-navbar-brand-${this.id}`} href={this.link} class={this.classNames}>{this.content}</a>;
        }
        return this.brand;
    }

    show() {
        render(() => this.renderBrand(), this);
    }
}
