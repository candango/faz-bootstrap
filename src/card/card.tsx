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

import { FazBsCardBody } from "./card-body";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export class FazBsCard extends FazBsElement {

    private card: JSX.Element;

    constructor() {
        super();
    }

    get baseClass(): string {
        return "card";
    }

    get classPrefix(): string {
        return "text-bg";
    }

    show() {
        this.card = <div id={`faz-bs-card-${this.id}`} class={this.classNames}>{this.content()}</div>;
        render(() => this.card, this);
    }
}

customElements.define("faz-bs-card", FazBsCard);
customElements.define("faz-bs-card-body", FazBsCardBody);
