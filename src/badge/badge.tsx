import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";


export class FazBsBadge extends FazBsElement {

    private badgeItem: JSX.Element | undefined;

    get baseClass(): string {
        return "badge";
    }

    get classPrefix(): string {
        return "text-bg";
    }

    renderBadge(): JSX.Element {
        if (this.linkIsVoid) {
            this.badgeItem = <span id={`faz-bs-badge-${this.id}`} class={this.classNames}>{this.content}</span>;
            return this.badgeItem;
        }
        this.badgeItem = <a id={`faz-bs-badge-${this.id}`} href={this.link} class={this.classNames}>{this.content}</a>;
        return this.badgeItem;
    }

    show() {
        render(() => this.renderBadge(), this);
    }
}

customElements.define("faz-bs-badge", FazBsBadge);
