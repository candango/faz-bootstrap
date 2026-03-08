import { FazBsElement} from "../bs-element"

export class FazBsCollapse extends FazBsElement {

    public divCollapse: HTMLDivElement

    constructor() {
        super()
        this.divCollapse = document.createElement("div")
    }

    get classNames() {
        let classes = ["collapse"]
        if (this.parent()?.tagName.toLowerCase().startsWith("faz-bs-navbar")) {
            classes.push("navbar-collapse")
        }
        return classes.join(" ")
    }

    show() {
        this.divCollapse.setAttribute("class", this.classNames)
        this.divCollapse.setAttribute("id", this.id)
        this.appendChild(this.divCollapse)
    }
}

customElements.define("faz-bs-collapse", FazBsCollapse)
