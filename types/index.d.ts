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
export type { FazBsAttrKind, FazBsAttrPosition } from "./bs-attributes";
export { FazBsElement } from "./bs-element";
export { FazBsAlert } from "./alert/alert";
export { FazBsBadge } from "./badge/badge";
export { FazBsBreadcrumb, FazBsBreadcrumbItem } from "./breadcrumb/breadcrumb";
export { FazBsInputFilterbox } from "./input/filterbox";
export type { InitCallback, FilterCallback } from "./input/filterbox";
export { FazBsLink } from "./link/link";
export { FazBsListGroup, FazBsListGroupItem } from "./list-group/list-group";
export { FazBsNav, FazBsNavItem, FazBsNavItemContent, FazBsNavTab } from "./nav/nav";
export { FazBsNavbar, FazBsNavbarBrand, FazBsNavbarToggler, FazBsNavbarCollapse } from "./navbar/navbar";
export { FazBsPagination } from "./pagination/pagination";
export type { FazBsElementAttributes, FazBsInputFilterboxAttributes } from "./bs-tsx";
import { FazBsAlert, FazBsBadge, FazBsBreadcrumb, FazBsBreadcrumbItem, FazBsInputFilterbox, FazBsLink, FazBsListGroup, FazBsListGroupItem, FazBsNav, FazBsNavItem, FazBsNavItemContent, FazBsNavTab, FazBsNavbar, FazBsNavbarBrand, FazBsNavbarToggler, FazBsNavbarCollapse, FazBsPagination } from ".";
import { FazBsElementAttributes, FazBsInputFilterboxAttributes } from ".";
declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "faz-bs-alert": FazBsElementAttributes<FazBsAlert>;
            "faz-bs-badge": FazBsElementAttributes<FazBsBadge>;
            "faz-bs-breadcrumb": FazBsElementAttributes<FazBsBreadcrumb>;
            "faz-bs-breadcrumb-item": FazBsElementAttributes<FazBsBreadcrumbItem>;
            "faz-bs-input-filterbox": FazBsInputFilterboxAttributes<FazBsInputFilterbox>;
            "faz-bs-list-group": FazBsInputFilterboxAttributes<FazBsListGroup>;
            "faz-bs-link": FazBsInputFilterboxAttributes<FazBsLink>;
            "faz-bs-list-group-item": FazBsInputFilterboxAttributes<FazBsListGroupItem>;
            "faz-bs-nav": FazBsElementAttributes<FazBsNav>;
            "faz-bs-nav-item": FazBsElementAttributes<FazBsNavItem>;
            "faz-bs-nav-item-content": FazBsElementAttributes<FazBsNavItemContent>;
            "faz-bs-nav-tab": FazBsElementAttributes<FazBsNavTab>;
            "faz-bs-navbar": FazBsElementAttributes<FazBsNavbar>;
            "faz-bs-navbar-brand": FazBsElementAttributes<FazBsNavbarBrand>;
            "faz-bs-navbar-toggler": FazBsElementAttributes<FazBsNavbarToggler>;
            "faz-bs-navbar-collapse": FazBsElementAttributes<FazBsNavbarCollapse>;
            "faz-bs-pagination": FazBsElementAttributes<FazBsPagination>;
        }
    }
}
//# sourceMappingURL=index.d.ts.map