import { FazBsElement } from "../bs-element"
import { FazBsNavItem } from "./nav-item";
import { FazBsNavItemContent } from "./nav-item-content";
import { FazBsNavTab } from "./nav-tab";
import { FazBsNavbar } from "../navbar/navbar";
import { toBoolean } from "faz/src";
import { bindReactive } from "faz/src";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";
import { FazBsNavbarCollapse } from "../navbar/navbar-collapse";

type AriaAttributesRole =  "alert" | "alertdialog" | "application" | "article"
    | "banner" | "button" | "cell" | "checkbox" | "columnheader" | "combobox"
    | "complementary" | "contentinfo" | "definition" | "dialog" | "directory"
    | "document" | "feed" | "figure" | "form" | "grid" | "gridcell" | "group"
    | "heading" | "img" | "link" | "list" | "listbox" | "listitem" | "log"
    | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem"
    | "menuitemcheckbox" | "menuitemradio" | "meter" | "navigation" | "none"
    | "note" | "option" | "presentation" | "progressbar" | "radio"
    | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar"
    | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status"
    | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox"
    | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
    | undefined;

 
export class FazBsNav extends FazBsElement {

    public fill: boolean = false;
    public justify: string = "";
    public pills: boolean = false;
    public underline: boolean = false;
    public vertical: boolean = false;
   
    private outerContainer: JSX.Element | undefined;
    private tabList: JSX.Element | undefined;
    private tabContainer: JSX.Element | undefined;

    public current: FazBsNavItem | undefined;

    private timeout: NodeJS.Timeout | undefined;

    constructor() {
        super();

        bindReactive(this, "fill", false);
        bindReactive(this, "justify", "");
        bindReactive(this, "pills", false);
        bindReactive(this, "underline", false);
        bindReactive(this, "vertical", false);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "fill":
                    this.fill = toBoolean(attribute.value);
                    break;
                case "justify":
                    this.justify = attribute.value;
                    break;
                case "pills":
                    this.pills = toBoolean(attribute.value);
                    break;
                case "underline":
                    this.underline = toBoolean(attribute.value);
                    break;
                case "vertical":
                    this.vertical = toBoolean(attribute.value);
                    break;
            }
        }
    }

    get activeNavItem() {
        let active: FazBsNavItem | null = null;
        this.navItemChildrenActive.forEach(child => {
            active = child as FazBsNavItem;
        })
        return active;
    }

    get contentChild() {
        return this.tabList as ChildNode;
    }

    get tabContentChild() {
        return this.tabContainer as ChildNode;
    }

    get navListRole(): AriaAttributesRole {
        if (this.insideNavbar || this.insideNavbarCollapse) {
            return undefined;
        }
        return "tablist"
    }

    get classNames() {
        const baseClass = this.insideNavbar || this.insideNavbarCollapse ? "navbar-nav" : "nav";
        const classes = [ baseClass ];
        if (this.disabled) {
            classes.push("disabled");
        }
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        if (this.pills) {
            classes.push("nav-pills");
        }
        if (this.underline) {
            classes.push("nav-underline");
        }
        if (this.fill) {
            classes.push("nav-fill");
        }
        const justify = this.justify;
        if (justify === "center") {
            classes.push("justify-content-center");
        }
        if (justify === "right") {
            classes.push("justify-content-end");
        }
        if (this.hasTabs && !this.vertical) {
            classes.push("nav-tabs");
        }
        if (this.vertical) {
            classes.push("flex-column");
        }  
        return classes.join(" ");
    }

    get insideNavbarCollapse(): boolean {
        const parent =  this.parent;
        if (!parent) {
            return false;
        }
        if (!(parent instanceof FazBsNavbarCollapse)) {
            return false;
        }
        return true;
    }

    get insideNavbar(): boolean {
        const parent =  this.parent;
        if (!parent) {
            return false;
        }
        if (!(parent instanceof FazBsNavbar)) {
            return false;
        }
        return true;
    }

    get hasTabs() {
        return this.tabChildren.length > 0;
    }

    get navItemChildren() {
        return this.fazChildren.filter(child => {
            return child instanceof FazBsNavItem;
        })
    }

    get navItemChildrenActive() {
        const children = this.fazChildren;
        return children.filter(child => {
            return child instanceof FazBsNavItem && child.active;
        });
    }

    get onEdge() {
        if(this.current) {
            return !this.current?.isDropdown;
        }
        return false;
    }

    get outerContainerId() {
        if (this.insideNavbar) {
            return `faz-bs-navbar-collapse-${this.id}`;
        }
        return `faz-bs-nav-container-${this.id}`;
    }

    get outerContainerClassNames() {
        const classes = [];
        this.classList.remove(...this.classList);
        if (this.insideNavbar) {
            classes.push("collapse");
            classes.push("navbar-collapse");
        }
        if (this.hasTabs && this.vertical) {
            classes.push("d-flex");
            classes.push("align-items-start");
        }
        return classes.join(" ");
    }

    get tabClassNames() {
        const classes = ["tab-content"];
        if (!this.hasTabs) {
            classes.push("invisible");
        }
        return classes.join(" ");
    }

    get tabChildren() {
        return this.fazChildren.filter(child => {
            return child instanceof FazBsNavTab;
        })
    }

    addChild<T extends Node>(node: T): T {
        if (this.hasTabs && this.vertical) {
            if (node instanceof FazBsNavTab) {
                (this.tabContainer as HTMLElement).appendChild(node);
                return node;
            }
            (this.tabList as HTMLElement).appendChild(node);
            return node;
        }
        if (node instanceof FazBsNavTab) {
            (this.tabContainer as HTMLElement).appendChild(node);
            return node;
        }
        (this.contentChild as HTMLElement).appendChild(node);
        return node ;
    }

    beOverMe(fazNav: FazBsNav, _: Event) {
        clearTimeout(fazNav.timeout);
    }

    leaveMe(fazNav: FazBsNav, _: Event) {
        clearTimeout(fazNav.timeout);
        fazNav.timeout = setTimeout(() => {
            fazNav.activeFazChildren.forEach(child => {
                const navItem = child as FazBsNavItem;
                if (navItem.isDropdown && !fazNav.onEdge) {
                    navItem.deactivate();
                }
            });
        }, 250);
    }

    renderTabList() {
        this.tabList = <div id={`faz-bs-nav-${this.id}`} class={this.classNames}
            role={this.navListRole} onmouseover={[this.beOverMe, this]}
            onmouseleave={[this.leaveMe, this]}></div>;
        return this.tabList;
    }

    renderTabs() {
        if (this.hasTabs) {
            this.tabContainer = <div class={this.tabClassNames}></div>;
            return this.tabContainer;
        }
    }

    show() {
        if (this.insideNavbarCollapse) {
            render(() => this.renderTabList(), this);
            return;
        }
        this.outerContainer = <div
            id={this.outerContainerId}
            class={this.outerContainerClassNames}
        >{this.renderTabList()}{this.renderTabs()}</div>;
        render(() => this.outerContainer, this);
    }

    placeBackChildren(children:Node[]) {
        super.placeBackChildren(children);
        if (this.loading && this.hasTabs) {
            if (this.activeNavItem === null) {
                (this.navItemChildren[0] as FazBsNavItem).active = true;
            }
            (this.navItemChildrenActive[0] as FazBsNavItem).activate();
        }
    }
}

export { FazBsNavItem } from "./nav-item";
export { FazBsNavItemContent } from "./nav-item-content";
export { FazBsNavTab } from "./nav-tab";

customElements.define("faz-bs-nav", FazBsNav);
customElements.define("faz-bs-nav-item", FazBsNavItem);
customElements.define("faz-bs-nav-tab", FazBsNavTab);
customElements.define("faz-bs-nav-item-content", FazBsNavItemContent);
