import { FazBsAttrKind } from "./bs-attributes";
import { FazElement, toBoolean } from "faz";
import { bindReactive } from "faz";

export class FazBsElement extends FazElement {

    public outline: boolean = false;
    public kind: FazBsAttrKind = undefined;
    public target: string | undefined = undefined;
    public theme: string | undefined = undefined;

    constructor() {
        super();

        bindReactive(this, "outline", false);
        bindReactive(this, "kind", undefined);
        bindReactive(this, "target", undefined);
        bindReactive(this, "theme", undefined);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                case "extra-classes":
                    this.extraClasses = attribute.value;
                    break;
                case "kind":
                    this.kind = attribute.value.toLowerCase() as FazBsAttrKind;
                    break;
                case "outline":
                    this.outline = toBoolean(attribute.value);
                    break;
                case "target":
                    this.target = attribute.value;
                    break;
                case "theme":
                    this.theme = attribute.value;
                    break;
            }
        }
    }

    public getClasses(baseClass: string | undefined): string[] {
        let classes = <string[]>[baseClass];

        if (this.active) {
            classes.push("active");
        }
        if (this.disabled) {
            classes.push("disabled");
        }
        if (this.kind) {
            classes.push(this.kindClass() as string)
        }
        return classes
    }

    get baseClass(): string {
        return "";
    }

    get controlledLink(): string | undefined {
        if (this.disabled || this.link === undefined) {
            return undefined;
        }
        return this.link;
    }

    get classNames() {
        let classes = this.getClasses(this.baseClass);
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        return classes.join(" ").trim();
    }

    get classPrefix(): string {
        return this.baseClass;
    }

    public kindClass(): string | undefined {
        if (this.kind === undefined) {
            return undefined;
        }
        let outline = this.outline ? "outline-" : "";
        let classPrefix = this.classPrefix.trim() !== "" ? `${this.classPrefix}-` : "";
        return `${classPrefix}${outline}${this.kind}`;
    }
}
