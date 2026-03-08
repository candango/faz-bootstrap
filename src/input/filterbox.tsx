import { FazBsElement } from "../bs-element";
import { bindReactive } from "faz";
import { createEffect } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export class FilterableItem {
    public name: string = "";
    public value: any = "";
    public category?: string | undefined = undefined;
}

export type FilterCallback = (query: string) => FilterableItem[];

export type InitCallback = (filterbox: FazBsInputFilterbox) => void;

export class FazBsInputFilterbox extends FazBsElement {

    public autocomplete: string = "off";
    public items: FilterableItem[] = [];
    public label: string = "Search for..";
    public value: string = "";
    public selectedName: string = "";

    public displayFilter: boolean = false;
    public filtering: boolean = false;


    public filterCallback: FilterCallback | string | undefined = undefined;
    public initCallback: InitCallback | string | undefined = undefined;

    private container: JSX.Element | undefined;
    private inputName: JSX.Element | undefined;
    private inputValue: JSX.Element | undefined;

    private prefixId: string = "faz-bs-input-filterbox";
    private buffer: string = "";
    private filterDelay: number = 500;
    private filterTimeoutId: NodeJS.Timeout | undefined = undefined;
    private beOverTimeoutId: NodeJS.Timeout | undefined = undefined;
    private overListGroup: boolean = false;
    private inputHasFocus: boolean = false;

    constructor() {
        super();

        bindReactive(this, "autocomplete", "off");
        bindReactive(this, "items", []);
        bindReactive(this, "label", "Search for..");
        bindReactive(this, "value", "");
        bindReactive(this, "selectedName", "");
 
        bindReactive(this, "displayFilter", false);
        bindReactive(this, "filtering", false);

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "autocomplete":
                    this.autocomplete = attribute.value.toLowerCase();
                    break
                case "filtercallback":
                    this.filterCallback = attribute.value;
                    break
                case "initcallback":
                    this.initCallback = attribute.value;
                    break
                case "value":
                    this.value = attribute.value;
                    break;
                case "label":
                    this.label = attribute.value;
                    break;
            }
        }

        this.clearFilter = this.clearFilter.bind(this);
        this.verifySelectedValue = this.verifySelectedValue.bind(this);
        
        this.selectOption = this.selectOption.bind(this);
        this.activateOption = this.activateOption.bind(this);
        this.deactivateOption = this.deactivateOption.bind(this);

        this.beOverListGroup = this.beOverListGroup.bind(this);
        this.leaveListGroup = this.leaveListGroup.bind(this);
    }

    private get containerId(): string {
        return `${this.prefixId}-container-${this.id}`;
    }

    private get inputId(): string {
        return `${this.prefixId}-${this.id}`;
    }

    private get inputValueId(): string {
        return `${this.prefixId}-value-${this.id}`;
    }

    private get listContainer() {
        return `${this.prefixId}-list-container-${this.id}`;
    }

    get classNames() {
        let classes = ["badge"];
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        if (this.kind) {
            classes.push(`text-bg-${this.kind}`);
        }
        return classes.join(" ");
    }

    defaultFilterCallback(query: string): FilterableItem[] {
        return this.items.filter(
            item => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }

    getCategories(filteredItems: FilterableItem[]) {
        return filteredItems.reduce<string[]>((categories, item)=> {
            if(item.hasOwnProperty("category") &&
                categories.indexOf(item.category as string) === -1) {
                categories.push(item.category as string);
            }
            return categories;
        }, []);
    }

    get filteredItems(): FilterableItem[] {
        if(this.filterCallback !== undefined) {
            return (this.filterCallback as FilterCallback)(this.buffer);
        }
        return this.defaultFilterCallback(this.buffer);
    }

    filterUncategorizedItems(filteredItems: FilterableItem[]) {
        return filteredItems.filter((item) => {
            return !item.hasOwnProperty("category");
        });
    }

    filteredItemsByCategory(category: string, filteredItems: FilterableItem[]): FilterableItem[] {
        return filteredItems.filter((item) => {
            return item.hasOwnProperty("category") && item.category === category;
        });
    }

    doFilter(_: Event): void {
        const inputName = (this.inputName as HTMLInputElement);
        this.verifySelectedValue()
        this.filtering = true;
        this.displayFilter = false;
        this.overListGroup = true;
        this.inputHasFocus = true;
        this.buffer = inputName.value;
        this.clearFilterTimeout();
        if(this.buffer !== "") {
            this.filterTimeoutId = setTimeout(
                () => this.showFilter(), this.filterDelay
            );
            return;
        }
        this.filtering = false;
    }

    showFilter() {
        this.filtering = false;
        this.displayFilter = true;
    }

    clearFilter() {
        this.inputHasFocus = false
        if (!this.overListGroup) {
            this.buffer = "";
            this.leaveListGroup()
        }
    }

    clearFilterTimeout() {
        if(this.filterTimeoutId) {
            clearTimeout(this.filterTimeoutId)
            this.filterTimeoutId = undefined
        }
    }

    verifySelectedValue() {
        const inputName = (this.inputName as HTMLInputElement);
        const inputValue = (this.inputValue as HTMLInputElement);
        if(this.selectedName !== "" && inputName.value !== this.selectedName) {
            this.selectedName = inputName.value;
            this.value = inputValue.value;
        }
    }

    hasFilterableItems() {
        return this.items.length > 0;
    }

    beOverListGroup() {
        this.overListGroup = true;
        clearTimeout(this.beOverTimeoutId);
    }

    leaveListGroup() {
        this.overListGroup = false;
        this.beOverTimeoutId = setTimeout(() => {
            if(!this.overListGroup && !this.inputHasFocus) {
                this.filtering = false;
                this.displayFilter = false;
            }
        }, 150);
    }

    activateOption(e: Event) {
        let option = e.target as HTMLElement;
        option.classList.add("list-group-item-secondary");
    }

    deactivateOption(e: Event) {
        let option = e.target as HTMLElement;
        option.classList.remove("list-group-item-secondary");
    }

    selectOption(e: Event) {
        let option = e.target as HTMLElement;
        this.selectedName = option.getAttribute("item-name") as string;
        this.value = option.getAttribute("item-value") as string;
        (this.inputName as HTMLInputElement).value = this.selectedName;
        this.overListGroup = false;
        this.clearFilter();
    }
 
    filterCategorizedResultItems(category: string, filteredItems: FilterableItem[]): JSX.Element[] {
        return this.filteredItemsByCategory(category, filteredItems).map((item) => {
            return <a href="#"
                      class="list-group-item list-group-item-action"
                      id={item.value + "-" + item.name}
                      item-value={item.value} item-name={item.name}
                      onClick={this.selectOption}
                      onMouseOver={this.activateOption}
                      onMouseOut={this.deactivateOption}>{item.name}</a>
        })
    }

    get results(): JSX.Element {
        const filteredItems = this.filteredItems;
        return <div class="list-group">
            {this.renderUncategorizedResults(filteredItems)}
            {this.renderCategorizedResults(filteredItems)}
        </div>
    }

    renderUncategorizedResults(filteredItems: FilterableItem[]): JSX.Element[] {
        return this.filterUncategorizedItems(filteredItems).map((item) => {
            return <a href="#"
                      class="list-group-item list-group-item-action"
                      id={item.value + "-" + item.name}
                      item-value={item.value} item-name={item.name}
                      onClick={this.selectOption}
                      onMouseOver={this.activateOption}
                      onMouseOut={this.deactivateOption}>{item.name}</a>
        })
    }

    renderCategorizedResults(filteredItems: FilterableItem[]): JSX.Element[] {
        const className = [
            "list-group-item",
            "list-group-item-action",
            "list-group-item-dark"].join(" ");
        return this.getCategories(filteredItems).map((category) => {
            return <><a id={"category-" + category } href="#"
                   class={className}>
                    <h6 class="mb-1">{category}</h6></a>
                {this.filterCategorizedResultItems(category, filteredItems)}</>
        });
    }

    renderFilterContainer(): JSX.Element | undefined {
        if (this.displayFilter) {
            return <div id={this.listContainer}
                        class="filterbox-list-container"
                        onMouseOver={this.beOverListGroup}
                        onMouseOut={this.leaveListGroup}
            >
                {this.results}
            </div>
        }
    }

    renderFilteringMessage(): JSX.Element | undefined {
        if (this.filtering) {
            return <div style={{"margin-top": "5px", width: "100%"}}>
                <div class="list-group">
                    <a href="#"
                       class="list-group-item list-group-item-action"
                       aria-current="true">Searching ...</a>
                </div>
            </div>;
        }
    }

    renderInputName(): JSX.Element {
        this.inputName = <input id={this.inputId} type="text"
            class="form-control"
            onInput={this.doFilter.bind(this)}
            onFocus={this.doFilter.bind(this)}
            onBlur={this.clearFilter}
            placeholder={this.label}
            autocomplete={this.autocomplete} />;
        return this.inputName;
    }

    renderInputValue(): JSX.Element {
        this.inputValue = <input id={this.inputValueId} type="hidden" value={this.value} />;
        return this.inputValue;
    }

    show() {
        this.container = <div id={this.containerId}>
            {this.renderInputName()}
            {this.renderInputValue()}
            {this.renderFilteringMessage()}
            {this.renderFilterContainer()}
        </div>;
        render(() => this.container, this);
    }

    afterShow() {
        createEffect(() => {
            const value = this.value;
            const inputName = this.inputName as HTMLInputElement; 
            if (value != inputName.value) {
                inputName.value = this.value; 
            }
        });
        super.afterShow();
        if(typeof this.initCallback === "string") {
            // Avoiding calling eval directly
            // See: https://esbuild.github.io/content-types/#direct-eval
            this.initCallback = (0, eval)(this.initCallback);
        }
        if(this.filterCallback) {
            if(typeof this.filterCallback === "string") {
                this.filterCallback = (0, eval)(this.filterCallback);
            }
        }
        if (this.initCallback) {
            (this.initCallback as InitCallback)(this);
        }
    }
}

customElements.define("faz-bs-input-filterbox", FazBsInputFilterbox);
