import type { KulDom } from "../kul-manager/kul-manager-declarations";
import type {
  KulComponent,
  KulComponentName,
  KulGenericComponent,
} from "../../types/GenericTypes";
import {
  KulDebugLifecycles,
  KulDebugLog,
  KulDebugLogClass,
  KulDebugLogFactory,
  KulDebugLogsToPrint,
  KulDebugLogToPrintEntry,
  KulDebugManagedComponents,
} from "./kul-debug-declarations";
import { KulCode } from "../../components/kul-code/kul-code";
import { KulToggle } from "../../components/kul-toggle/kul-toggle";

export class KulDebug {
  #DOM = document.documentElement as KulDom;
  #IS_ENABLED: boolean;
  #LOG_LIMIT: number;
  #LOGS: KulDebugLog[];
  #MANAGED_COMPONENTS: { codes: Set<KulCode>; togglees: Set<KulToggle> };

  constructor(active?: boolean, logLimit?: number) {
    this.#IS_ENABLED = active ? true : false;
    this.#LOG_LIMIT = logLimit ? logLimit : 250;
    this.#LOGS = [];
    this.#MANAGED_COMPONENTS = { codes: new Set(), togglees: new Set() };
  }

  #codeDispatcher = (log?: KulDebugLog) => {
    Array.from(this.#MANAGED_COMPONENTS.codes).forEach((comp) => {
      if (log) {
        comp.kulValue = `# ${log.id}:\n${log.message}\n\n${comp.kulValue}`;
      } else {
        comp.kulValue = "";
      }
    });
  };

  #toggleDispatcher = () => {
    Array.from(this.#MANAGED_COMPONENTS.togglees).forEach((comp) => {
      comp.setValue(this.#IS_ENABLED ? "on" : "off");
    });
  };

  logs: KulDebugLogFactory = {
    dump: () => {
      this.#LOGS = [];
      this.#codeDispatcher();
    },
    fromComponent(comp: KulDebugLogClass): comp is KulGenericComponent {
      return (comp as KulGenericComponent).rootElement !== undefined;
    },
    new: async (comp, message, category = "informational") => {
      if (this.#MANAGED_COMPONENTS.codes.has(comp as KulCode)) {
        return;
      }

      const isFromComponent = this.logs.fromComponent(comp);
      const log: KulDebugLog = {
        category,
        class: null,
        date: new Date(),
        id: isFromComponent
          ? `${comp.rootElement.tagName} ${comp.rootElement.id ? "( #" + comp.rootElement.id + " )" : ""}`
          : "KulManager",
        message,
        type:
          message.indexOf("Render #") > -1
            ? "render"
            : message.indexOf("Component ready") > -1
              ? "load"
              : message.indexOf("Size changed") > -1
                ? "resize"
                : "misc",
      };

      if (this.#LOGS.length > this.#LOG_LIMIT) {
        if (this.#IS_ENABLED) {
          console.warn(
            this.#DOM.ketchupLite.dates.format(log.date, "LLL:ms") +
              " kul-debug => " +
              "Too many logs (> " +
              this.#LOG_LIMIT +
              ")! Dumping (increase debug.logLimit to store more logs)... .",
          );
        }
        this.logs.dump();
      }
      this.#LOGS.push(log);

      switch (category) {
        case "error":
          console.error(
            this.#DOM.ketchupLite.dates.format(log.date, "LLL:ms") +
              log.id +
              log.message,
            log.class,
          );
          break;
        case "warning":
          console.warn(
            this.#DOM.ketchupLite.dates.format(log.date, "LLL:ms") +
              log.id +
              log.message,
            log.class,
          );
          break;
      }

      if (this.isEnabled()) {
        this.#codeDispatcher(log);
      }
    },
    print: () => {
      const logsToPrint: KulDebugLogsToPrint = {
        load: [],
        misc: [],
        render: [],
        resize: [],
      };
      for (let index = 0; index < this.#LOGS.length; index++) {
        const log = this.#LOGS[index];
        const printEntry: KulDebugLogToPrintEntry = {
          class: log.class,
          date: this.#DOM.ketchupLite.dates.format(log.date, "LLL:ms"),
          message: log.id + log.message,
        };
        logsToPrint[log.type].push(printEntry);
      }
      for (const key in logsToPrint) {
        if (Object.prototype.hasOwnProperty.call(logsToPrint, key)) {
          const logs: KulDebugLogToPrintEntry[] = logsToPrint[key];
          console.groupCollapsed(
            "%c  %c" + key + " logs " + "(" + logsToPrint[key].length + ")",
            "background-color: green; margin-right: 10px; border-radius: 50%",
            "background-color: transparent",
          );
          for (let index = 0; index < logs.length; index++) {
            const log = logs[index];
            console.log(log.date, log.message, log.class);
          }
          console.groupEnd();
        }
      }
      if (this.#LOGS.length > 0) {
        console.groupCollapsed(
          "%c  %c" + "All logs (" + this.#LOGS.length + ")",
          "background-color: blue; margin-right: 10px; border-radius: 50%",
          "background-color: transparent",
        );
        console.table(this.#LOGS);
        console.groupEnd();
      }
    },
  };

  isEnabled(): boolean {
    return this.#IS_ENABLED;
  }

  register(comp: KulDebugManagedComponents): void {
    if (comp.rootElement.tagName.toLowerCase() === "kul-code") {
      this.#MANAGED_COMPONENTS.codes.add(comp as KulCode);
    } else {
      this.#MANAGED_COMPONENTS.togglees.add(comp as KulToggle);
    }
  }

  toggle(value?: boolean, dispatch = true) {
    if (value === false || value === true) {
      this.#IS_ENABLED = value;
    } else {
      this.#IS_ENABLED = !this.#IS_ENABLED;
    }

    if (dispatch) {
      this.#toggleDispatcher();
    }

    return this.#IS_ENABLED;
  }

  unregister(comp: KulDebugManagedComponents): void {
    if (comp.rootElement.tagName.toLowerCase() === "kul-code") {
      this.#MANAGED_COMPONENTS.codes.delete(comp as KulCode);
    } else {
      this.#MANAGED_COMPONENTS.togglees.delete(comp as KulToggle);
    }
  }

  async updateDebugInfo(
    comp: KulComponent<KulComponentName>,
    lifecycle: KulDebugLifecycles,
  ): Promise<void> {
    switch (lifecycle) {
      case "custom":
        if (this.isEnabled()) {
          this.logs.new(
            comp,
            "Custom breakpoint " +
              " took " +
              (window.performance.now() - comp.debugInfo.renderStart) +
              "ms.",
          );
        }
        break;
      case "did-render":
        comp.debugInfo.renderEnd = window.performance.now();
        if (this.isEnabled()) {
          this.logs.new(
            comp,
            "Render #" +
              comp.debugInfo.renderCount +
              " took " +
              (comp.debugInfo.renderEnd - comp.debugInfo.renderStart) +
              "ms.",
          );
        }
        break;
      case "did-load":
        comp.debugInfo.endTime = window.performance.now();
        this.logs.new(
          comp,
          "Component ready after " +
            (comp.debugInfo.endTime - comp.debugInfo.startTime) +
            "ms.",
        );
        break;
      case "will-render":
        comp.debugInfo.renderCount++;
        comp.debugInfo.renderStart = window.performance.now();
      default:
        break;
    }
  }
}
