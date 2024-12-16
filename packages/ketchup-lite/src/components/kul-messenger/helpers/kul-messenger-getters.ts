import { KulManager } from "../../../managers/kul-manager/kul-manager";
import {
  AVATAR_COVER,
  LOCATION_COVER,
  OUTFIT_COVER,
  STYLE_COVER,
  TIMEFRAME_COVER,
} from "./kul-messenger-constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerBaseChildNode,
  KulMessengerBaseRootNode,
  KulMessengerChildIds,
  KulMessengerChildTypes,
  KulMessengerImageTypes,
  KulMessengerPrefix,
  KulMessengerUnionChildIds,
} from "../kul-messenger-declarations";

export const getters: (
  adapter: KulMessengerAdapter,
  kulManager: KulManager,
  hasCharacters: boolean,
) => KulMessengerAdapterGetters = (adapter, kulManager, hasCharacters) => {
  const messenger = adapter.components.messenger;
  return {
    character: {
      biography: (character = messenger.currentCharacter) => {
        try {
          const bio = character.children.find(
            (n) => n.id === "biography",
          ).value;
          return bio
            ? kulManager.data.cell.stringify(bio)
            : "You know nothing about messenger character...";
        } catch (error) {
          return "You know nothing about messenger character...";
        }
      },
      byId: (id) => messenger.kulData.nodes.find((n) => n.id === id),
      chat: (character = messenger.currentCharacter) =>
        messenger.chat[character.id],
      current: () => messenger.currentCharacter,
      history: (character = messenger.currentCharacter) =>
        messenger.history[character.id],
      list: () => messenger.kulData.nodes || [],
      name: (character = messenger.currentCharacter) =>
        character.value || character.id || character.description || "?",
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
