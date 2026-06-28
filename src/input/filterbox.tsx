import { FazBsElement } from "../bs-element";
import { bindReactive } from "faz/src";
import { createEffect } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

export class FilterableItem {
    public name: string = "";
    public value: any = "";
    public category?: string | undefined = undefined;
}

export type FilterResult = FilterableItem[] | Promise<FilterableItem[]>;

export type FilterCallback = (query: string) => FilterResult;

export type InitCallback = (filterbox: FazBsInputFilterbox) => void;

export class FazBsInputFilterbox extends FazBsElement {

    public autocomplete: string = "off";
    public items: FilterableItem[] = [];
    public filteredItems: FilterableItem[] = [];
    public label: string = "Search for..";
    public name: string = "";
    public value: string = "";
    public selectedName: string = "";

    public displayFilter: boolean = false;
    public filtering: boolean = false;
    public pendingQuery: string = "";
    public lastResolvedQuery: string = "";

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
    private activeFilterRequestId: number = 0;
    private overListGroup: boolean = false;
    private inputHasFocus: boolean = false;

    constructor() {
        super();

        bindReactive(this, "autocomplete", "off");
        bindReactive(this, "items", []);
        bindReactive(this, "filteredItems", []);
        bindReactive(this, "label", "Search for..");
        bindReactive(this, "name", "");
        bindReactive(this, "value", "");
        bindReactive(this, "selectedName", "");
 
        bindReactive(this, "displayFilter", false);
        bindReactive(this, "filtering", false);
        bindReactive(this, "pendingQuery", "");
        bindReactive(this, "lastResolvedQuery", "");

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "autocomplete":
                    this.autocomplete = attribute.value.toLowerCase();
                    break;
                case "filtercallback":
                    this.filterCallback = attribute.value;
                    break;
                case "initcallback":
                    this.initCallback = attribute.value;
                    break;
                case "value":
                    this.value = attribute.value;
                    break;
                case "label":
                    this.label = attribute.value;
                    break;
                case "name":
                    this.name = attribute.value;
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

    resolveFilterItems(query: string): FilterResult {
        if (this.filterCallback !== undefined) {
            return (this.filterCallback as FilterCallback)(query);
        }
        return this.defaultFilterCallback(query);
    }

    isPromiseLike(value: FilterResult): value is Promise<FilterableItem[]> {
        return typeof (value as Promise<FilterableItem[]>).then === "function";
    }

    applyFilterResult(requestId: number, query: string, items: FilterableItem[]) {
        if (requestId !== this.activeFilterRequestId || query !== this.buffer) {
            return;
        }
        this.filteredItems = items;
        this.pendingQuery = "";
        this.lastResolvedQuery = query;
        this.filtering = false;
        this.displayFilter = true;
    }

    async showFilter() {
        const query = this.buffer;
        const requestId = ++this.activeFilterRequestId;
        this.pendingQuery = query;

        try {
            const filterResult = this.resolveFilterItems(query);
            if (this.isPromiseLike(filterResult)) {
                const items = await filterResult;
                this.applyFilterResult(requestId, query, items);
                return;
            }
            this.applyFilterResult(requestId, query, filterResult);
        } catch (_) {
            if (requestId !== this.activeFilterRequestId || query !== this.buffer) {
                return;
            }
            this.filteredItems = [];
            this.pendingQuery = "";
            this.filtering = false;
            this.displayFilter = true;
        }
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
        this.verifySelectedValue();
        this.filtering = true;
        this.displayFilter = false;
        this.overListGroup = true;
        this.inputHasFocus = true;
        this.buffer = inputName.value;
        this.clearFilterTimeout();
        if(this.buffer !== "") {
            this.filterTimeoutId = setTimeout(
                () => void this.showFilter(), this.filterDelay
            );
            return;
        }
        this.activeFilterRequestId += 1;
        this.filteredItems = [];
        this.pendingQuery = "";
        this.lastResolvedQuery = "";
        this.filtering = false;
    }

    clearFilter() {
        this.inputHasFocus = false;
        if (!this.overListGroup) {
            this.buffer = "";
            this.leaveListGroup();
        }
    }

    clearFilterTimeout() {
        if(this.filterTimeoutId) {
            clearTimeout(this.filterTimeoutId);
            this.filterTimeoutId = undefined;
        }
    }

    verifySelectedValue() {
        const inputName = (this.inputName as HTMLInputElement);
        if(this.selectedName !== "" && inputName.value !== this.selectedName) {
            this.selectedName = "";
            this.value = "";
        }
    }

    hasFilterableItems() {
        return this.items.length > 0 || this.filteredItems.length > 0;
    }

    setItems(items: FilterableItem[]) {
        this.items = items;
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
        e.preventDefault();
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
                      onMouseOut={this.deactivateOption}>{item.name}</a>;
        });
    }

    get results(): JSX.Element {
        const filteredItems = this.filteredItems;
        return <div class="list-group">
            {this.renderUncategorizedResults(filteredItems)}
            {this.renderCategorizedResults(filteredItems)}
        </div>;
    }

    renderUncategorizedResults(filteredItems: FilterableItem[]): JSX.Element[] {
        return this.filterUncategorizedItems(filteredItems).map((item) => {
            return <a href="#"
                      class="list-group-item list-group-item-action"
                      id={item.value + "-" + item.name}
                      item-value={item.value} item-name={item.name}
                      onClick={this.selectOption}
                      onMouseOver={this.activateOption}
                      onMouseOut={this.deactivateOption}>{item.name}</a>;
        });
    }

    renderCategorizedResults(filteredItems: FilterableItem[]): JSX.Element[] {
        const className = [
            "list-group-item",
            "list-group-item-dark",
            "py-1",
            "small"
        ].join(" ");
        return this.getCategories(filteredItems).map((category) => {
            return <><div id={"category-" + category }
                   class={className}>
                    <strong>{category}</strong></div>
                {this.filterCategorizedResultItems(category, filteredItems)}</>;
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
            </div>;
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
        this.inputValue = <input id={this.inputValueId} type="hidden" name={this.name} value={this.value} />;
        return this.inputValue;
    }

    show() {
        this.container = <div id={this.containerId} class="filterbox-outer-container">
            {this.renderInputName()}
            {this.renderInputValue()}
            {this.renderFilteringMessage()}
            {this.renderFilterContainer()}
        </div>;
        render(() => this.container, this);
    }

    resolveCallback<T>(callback: T | string): T {
        if (typeof callback !== "string") {
            return callback;
        }

        const globalCallback = (globalThis as Record<string, unknown>)[callback];
        if (typeof globalCallback === "function") {
            return globalCallback as T;
        }

        // Avoiding calling eval directly
        // See: https://esbuild.github.io/content-types/#direct-eval
        return (0, eval)(callback) as T;
    }

    afterShow() {
        createEffect(() => {
            const selectedName = this.selectedName;
            const inputName = this.inputName as HTMLInputElement;
            if (selectedName !== "" && selectedName !== inputName.value) {
                inputName.value = selectedName;
            }
        });
        super.afterShow();
        if(typeof this.initCallback === "string") {
            this.initCallback = this.resolveCallback<InitCallback>(this.initCallback);
        }
        if(this.filterCallback) {
            if(typeof this.filterCallback === "string") {
                this.filterCallback = this.resolveCallback<FilterCallback>(this.filterCallback);
            }
        }
        if (this.initCallback) {
            (this.initCallback as InitCallback)(this);
        }
    }
}

customElements.define("faz-bs-input-filterbox", FazBsInputFilterbox);
