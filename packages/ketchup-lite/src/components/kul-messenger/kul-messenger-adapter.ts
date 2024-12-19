import {
  prepCharacterGetters,
  prepCharacterSetters,
} from "./controller/character";
import { prepImageGetters, prepImageSetters } from "./controller/image";
import { prepUiGetters, prepUiSetters } from "./controller/ui";
import { prepCharacter } from "./elements/character";
import { prepChat } from "./elements/chat";
import { prepCustomization } from "./elements/customization";
import { prepOptions } from "./elements/options";
import { prepCharacterHandlers } from "./handlers/character";
import { prepChatHandlers } from "./handlers/chat";
import { prepCustomizationHandlers } from "./handlers/customization";
import { prepOptionsHandlers } from "./handlers/options";
import { REFS } from "./helpers/constants";
import { updateDataset } from "./helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterHandlers,
  KulMessengerAdapterInitializerGetters,
  KulMessengerAdapterJsx,
  KulMessengerAdapterSetters,
} from "./kul-messenger-declarations";

//#region Adapter
export const createAdapter = (
  getters: KulMessengerAdapterInitializerGetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapter => {
  return {
    controller: {
      get: createGetters(getters, getAdapter),
      set: createSetters(getAdapter),
    },
    elements: {
      jsx: createJsx(getAdapter),
      refs: REFS(),
    },
    handlers: createHandlers(getAdapter),
  };
};
//#endregion

//#region Controller
export const createGetters = (
  getters: KulMessengerAdapterInitializerGetters,
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters => {
  return {
    ...getters,
    character: prepCharacterGetters(getAdapter),
    image: prepImageGetters(getAdapter),
    config: () => {
      const { compInstance } = getAdapter().controller.get;
      const { currentCharacter, ui } = compInstance;

      return {
        currentCharacter: currentCharacter.id,
        ui,
      };
    },
    data: () => {
      const { kulData } = getAdapter().controller.get.compInstance;
      return kulData;
    },
    history: () => {
      const { history } = getAdapter().controller.get.compInstance;
      return history;
    },
    status: {
      connection: () => {
        const { connectionStatus } = getAdapter().controller.get.compInstance;
        return connectionStatus;
      },
      editing: () => {
        const { editingStatus } = getAdapter().controller.get.compInstance;
        return editingStatus;
      },
      hoveredCustomizationOption: () => {
        const { hoveredCustomizationOption } =
          getAdapter().controller.get.compInstance;
        return hoveredCustomizationOption;
      },
      save: {
        inProgress: () => {
          const { saveInProgress } = getAdapter().controller.get.compInstance;
          return saveInProgress;
        },
      },
    },
    ui: prepUiGetters(getAdapter),
  };
};
export const createSetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters => {
  return {
    character: prepCharacterSetters(getAdapter),
    image: prepImageSetters(getAdapter),
    data: () => updateDataset(getAdapter()),
    status: {
      connection: (status) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.connectionStatus = status;
      },
      editing: (type, id) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.editingStatus[type] = id;
      },
      hoveredCustomizationOption: (node) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.hoveredCustomizationOption = node;
      },
      save: {
        inProgress: (value) => {
          const { compInstance } = getAdapter().controller.get;
          compInstance.saveInProgress = value;
        },
      },
    },
    ui: prepUiSetters(getAdapter),
  };
};
//#endregion

//#region Elements
export const createJsx = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx => {
  return {
    character: prepCharacter(getAdapter),
    chat: prepChat(getAdapter),
    customization: prepCustomization(getAdapter),
    options: prepOptions(getAdapter),
  };
};
//#endregion

//#region Handlers
export const createHandlers = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterHandlers => {
  return {
    character: prepCharacterHandlers(getAdapter),
    customization: prepCustomizationHandlers(getAdapter),
    chat: prepChatHandlers(getAdapter),
    options: prepOptionsHandlers(getAdapter),
  };
};
//#endregion
