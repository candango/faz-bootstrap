import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
export type FazBsButtonAttrElementType = "a" | "button" | "input" | "link" | undefined;
export type FazBsButtonAttrSize = "lg" | "sm" | "large" | "small" | undefined;
export type FazBsButtonAttrType = "button" | "reset" | "submit" | undefined;
type FazBsButtonAttrValue = string | string[] | number | undefined;
export declare class FazBsButton extends FazBsElement {
    toggleable: boolean | undefined;
    value: FazBsButtonAttrValue;
    elementType: FazBsButtonAttrElementType;
    size: FazBsButtonAttrSize;
    type: FazBsButtonAttrType;
    constructor();
    getClasses(baseClass: string | undefined): string[];
    get baseClass(): string;
    get controlledLink(): string | undefined;
    get buttonElement(): JSX.Element;
    show(): void;
}
export {};
//# sourceMappingURL=button.d.ts.map