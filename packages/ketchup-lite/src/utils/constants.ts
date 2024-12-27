import { KUL_ACCORDION_PROPS } from "src/components/kul-accordion/helpers/constants";
import { KUL_ARTICLE_PROPS } from "src/components/kul-article/helpers/constants";
import { KUL_BADGE_PROPS } from "src/components/kul-badge/helpers/constants";
import { KUL_BUTTON_PROPS } from "src/components/kul-button/helpers/constants";
import { KUL_CANVAS_PROPS } from "src/components/kul-canvas/helpers/constants";
import { KUL_CARD_PROPS } from "src/components/kul-card/helpers/constants";
import { KUL_CAROUSEL_PROPS } from "src/components/kul-carousel/helpers/constants";
import { KUL_CHART_PROPS } from "src/components/kul-chart/helpers/constants";
import { KUL_CHAT_PROPS } from "src/components/kul-chat/helpers/constants";
import { KUL_CHIP_PROPS } from "src/components/kul-chip/helpers/constants";
import { KUL_CODE_PROPS } from "src/components/kul-code/helpers/constants";
import { KUL_COMPARE_PROPS } from "src/components/kul-compare/helpers/constants";
import { KUL_DRAWER_PROPS } from "src/components/kul-drawer/helpers/constants";
import { KUL_HEADER_PROPS } from "src/components/kul-header/helpers/constants";
import { KUL_IMAGE_PROPS } from "src/components/kul-image/helpers/constants";
import { KUL_IMAGEVIEWER_PROPS } from "src/components/kul-imageviewer/helpers/constants";
import { KUL_LAZY_PROPS } from "src/components/kul-lazy/helpers/constants";
import { KUL_LIST_PROPS } from "src/components/kul-list/helpers/constants";
import { KUL_MASONRY_PROPS } from "src/components/kul-masonry/helpers/constants";
import { KUL_MESSENGER_PROPS } from "src/components/kul-messenger/helpers/constants";
import { KUL_PHOTOFRAME_PROPS } from "src/components/kul-photoframe/helpers/constants";
import { KUL_PROGRESSBAR_PROPS } from "src/components/kul-progressbar/helpers/constants";
import { KUL_SLIDER_PROPS } from "src/components/kul-slider/helpers/constants";
import { KUL_SPINNER_PROPS } from "src/components/kul-spinner/helpers/constants";
import { KUL_SPLASH_PROPS } from "src/components/kul-splash/helpers/constants";
import { KUL_TABBAR_PROPS } from "src/components/kul-tabbar/helpers/constants";
import { KUL_TEXTFIELD_PROPS } from "src/components/kul-textfield/helpers/constants";
import { KUL_TOAST_PROPS } from "src/components/kul-toast/helpers/constants";
import { KUL_TOGGLE_PROPS } from "src/components/kul-toggle/helpers/constants";
import { KUL_TREE_PROPS } from "src/components/kul-tree/helpers/constants";
import { KUL_TYPEWRITER_PROPS } from "src/components/kul-typewriter/helpers/constants";
import { KUL_UPLOAD_PROPS } from "src/components/kul-upload/helpers/constants";
import { KulComponentName, KulComponentPropsMap } from "src/types/GenericTypes";

export const CSS_VAR_PREFIX = "--kul" as const;
export const CY_ATTRIBUTES = {
  button: "button",
  canvas: "canvas",
  check: "check",
  dropdownButton: "dropdown-button",
  dropdownMenu: "dropdown-menu",
  icon: "icon",
  image: "image",
  input: "input",
  maskedSvg: "masked-svg",
  node: "node",
  ripple: "ripple",
  shape: "shape",
  showcaseGridWrapper: "showcase-grid-wrapper",
} as const;
export const KUL_DROPDOWN_CLASS = "kul-dropdown-menu" as const;
export const KUL_DROPDOWN_CLASS_VISIBLE = "kul-dropdown-menu--visible" as const;
export const KUL_STYLE_ID = "kul-style" as const;
export const KUL_WRAPPER_ID = "kul-component" as const;
export const KUL_COMPONENT_PROPS: {
  [K in KulComponentName]: (keyof KulComponentPropsMap[K])[];
} = {
  KulAccordion: KUL_ACCORDION_PROPS,
  KulArticle: KUL_ARTICLE_PROPS,
  KulBadge: KUL_BADGE_PROPS,
  KulButton: KUL_BUTTON_PROPS,
  KulCanvas: KUL_CANVAS_PROPS,
  KulCard: KUL_CARD_PROPS,
  KulCarousel: KUL_CAROUSEL_PROPS,
  KulChart: KUL_CHART_PROPS,
  KulChat: KUL_CHAT_PROPS,
  KulChip: KUL_CHIP_PROPS,
  KulCode: KUL_CODE_PROPS,
  KulCompare: KUL_COMPARE_PROPS,
  KulDrawer: KUL_DRAWER_PROPS,
  KulHeader: KUL_HEADER_PROPS,
  KulImage: KUL_IMAGE_PROPS,
  KulImageviewer: KUL_IMAGEVIEWER_PROPS,
  KulLazy: KUL_LAZY_PROPS,
  KulList: KUL_LIST_PROPS,
  KulMasonry: KUL_MASONRY_PROPS,
  KulMessenger: KUL_MESSENGER_PROPS,
  KulPhotoframe: KUL_PHOTOFRAME_PROPS,
  KulProgressbar: KUL_PROGRESSBAR_PROPS,
  KulSlider: KUL_SLIDER_PROPS,
  KulSpinner: KUL_SPINNER_PROPS,
  KulSplash: KUL_SPLASH_PROPS,
  KulTabbar: KUL_TABBAR_PROPS,
  KulTextfield: KUL_TEXTFIELD_PROPS,
  KulToast: KUL_TOAST_PROPS,
  KulToggle: KUL_TOGGLE_PROPS,
  KulTree: KUL_TREE_PROPS,
  KulTypewriter: KUL_TYPEWRITER_PROPS,
  KulUpload: KUL_UPLOAD_PROPS,
} as const;
export const RIPPLE_SURFACE_CLASS = "ripple-surface" as const;
