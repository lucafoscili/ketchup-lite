import {
  AVATAR_COVER,
  LOCATION_COVER,
  OUTFIT_COVER,
  STYLE_COVER,
  TIMEFRAME_COVER,
} from "../helpers/constants";
import { defaultToCurrentCharacter } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterSetters,
  KulMessengerBaseChildNode,
  KulMessengerBaseRootNode,
  KulMessengerCharacterNode,
  KulMessengerChildIds,
  KulMessengerChildTypes,
  KulMessengerImageTypes,
  KulMessengerPrefix,
  KulMessengerUnionChildIds,
} from "../kul-messenger-declarations";

//#region Getters
export const prepImageGetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters["image"] => {
  return {
    asCover: (type, character?) => getAsCover(getAdapter, type, character),
    byType: (type, character?) => getByType(getAdapter, type, character),
    coverIndex: (type, character?) => {
      const adapter = getAdapter();
      const { covers } = adapter.controller.get.compInstance;
      const { id } = defaultToCurrentCharacter(adapter, character);

      return covers[id][type];
    },
    newId: (type) => getNewId(getAdapter, type),
    root: (type, character?) => {
      const adapter = getAdapter();
      const { children } = defaultToCurrentCharacter(adapter, character);

      const node = children.find((n) => n.id === type);

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
  };
};
//#endregion

//#region Setters
export const prepImageSetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters["image"] => {
  return {
    cover: (
      type: KulMessengerImageTypes,
      value: number,
      character?: KulMessengerCharacterNode,
    ) => {
      const adapter = getAdapter();
      const { compInstance } = adapter.controller.get;
      const { id } = defaultToCurrentCharacter(getAdapter(), character);

      compInstance.covers[id][type] = value;
      compInstance.refresh();
    },
  };
};
//#endregion

//#region Helpers
const getAsCover = (
  getAdapter: () => KulMessengerAdapter,
  type: KulMessengerImageTypes,
  character: KulMessengerCharacterNode,
) => {
  const adapter = getAdapter();
  const { compInstance, image } = adapter.controller.get;
  const { children, id } = defaultToCurrentCharacter(adapter, character);
  const { covers } = compInstance;

  try {
    const root = children.find((n) => n.id === type);
    const index = covers[id][type];
    const node = root.children[index];

    return {
      node: root.children[
        index
      ] as KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
      title: image.title(
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
};
const getByType = (
  getAdapter: () => KulMessengerAdapter,
  type: KulMessengerImageTypes,
  character: KulMessengerCharacterNode,
) => {
  const { children } = defaultToCurrentCharacter(getAdapter(), character);

  const node = children.find((child) => child.id === type);

  if (node?.children) {
    return node.children as KulMessengerBaseChildNode<KulMessengerUnionChildIds>[];
  } else {
    return [];
  }
};
const getNewId = (
  getAdapter: () => KulMessengerAdapter,
  type: KulMessengerImageTypes,
) => {
  const { byType } = getAdapter().controller.get.image;

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
    nodeId = `${prefix}${index.toString()}`;
    index++;
  } while (byType(type).some((node) => node.id === nodeId));

  return nodeId;
};
//#endregion
