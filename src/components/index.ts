import RInput, { type Props as RInputProps } from "./input";
import RPagination, { type Props as RPaginationProps } from "./pagination";
import RPopup, {
  type Props as RPopupProps,
  PopupRoot,
  PopupContent,
  PopupOverlay,
  PopupClose,
  PopupTitle,
  PopupDescription,
} from "./popup";
import { RSelect, ROption, RSelectGroup } from "./select";
import RSlider, { type Props as RSliderProps } from "./slider";
import { RTab, RTabItem, RPanel, RPanelItem, type Props as RTabProps } from "./tabs";
import RRadio, { type Props as RRadioProps } from "./radio";
import RSwitch, { type Props as RSwitchProps } from "./switch";
import RLoading, { type Props as RLoadingProps } from "./loading/RLoading.vue";

import { Slot, Primitive } from "./primitive";
import { Label } from "./internal";

export * from "./alert";
export * from "./button";
export * from "./checkbox";
export * from "./roving-focus";
export * from "./tabs";
export * from "./dropdown";
export {
  RInput,
  RInputProps,
  RPagination,
  RPaginationProps,
  RPopup,
  PopupRoot,
  PopupContent,
  PopupOverlay,
  PopupClose,
  PopupTitle,
  PopupDescription,
  RPopupProps,
  RSelect,
  // RSelectProps,
  ROption,
  // ROptionProps,
  RSelectGroup,
  RSlider,
  RSliderProps,
  RTab,
  RTabProps,
  RTabItem,
  RPanel,
  RPanelItem,
  RRadio,
  RRadioProps,
  RSwitch,
  RSwitchProps,
  RLoading,
  RLoadingProps,
  Slot,
  Primitive,
  Label,
};
