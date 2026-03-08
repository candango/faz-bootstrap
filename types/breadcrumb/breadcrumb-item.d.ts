import { FazBsElement } from "../bs-element";
export declare class FazBsBreadcrumbItem extends FazBsElement {
    private itemLi;
    private itemA;
    private itemSpam;
    get aClassNames(): string;
    get spamClassNames(): string;
    get baseClass(): string;
    get contentChild(): ChildNode;
    get isEdge(): boolean;
    private ariaCurrentValue;
    afterShow(): void;
    disconnect(): void;
    show(): void;
}
//# sourceMappingURL=breadcrumb-item.d.ts.map