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
export type { FazBsElementAttributes, FazBsInputFilterboxAttributes } from "./bs-tsx";
import { FazBsAlert, FazBsBadge, FazBsInputFilterbox, FazBsLink, FazBsListGroup, FazBsListGroupItem } from ".";
import { FazBsElementAttributes, FazBsInputFilterboxAttributes } from ".";
declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            'faz-bs-alert': FazBsElementAttributes<FazBsAlert>;
            'faz-bs-badge': FazBsElementAttributes<FazBsBadge>;
            'faz-bs-input-filterbox': FazBsInputFilterboxAttributes<FazBsInputFilterbox>;
            'faz-bs-list-group': FazBsInputFilterboxAttributes<FazBsListGroup>;
            'faz-bs-link': FazBsInputFilterboxAttributes<FazBsLink>;
            'faz-bs-list-group-item': FazBsInputFilterboxAttributes<FazBsListGroupItem>;
        }
    }
}
//# sourceMappingURL=index.d.ts.map