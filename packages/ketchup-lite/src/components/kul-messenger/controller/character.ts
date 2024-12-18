import { kulManagerSingleton } from "src";
import { defaultToCurrentCharacter, hasCharacters } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerCharacterNode,
} from "../kul-messenger-declarations";

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

const getBiography = (
  getAdapter: () => KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const { stringify } = kulManagerSingleton.data.cell;

  const c = defaultToCurrentCharacter(getAdapter(), character);

  try {
    const bio = c.children.find((n) => n.id === "biography").value;
    return bio ? stringify(bio) : "You know nothing about this character...";
  } catch (error) {
    return "You know nothing about this character...";
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
    return;
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
