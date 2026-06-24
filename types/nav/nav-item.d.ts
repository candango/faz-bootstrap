import { FazBsNav } from "./nav";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
export declare class FazBsNavItem extends FazBsElement {
    linkClasses: string;
    private navItemLi;
    private navItemLink;
    private navItemUl;
    previousChild: FazBsNavItem | null;
    constructor();
    get contentChild(): ChildNode;
    get isRoot(): boolean;
    get isDropdown(): boolean;
    get classNames(): string;
    resolveLink(): string | undefined;
    get linkClassNames(): string;
    get dropdownClassNames(): string;
    get roleType(): "button" | "tab" | undefined;
    get root(): FazBsNav | undefined;
    get navItemChildren(): FazBsNavItem[];
    get ariaExpandedValue(): boolean | undefined;
    get dataBsToggleValue(): "dropdown" | undefined;
    addChild<T extends Node>(node: T): T;
    activate(): void;
    deactivate(): void;
    disable(): void;
    onClick(item: FazBsNavItem, event: Event): void;
    renderDropdown(): JSX.Element;
    renderItem(): JSX.Element;
    show(): void;
}
//# sourceMappingURL=nav-item.d.ts.map