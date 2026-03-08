import { FazBsElement } from "../bs-element";
import { toBoolean } from "faz/src";
import { JSX } from "solid-js/jsx-runtime";
import { Accessor, createSignal, Setter } from "solid-js";
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

    public toggleable: Accessor<boolean|undefined>;
    public setToggleable: Setter<boolean|undefined>;
    public value: Accessor<FazBsButtonAttrValue>;
    public setValue: Setter<FazBsButtonAttrValue>;
    public elementType: Accessor<FazBsButtonAttrElementType>;
    public setElementType: Setter<FazBsButtonAttrElementType>;
    public size: Accessor<FazBsButtonAttrSize>;
    public setSize: Setter<FazBsButtonAttrSize>;
    public type: Accessor<FazBsButtonAttrType>;
    public setType: Setter<FazBsButtonAttrType>;

    constructor() {
        super();
        [this.value, this.setValue] = createSignal<FazBsButtonAttrValue>(undefined);
        [this.elementType, this.setElementType] = createSignal<FazBsButtonAttrElementType>("button");
        [this.size, this.setSize] = createSignal<FazBsButtonAttrSize>(undefined);
        [this.toggleable, this.setToggleable] = createSignal<boolean|undefined>(undefined);
        [this.type, this.setType] = createSignal<FazBsButtonAttrType>(undefined);
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "elementtype":
                case "element-type":
                    this.setElementType(attribute.value.toLowerCase() as FazBsButtonAttrElementType);
                    break;
                case "size":
                    this.setSize(attribute.value.toLowerCase() as FazBsButtonAttrSize);
                    break;
                case "toggleable":
                    this.setToggleable(toBoolean(attribute.value));
                    break;
                case "type":
                    this.setType(attribute.value.toLowerCase() as FazBsButtonAttrType);
                    break;
                case "value":
                    this.setValue(attribute.value);
                    break;
            }
        }
    }

    public getClasses(baseClass:string|undefined): string[] {
        let classes = super.getClasses(baseClass);
        if (this.size()) {
            let size = this.size() as string;
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
        if (this.disabled() || this.link()===undefined) {
            return undefined;
        }
        return this.link();
    }

    get buttonElement(): JSX.Element {
        let element: JSX.Element;
        if (this.elementType() == "a" || this.elementType() == "link") {
            element = <a id={`faz-bs-button-${this.id}`} class={this.classNames}
                 href={this.controlledLink} type={this.type()}
                 role="button" aria-disabled={this.disabled()}>{this.content()}</a>;
        }
        if (this.elementType() == "input") {
            element = <input id={`faz-bs-button-${this.id}`} class={this.classNames}
                type={this.type()} value={this.value()}
                disabled={this.disabled()}>{this.content()}</input>;
        }
        if (this.elementType() == "button" || this.elementType == undefined) {
            element = <button id={`faz-bs-button-${this.id}`} class={this.classNames}
                type={this.type()} disabled={this.disabled()}>{this.content()}</button>;
        }
        (element as HTMLElement).addEventListener("click", () => {
            if (this.toggleable()===true) {
                let active = this.active();
                this.setActive(!active);
            }
        });
        return element;
    } 

    show() {
        render(() => this.buttonElement, this);
    }
}

customElements.define("faz-bs-button", FazBsButton);
