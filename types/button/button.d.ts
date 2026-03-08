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