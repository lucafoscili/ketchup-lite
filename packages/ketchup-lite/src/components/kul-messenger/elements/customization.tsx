import { Fragment, h, VNode } from "@stencil/core";

import { FILTER_DATASET, IMAGE_TYPE_IDS } from "../helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
  KulMessengerBaseRootNode,
  KulMessengerImageRootIds,
  KulMessengerImageTypes,
} from "../kul-messenger-declarations";
import { kulManagerSingleton } from "src";

export const prepCustomization = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["customization"] => {
  const { assignRef } = kulManagerSingleton;

  return {
    //#region Filters
    filters: () => {
      const { controller, elements, handlers } = getAdapter();
      const { character, image } = controller.get;
      const { customization } = elements.refs;
      const { chip } = handlers.customization;

      for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
        const filter = FILTER_DATASET.nodes[index] as KulMessengerBaseRootNode<
          KulMessengerImageRootIds<KulMessengerImageTypes>
        >;
        filter.icon = image.asCover(filter.id, null).value;
      }

      return (
        <kul-chip
          key={"filter_" + character.name()}
          kulData={FILTER_DATASET}
          kulStyling="filter"
          onKul-chip-event={chip}
          ref={assignRef(customization, "filters")}
        ></kul-chip>
      );
    },
    //#endregion

    form: {
      description: () => {
        const { controller, elements, handlers } = getAdapter();
        const { character, image } = controller.get;
        const { customization } = elements.refs;
        const { chip } = handlers.customization;

        return (
          <kul-textfield
            kulFullWidth={true}
            kulIcon="format-float-left"
            kulLabel="Description"
            ref={(el) =>
              (adapter.components.editing[type].descriptionTextarea = el)
            }
            title="A more accurate description to give more context to the LLM."
          ></kul-textfield>
        );
      },
      id: () => {
        return (
          <kul-textfield
            key={`id-edit-${id}`}
            kulDisabled
            kulFullWidth={true}
            kulIcon="key-variant"
            kulLabel="ID"
            kulValue={id}
            ref={(el) => (adapter.components.editing[type].idTextfield = el)}
            title="The cover image displayed in the selection panel."
          ></kul-textfield>
        );
      },
      image: () => {
        return (
          <kul-textfield
            kulFullWidth={true}
            kulIcon="image"
            kulLabel="Image URL"
            ref={(el) =>
              (adapter.components.editing[type].imageUrlTextarea = el)
            }
            title="The cover image displayed in the selection panel."
          ></kul-textfield>
        );
      },
      title: () => {
        return (
          <kul-textfield
            kulFullWidth={true}
            kulIcon="title"
            kulLabel="Title"
            ref={(el) => (adapter.components.editing[type].titleTextarea = el)}
            title="The overall theme of this option."
          ></kul-textfield>
        );
      },
    },

    //#region List
    list: {
      edit: (type, node) => {
        const { elements, handlers } = getAdapter();
        const { customization } = elements.refs;
        const { button } = handlers.customization;

        return (
          <kul-button
            class="kul-full-width"
            kulIcon="pencil"
            onKul-button-event={(e) => button(e, type, "edit", node)}
            title="Edit this option."
            ref={assignRef(customization, "edit")}
          ></kul-button>
        );
      },
      remove: (type, node) => {
        const { elements, handlers } = getAdapter();
        const { customization } = elements.refs;
        const { button } = handlers.customization;

        return (
          <kul-button
            class="kul-full-width kul-danger"
            kulIcon="delete"
            onKul-button-event={(e) => button(e, type, "delete", node)}
            title="Delete this option."
            ref={assignRef(customization, "delete")}
          ></kul-button>
        );
      },
    },
  };
  //#endregion
};

const prepCovers = (
  adapter: KulMessengerAdapter,
  type: KulMessengerImageTypes,
  images: VNode[],
) => {
  return (
    <Fragment>
      <div class="messenger__customization__title">
        <div class="messenger__customization__label">{type}</div>
        <kul-button
          class="messenger__customization__add kul-full-height kul-slim"
          kulIcon="plus"
          kulLabel="New"
          kulStyling="flat"
          onKul-button-event={buttonEventHandler.bind(
            buttonEventHandler,
            adapter,
            type,
            "add",
            null,
          )}
        ></kul-button>
      </div>
      <div class="messenger__customization__images">{images}</div>
    </Fragment>
  );
};

const prepEditPanel = (
  adapter: KulMessengerAdapter,
  type: KulMessengerImageTypes,
) => {};
