import { FazBsElement } from "../bs-element";
import { toBoolean } from "faz";
import { bindReactive } from "faz";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export type FazBsButtonAttrElementType = 
      | "a"
      | "button"
      | "input"
      | "link"
      | undefined;

export type FazBsButtonAttrSize = 
      | "lg"
      | "sm"
      | "large"
      | "small"
      | undefined;

export type FazBsButtonAttrType = 
      | "button"
      | "reset"
      | "submit"
      | undefined;

type FazBsButtonAttrValue = string | string[] | number | undefined;

export class FazBsButton extends FazBsElement {

    public toggleable: boolean | undefined = undefined;
    public value: FazBsButtonAttrValue = undefined;
    public elementType: FazBsButtonAttrElementType = "button";
    public size: FazBsButtonAttrSize = undefined;
    public type: FazBsButtonAttrType = undefined;

    constructor() {
        super();
        bindReactive(this, "value", undefined);
        bindReactive(this, "elementType", "button");
        bindReactive(this, "size", undefined);
        bindReactive(this, "toggleable", undefined);
        bindReactive(this, "type", undefined);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "elementtype":
                case "element-type":
                    this.elementType = attribute.value.toLowerCase() as FazBsButtonAttrElementType;
                    break;
                case "size":
                    this.size = attribute.value.toLowerCase() as FazBsButtonAttrSize;
                    break;
                case "toggleable":
                    this.toggleable = toBoolean(attribute.value);
                    break;
                case "type":
                    this.type = attribute.value.toLowerCase() as FazBsButtonAttrType;
                    break;
                case "value":
                    this.value = attribute.value;
                    break;
            }
        }
    }

    public getClasses(baseClass:string|undefined): string[] {
        let classes = super.getClasses(baseClass);
        if (this.size) {
            let size = this.size as string;
            if (size === "large") {
                size = "lg";
            }
            if (size === "small") {
                size = "sm";
            }
            classes.push(`${this.baseClass}-${size}`);
        }
        return classes
    }

    get baseClass(): string {
        return "btn";
    }

    get controlledLink(): string|undefined {
        if (this.disabled || this.link === undefined) {
            return undefined;
        }
        return this.link;
    }

    get buttonElement(): JSX.Element {
        let element: JSX.Element | undefined;
        if (this.elementType == "a" || this.elementType == "link") {
            element = <a id={`faz-bs-button-${this.id}`} class={this.classNames}
                 href={this.controlledLink} type={this.type}
                 role="button" aria-disabled={this.disabled}>{this.content}</a>;
        } else if (this.elementType == "input") {
            element = <input id={`faz-bs-button-${this.id}`} class={this.classNames}
                type={this.type} value={this.value as string}
                disabled={this.disabled}>{this.content}</input>;
        } else {
            element = <button id={`faz-bs-button-${this.id}`} class={this.classNames}
                type={this.type} disabled={this.disabled}>{this.content}</button>;
        }
        (element as HTMLElement).addEventListener("click", () => {
            if (this.toggleable === true) {
                this.active = !this.active;
            }
        });
        return element;
    } 

    show() {
        render(() => this.buttonElement, this);
    }
}

customElements.define("faz-bs-button", FazBsButton);
