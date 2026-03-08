import { FazBsElement } from "../bs-element";
import { FazBsBreadcrumbItem } from "./breadcrumb-item";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBreadcrumb extends FazBsElement {

    private itemOl: JSX.Element;

    get baseClass(): string {
        return "breadcrumb";
    }

    get contentChild() {
        return this.itemOl as ChildNode;
    }

    show() {
        this.itemOl = <ol class={this.classNames}></ol>;
        render(() => <nav id={`faz-bs-breadcrumb--${this.id}`}
               aria-label="breadcrumb">
               {this.itemOl} 
            </nav>, this);
        this.classList.add("faz-bs-breadcrumb-rendered");
    }
}

export { FazBsBreadcrumbItem } from "./breadcrumb-item";

customElements.define("faz-bs-breadcrumb", FazBsBreadcrumb);
customElements.define("faz-bs-breadcrumb-item", FazBsBreadcrumbItem);
