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
import { render } from "solid-js/web";


export class FazBsLink extends FazBsElement {

    private linkElement: JSX.Element;

    constructor() {
        super();
    }

    get classNames() {
        let classes = [];
        const active = this.active();
        const disabled = this.disabled();

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind()) {
            classes.push("link-" + this.kind());
        }
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        console.log(classes)
        return classes.join(" ");
    }

    show() {
        this.linkElement = <a id={`faz-bs-list-group-${this.id}`} href={this.controlledLink} class={this.classNames}>{this.content()}</a>;
        render(() => this.linkElement, this);
    }
}

customElements.define("faz-bs-link", FazBsLink);
