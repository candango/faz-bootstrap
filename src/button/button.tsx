/**
 * Copyright 2018-2025 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { Accessor, createSignal, Setter } from "solid-js";
import { render } from "solid-js/web";

export type FazBsButtonAttrElementType = 
      | "a"
      | "button"
      | "input"
      | "link"
      | undefined;

export type FazBsButtonAttrType = 
      | "button"
      | "reset"
      | "submit"
      | undefined;

type FazBsButtonAttrValue = string | string[] | number | undefined;

export class FazBsButton extends FazBsElement {

    public value: Accessor<FazBsButtonAttrValue>;
    public setValue: Setter<FazBsButtonAttrValue>;
    public elementType: Accessor<FazBsButtonAttrElementType>;
    public setElementType: Setter<FazBsButtonAttrElementType>;
    public type: Accessor<FazBsButtonAttrType>;
    public setType: Setter<FazBsButtonAttrType>;

    constructor() {
        super();
        [this.value, this.setValue] = createSignal<FazBsButtonAttrValue>(undefined);
        [this.elementType, this.setElementType] = createSignal<FazBsButtonAttrElementType>("button");
        [this.type, this.setType] = createSignal<FazBsButtonAttrType>(undefined);
        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "elementtype":
                case "element-type":
                    this.setElementType(attribute.value.toLowerCase() as FazBsButtonAttrElementType);
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
        if (this.elementType() == "a" || this.elementType() == "link") {
            return <a id={`faz-bs-button-${this.id}`} class={this.classNames}
                 href={this.controlledLink} type={this.type()}
                 role="button">{this.content()}</a>;
        }
        if (this.elementType() == "input") {
            return <input id={`faz-bs-button-${this.id}`} class={this.classNames}
                type={this.type()} value={this.value()}>{this.content()}</input>;
        }
        return <button id={`faz-bs-button-${this.id}`} class={this.classNames}
            type={this.type()}>{this.content()}</button>;
    } 

    show() {
        render(() => this.buttonElement, this);
    }
}

customElements.define("faz-bs-button", FazBsButton);
