import { h, VNode } from "@stencil/core";

//#region Spinner configs
export const SPINNER_CONFIGS: {
  [key: number]: { className: string; elements: () => VNode[] };
} = {
  7: {
    className: "spinner-v7",
    elements: () =>
      Array(6)
        .fill(0)
        .map(() => <div class="sk-spinner-v7-dot"></div>),
  },
  9: {
    className: "spinner-v9",
    elements: () => [
      <div class="sk-spinner-v9-bounce1"></div>,
      <div class="sk-spinner-v9-bounce2"></div>,
    ],
  },
  10: {
    className: "spinner-v10",
    elements: () => [
      <div class="sk-spinner-v10-cube1"></div>,
      <div class="sk-spinner-v10-cube2"></div>,
    ],
  },
  12: {
    className: "spinner-v12",
    elements: () => [
      <div class="sk-spinner-v12-dot1"></div>,
      <div class="sk-spinner-v12-dot2"></div>,
    ],
  },
  13: {
    className: "spinner-v13",
    elements: () =>
      Array(9)
        .fill(0)
        .map((_, i) => (
          <div class={`sk-spinner-v13-cube sk-spinner-v13-cube${i + 1}`}></div>
        )),
  },
  14: {
    className: "spinner-v14",
    elements: () =>
      Array(12)
        .fill(0)
        .map((_, i) => (
          <div
            class={`sk-spinner-v14-circle${i + 1} sk-spinner-v14-circle`}
          ></div>
        )),
  },
};
//#endregion

//#region Bar configs
export const BAR_SPINNER_CONFIGS: {
  [key: number]: {
    className: string;
    elements: (progress?: number) => VNode[];
  };
} = {
  1: {
    className: "spinner-bar-v1",
    elements: () => [],
  },
  2: {
    className: "spinner-bar-v2",
    elements: () => [],
  },
  3: {
    className: "spinner-bar-v3",
    elements: (progress: number) => [
      <div class="progress-bar" style={{ width: `${progress}%` }}></div>,
    ],
  },
};
//#endregion
