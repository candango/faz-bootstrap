import { CalendarHelper } from "./calendar-helper";
import { FazBsElement } from "../bs-element";
import { JSX } from "solid-js/jsx-runtime";
import { render } from "solid-js/web";

declare global {
  var calHelper: CalendarHelper;
}

(window as any).calHelper = new CalendarHelper();

export class FazBsCalendarPane extends FazBsElement {
    private divElement: JSX.Element;
    private hourLine: JSX.Element;
    private hourLabel: JSX.Element;
    
    private SLOT_HEIGHT: number = 30;
    private SLOTS_PER_HOUR: number = 4;
    private TOTAL_SLOTS: number = 24 * this.SLOTS_PER_HOUR;
    private quaterLabels: string[]  = ['00', '15', '30', '45'];

    constructor() {
        super();
        this.hourLabel = <span class="floating-time-label"></span>;
        this.hourLine = <div class="current-hour-indicator">{this.hourLabel}</div>;
    }

    get classNames() {
        let classes = [];
        const active = this.active();
        const disabled = this.disabled();

        if (active && !disabled) {
            classes.push("active");
        }
        if (disabled) {
            classes.push("disabled");
        }
        if (this.kind()) {
            classes.push("link-" + this.kind());
        }
        if (this.extraClasses()) {
            classes.push(this.extraClasses());
        }
        console.log(classes)
        return classes.join(" ");
    }

    get baseClass(): string {
        return "faz-bs-calendar";
    }

    renderDays() : JSX.Element {
        const rows = [];
        const quarterLabels = this.quaterLabels;
        for (let h = 0; h < 24; h++) {
            for (let q = 0; q < 4; q++) {
                rows.push(
                    <div class="slot-row" style={{ height: `${this.SLOT_HEIGHT}px`}}>
                        <div class="time-label">
                        {quarterLabels[q] !== "00" ? "" :
                        h.toString().padStart(2, '0') + ':' + quarterLabels[q]}
                        </div>
                    </div>
                );
            }
        }
        return <>{rows}</>
    }

    updateCurrentHour() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const slotIndex = hour * this.SLOTS_PER_HOUR + (minute / 15) + this.SLOTS_PER_HOUR;
        const top = slotIndex * this.SLOT_HEIGHT + (this.SLOT_HEIGHT * (minute % 15) / 15)  - this.SLOT_HEIGHT;

        const hourLine =(this.hourLine as HTMLElement); 
        const hourLabel =(this.hourLabel as HTMLElement); 

        hourLine.style.top = `${top}px`
        console.log(hour, minute, top);
        hourLabel.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    }

    show() {
        this.divElement = <div id={`faz-bs-calendar-${this.id}`} class={this.classNames}>
            {this.renderDays()}
            {this.hourLine}
        </div>;
        render(() => this.divElement, this);
    }

    afterShow(): void {
        this.updateCurrentHour();
        setInterval(this.updateCurrentHour.bind(this), 30000)
    }
}

customElements.define("faz-bs-calendar-pane", FazBsCalendarPane);
