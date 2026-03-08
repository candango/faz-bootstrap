import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsListGroupItem extends FazBsElement {

    private item: JSX.Element | undefined;
    private itemContent: JSX.Element | undefined;

    constructor() {
        super();
    }

    get classNames() {
        let classes = ["list-group-item"];
        const active = this.active;
        const disabled = this.disabled;

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind) {
            classes.push("list-group-item-" + this.kind);
        }
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ");
    }

    get contentChild() {
        if (this.link === undefined) {
            return super.contentChild;
        }
        return this.itemContent as unknown as ChildNode;
    }

    show() {
        this.itemContent = <>{this.content}</>;
        if (this.link !== undefined) {
            this.itemContent = <a href={this.resolveLink()}>{this.content}</a>
        }
        this.item = <li role={this.fazRole} id={`faz-bs-list-group-item-${this.id}`} class={this.classNames}>{this.itemContent}</li>;
        if (this.active) {
            (this.item as HTMLElement).ariaCurrent = "true";
        }
        render(() => this.item, this);
    }
}
