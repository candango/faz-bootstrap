import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";
import { html } from "@codemirror/lang-html";

declare global {
    interface Window {
        codemirrorit: (id: string) => void;
    }
}

// TODO: Apply this theme https://palettes.shecodes.io/palettes/1313
window.codemirrorit = function (id: string) {
    let referenceNode = document.getElementById(id) || document.body;
    const codemirrorDiv = document.createElement("div");
    codemirrorDiv.classList.add("mt-3");
    referenceNode.after(codemirrorDiv);
    const originalHtml = referenceNode.innerHTML;

    let theme = EditorView.theme({
        "&": {
            color: "#ececec",
            backgroundColor: "#142d4c"
        },
        ".cm-content": {
            caretColor: "#ececec"
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#ececec"
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#074"
        },
        ".cm-gutters": {
            backgroundColor: "#045",
            color: "#ddd",
            border: "none"
        }
    }, { dark: true });

    window.addEventListener("load", () => {
        let state = EditorState.create({
            doc: originalHtml, 
            extensions: [
                html(),
                theme,
                syntaxHighlighting(defaultHighlightStyle)
            ],
        });
        new EditorView({
            state: state,
            parent: codemirrorDiv
        });
    });
}
