import { CalendarHelper } from "./calendar-helper";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
declare global {
    var calHelper: CalendarHelper;
}
export declare class FazBsCalendarPane extends FazBsElement {
    private divElement;
    private hourLine;
    private hourLabel;
    private SLOT_HEIGHT;
    private SLOTS_PER_HOUR;
    private TOTAL_SLOTS;
    private quaterLabels;
    constructor();
    get classNames(): string;
    get baseClass(): string;
    renderDays(): JSX.Element;
    updateCurrentHour(): void;
    show(): void;
    afterShow(): void;
}
//# sourceMappingURL=calendar-pane.d.ts.map