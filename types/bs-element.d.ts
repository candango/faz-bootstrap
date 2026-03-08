import { FazBsAttrKind } from "./bs-attributes";
import { FazElement } from "faz/src";
export declare class FazBsElement extends FazElement {
    outline: boolean;
    kind: FazBsAttrKind;
    target: string | undefined;
    theme: string | undefined;
    constructor();
    getClasses(baseClass: string | undefined): string[];
    get baseClass(): string;
    get controlledLink(): string | undefined;
    get classNames(): string;
    get classPrefix(): string;
    kindClass(): string | undefined;
}
//# sourceMappingURL=bs-element.d.ts.map