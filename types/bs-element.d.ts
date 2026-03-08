import { FazBsAttrKind } from "./bs-attributes";
import { FazElement } from "faz/src";
import { Accessor, Setter } from "solid-js";
export declare class FazBsElement extends FazElement {
    outline: Accessor<boolean>;
    setOutline: Setter<boolean>;
    kind: Accessor<FazBsAttrKind>;
    setKind: Setter<FazBsAttrKind>;
    target: Accessor<string | undefined>;
    setTarget: Setter<string | undefined>;
    theme: Accessor<string | undefined>;
    setTheme: Setter<string | undefined>;
    constructor();
    getClasses(baseClass: string | undefined): string[];
    get baseClass(): string;
    get controlledLink(): string | undefined;
    get classNames(): string;
    get classPrefix(): string;
    kindClass(): string | undefined;
}
//# sourceMappingURL=bs-element.d.ts.map