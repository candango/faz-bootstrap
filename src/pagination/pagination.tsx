import { FazBsElement } from "../bs-element";
import { FazPaginator } from "faz/src";
import { JSX } from "solid-js";
import { render } from "solid-js/web";


export class FazBsPagination extends FazBsElement {

    private paginator: FazPaginator;

    private labels = {
        first : "First",
        firstTooltip : "Go to the first page",
        last : "Last",
        lastTooltip : "Go to the last page",
        previous : "Previous",
        previousBlock : "Previous {perBlock}",
        previousTooltip : "Go to the previous page",
        previousBlockTooltip : "Go to the previous {perBlock} pages",
        next : "Next",
        nextBlock : "Next {perBlock}",
        nextBlockTooltip : "Go to the next {perBlock} pages",
        nextTooltip : "Go to the next page",
    };

    constructor() {
        super();
        this.paginator = new FazPaginator();

        for (let attribute of this.attributes) {
            switch (attribute.name.toLowerCase()) {
                case "count":
                    this.paginator.count = parseInt(attribute.value);
                    break;
                case "page":
                    this.paginator.page = parseInt(attribute.value);
                    break;
                case "perblock":
                    this.paginator.perBlock = parseInt(attribute.value);
                    break;
                case "perpage":
                    this.paginator.perPage = parseInt(attribute.value);
                    break;
            }
        }
    }

    get classNames(): string {
        let classes = ["pagination"];
        if (this.extraClasses) {
            classes.push(this.extraClasses);
        }
        if (this.kind) {
            classes.push(`alert-${this.kind}`);
        }
        return classes.join(" ");
    }

    buttonClassNames(page: number): string {
        let classes = ["page-item"];
        if (this.paginator.isCurrentPage(page)) {
            classes.push("active");
        }
        if (this.disabled && !this.paginator.isCurrentPage(page)) {
            classes.push("disabled");
        }
        return classes.join(" ");
    }

    get firstPreviousButtonClass() {
        let classes = ["page-item"]
        if (this.paginator.isFirstPage || this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get previousBlockButtonClass() {
        let classes = ["page-item"]
        if (this.paginator.isFirstBlock || this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get lastNextButtonClass() {
        let classes = ["page-item"]
        if (this.paginator.isLastPage || this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    get nextBlockButtonClass() {
        let classes = ["page-item"]
        if (this.paginator.isLastBlock || this.disabled) {
            classes.push("disabled")
        }
        return classes.join(" ")
    }

    goToPage(data: [FazBsPagination, number], _: Event) {
        const[pagination, page] = data;
        pagination.paginator.page = page;
    }

    goToFirstPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, 1], event);
    }

    goToLastPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.paginator.pages], event);
    }

    goToPreviousPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.paginator.page - 1], event);
    }

    goToPreviousBlock(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.paginator.currentFirstPage - 1], event);
    }

    goToNextPage(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.paginator.page + 1], event);
    }

    goToNextBlock(pagination: FazBsPagination, event: Event) {
        pagination.goToPage([pagination, pagination.paginator.currentLastPage + 1], event);
    }

    paginatedLink(page: number): string {
        const link = this.link;
        if (link !== undefined) {
            return link.replace("{page}", page.toString())
        } 
        return "#!"
    }

    renderPageNumber(page: number): JSX.Element {
        if (this.paginator.isCurrentPage(page)) {
            return <span class="page-link">{page}</span>;
        }
        return <a onclick={[this.goToPage, [this, page]]} class="page-link" href={this.paginatedLink(page)}>{page}</a>;
    }

    renderPage(page: number): JSX.Element {
        return <li class={this.buttonClassNames(page)}>{this.renderPageNumber(page)}</li>;
    }

    renderPages(): JSX.Element[] {
        return this.paginator.blockPages.map((page: number) => {
            return this.renderPage(page);
        });
        
    }

    renderFirstPage(): JSX.Element | undefined {
        if (this.paginator.hasMultiplePages && !this.paginator.isFirstPage) {
            return <li class={this.firstPreviousButtonClass}>
            <a class="page-link"
                onclick={[this.goToFirstPage, this]}
                href={this.paginatedLink(1)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={this.labels.firstTooltip}
            >{this.labels.first}</a>
            </li>;
        }
    }

    renderLastPage() {
        if (this.paginator.hasMultipleBlocks) {
            return <li class={this.lastNextButtonClass}>
            {this.paginator.isLastPage ?
                <span class="page-link">{this.labels.last}</span> :
                <a class="page-link"
            onclick={[this.goToLastPage, this]}
            href={this.paginatedLink(this.paginator.pages)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={this.labels.lastTooltip}
            >{this.labels.last}</a>}
            </li>;
        }
    }

    renderPreviousPage() {
        if (this.paginator.hasMultiplePages && !this.paginator.isFirstPage) {
            let page = this.paginator.page - 1;
            return <li class={this.firstPreviousButtonClass}>
            <a class="page-link"
                onclick={[this.goToPreviousPage, this]}
                href={this.paginatedLink(page)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={this.labels.previousTooltip}
            >{this.labels.previous}</a>
            </li>;
        }
    }

    renderPreviousBlock() {
        if (!this.paginator.isFirstBlock) {
            let page = this.paginator.currentFirstPage - 1;
            let label = this.labels.previousBlock.replace("{perBlock}", this.paginator.perBlock.toString());
            let tooltipLabel = this.labels.previousBlockTooltip.replace("{perBlock}", this.paginator.perBlock.toString());
            return <li class={this.previousBlockButtonClass}>
            <a class="page-link"
                onclick={[this.goToPreviousBlock, this]}
                href={this.paginatedLink(page)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={tooltipLabel}>{label}</a>
            </li>;
        }
    }

    renderDebug() {
        let accordionId = "faz-pagination-debug-".concat(this.id);
        let collapseId = accordionId.concat("-", this.id);
        return <div class="accordion faz-pagination-debug-accordion"
                     id={accordionId}>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#".concat(collapseId)}
                            aria-expanded="false"
                            aria-controls={collapseId}>
                        <b>Debug information for faz-bs-pagination:</b>
                        &nbsp;{this.id}
                    </button>
                </h2>
                <div id={collapseId}
                     class="accordion-collapse collapse"
                     aria-labelledby="headingOne"
                     data-bs-parent={"#".concat(accordionId)}>
                    <div class="accordion-body">
                        <h5 class="card-title">Component State Information</h5>
                        <dl class="row">
                            <dt class="col-sm-3">Disabled:</dt>
                            <dd class="col-sm-9">{this.disabled? "disabled" : "enabled"}</dd>
                        </dl>
                        <h5 class="card-title">Records Information</h5>
                        <dl class="row">
                            <dt class="col-sm-3">Records:</dt>
                            <dd class="col-sm-9">{this.paginator.count}</dd>
                            <dt class="col-sm-3">Current First Record:</dt>
                            <dd class="col-sm-9">{this.paginator.firstRecord}</dd>
                            <dt class="col-sm-3">Current Last Record:</dt>
                            <dd class="col-sm-9">{this.paginator.lastRecord}</dd>
                        </dl>
                        <h5 class="card-title">Pages Information</h5>
                        <dl class="row">
                            <dt class="col-sm-3">Pages:</dt>
                            <dd class="col-sm-9">{this.paginator.pages}</dd>
                            <dt class="col-sm-3">Current Page:</dt>
                            <dd class="col-sm-9">{this.paginator.page}</dd>
                            <dt class="col-sm-3">Current Page Computed:</dt>
                            <dd class="col-sm-9">{this.paginator.safePage}</dd>
                            <dt class="col-sm-3">Current First Page:</dt>
                            <dd class="col-sm-9">{this.paginator.currentFirstPage}</dd>
                            <dt class="col-sm-3">Current Last Page:</dt>
                            <dd class="col-sm-9">{this.paginator.currentLastPage}</dd>
                            <dt class="col-sm-3">Records per page:</dt>
                            <dd class="col-sm-9">{this.paginator.perPage}</dd>
                            <dt class="col-sm-3">Records in last page:</dt>
                            <dd class="col-sm-9">{this.paginator.recordsInLastPage}</dd>
                            <dt class="col-sm-3">Is first page:</dt>
                            <dd class="col-sm-9">
                                {this.paginator.isFirstPage ? "True" : "False"}
                            </dd>
                            <dt class="col-sm-3">Is last page:</dt>
                            <dd class="col-sm-9">
                                {this.paginator.isLastPage ? "True" : "False"}
                            </dd>
                        </dl>
                        <h5 class="card-title">Blocks Information</h5>
                        <dl class="row">
                            <dt class="col-sm-3">Blocks:</dt>
                            <dd class="col-sm-9">{this.paginator.blocks}</dd>
                            <dt class="col-sm-3">Current Block:</dt>
                            <dd class="col-sm-9">{this.paginator.block}</dd>
                            <dt class="col-sm-3">Pages per Block:</dt>
                            <dd class="col-sm-9">{this.paginator.perBlock}</dd>
                            <dt class="col-sm-3">Pages in last Block:</dt>
                            <dd class="col-sm-9">{this.paginator.pagesInLastBlock}</dd>
                            <dt class="col-sm-3">Is Last Block:</dt>
                            <dd class="col-sm-9">
                                {this.paginator.isLastBlock ? "True" : "False"}
                            </dd>
                            <dt class="col-sm-3">Has Multiple Blocks:</dt>
                            <dd class="col-sm-9">
                                {this.paginator.hasMultipleBlocks ? "True" : "False"}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    }

    renderNextPage() {
        let page = this.paginator.page + 1
        return <li class={this.lastNextButtonClass}>
            {this.paginator.isLastPage ?
                <span class="page-link">{this.labels.next}</span> :
                <a class="page-link"
                   onclick={[this.goToNextPage, this]}
                   href={this.paginatedLink(page)}
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title={this.labels.nextTooltip}
                >{this.labels.next}</a>}
        </li>
    }

    renderNextBlock() {
        let page = this.paginator.currentLastPage + 1
        let label = this.labels.nextBlock.replace("{perBlock}", this.paginator.perBlock.toString());
        let tooltipLabel = this.labels.nextBlockTooltip.replace("{perBlock}", this.paginator.perBlock.toString());
        return <li class={this.nextBlockButtonClass}>
            {this.paginator.isLastBlock ?
                "" :
                <a class="page-link"
                   onclick={[this.goToNextBlock, this]}
                   href={this.paginatedLink(page)}
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title={tooltipLabel}>{label}</a>}
        </li>
    }

    show(): void {
        render(() =><div class="faz-pagination-container" id={this.id}>
            <nav><ul id={`faz-bs-pagination-${this.id}`} class={this.classNames}>
            {this.renderFirstPage()}
            {this.renderPreviousBlock()}
            {this.renderPreviousPage()}
            {this.renderPages()}
            {this.paginator.hasMultiplePages ? this.renderNextPage() : ""}
            {this.paginator.hasMultipleBlocks ? this.renderNextBlock() : ""}
            {this.paginator.hasMultiplePages ? this.renderLastPage() : ""}
            </ul></nav> {this.debug ? this.renderDebug() : ""}</div>, this);
    }
}

customElements.define("faz-bs-pagination", FazBsPagination);
