import { kulManagerSingleton } from "src";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerCharacterNode,
} from "../kul-messenger-declarations";

export const  = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters => {
  return {
    character: {
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
      next: (character = messenger.currentCharacter) => {
        if (!hasCharacters) {
          return;
        }
        const nodes = messenger.kulData.nodes;
        const currentIdx = nodes.findIndex((n) => n.id === character.id);
        const nextIdx = (currentIdx + 1) % nodes.length;

        return nodes[nextIdx];
      },
      previous: (character = messenger.currentCharacter) => {
        if (!hasCharacters) {
          return;
        }
        const nodes = messenger.kulData.nodes;
        const currentIdx = nodes.findIndex((n) => n.id === character.id);
        const prevIdx = (currentIdx + nodes.length - 1) % nodes.length;

        return nodes[prevIdx];
      },
    },
    compInstance: null,
    image: {
      asCover: (type, character = messenger.currentCharacter) => {
        try {
          const root = character.children.find((n) => n.id === type);
          const index = messenger.covers[character.id][type];
          const node = root.children[index];
          return {
            node: root.children[
              index
            ] as KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
            title: adapter.get.image.title(
              node as KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
            ),
            value: node.cells.kulImage.value,
          };
        } catch (error) {
          switch (type) {
            case "avatars":
              return { value: AVATAR_COVER };
            case "locations":
              return { value: LOCATION_COVER };
            case "outfits":
              return { value: OUTFIT_COVER };
            case "styles":
              return { value: STYLE_COVER };
            case "timeframes":
              return { value: TIMEFRAME_COVER };
          }
        }
      },
      byType: (type, character = messenger.currentCharacter) => {
        const node = character.children.find((child) => child.id === type);

        if (node?.children) {
          return node.children as KulMessengerBaseChildNode<KulMessengerUnionChildIds>[];
        } else {
          return [];
        }
      },
      coverIndex: (type, character = messenger.currentCharacter) => {
        return messenger.covers[character.id][type];
      },
      newId: (type) => {
        const images = adapter.get.image.byType(type);
        let index = 0;
        let prefix: KulMessengerPrefix<KulMessengerChildTypes>;
        let nodeId: KulMessengerChildIds<KulMessengerUnionChildIds>;
        switch (type) {
          case "avatars":
            prefix = "avatar_";
            break;
          case "locations":
            prefix = "location_";
            break;
          case "outfits":
            prefix = "outfit_";
            break;
          case "styles":
            prefix = "style_";
            break;
          case "timeframes":
            prefix = "timeframe_";
            break;
          default:
            throw new Error(`Unknown image type: ${type}`);
        }
        do {
          nodeId =
            `${prefix}${index.toString()}` as KulMessengerChildIds<KulMessengerUnionChildIds>;
          index++;
        } while (images.some((node) => node.id === nodeId));

        return nodeId;
      },
      root: (type, character = messenger.currentCharacter) => {
        const node = character.children.find((n) => n.id === type);
        return node as KulMessengerBaseRootNode<KulMessengerImageTypes>;
      },
      title: (node) => {
        const title = node?.value || "";
        const description = node?.description || "";
        return title && description
          ? `${title} - ${description}`
          : description
            ? description
            : title
              ? title
              : "";
      },
    },
    messenger: {
      config: () => {
        return {
          currentCharacter: messenger.currentCharacter.id,
          ui: messenger.ui,
        };
      },
      data: () => messenger.kulData,
      history: () => messenger.history,
      status: {
        connection: () => messenger.connectionStatus,
        editing: () => messenger.editingStatus,
        hoveredCustomizationOption: () => messenger.hoveredCustomizationOption,
        save: {
          inProgress: () => messenger.saveInProgress,
        },
      },
      ui: () => messenger.ui,
    },
  };
};

const defaultToCurrentCharacter = (
  adapter: KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const { currentCharacter } = adapter.controller.get.compInstance;
  return character ?? currentCharacter;
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
