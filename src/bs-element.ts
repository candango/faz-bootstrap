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

import { FazBsAttrKind } from "./bs-attributes";
import { FazElement, toBoolean } from "faz/src";
import { Accessor, createSignal, Setter } from "solid-js";


export class FazBsElement extends FazElement {

    public outline: Accessor<boolean>;
    public setOutline: Setter<boolean>;
    public kind: Accessor<FazBsAttrKind>;
    public setKind: Setter<FazBsAttrKind>;
    public target: Accessor<string|undefined>;
    public setTarget: Setter<string|undefined>;
    public theme: Accessor<string|undefined>;
    public setTheme: Setter<string|undefined>;

    constructor() {
        super();

        [this.outline, this.setOutline] = createSignal<boolean>(false);
        [this.kind, this.setKind] = createSignal<FazBsAttrKind>(undefined);
        [this.target, this.setTarget] = createSignal<string|undefined>(undefined);
        [this.theme, this.setTheme] = createSignal<string|undefined>(undefined);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                case "extra-classes":
                    this.setExtraClasses(attribute.value);
                    break;
                case "kind":
                    this.setKind(attribute.value.toLowerCase() as FazBsAttrKind);
                    break;
                case "outline":
                    this.setOutline(toBoolean(attribute.value));
                    break;
                case "target":
                    this.setTarget(attribute.value);
                    break;
                case "theme":
                    this.setTheme(attribute.value);
                    break;
            }
        }
    }

    public getClasses(baseClass:string|undefined): string[] {
        let classes = <string[]>[baseClass];
        const active = this.active();
        const disabled = this.disabled();

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind()) {
            classes.push(this.kindClass() as string)
        }
        return classes
    }

    get baseClass(): string {
        return "";
    }

    get controlledLink(): string|undefined {
        if (this.disabled() || this.link()===undefined) {
            return undefined;
        }
        return this.link();
    }

    get classNames() {
        let classes = this.getClasses(this.baseClass);
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ").trim();
    }

    get classPrefix(): string {
        return this.baseClass;
    }

    public kindClass(): string|undefined {
        if (this.kind() == undefined) {
            undefined;
        }
        let outline = this.outline() ? "outline-" : "";
        let classPrefix = this.classPrefix.trim() !== "" ? `${this.classPrefix}-` : "";
        return `${classPrefix}${outline}${this.kind()}`;
    }
}
