import { h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulButtonPropsInterface } from "src/components/kul-button/kul-button-declarations";
import { MENU_DATASET } from "../helpers/constants";
import { statusIconOptions } from "../helpers/utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
} from "../kul-messenger-declarations";

export const prepCharacter = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["character"] => {
  const { assignRef } = kulManagerSingleton;

  return {
    //#region Avatar
    avatar: () => {
      const { controller, elements } = getAdapter();
      const { character } = elements.refs;
      const { image } = controller.get;
      const { asCover } = image;

      const { title, value } = asCover("avatars");

      return (
        <img
          alt={title || ""}
          class="messenger__avatar__image"
          ref={assignRef(character, "avatar")}
          src={value}
          title={title || ""}
        />
      );
    },
    //#endregion

    //#region Status icon
    statusIcon: () => {
      const { controller, elements } = getAdapter();
      const { character } = elements.refs;
      const { connection } = controller.get.status;

      const { color, title } = statusIconOptions(connection());

      return (
        <kul-image
          class="messenger__avatar__status"
          kulColor={color}
          kulSizeX="16px"
          kulSizeY="16px"
          kulValue="brightness-1"
          ref={assignRef(character, "statusIcon")}
          title={title}
        ></kul-image>
      );
    },
    //#endregion

    //#region Save
    save: () => {
      const { controller, elements, handlers } = getAdapter();
      const { character } = elements.refs;
      const { inProgress } = controller.get.status.save;
      const { button } = handlers.character;

      const isSaving = inProgress();

      const props: KulButtonPropsInterface = {
        kulIcon: isSaving ? "" : "save",
        kulLabel: isSaving ? "Saving..." : "Save",
        kulShowSpinner: isSaving,
      };

      return (
        <kul-button
          class={"kul-full-height"}
          {...props}
          kulData={MENU_DATASET}
          kulStyling="flat"
          onKul-button-event={button}
          ref={assignRef(character, "save")}
          title="Update the dataset with current settings."
        >
          <kul-spinner
            kulActive={isSaving}
            kulDimensions="0.6em"
            kulLayout={4}
            slot="spinner"
          ></kul-spinner>
        </kul-button>
      );
    },
    //#endregion

    //#region Biography
    biography: () => {
      const { controller, elements } = getAdapter();
      const { character } = elements.refs;
      const { biography } = controller.get.character;

      return (
        <kul-code
          kulLanguage="markdown"
          kulValue={biography()}
          ref={assignRef(character, "biography")}
        ></kul-code>
      );
    },
    //#endregion
  };
};
