export type {
    FazBsAttrKind, FazBsAttrPosition
} from "./bs-attributes";

export { FazBsElement } from "./bs-element";

export { FazBsAlert } from "./alert/alert";

export { FazBsBadge } from "./badge/badge";

export { FazBsBreadcrumb, FazBsBreadcrumbItem } from "./breadcrumb/breadcrumb";

export { FazBsButton } from "./button/button";

export { FazBsCalendar } from "./calendar/calendar";

export { FazBsCalendarPane } from "./calendar/calendar-pane";

export { FazBsCard } from "./card/card";

export { FazBsCardBody } from "./card/card-body";

export { FazBsCollapse } from "./collapse/collapse";

export { FazBsGrid } from "./grid/grid";

export { FazBsGridCol } from "./grid/grid-col";

export { FazBsGridHead } from "./grid/grid-head";

export { FazBsGridRow } from "./grid/grid-row";

export { FazBsInput } from "./input/input";

export { FazBsInputGroup } from "./input/group";

export { FazBsInputGroupText } from "./input/group-text";

export { FazBsInputFilterbox } from "./input/filterbox";

export type {InitCallback, FilterCallback } from "./input/filterbox";

export { FazBsLink } from "./link/link";

export { FazBsListGroup, FazBsListGroupItem } from "./list-group/list-group";

export {
    FazBsNav, FazBsNavItem, FazBsNavItemContent, FazBsNavTab
} from "./nav/nav";

export {
    FazBsNavbar, FazBsNavbarBrand, FazBsNavbarToggler, FazBsNavbarCollapse
} from "./navbar/navbar";

export { FazBsPagination } from "./pagination/pagination";

export type { FazBsElementAttributes, FazBsInputFilterboxAttributes } from "./bs-tsx";

import {
    FazBsAlert,
    FazBsBadge,
    FazBsBreadcrumb,
    FazBsBreadcrumbItem,
    FazBsButton,
    FazBsCalendar,
    FazBsCalendarPane,
    FazBsCard,
    FazBsCardBody,
    FazBsCollapse,
    FazBsGrid,
    FazBsGridCol,
    FazBsGridHead,
    FazBsGridRow,
    FazBsInput,
    FazBsInputGroup,
    FazBsInputGroupText,
    FazBsInputFilterbox,
    FazBsLink,
    FazBsListGroup,
    FazBsListGroupItem,
    FazBsNav,
    FazBsNavItem,
    FazBsNavItemContent,
    FazBsNavTab,
    FazBsNavbar,
    FazBsNavbarBrand,
    FazBsNavbarToggler,
    FazBsNavbarCollapse,
    FazBsPagination
} from ".";

import { FazBsElementAttributes, FazBsInputFilterboxAttributes } from ".";

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            "faz-bs-alert": FazBsElementAttributes<FazBsAlert>;
            "faz-bs-badge": FazBsElementAttributes<FazBsBadge>;
            "faz-bs-breadcrumb": FazBsElementAttributes<FazBsBreadcrumb>;
            "faz-bs-breadcrumb-item": FazBsElementAttributes<FazBsBreadcrumbItem>;
            "faz-bs-button": FazBsElementAttributes<FazBsButton>;
            "faz-bs-calendar": FazBsElementAttributes<FazBsCalendar>;
            "faz-bs-calendar-pane": FazBsElementAttributes<FazBsCalendarPane>;
            "faz-bs-card": FazBsElementAttributes<FazBsCard>;
            "faz-bs-card-body": FazBsElementAttributes<FazBsCardBody>;
            "faz-bs-collapse": FazBsElementAttributes<FazBsCollapse>;
            "faz-bs-grid": FazBsElementAttributes<FazBsGrid>;
            "faz-bs-grid-col": FazBsElementAttributes<FazBsGridCol>;
            "faz-bs-grid-head": FazBsElementAttributes<FazBsGridHead>;
            "faz-bs-grid-row": FazBsElementAttributes<FazBsGridRow>;
            "faz-bs-input": FazBsElementAttributes<FazBsInput>;
            "faz-bs-input-group": FazBsElementAttributes<FazBsInputGroup>;
            "faz-bs-input-group-text": FazBsElementAttributes<FazBsInputGroupText>;
            "faz-bs-input-filterbox": FazBsInputFilterboxAttributes<FazBsInputFilterbox>;
            "faz-bs-list-group": FazBsElementAttributes<FazBsListGroup>;
            "faz-bs-link": FazBsElementAttributes<FazBsLink>;
            "faz-bs-list-group-item": FazBsElementAttributes<FazBsListGroupItem>;
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
