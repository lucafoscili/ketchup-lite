import { h } from "@stencil/core";
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
  return {
    //#region Avatar
    avatar: () => {
      const { controller, elements } = getAdapter();
      const { image, manager } = controller.get;
      const { character } = elements.refs;
      const { asCover } = image;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const { title, value } = asCover("avatars");

      return (
        <img
          alt={title || ""}
          class={bemClass("character", "image")}
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
      const { manager, status } = controller.get;
      const { character } = elements.refs;
      const { connection } = status;
      const { assignRef, theme } = manager;
      const { bemClass } = theme;

      const { color, title } = statusIconOptions(connection());

      return (
        <kul-image
          class={bemClass("character", "status")}
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
      const { manager, status } = controller.get;
      const { character } = elements.refs;
      const { button } = handlers.character;
      const { inProgress } = status.save;
      const { assignRef } = manager;

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
      const { assignRef } = controller.get.manager;

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
