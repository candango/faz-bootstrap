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
import { FazBsListGroupItem } from "./list-group-item";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsListGroup extends FazBsElement {

    private listGroup: JSX.Element;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["list-group"];
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ");
    }

    show() {
        this.listGroup = <ul role={this.fazRole()} id={`faz-bs-list-group-${this.id}`} class={this.classNames}>{this.content()}</ul>;
        render(() => this.listGroup, this);
    }
}

export { FazBsListGroupItem } from "./list-group-item";

customElements.define("faz-bs-list-group", FazBsListGroup);
customElements.define("faz-bs-list-group-item", FazBsListGroupItem);
