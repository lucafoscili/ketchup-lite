import { h } from "@stencil/core";

import { KulButtonPropsInterface } from "src/components/kul-button/kul-button-declarations";
import { MENU_DATASET } from "src/components/kul-messenger/helpers/kul-messenger-constants";
import { statusIconOptions } from "src/components/kul-messenger/helpers/kul-messenger-utils";
import {
  KulMessengerAdapter,
  KulMessengerAdapterElementsJsx,
} from "src/components/kul-messenger/kul-messenger-declarations";

export const prepLeft = (
  adapter: KulMessengerAdapter,
): KulMessengerAdapterElementsJsx["left"] => {
  const { elements, handlers, state } = adapter;
  const { left } = elements.refs;
  const { get } = state;

  return {
    //#region Avatar
    avatar: () => {
      const { asCover } = get.image;

      const { title, value } = asCover("avatars");

      return (
        <img
          alt={title || ""}
          class="messenger__avatar__image"
          ref={(el) => {
            if (el) {
              left.avatar = el;
            }
          }}
          src={value}
          title={title || ""}
        />
      );
    },
    //#endregion

    //#region Status icon
    statusIcon: () => {
      const { connection } = get.messenger.status;

      const { color, title } = statusIconOptions(connection());

      return (
        <kul-image
          class="messenger__avatar__status"
          kulColor={color}
          kulSizeX="16px"
          kulSizeY="16px"
          kulValue="brightness-1"
          ref={(el) => {
            if (el) {
              left.statusIcon = el;
            }
          }}
          title={title}
        ></kul-image>
      );
    },
    //#endregion

    //#region Save
    save: () => {
      const { button } = handlers.left;
      const isSaving = get.messenger.status.save.inProgress();

      const props: KulButtonPropsInterface = {
        kulIcon: isSaving ? "" : "save",
        kulLabel: isSaving ? "Saving..." : "Save",
        kulShowSpinner: isSaving ? true : false,
      };

      return (
        <kul-button
          class={"kul-full-height"}
          {...props}
          kulData={MENU_DATASET}
          kulStyling="flat"
          onKul-button-event={button}
          ref={(el) => {
            left.save = el;
          }}
          title="Update the dataset with current settings."
        >
          <kul-spinner
            kulActive={true}
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
      const { biography } = get.character;

      return (
        <kul-code
          kulLanguage="markdown"
          kulValue={biography()}
          ref={(el) => {
            left.biography = el;
          }}
        ></kul-code>
      );
    },
    //#endregion
  };
};
