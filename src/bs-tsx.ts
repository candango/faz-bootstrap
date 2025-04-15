import { InitCallback, FilterCallback } from "./input/filterbox";
import { FazElementAttributes } from "faz";

export interface FazBsElementAttributes<T> extends FazElementAttributes<T> {
    kind?: string;
    target?: string;
    theme?: string;
}

export interface FazBsInputFilterboxAttributes<T> extends FazBsElementAttributes<T> {
    autocomplete?: string;
    filtercallback?: FilterCallback | string;
    initcallback?: InitCallback | string | undefined;
    value?: string;
    label?: string;
}
