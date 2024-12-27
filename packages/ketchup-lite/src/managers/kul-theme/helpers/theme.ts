import { KulThemeList } from "../kul-theme-declarations";
import { CINDER } from "./theme.cinder";
import { COBALT } from "./theme.cobalt";
import { FLAMINGO } from "./theme.flamingo";
import { GRAPHITE } from "./theme.graphite";
import { KETCHUP } from "./theme.ketchup";
import { NIGHT } from "./theme.night";
import { OBSIDIAN } from "./theme.obsidian";
import { OCEAN } from "./theme.ocean";
import { RAJ } from "./theme.raj";
import { RED } from "./theme.red";
import { SAPPHIRE } from "./theme.sapphire";
import { SILVER } from "./theme.silver";
import { SNOW } from "./theme.snow";
import { TEAL } from "./theme.teal";
import { WILDLIFE } from "./wildlife.theme";

//#region Theme list
export const THEME_LIST: KulThemeList = {
  cinder: CINDER,
  cobalt: COBALT,
  flamingo: FLAMINGO,
  graphite: GRAPHITE,
  ketchup: KETCHUP,
  night: NIGHT,
  obsidian: OBSIDIAN,
  ocean: OCEAN,
  raj: RAJ,
  red: RED,
  sapphire: SAPPHIRE,
  silver: SILVER,
  snow: SNOW,
  teal: TEAL,
  wildlife: WILDLIFE,
} as const;
//#endregion
