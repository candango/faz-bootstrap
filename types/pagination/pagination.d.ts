/**
 * Copyright 2018-2025 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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