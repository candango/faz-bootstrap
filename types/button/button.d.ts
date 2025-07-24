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
import { Accessor, Setter } from "solid-js";
export type FazBsButtonAttrElementType = "a" | "button" | "input" | "link" | undefined;
export type FazBsButtonAttrSize = "lg" | "sm" | "large" | "small" | undefined;
export type FazBsButtonAttrType = "button" | "reset" | "submit" | undefined;
type FazBsButtonAttrValue = string | string[] | number | undefined;
export declare class FazBsButton extends FazBsElement {
    toggleable: Accessor<boolean | undefined>;
    setToggleable: Setter<boolean | undefined>;
    value: Accessor<FazBsButtonAttrValue>;
    setValue: Setter<FazBsButtonAttrValue>;
    elementType: Accessor<FazBsButtonAttrElementType>;
    setElementType: Setter<FazBsButtonAttrElementType>;
    size: Accessor<FazBsButtonAttrSize>;
    setSize: Setter<FazBsButtonAttrSize>;
    type: Accessor<FazBsButtonAttrType>;
    setType: Setter<FazBsButtonAttrType>;
    constructor();
    getClasses(baseClass: string | undefined): string[];
    get baseClass(): string;
    get controlledLink(): string | undefined;
    get buttonElement(): JSX.Element;
    show(): void;
}
export {};
//# sourceMappingURL=button.d.ts.map