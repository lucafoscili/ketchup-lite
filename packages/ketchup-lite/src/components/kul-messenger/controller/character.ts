import { defaultToCurrentCharacter, hasCharacters } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterSetters,
  KulMessengerCharacterNode,
} from "../kul-messenger-declarations";

//#region Getters
export const prepCharacterGetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters["character"] => {
  return {
    biography: (character?) => getBiography(getAdapter, character),
    byId: (id) => {
      const { kulData } = getAdapter().controller.get.compInstance;
      return kulData.nodes.find((n) => n.id === id);
    },
    chat: (character?) => getChat(getAdapter, character),
    current: () => {
      const { currentCharacter } = getAdapter().controller.get.compInstance;
      return currentCharacter;
    },
    history: (character?) => getHistory(getAdapter, character),
    list: () => {
      const { kulData } = getAdapter().controller.get.compInstance;
      return kulData.nodes || [];
    },
    name: (character?) => getName(getAdapter, character),
    next: (character?) => fetch(getAdapter, character, true),
    previous: (character?) => fetch(getAdapter, character),
  };
};
//#endregion

//#region Setters
export const prepCharacterSetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters["character"] => {
  return {
    chat: (chat, character?) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;
      const { id } = defaultToCurrentCharacter(getAdapter(), character);

      compInstance.chat[id] = chat;
    },
    current: (character) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;

      compInstance.currentCharacter = character;
    },
    history: (history, character?) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;
      const { id } = defaultToCurrentCharacter(getAdapter(), character);

      if (compInstance.history[id] !== history) {
        compInstance.history[id] = history;

        if (compInstance.kulAutosave) {
          adapter.controller.set.data();
        }
      }
    },
    next: (character?) => {
      const adapter = getAdapter();
      if (!hasCharacters(adapter)) {
        return;
      }

      const { set } = adapter.controller;

      const c = defaultToCurrentCharacter(getAdapter(), character);
      const { next } = adapter.controller.get.character;

      set.character.current(next(c));
    },
    previous: (character?) => {
      const adapter = getAdapter();
      if (!hasCharacters(adapter)) {
        return;
      }

      const { set } = adapter.controller;

      const c = defaultToCurrentCharacter(getAdapter(), character);
      const { previous } = adapter.controller.get.character;

      set.character.current(previous(c));
    },
  };
};
//#endregion

//#region Helpers
const getBiography = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const adapter = getAdapter();
  const { stringify } = adapter.controller.get.manager.data.cell;

  const c = defaultToCurrentCharacter(getAdapter(), character);

  try {
    const bio = c.children.find((n) => n.id === "biography").value;
    return bio
      ? stringify(bio)
      : "You have no informations about this character...";
  } catch (error) {
    return "You have no informations about this character...";
  }
};
const getChat = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const adapter = getAdapter();
  const { chat } = adapter.controller.get.compInstance;
  const { id } = defaultToCurrentCharacter(adapter, character);

  return chat[id];
};
const getHistory = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const adapter = getAdapter();
  const { history } = adapter.controller.get.compInstance;
  const { id } = defaultToCurrentCharacter(getAdapter(), character);

  return history[id];
};
const getName = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const { description, id, value } = defaultToCurrentCharacter(
    getAdapter(),
    character,
  );

  return value || id || description || "?";
};
const fetch = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
  next?: boolean,
) => {
  const adapter = getAdapter();
  const { kulData } = adapter.controller.get.compInstance;
  const { id } = defaultToCurrentCharacter(getAdapter(), character);

  if (!hasCharacters(adapter)) {
    return null;
  }

  const characters = kulData.nodes;
  const currentIdx = characters.findIndex((c) => c.id === id);

  switch (next) {
    case true:
      const nIdx = (currentIdx + 1) % characters.length;
      return characters[nIdx];
    default:
      const pIdx = (currentIdx + characters.length - 1) % characters.length;
      return characters[pIdx];
  }
};
//#endregion
