import "../../src/breadcrumb/breadcrumb";
import "../../src/input/filterbox";

import { ensureMocking } from "./mocks/browser";
import { baseItems } from "./mocks/handlers";

void ensureMocking();

(window as unknown as {
    initBasicInitialItems: (filterbox: { setItems: (items: typeof baseItems) => void }) => void;
    remoteFilterItems: (query: string) => Promise<typeof baseItems>;
}).initBasicInitialItems = (filterbox) => {
    filterbox.setItems(baseItems);
};

(window as unknown as {
    remoteFilterItems: (query: string) => Promise<typeof baseItems>;
}).remoteFilterItems = async (query: string) => {
    await ensureMocking();
    const response = await fetch(`/items?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch remote items: ${response.status}`);
    }
    return await response.json();
};
