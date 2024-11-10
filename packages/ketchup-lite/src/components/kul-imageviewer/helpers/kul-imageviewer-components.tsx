import { h } from '@stencil/core';
import { KulImageviewerAdapterComponents } from '../kul-imageviewer-declarations';
import { KulTreeEventPayload } from '../../kul-tree/kul-tree-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulMasonryEventPayload } from '../../kul-masonry/kul-masonry-declarations';
import { KulTextfieldEventPayload } from '../../kul-textfield/kul-textfield-declarations';
import { KulImageEventPayload } from '../../kul-image/kul-image-declarations';
import { KulDataCell } from '../../../managers/kul-data/kul-data-declarations';
import {
    KulDataCyAttributes,
    KulGenericEvent,
} from '../../../types/GenericTypes';

export const COMPONENTS: KulImageviewerAdapterComponents = {
    jsx: {
        button(adapter) {
            const imageviewer = adapter.get.imageviewer();
            const className = {
                'navigation-grid__button': true,
                'kul-full-width': true,
            };
            const eventHandler = async (
                e: CustomEvent<KulButtonEventPayload>
            ) => {
                const { comp, eventType } = e.detail;
                imageviewer.onKulEvent(e, 'kul-event');

                switch (eventType) {
                    case 'click':
                        requestAnimationFrame(
                            () => (comp.kulShowSpinner = true)
                        );
                        await adapter.actions.load(adapter);
                        requestAnimationFrame(
                            () => (comp.kulShowSpinner = false)
                        );
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
                            adapter.components.refs.button = el;
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
        },
        image(adapter) {
            const imageviewer = adapter.get.imageviewer();
            const className = {
                'details-grid__image': true,
                'kul-fit': true,
            };
            const eventHandler = (e: CustomEvent<KulImageEventPayload>) => {
                imageviewer.onKulEvent(e, 'kul-event');
            };

            const currentShape = adapter.get.state.currentShape();
            if (!currentShape) {
                return;
            }

            return (
                <kul-image
                    class={className}
                    kulValue={currentShape.value}
                    onKul-image-event={eventHandler}
                    ref={(el) => {
                        if (el) {
                            adapter.components.refs.image = el;
                        }
                    }}
                ></kul-image>
            );
        },
        masonry(adapter) {
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
                                const currentShape =
                                    adapter.get.state.currentShape();
                                if (
                                    currentShape?.shape?.index ===
                                    selectedShape.index
                                ) {
                                    adapter.set.state.currentShape({});
                                } else {
                                    adapter.set.state.currentShape(
                                        selectedShape
                                    );
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
        },
        textfield(adapter) {
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
        },
        tree(adapter) {
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
        },
    },
    refs: {
        button: null,
        image: null,
        masonry: null,
        textfield: null,
        tree: null,
    },
};
