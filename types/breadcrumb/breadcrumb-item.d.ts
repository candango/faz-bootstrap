import { FazBsElement } from "../bs-element";
export declare class FazBsBreadcrumbItem extends FazBsElement {
    private itemLi;
    private itemA;
    private itemSpan;
    get aClassNames(): string;
    get spanClassNames(): string;
    get baseClass(): string;
    get contentChild(): ChildNode;
    get isEdge(): boolean;
    private ariaCurrentValue;
    afterShow(): void;
    disconnect(): void;
    show(): void;
}
//# sourceMappingURL=breadcrumb-item.d.ts.map