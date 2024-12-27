import { h } from "@stencil/core";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { FILTER_DATASET, IMAGE_TYPE_IDS } from "../helpers/constants";
import {
  KulMessengerAdapter,
  KulMessengerAdapterJsx,
  KulMessengerUnionChildIds,
} from "../kul-messenger-declarations";

export const prepCustomization = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["customization"] => {
  return {
    //#region Filters
    filters: () => {
      const { controller, elements, handlers } = getAdapter();
      const { character, manager } = controller.get;
      const { customization } = elements.refs;
      const { chip } = handlers.customization;
      const { assignRef } = manager;

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

    //#region Form
    form: prepForms(getAdapter),
    //#endregion

    //#region List
    list: {
      edit: (type, node) => {
        const { controller, elements, handlers } = getAdapter();
        const { assignRef } = controller.get.manager;
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
        const { controller, elements, handlers } = getAdapter();
        const { assignRef } = controller.get.manager;
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

//#region Helpers
const prepForms = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterJsx["customization"]["form"] => {
  const formElements = IMAGE_TYPE_IDS.reduce(
    (acc, type) => {
      acc[type] = {
        add: () => {
          const adapter = getAdapter();
          const { controller, elements, handlers } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { button } = handlers.customization;
          const { assignRef, theme } = manager;
          const { bemClass } = theme;

          return (
            <kul-button
              class={`${bemClass("covers", "add")} kul-full-height kul-slim`}
              data-cy={CY_ATTRIBUTES.button}
              kulIcon="plus"
              kulLabel="New"
              kulStyling="flat"
              onKul-button-event={(e) => button(e, type, "add", null)}
              ref={assignRef(form[type], "add")}
            ></kul-button>
          );
        },
        cancel: () => {
          const adapter = getAdapter();
          const { controller, elements, handlers } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { button } = handlers.customization;
          const { assignRef, theme } = manager;
          const { bemClass } = theme;

          return (
            <kul-button
              class={bemClass("form", "button")}
              data-cy={CY_ATTRIBUTES.button}
              kulIcon="clear"
              kulLabel="Cancel"
              kulStyling="flat"
              onKul-button-event={(e) => button(e, type, "cancel", null)}
              ref={assignRef(form[type], "cancel")}
            ></kul-button>
          );
        },
        confirm: () => {
          const adapter = getAdapter();
          const { controller, elements, handlers } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { button } = handlers.customization;
          const { assignRef, theme } = manager;
          const { bemClass } = theme;

          return (
            <kul-button
              class={bemClass("form", "button")}
              data-cy={CY_ATTRIBUTES.button}
              kulIcon="check"
              kulLabel="Confirm"
              kulStyling="outlined"
              onKul-button-event={(e) => button(e, type, "confirm", null)}
              ref={assignRef(form[type], "confirm")}
            ></kul-button>
          );
        },
        description: (node?) => {
          const adapter = getAdapter();
          const { controller, elements } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { assignRef } = manager;

          return (
            <kul-textfield
              data-cy={CY_ATTRIBUTES.input}
              kulFullWidth={true}
              kulIcon="format-float-left"
              kulLabel="Description"
              kulValue={node && node.description}
              ref={assignRef(form[type], "description")}
              title="A more accurate description to give extra context to the LLM."
            ></kul-textfield>
          );
        },
        id: (id: KulMessengerUnionChildIds) => {
          const adapter = getAdapter();
          const { controller, elements } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { assignRef } = manager;

          return (
            <kul-textfield
              data-cy={CY_ATTRIBUTES.input}
              key={`id-edit-${id}`}
              kulDisabled={true}
              kulFullWidth={true}
              kulIcon="key-variant"
              kulLabel="ID"
              kulValue={id}
              ref={assignRef(form[type], "id")}
              title="The cover image displayed in the selection panel."
            ></kul-textfield>
          );
        },
        imageUrl: (node?) => {
          const adapter = getAdapter();
          const { controller, elements } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { assignRef } = manager;

          return (
            <kul-textfield
              data-cy={CY_ATTRIBUTES.input}
              kulFullWidth={true}
              kulIcon="image"
              kulLabel="Image URL"
              kulValue={node && node.cells.kulImage.value}
              ref={assignRef(form[type], "imageUrl")}
              title="The cover image displayed in the selection panel."
            ></kul-textfield>
          );
        },
        title: (node?) => {
          const adapter = getAdapter();
          const { controller, elements } = adapter;
          const { manager } = controller.get;
          const { form } = elements.refs.customization;
          const { assignRef } = manager;

          return (
            <kul-textfield
              data-cy={CY_ATTRIBUTES.input}
              kulFullWidth={true}
              kulIcon="title"
              kulLabel="Title"
              kulValue={node && node.value}
              ref={assignRef(form[type], "title")}
              title="The overall theme of this option."
            ></kul-textfield>
          );
        },
      };
      return acc;
    },
    {} as KulMessengerAdapterJsx["customization"]["form"],
  );

  return formElements;
};

//#endregion
