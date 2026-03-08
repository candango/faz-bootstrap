import { FazBsElement } from "../bs-element";
import { createEffect } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBreadcrumbItem extends FazBsElement {

    private itemLi: JSX.Element | undefined;
    private itemA: JSX.Element | undefined;
    private itemSpan: JSX.Element | undefined;

    get aClassNames() {
        let classes = [];
        if (this.linkIsVoid) {
            classes.push("d-none");
        }
        return classes.join(" ");
    }

    get spanClassNames() {
        let classes = [];
        if (!this.linkIsVoid) {
            classes.push("d-none");
        }
        return classes.join(" ");
    }

    get baseClass(): string {
        return "breadcrumb-item";
    }

    get contentChild() {
        if (this.linkIsVoid) {
            return this.itemSpan as unknown as ChildNode;
        } 
        return this.itemA as unknown as ChildNode;
    }

    get isEdge(): boolean {
        const parent = this.parent;
        if (parent === undefined) {
            return false;
        }
        return parent?.fazChildren[parent?.fazChildren?.length-1] === this;
    }

    private ariaCurrentValue(): "page"|undefined {
        if (this.isEdge) {
            return "page";
        }
        return undefined;
    }

    afterShow(): void {
        createEffect((orig) => {
            if (orig != this.link){
                let itemOrig = this.itemSpan as unknown as ChildNode;
                let itemTarget = this.itemA as unknown as ChildNode;
                if (this.linkIsVoid) {
                    itemOrig = this.itemA as unknown as ChildNode;
                    itemTarget = this.itemSpan as unknown as ChildNode;
                }
                if (itemOrig?.firstChild != null) {
                    while(itemOrig.firstChild) {
                        itemTarget.appendChild(itemOrig.firstChild);
                    }
                }
            }
            return this.link;
        }, this.link);
    }

    disconnect() {
        (this.itemLi as unknown as Node)?.parentNode?.removeChild(this.itemLi as unknown as Node);
    }

    show() {
        this.itemA = <a class={this.aClassNames} href={this.link}>{this.content}</a>;
        this.itemSpan = <span class={this.spanClassNames}>{this.content}</span>;
        this.itemLi = <li 
               id={`faz-bs-breadcrumb-item-${this.id}`}
               class={this.classNames}
               aria-current={this.ariaCurrentValue()}
               aria-label="breadcrumb">
               {this.itemA}{this.itemSpan}
               </li>;
        render(() => this.itemLi, this.parent?.contentChild as unknown as Node);
    }
}
