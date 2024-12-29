import {
  KulChatPropsInterface,
  KulChatStatus,
} from "src/components/kul-chat/kul-chat-declarations";
import {
  KulDataCell,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import {
  KulMessengerAdapter,
  KulMessengerBaseChildNode,
  KulMessengerCharacterNode,
  KulMessengerChildIds,
  KulMessengerImageRootIds,
  KulMessengerImageTypes,
  KulMessengerUnionChildIds,
} from "../kul-messenger-declarations";

//#region assignChatProps
export const extractPropsFromChatCell = (
  chatCell: KulDataCell<"chat">,
  target: KulChatPropsInterface,
) => {
  const { kulEndpointUrl, kulMaxTokens, kulPollingInterval, kulTemperature } =
    chatCell;

  target.kulEndpointUrl = kulEndpointUrl;
  target.kulMaxTokens = kulMaxTokens;
  target.kulPollingInterval = kulPollingInterval;
  target.kulTemperature = kulTemperature;
};
//#endregion

//#region createNode
export const createNode = async <
  T extends KulMessengerImageRootIds<KulMessengerImageTypes>,
>(
  adapter: KulMessengerAdapter,
  type: T,
) => {
  const { controller, elements } = adapter;
  const { byType } = controller.get.image;
  const { description, id, imageUrl, title } =
    elements.refs.customization.form[type];

  const images = byType(type);

  const nodeId =
    (await id.getValue()) as KulMessengerChildIds<KulMessengerUnionChildIds>;

  const existingImage = images?.find((i) => i.id === nodeId);
  if (existingImage) {
    existingImage.description = await description.getValue();
    existingImage.cells.kulImage.value = await imageUrl.getValue();
    existingImage.value = await title.getValue();
  } else {
    const node: KulMessengerBaseChildNode<KulMessengerUnionChildIds> = {
      cells: { kulImage: { shape: "image", value: await imageUrl.getValue() } },
      id: nodeId,
      description: await description.getValue(),
      value: await title.getValue(),
    };

    images.push(node);
  }
};
//#endregion

//#region defaultToCurrentCharacter
export const defaultToCurrentCharacter = (
  adapter: KulMessengerAdapter,
  character: KulMessengerCharacterNode,
) => {
  const { currentCharacter } = adapter.controller.get.compInstance;
  return character ?? currentCharacter;
};
//#endregion

//#region downloadJson
export const downloadJson = (strJson: string, node: KulDataNode) => {
  const url = window.URL.createObjectURL(
    new Blob([strJson], {
      type: "application/json",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", node.id + ".json");
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
//#endregion

//#region extractChatProps
export const assignPropsToChatCell = (
  chatCell: KulDataCell<"chat">,
  source: KulChatPropsInterface,
) => {
  const {
    kulEndpointUrl,
    kulMaxTokens,
    kulPollingInterval,
    kulSystem,
    kulTemperature,
  } = source;

  chatCell.kulEndpointUrl = kulEndpointUrl;
  chatCell.kulMaxTokens = kulMaxTokens;
  chatCell.kulPollingInterval = kulPollingInterval;
  chatCell.kulSystem = kulSystem;
  chatCell.kulTemperature = kulTemperature;
};
//#endregion

//#region hasCharacters
export const hasCharacters = (adapter: KulMessengerAdapter) => {
  const { kulData } = adapter.controller.get.compInstance;

  const nodes = kulData?.nodes || [];
  return !!nodes.length;
};
//#endregion

//#region hasNodes
export const hasNodes = (adapter: KulMessengerAdapter) => {
  const { kulData } = adapter.controller.get.compInstance;

  return !!kulData?.nodes?.length;
};
//#endregion

//#region statusIconOptions
export const statusIconOptions = (status: KulChatStatus) => {
  const color =
    status === "ready"
      ? "var(--kul-success-color)"
      : status === "offline"
        ? "var(--kul-danger-color)"
        : "var(--kul-warning-color)";
  const title =
    status === "ready"
      ? "Ready to chat!"
      : status === "offline"
        ? "This character seems to be offline..."
        : "Contacting this character...";
  return {
    color,
    title,
  };
};
//#endregion

//#region systemMessage
export const systemMessage = (adapter: KulMessengerAdapter) => {
  const getDynamicPrompts = () => {
    const { character, compInstance, image } = adapter.controller.get;
    const { biography } = character;
    const { asCover } = image;
    const { options: isEnabled } = compInstance.ui;

    const location = asCover("locations").node;
    const outfit = asCover("outfits").node;
    const timeframe = asCover("timeframes").node;

    const createLLMEntry = (title: string, description?: string) =>
      title ? `${title} - ${description || ""}` : "";

    const prompts = {
      biography: biography() ? `Character Biography:\n${biography()}` : "",
      location:
        location && isEnabled.locations
          ? `Location:\n${createLLMEntry(location.value, location.description)}`
          : "",
      outfit:
        outfit && isEnabled.outfits
          ? `Outfit:\n${createLLMEntry(outfit.value, outfit.description)}`
          : "",
      timeframe:
        timeframe && isEnabled.timeframes
          ? `Timeframe:\n${createLLMEntry(timeframe.value, timeframe.description)}`
          : "",
    };

    return prompts;
  };

  const { biography, location, outfit, timeframe } = getDynamicPrompts();

  return `You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.
        
Tasks:
- Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
- Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
- Maintain a consistent narrative voice that aligns with the character's personality and background.

Responsibilities:
- Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
- Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

${biography}

Your current status:
${outfit}
${location}
${timeframe}

Begin your performance...
    `;
};
//#endregion

//#region updateDataset
export const updateDataset = (adapter: KulMessengerAdapter) => {
  const { controller } = adapter;
  const { compInstance } = controller.get;

  compInstance.save();
};
//#endregion
