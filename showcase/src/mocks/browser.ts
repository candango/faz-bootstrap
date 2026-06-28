import { setupWorker } from "msw/browser";

import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

declare global {
    interface Window {
        __fazBootstrapMswStartPromise?: Promise<void>;
    }
}

export function ensureMocking(): Promise<void> {
    if (typeof window === "undefined") {
        return Promise.resolve();
    }

    if (!window.__fazBootstrapMswStartPromise) {
        window.__fazBootstrapMswStartPromise = worker.start({
            serviceWorker: {
                url: "/mockServiceWorker.js"
            },
            onUnhandledRequest: "bypass"
        }).then(() => undefined);
    }

    return window.__fazBootstrapMswStartPromise;
}
