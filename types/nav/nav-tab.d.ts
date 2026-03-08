import { FazBsElement } from "../bs-element";
import { Accessor, Setter } from "solid-js";
export declare class FazBsNavTab extends FazBsElement {
    fade: Accessor<boolean>;
    setFade: Setter<boolean>;
    private navTabContainer;
    constructor();
    get ariaLabelledby(): string;
    get classNames(): string;
    get contentChild(): HTMLElement;
    show(): void;
}
//# sourceMappingURL=nav-tab.d.ts.map