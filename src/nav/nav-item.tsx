import { FazBsNav } from "./nav";
import { FazBsElement } from "../bs-element";
import { bindReactive } from "faz";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsNavItem extends FazBsElement {


    public linkClasses: string = "";

    private navItemLi: JSX.Element | undefined;
    private navItemLink: JSX.Element | undefined;
    private navItemUl: JSX.Element | undefined;

    public previousChild: FazBsNavItem | null = null;

    constructor() {
        super();

        bindReactive(this, "linkClasses", "");

        this.previousChild = null;
        this.classList.add("nav-item");
    }

    get contentChild() {
        if (this.content === undefined) {
            return this.navItemLink as ChildNode;
        }
        return this.navItemUl as ChildNode;
    }

    get isRoot() {
        if (this.parent !== undefined) {
            if (this.parent instanceof FazBsNav) {
                return true;
            }
        }
        return false;
    }

    get isDropdown() {
        return this.fazChildren.length > 0;
    }

    get classNames() {
        const classes = [];
        if(this.isRoot) {
            classes.push("nav-item");
            if (this.isDropdown) {
                classes.push("dropdown");
            }
        } else {
            if (this.isDropdown) {
                classes.push("dropdown-submenu");
            }
        }
        return classes.join(" ");
    }

    resolveLink() {
        const link = super.resolveLink();
        if (!this.isDropdown) {
            if (this.isRoot && this.root?.hasTabs) {
                return `#${link}`;
            }
        }
        return link;
    }

    get linkClassNames() {
        let classes = ["nav-link"];
        const active = this.active;
        const disabled = this.disabled;

        if (!this.isRoot) {
            classes.pop();
            classes.push("dropdown-item");
        }
        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.isDropdown) {
            classes.push("dropdown-toggle");
        }
        return classes.join(" ");
    }

    get dropdownClassNames() {
        let classes = ["dropdown-menu"];
        if (this.active && this.isDropdown && !this.disabled) {
            classes.push("show");
        }
        return classes.join(" ");
    }

    get roleType() {
        const parent = this.parent as FazBsNav;
        if (this.isRoot && parent.vertical && parent.hasTabs) {
            return "tab";
        }
        if (this.isDropdown && this.isRoot) {
            return "button";
        }
        if (!this.isDropdown && !this.isRoot) {
            return "tab";
        }
    }

    get root(): FazBsNav | undefined {
        if (this.isRoot) {
            return this.parent as FazBsNav;
        }
        if (!this.parent) {
            return undefined;
        }
        return (this.parent as FazBsNavItem).root;
    }

    get navItemChildren() {
        return this.fazChildren.filter(child => {
            return child instanceof FazBsNavItem;
        })
    }

    get ariaExpandedValue() {
        if (this.isDropdown) {
            return this.active;
        }
    }

    get dataBsToggleValue() {
        if (this.isDropdown && this.isRoot) {
            return "dropdown";
        }
    }

    addChild<T extends Node>(node: T): T {
        if (node instanceof FazBsNavItem) {
            (this.navItemUl as unknown as Node).appendChild(node);
            return node;
        }
        (this.contentChild as Node)?.appendChild(node);
        return node;
    }

    activate() {
        this.parent?.activeFazChildren.forEach(child => {
            if (child instanceof FazBsNavItem) {
                (child as FazBsNavItem).deactivate();
                this.previousChild = child;
            }
        })
        this.active = true;
        if (this.root) {
            this.root.current = this;
        }
        if (this.root?.hasTabs) {
            this.root?.tabChildren.forEach((tabChild) => {
                const resolvedLink = this.resolveLink() as string;
                if(tabChild.id === resolvedLink.replace("#", "")){
                    tabChild.active = true;
                    return;
                }
                tabChild.active = false;
            })
        }
    }

    deactivate() {
        this.previousChild = null;
        this.active = false;
        if (this.isDropdown) {
            this.activeFazChildren.forEach(activeChild => {
                if (activeChild instanceof FazBsNavItem) {
                    const child = activeChild as FazBsNavItem;
                    child.deactivate();
                }
            })
        }
    }

    disable() {
        if (this.previousChild != null) {
            this.previousChild.activate();
        }
        this.disabled = true;
    }

    onClick(item: FazBsNavItem, event: Event) {
        if (item.linkIsVoid) {
            event.preventDefault();
        }
        item.activate();
    }

    renderDropdown() {
        if (this.isDropdown) {
            this.navItemUl = <ul class={this.dropdownClassNames}></ul>;
            return this.navItemUl;
        }
    }

    renderItem() {
        this.navItemLink = <a class={this.linkClassNames}
            id={`nav_item_link${this.id}`} role={this.roleType as any}
            onclick={[this.onClick, this]} href={this.resolveLink()}
            aria-expanded={this.ariaExpandedValue ? "true" : undefined}
            data-bs-toggle={this.dataBsToggleValue ? "true" : undefined}
        >{this.content}</a>;
        this.navItemLi = <li class={this.classNames}
            id={`nav_item_container${this.id}`} >
            {this.navItemLink}
            {this.renderDropdown()}
        </li>;
        return this.navItemLi;
    }

    show() {
        render(() => this.renderItem(), this);
    }
}
