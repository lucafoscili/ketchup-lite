import { h } from '@stencil/core';
import {
    KulImageviewerAdapter,
    KulImageviewerAdapterComponents,
} from '../kul-imageviewer-declarations';
import { KulTreeEventPayload } from '../../kul-tree/kul-tree-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulMasonryEventPayload } from '../../kul-masonry/kul-masonry-declarations';
import { KulTextfieldEventPayload } from '../../kul-textfield/kul-textfield-declarations';
import { KulImageEventPayload } from '../../kul-image/kul-image-declarations';
import {
    KulDataCyAttributes,
    KulGenericEvent,
} from '../../../types/GenericTypes';

export const COMPONENTS: KulImageviewerAdapterComponents = {
    jsx: {
        clearHistory: (adapter) => prepClearHistory(adapter),
        save: (adapter) => prepSave(adapter),
        image: (adapter) => prepImage(adapter),
        load: (adapter) => prepLoad(adapter),
        masonry: (adapter) => prepMasonry(adapter),
        redo: (adapter) => prepRedo(adapter),
        textfield: (adapter) => prepTextfield(adapter),
        tree: (adapter) => prepTree(adapter),
        undo: (adapter) => prepUndo(adapter),
    },
    refs: {
        clearHistory: null,
        save: null,
        image: null,
        load: null,
        masonry: null,
        redo: null,
        textfield: null,
        tree: null,
        undo: null,
    },
};

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
            kulIcon="delete-empty"
            kulLabel="Clear history"
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
// #region Image
const prepImage = (adapter: KulImageviewerAdapter) => {
    const imageviewer = adapter.get.imageviewer();
    const className = {
        'details-grid__image': true,
        'kul-fit': true,
    };
    const eventHandler = (e: CustomEvent<KulImageEventPayload>) => {
        imageviewer.onKulEvent(e, 'kul-event');
    };

    const currentSnapshot = adapter.get.state.history.currentSnapshot();
    if (!currentSnapshot) {
        return;
    }

    return (
        <kul-image
            class={className}
            kulValue={currentSnapshot.value}
            onKul-image-event={eventHandler}
            ref={(el) => {
                if (el) {
                    adapter.components.refs.image = el;
                }
            }}
        ></kul-image>
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
                        if (
                            currentShape?.shape?.index === selectedShape.index
                        ) {
                            adapter.set.state.currentShape({});
                            adapter.set.state.history.index(null);
                        } else {
                            adapter.set.state.currentShape(selectedShape);

                            const currentHistory =
                                adapter.get.state.history.current();
                            adapter.set.state.history.index(
                                currentHistory ? currentHistory.length - 1 : 0
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
