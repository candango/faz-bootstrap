import { FazBsNav } from "./nav";
import { FazBsElement } from "../bs-element";
import { toBoolean } from "faz/src";
import { bindReactive } from "faz/src";
import { render, MountableElement } from "solid-js/web";
import { JSX } from "solid-js/jsx-runtime";


export class FazBsNavTab extends FazBsElement {

    public fade: boolean = false;
    
    private navTabContainer: JSX.Element | undefined;

    constructor() {
        super();

        bindReactive(this, "fade", false);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "fade":
                    this.fade = toBoolean(attribute.value);
                    break;
            }
        }
    }

    get ariaLabelledby() {
        let labelledby = "";
        this.parent?.fazChildren.forEach((child) => {
            if (this.id === child.link) {
                labelledby = child.id;
                return;
            }
        });
        return labelledby;
    }

    get classNames() {
        let classes = ["tab-pane"];
        if (this.fade) {
            classes.push("fade");
            if (this.active) {
                classes.push("show");
            }
        }
        if (this.active) {
            classes.push("anchor");
            classes.push("active");
        }
        return classes.join(" ");
    }

    get contentChild() {
        return this.navTabContainer as unknown as HTMLElement;
    }

    show() {
        this.navTabContainer = <div
            id={`nav_tab_container${this.id}`}
            class={this.classNames}
            role="tabpanel"
            aria-labelledby={this.ariaLabelledby}
        >{this.content}</div>;
        const parent = this.parent as unknown as FazBsNav;
        render(() => this.navTabContainer, parent.tabContentChild as unknown as MountableElement);
    }
}
