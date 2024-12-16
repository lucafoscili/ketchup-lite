import { KulChatStatus } from "src/components/kul-chat/kul-chat-declarations";
import { KulDataNode } from "src/managers/kul-data/kul-data-declarations";
import { KulMessengerAdapter } from "../kul-messenger-declarations";

//#region getStatusIconOptions
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

export const systemMessage = (adapter: KulMessengerAdapter) => {
  const getDynamicPrompts = () => {
    const { character, image, ui } = adapter.state.get;
    const { biography } = character;
    const { asCover } = image;
    //const { options: isEnabled } = adapter.get.messenger.ui();

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
