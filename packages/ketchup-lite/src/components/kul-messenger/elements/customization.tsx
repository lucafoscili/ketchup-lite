import { Fragment, h, VNode } from "@stencil/core";

import { FILTER_DATASET, IMAGE_TYPE_IDS } from "../helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerBaseRootNode,
  KulMessengerImageRootIds,
  KulMessengerImageTypes,
} from "../kul-messenger-declarations";
import { kulManagerSingleton } from "src";

export const prepCustomization = (getAdapter: () => KulMessengerAdapter) => {
  const { assignRef } = kulManagerSingleton;

  return {
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
    list: () => {
      const { controller, elements, handlers } = getAdapter();
      const { image, messenger } = controller.get;

      const elms = [];
      const editing = messenger.ui().editing;
      const filters = messenger.ui().filters;
      const imagesGetter = image.byType;
      const hoverGetter = messenger.status.hoveredCustomizationOption;

      for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (filters[type]) {
          const isEditingEnabled = editing[type];
          const activeIndex = adapter.get.image.coverIndex(type);
          const images: VNode[] = imagesGetter(type).map((node, j) => (
            <div
              class={`messenger__customization__image-wrapper  ${activeIndex === j ? "messenger__customization__image-wrapper--selected" : ""}`}
              onClick={imageEventHandler.bind(
                imageEventHandler,
                adapter,
                node,
                j,
              )}
              onPointerEnter={() => {
                if (activeIndex !== j) {
                  adapter.set.messenger.status.hoveredCustomizationOption(node);
                }
              }}
              onPointerLeave={() =>
                adapter.set.messenger.status.hoveredCustomizationOption(null)
              }
            >
              <img
                alt={adapter.get.image.title(node)}
                class={`messenger__customization__image`}
                src={node.cells.kulImage.value}
                title={adapter.get.image.title(node)}
              />
              {hoverGetter() === node ? (
                <div
                  class="messenger__customization__actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <kul-button
                    class="kul-full-width kul-danger"
                    kulIcon="delete"
                    onKul-button-event={buttonEventHandler.bind(
                      buttonEventHandler,
                      adapter,
                      type,
                      "delete",
                      node,
                    )}
                    title="Delete this option."
                  ></kul-button>
                  <kul-button
                    class="kul-full-width"
                    kulIcon="pencil"
                    onKul-button-event={buttonEventHandler.bind(
                      buttonEventHandler,
                      adapter,
                      type,
                      "edit",
                      node,
                    )}
                    title="Edit this option."
                  ></kul-button>
                </div>
              ) : undefined}
            </div>
          ));
          elms.push(
            <div class="messenger__customization__section">
              {isEditingEnabled
                ? prepEditPanel(adapter, type)
                : prepCovers(adapter, type, images)}
            </div>,
          );
        }
      }
      return elms;
    },
  };
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
) => {
  const id = adapter.get.messenger.status.editing()[type];
  return (
    <div class="messenger__customization__edit__panel">
      <div class="messenger__customization__edit__label">Create {type}</div>
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
      <kul-textfield
        kulFullWidth={true}
        kulIcon="title"
        kulLabel="Title"
        ref={(el) => (adapter.components.editing[type].titleTextarea = el)}
        title="The overall theme of this option."
      ></kul-textfield>
      <kul-textfield
        kulFullWidth={true}
        kulIcon="format-float-left"
        kulLabel="Description"
        ref={(el) =>
          (adapter.components.editing[type].descriptionTextarea = el)
        }
        title="A more accurate description to give more context to the LLM."
      ></kul-textfield>
      <kul-textfield
        kulFullWidth={true}
        kulIcon="image"
        kulLabel="Image URL"
        ref={(el) => (adapter.components.editing[type].imageUrlTextarea = el)}
        title="The cover image displayed in the selection panel."
      ></kul-textfield>
      <div class="messenger__customization__edit__confirm">
        <kul-button
          class={"messenger__customization__edit__button"}
          kulIcon="clear"
          kulLabel="Cancel"
          kulStyling="flat"
          onKul-button-event={buttonEventHandler.bind(
            buttonEventHandler,
            adapter,
            type,
            "cancel",
            null,
          )}
        ></kul-button>
        <kul-button
          class={"messenger__customization__edit__button"}
          kulIcon="check"
          kulLabel="Confirm"
          kulStyling="outlined"
          onKul-button-event={buttonEventHandler.bind(
            buttonEventHandler,
            adapter,
            type,
            "confirm",
            null,
          )}
        ></kul-button>
      </div>
    </div>
  );
};
