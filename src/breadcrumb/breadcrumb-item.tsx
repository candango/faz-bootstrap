import { FazBsElement } from "../bs-element";
import { createEffect } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBreadcrumbItem extends FazBsElement {

    private itemLi: JSX.Element;
    private itemA: JSX.Element;
    private itemSpam: JSX.Element;

    get aClassNames() {
        let classes = [];
        if (this.linkIsVoid) {
            classes.push("d-none");
        }
        return classes.join(" ");
    }

    get spamClassNames() {
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
            return this.itemSpam as ChildNode;
        } 
        return this.itemA as ChildNode;
    }

    get isEdge(): boolean {
        const parent = this.parent();
        if (parent === undefined) {
            return false;
        }
        return parent?.fazChildren()[parent?.fazChildren()?.length-1] === this;
    }

    private ariaCurrentValue(): "page"|undefined {
        if (this.isEdge) {
            return "page";
        }
        return undefined;
    }

    afterShow(): void {
        createEffect((orig) => {
            if (orig != this.link()){
                let itemOrig = this.itemSpam as ChildNode;
                let itemTarget = this.itemA as ChildNode;
                if (this.linkIsVoid) {
                    itemOrig = this.itemA as ChildNode;
                    itemTarget = this.itemSpam as ChildNode;
                }
                if (itemOrig.firstChild != null) {
                    while(itemOrig.firstChild) {
                        itemTarget.appendChild(itemOrig.firstChild);
                    }
                }
            }
        }, this.link());
    }

    disconnect() {
        (this.itemLi as Node).parentNode?.removeChild(this.itemLi as Node);
    }

    show() {
        this.itemA = <a class={this.aClassNames} href={this.link()}></a>;
        this.itemSpam = <span class={this.spamClassNames}></span>;
        this.itemLi = <li 
               id={`faz-bs-breadcrumb-item-${this.id}`}
               class={this.classNames}
               onclick={() => {console.log(this.previousSibling)}}
               aria-current={this.ariaCurrentValue()}
               aria-label="breadcrumb">
               {this.itemA}{this.itemSpam}
               </li>;
        render(() => this.itemLi, this.parent()?.contentChild as Node);
    }
}
