import { FazBsAlert } from "../../src/alert/alert";
import { FazBsInputFilterbox, FilterableItem } from "../../src/input/filterbox";
import { FazFormElement } from "faz/src";
import { JSX } from "solid-js";
import { render } from "solid-js/web";

export class FormExample extends FazFormElement {

    private alert: FazBsAlert | undefined;
    private filterbox: FazBsInputFilterbox | undefined;
    private formElement: HTMLFormElement | undefined;
    private email: HTMLInputElement | undefined;
    private description: HTMLTextAreaElement | undefined;
    private emailFeedback: HTMLDivElement | undefined;
    private descriptionFeedback: HTMLDivElement | undefined;

    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get form(): HTMLFormElement | undefined {
        return this.formElement;
    }

    get contentChild() {
        return this.formElement as ChildNode | null;
    }

    renderErrors(container: HTMLDivElement | undefined, errors: string[]) {
        if (container === undefined) {
            return;
        }
        container.replaceChildren();
        errors.forEach((error, index) => {
            const textNode = document.createTextNode(error);
            container.appendChild(textNode);
            if (index < errors.length - 1) {
                container.appendChild(document.createElement("br"));
            }
        });
    }

    async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        const data: { [key: string]: any } = {};
        const nodeList = this.formElement?.querySelectorAll("input, textarea, select") ?? [];
        nodeList.forEach((node) => {
            const element = node as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            data[element.name] = element.value;
        });

        this.email?.classList.remove("is-invalid");
        this.description?.classList.remove("is-invalid");
        this.renderErrors(this.emailFeedback, []);
        this.renderErrors(this.descriptionFeedback, []);

        if (this.alert) {
            this.alert.extraClasses = "invisible";
            this.alert.content = "";
        }

        const response = await fetch("/save", {
            method: this.method.toUpperCase(),
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const payload = await response.json() as {
            errors?: Record<string, string[]>;
            message?: string;
        };

        if (!response.ok) {
            this.errors = payload.errors ?? {};
            if (this.hasErrorsFor("email")) {
                this.email?.classList.add("is-invalid");
                this.renderErrors(this.emailFeedback, this.getErrorsFor("email"));
            }
            if (this.hasErrorsFor("description")) {
                this.description?.classList.add("is-invalid");
                this.renderErrors(this.descriptionFeedback, this.getErrorsFor("description"));
            }
            return;
        }

        if (this.alert) {
            this.alert.extraClasses = "text-center";
            this.alert.content = payload.message ?? "";
        }
    }

    filterItems(query: string): FilterableItem[] {
        const normalizedQuery = query.toLowerCase();
        const items: FilterableItem[] = [
            {
                name: "Item 1",
                value: 1
            }, {
                name: "Item 2",
                value: 2
            }, {
                name: "Item Category 1",
                value: 3,
                category: "Cat 1"
            }, {
                name: "Item Category 2",
                value: 4,
                category: "Cat 1"
            }, {
                name: "Item Category 3",
                value: 5,
                category: "Cat 2"
            }
        ];

        if (normalizedQuery === "") {
            return items;
        }

        return items.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
    }

    renderTabs() {
        const filterItems = this.filterItems.bind(this);
        const alert = <faz-bs-alert
            ref={(element) => this.alert = element as unknown as FazBsAlert}
            extraClasses="invisible"></faz-bs-alert>;
        const filterbox = <faz-bs-input-filterbox
            ref={(element) => {
                this.filterbox = element as unknown as FazBsInputFilterbox;
                this.filterbox.filterCallback = filterItems;
            }}></faz-bs-input-filterbox>;
        const email = <input
            ref={(element) => this.email = element}
            type="email"
            name="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"/>;
        const description = <textarea
            ref={(element) => this.description = element}
            class="form-control"
            name="description"
            id="exampleFormControlTextarea1"
            rows="3"></textarea>;

        this.formElement = <form
            ref={(element) => this.formElement = element}
            action={this.action}
            method={this.method as JSX.HTMLFormMethod}
            onSubmit={this.handleSubmit}>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                {email}
                <div class="invalid-feedback" ref={(element) => this.emailFeedback = element}></div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                {description}
                <div class="invalid-feedback" ref={(element) => this.descriptionFeedback = element}></div>
            </div>
            <div class="mb-3">
                {filterbox}
                <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3 row">
                <div class="col-2"><button class="btn btn-primary" type="submit">Button</button></div>
                <div class="col-9">{alert}</div>
            </div>
        </form> as unknown as HTMLFormElement;
    }

    show() {
        this.renderTabs();
        render(() => <div>{this.formElement}</div>, this);
        return;
    }
}

customElements.define("form-example", FormExample);
