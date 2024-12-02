import { h } from '@stencil/core';

import {
  KulDataCyAttributes,
  KulGenericEvent,
} from '../../../types/GenericTypes';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulCanvasEventPayload } from '../../kul-canvas/kul-canvas-declarations';
import { KulImagePropsInterface } from '../../kul-image/kul-image-declarations';
import { KulMasonryEventPayload } from '../../kul-masonry/kul-masonry-declarations';
import { KulTextfieldEventPayload } from '../../kul-textfield/kul-textfield-declarations';
import { KulTreeEventPayload } from '../../kul-tree/kul-tree-declarations';
import {
  KulImageviewerAdapter,
  KulImageviewerAdapterComponents,
} from '../kul-imageviewer-declarations';

export const COMPONENTS: KulImageviewerAdapterComponents = {
  jsx: {
    canvas: (adapter) => prepCanvas(adapter),
    clearHistory: (adapter) => prepClearHistory(adapter),
    delete: (adapter) => prepDelete(adapter),
    load: (adapter) => prepLoad(adapter),
    masonry: (adapter) => prepMasonry(adapter),
    redo: (adapter) => prepRedo(adapter),
    save: (adapter) => prepSave(adapter),
    spinner: (adapter) => prepSpinner(adapter),
    textfield: (adapter) => prepTextfield(adapter),
    tree: (adapter) => prepTree(adapter),
    undo: (adapter) => prepUndo(adapter),
  },
  refs: {
    canvas: null,
    clearHistory: null,
    delete: null,
    load: null,
    masonry: null,
    redo: null,
    save: null,
    spinner: null,
    textfield: null,
    tree: null,
    undo: null,
  },
};

// #region Canvas
const prepCanvas = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__canvas': true,
  };
  const eventHandler = (e: CustomEvent<KulCanvasEventPayload>) => {
    imageviewer.onKulEvent(e, 'kul-event');
  };

  const currentSnapshot = adapter.get.state.history.currentSnapshot();
  if (!currentSnapshot) {
    return;
  }

  const imageProps: KulImagePropsInterface = {
    kulValue: currentSnapshot.value,
  };

  return (
    <kul-canvas
      class={className}
      data-cy={KulDataCyAttributes.SHAPE}
      kulImageProps={imageProps}
      onKul-canvas-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.canvas = el;
        }
      }}
    ></kul-canvas>
  );
};
// #endregion
// #region Clear history
const prepClearHistory = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__clear-history': true,
    'kul-danger': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        const index = adapter.get.state.currentShape().shape.index;
        await adapter.actions.clearHistory(adapter, index);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  const hasHistory = !!(adapter.get.state.history.current()?.length > 1);
  const isDisabled = !hasHistory;

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulDisabled={isDisabled}
      kulIcon="layers_clear"
      kulLabel="Clear history"
      kulStyling="flat"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.clearHistory = el;
        }
      }}
    >
      <kul-spinner
        kulActive={true}
        kulDimensions="2px"
        kulLayout={1}
        slot="spinner"
      ></kul-spinner>
    </kul-button>
  );
};
// #endregion
// #region Delete
const prepDelete = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__delete': true,
    'kul-danger': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        await adapter.actions.delete(adapter);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulIcon="delete-empty"
      kulLabel="Delete image"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.delete = el;
        }
      }}
    >
      <kul-spinner
        kulActive={true}
        kulDimensions="2px"
        kulLayout={1}
        slot="spinner"
      ></kul-spinner>
    </kul-button>
  );
};
// #endregion
// #region Load
const prepLoad = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'navigation-grid__button': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        await adapter.actions.load(adapter);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulIcon="find_replace"
      kulLabel="Load"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.load = el;
        }
      }}
    >
      <kul-spinner
        kulActive={true}
        kulDimensions="2px"
        kulLayout={1}
        slot="spinner"
      ></kul-spinner>
    </kul-button>
  );
};
// #endregion
// #region Masonry
const prepMasonry = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'navigation-grid__masonry': true,
  };
  const eventHandler = (e: CustomEvent<KulMasonryEventPayload>) => {
    const { eventType, originalEvent, selectedShape } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'kul-event':
        const orig = originalEvent as KulGenericEvent;
        switch (orig.detail.eventType) {
          case 'click':
            const currentShape = adapter.get.state.currentShape();
            if (currentShape?.shape?.index === selectedShape.index) {
              adapter.actions.clearSelection(adapter);
            } else {
              adapter.set.state.currentShape(selectedShape);

              const currentHistory = adapter.get.state.history.current();
              adapter.set.state.history.index(
                currentHistory ? currentHistory.length - 1 : 0,
              );
              adapter.set.state.history.new(selectedShape);
            }
            break;
        }
    }
  };

  return (
    <kul-masonry
      class={className}
      kulData={imageviewer.kulData}
      kulSelectable={true}
      onKul-masonry-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.masonry = el;
        }
      }}
    ></kul-masonry>
  );
};
// #endregion
// #region Redo
const prepRedo = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__redo': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        await adapter.actions.redo(adapter);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  const currentHistory = adapter.get.state.history.current();
  const index = adapter.get.state.history.index();
  const hasHistory = !!currentHistory?.length;
  const isDisabled = !(hasHistory && index < currentHistory.length - 1);

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulDisabled={isDisabled}
      kulIcon="redo"
      kulLabel="Redo"
      kulStyling="flat"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.redo = el;
        }
      }}
    ></kul-button>
  );
};
// #endregion
// #region Save
const prepSave = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__commit-changes': true,
    'kul-success': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        await adapter.actions.save(adapter);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  const hasHistory = !!(adapter.get.state.history.current()?.length > 1);
  const isDisabled = !hasHistory;

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulDisabled={isDisabled}
      kulIcon="save"
      kulLabel="Save snapshot"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.save = el;
        }
      }}
    >
      <kul-spinner
        kulActive={true}
        kulDimensions="2px"
        kulLayout={1}
        slot="spinner"
      ></kul-spinner>
    </kul-button>
  );
};
// #endregion
// #region Spinner
const prepSpinner = (adapter: KulImageviewerAdapter) => {
  const className = {
    'details-grid__spinner': true,
  };

  return (
    <kul-spinner
      class={className}
      kulActive={adapter.get.state.spinnerStatus()}
      kulDimensions="16px"
      kulFader={true}
      kulFaderTimeout={125}
      kulLayout={14}
      ref={(el) => {
        if (el) {
          adapter.components.refs.spinner = el;
        }
      }}
    ></kul-spinner>
  );
};
// #endregion
// #region Textfield
const prepTextfield = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'navigation-grid__textfield': true,
  };
  const eventHandler = (e: CustomEvent<KulTextfieldEventPayload>) => {
    imageviewer.onKulEvent(e, 'kul-event');
  };

  return (
    <kul-textfield
      class={className}
      kulIcon="folder"
      kulLabel="Directory"
      kulStyling="flat"
      onKul-textfield-event-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.textfield = el;
        }
      }}
    ></kul-textfield>
  );
};
// #endregion
// #region Tree
const prepTree = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__tree': true,
  };
  const eventHandler = (e: CustomEvent<KulTreeEventPayload>) => {
    imageviewer.onKulEvent(e, 'kul-event');
  };

  return (
    <kul-tree
      class={className}
      data-cy={KulDataCyAttributes.INPUT}
      kulAccordionLayout={true}
      kulData={imageviewer.kulValue}
      kulSelectable={true}
      onKul-tree-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.tree = el;
        }
      }}
    ></kul-tree>
  );
};
// #endregion
// #region Undo
const prepUndo = (adapter: KulImageviewerAdapter) => {
  const imageviewer = adapter.get.imageviewer();
  const className = {
    'details-grid__undo': true,
    'kul-full-width': true,
  };
  const eventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    imageviewer.onKulEvent(e, 'kul-event');

    switch (eventType) {
      case 'click':
        requestAnimationFrame(() => (comp.kulShowSpinner = true));
        await adapter.actions.undo(adapter);
        requestAnimationFrame(() => (comp.kulShowSpinner = false));
        break;
    }
  };

  const currentHistory = adapter.get.state.history.current();
  const index = adapter.get.state.history.index();
  const hasHistory = !!currentHistory?.length;
  const isDisabled = !(hasHistory && index > 0);

  return (
    <kul-button
      class={className}
      data-cy={KulDataCyAttributes.BUTTON}
      kulDisabled={isDisabled}
      kulIcon="undo"
      kulLabel="Undo"
      kulStyling="flat"
      onKul-button-event={eventHandler}
      ref={(el) => {
        if (el) {
          adapter.components.refs.undo = el;
        }
      }}
    ></kul-button>
  );
};
// #endregion
