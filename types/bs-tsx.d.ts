import { FazBsAlert, FazBsBadge } from ".";
import { InitCallback, FilterCallback, FazBsInputFilterbox } from "./input/filterbox";
import { FazElementAttributes } from "faz/types/faz-elements";
interface FazBsElementAttributes<T> extends FazElementAttributes<T> {
    kind?: string;
    target?: string;
    theme?: string;
}
interface FazBsInputFilterboxAttributes<T> extends FazBsElementAttributes<T> {
    autocomplete?: string;
    filtercallback?: FilterCallback | string;
    initcallback?: InitCallback | string | undefined;
    value?: string;
    label?: string;
}
declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements {
            'faz-bs-alert': FazBsElementAttributes<FazBsAlert>;
            'faz-bs-badge': FazBsElementAttributes<FazBsBadge>;
            'faz-bs-input-filterbox': FazBsInputFilterboxAttributes<FazBsInputFilterbox>;
        }
    }
}
export {};
//# sourceMappingURL=bs-tsx.d.ts.map