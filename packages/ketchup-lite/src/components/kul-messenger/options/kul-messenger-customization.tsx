import { Fragment, h, VNode } from '@stencil/core';

import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulChip } from '../../kul-chip/kul-chip';
import { KulChipEventPayload } from '../../kul-chip/kul-chip-declarations';
import {
  CHILD_ROOT_MAP,
  FILTER_DATASET,
  IMAGE_TYPE_IDS,
} from '../kul-messenger-constants';
import {
  KulMessengerAdapter,
  KulMessengerBaseChildNode,
  KulMessengerBaseRootNode,
  KulMessengerChildIds,
  KulMessengerFilters,
  KulMessengerImageRootIds,
  KulMessengerImageTypes,
  KulMessengerUnionChildIds,
} from '../kul-messenger-declarations';

export const prepFilters = (adapter: KulMessengerAdapter) => {
  for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
    const filter = FILTER_DATASET.nodes[index] as KulMessengerBaseRootNode<
      KulMessengerImageRootIds<KulMessengerImageTypes>
    >;
    filter.icon = adapter.get.image.asCover(filter.id, null).value;
  }
  return (
    <kul-chip
      key={'filter_' + adapter.get.character.name()}
      kulData={FILTER_DATASET}
      kulStyling="filter"
      onKul-chip-event={chipEventHandler.bind(chipEventHandler, adapter)}
    ></kul-chip>
  );
};

export const prepList = (adapter: KulMessengerAdapter) => {
  const elements = [];
  const editing = adapter.get.messenger.ui().editing;
  const filters = adapter.get.messenger.ui().filters;
  const imagesGetter = adapter.get.image.byType;
  const hoverGetter = adapter.get.messenger.status.hoveredCustomizationOption;
  for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
    const type = IMAGE_TYPE_IDS[index];
    if (filters[type]) {
      const isEditingEnabled = editing[type];
      const activeIndex = adapter.get.image.coverIndex(type);
      const images: VNode[] = imagesGetter(type).map((node, j) => (
        <div
          class={`messenger__customization__image-wrapper  ${activeIndex === j ? 'messenger__customization__image-wrapper--selected' : ''}`}
          onClick={imageEventHandler.bind(imageEventHandler, adapter, node, j)}
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
                  'delete',
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
                  'edit',
                  node,
                )}
                title="Edit this option."
              ></kul-button>
            </div>
          ) : undefined}
        </div>
      ));
      elements.push(
        <div class="messenger__customization__section">
          {isEditingEnabled
            ? prepEditPanel(adapter, type)
            : prepCovers(adapter, type, images)}
        </div>,
      );
    }
  }
  return elements;
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
            'add',
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
          class={'messenger__customization__edit__button'}
          kulIcon="clear"
          kulLabel="Cancel"
          kulStyling="flat"
          onKul-button-event={buttonEventHandler.bind(
            buttonEventHandler,
            adapter,
            type,
            'cancel',
            null,
          )}
        ></kul-button>
        <kul-button
          class={'messenger__customization__edit__button'}
          kulIcon="check"
          kulLabel="Confirm"
          kulStyling="outlined"
          onKul-button-event={buttonEventHandler.bind(
            buttonEventHandler,
            adapter,
            type,
            'confirm',
            null,
          )}
        ></kul-button>
      </div>
    </div>
  );
};

const buttonEventHandler = async <
  T1 extends KulMessengerImageTypes,
  T2 extends KulMessengerBaseChildNode<KulMessengerUnionChildIds>,
>(
  adapter: KulMessengerAdapter,
  type: T1,
  action: 'add' | 'cancel' | 'confirm' | 'edit' | 'delete',
  node: T2 = null,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { eventType } = e.detail;
  const editingSetter = adapter.set.messenger.ui.editing;

  if (eventType === 'click') {
    const handleEditing = (enabled: boolean) => editingSetter(enabled, type);

    switch (action) {
      case 'add':
        handleEditing(true);
        break;
      case 'cancel':
        handleEditing(false);
        break;
      case 'confirm': {
        const titleTextarea = adapter.components.editing[type].titleTextarea;
        const value = await titleTextarea.getValue();
        titleTextarea.classList.remove('kul-danger');
        if (value) {
          createNode(adapter, type);
          handleEditing(false);
        } else {
          titleTextarea.classList.add('kul-danger');
          titleTextarea.kulHelper = {
            value: 'This field is mandatory',
          };
        }
        break;
      }
      case 'delete':
        adapter.actions.delete.option(node, type);
        break;
      case 'edit':
        handleEditing(true);
        break;
    }
  }
};

const chipEventHandler = (
  adapter: KulMessengerAdapter,
  e: CustomEvent<KulChipEventPayload>,
) => {
  const { comp, eventType, selectedNodes } = e.detail;
  const filtersSetter = adapter.set.messenger.ui.filters;

  switch (eventType) {
    case 'click':
      const newFilters: KulMessengerFilters = {
        avatars: false,
        locations: false,
        outfits: false,
        styles: false,
        timeframes: false,
      };
      Array.from(selectedNodes).forEach((n) => {
        newFilters[n.id] = true;
      });
      filtersSetter(newFilters);
      break;
    case 'ready':
      const filters = adapter.get.messenger.ui().filters;
      const nodes: string[] = [];
      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          const option = filters[key];
          if (option) {
            nodes.push(key);
          }
        }
      }
      requestAnimationFrame(() => (comp as KulChip).setSelectedNodes(nodes));
  }
};

const imageEventHandler = <T extends KulMessengerUnionChildIds>(
  adapter: KulMessengerAdapter,
  node: KulMessengerBaseChildNode<T>,
  index: number,
) => {
  const coverSetter = adapter.set.image.cover;

  const matchedType = Object.keys(CHILD_ROOT_MAP).find((key) =>
    node.id.includes(key),
  ) as keyof typeof CHILD_ROOT_MAP;

  if (matchedType) {
    coverSetter(CHILD_ROOT_MAP[matchedType], index);
  }
};

const createNode = async <
  T extends KulMessengerImageRootIds<KulMessengerImageTypes>,
>(
  adapter: KulMessengerAdapter,
  type: T,
) => {
  const editing = adapter.components.editing;
  const images = adapter.get.image.byType(type);

  const id = (await editing[
    type
  ].idTextfield.getValue()) as KulMessengerChildIds<KulMessengerUnionChildIds>;

  const value = await editing[type].titleTextarea.getValue();
  const imageUrl = await editing[type].imageUrlTextarea.getValue();
  const description = await editing[type].descriptionTextarea.getValue();

  const existingImage = images?.find((i) => i.id === id);
  if (existingImage) {
    existingImage.description = description;
    existingImage.cells.kulImage.value = imageUrl;
    existingImage.value = value;
  } else {
    const node: KulMessengerBaseChildNode<KulMessengerUnionChildIds> = {
      cells: { kulImage: { shape: 'image', value: imageUrl } },
      id,
      description,
      value,
    };

    images.push(node);
  }
};
