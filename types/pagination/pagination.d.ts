import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js";
export declare class FazBsPagination extends FazBsElement {
    private paginator;
    private labels;
    constructor();
    get classNames(): string;
    buttonClassNames(page: number): string;
    get firstPreviousButtonClass(): string;
    get previousBlockButtonClass(): string;
    get lastNextButtonClass(): string;
    get nextBlockButtonClass(): string;
    goToPage(data: [FazBsPagination, number], _: Event): void;
    goToFirstPage(pagination: FazBsPagination, event: Event): void;
    goToLastPage(pagination: FazBsPagination, event: Event): void;
    goToPreviousPage(pagination: FazBsPagination, event: Event): void;
    goToPreviousBlock(pagination: FazBsPagination, event: Event): void;
    goToNextPage(pagination: FazBsPagination, event: Event): void;
    goToNextBlock(pagination: FazBsPagination, event: Event): void;
    paginatedLink(page: number): string;
    renderPageNumber(page: number): JSX.Element;
    renderPage(page: number): JSX.Element;
    renderPages(): JSX.Element[];
    renderFirstPage(): JSX.Element;
    renderLastPage(): JSX.Element;
    renderPreviousPage(): JSX.Element;
    renderPreviousBlock(): JSX.Element;
    renderDebug(): JSX.Element;
    renderNextPage(): JSX.Element;
    renderNextBlock(): JSX.Element;
    show(): void;
}
//# sourceMappingURL=pagination.d.ts.map