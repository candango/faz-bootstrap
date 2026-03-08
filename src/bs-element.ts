import { FazBsAttrKind } from "./bs-attributes";
import { FazElement, toBoolean } from "faz/src";
import { Accessor, createSignal, Setter } from "solid-js";


export class FazBsElement extends FazElement {

    public outline: Accessor<boolean>;
    public setOutline: Setter<boolean>;
    public kind: Accessor<FazBsAttrKind>;
    public setKind: Setter<FazBsAttrKind>;
    public target: Accessor<string|undefined>;
    public setTarget: Setter<string|undefined>;
    public theme: Accessor<string|undefined>;
    public setTheme: Setter<string|undefined>;

    constructor() {
        super();

        [this.outline, this.setOutline] = createSignal<boolean>(false);
        [this.kind, this.setKind] = createSignal<FazBsAttrKind>(undefined);
        [this.target, this.setTarget] = createSignal<string|undefined>(undefined);
        [this.theme, this.setTheme] = createSignal<string|undefined>(undefined);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "extraclasses":
                case "extra-classes":
                    this.setExtraClasses(attribute.value);
                    break;
                case "kind":
                    this.setKind(attribute.value.toLowerCase() as FazBsAttrKind);
                    break;
                case "outline":
                    this.setOutline(toBoolean(attribute.value));
                    break;
                case "target":
                    this.setTarget(attribute.value);
                    break;
                case "theme":
                    this.setTheme(attribute.value);
                    break;
            }
        }
    }

    public getClasses(baseClass:string|undefined): string[] {
        let classes = <string[]>[baseClass];

        if (this.active()) {
            classes.push("active");
        }
        if (this.disabled()) {
            classes.push("disabled");
        }
        if (this.kind()) {
            classes.push(this.kindClass() as string)
        }
        return classes
    }

    get baseClass(): string {
        return "";
    }

    get controlledLink(): string|undefined {
        if (this.disabled() || this.link()===undefined) {
            return undefined;
        }
        return this.link();
    }

    get classNames() {
        let classes = this.getClasses(this.baseClass);
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        return classes.join(" ").trim();
    }

    get classPrefix(): string {
        return this.baseClass;
    }

    public kindClass(): string|undefined {
        if (this.kind() == undefined) {
            undefined;
        }
        let outline = this.outline() ? "outline-" : "";
        let classPrefix = this.classPrefix.trim() !== "" ? `${this.classPrefix}-` : "";
        return `${classPrefix}${outline}${this.kind()}`;
    }
}
