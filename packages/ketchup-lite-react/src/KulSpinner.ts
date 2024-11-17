'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { type KulSpinnerCustomEvent, type KulSpinnerEventPayload } from "ketchup-lite";
import { KulSpinner as KulSpinnerElement, defineCustomElement as defineKulSpinner } from "ketchup-lite/dist/components/kul-spinner.js";
import React from 'react';

type KulSpinnerEvents = { onKulSpinnerEvent: EventName<KulSpinnerCustomEvent<KulSpinnerEventPayload>> };

const KulSpinner: StencilReactComponent<KulSpinnerElement, KulSpinnerEvents> = /*@__PURE__*/ createComponent<KulSpinnerElement, KulSpinnerEvents>({
    tagName: 'kul-spinner',
    elementClass: KulSpinnerElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onKulSpinnerEvent: 'kul-spinner-event' } as KulSpinnerEvents,
    defineCustomElement: defineKulSpinner
});

export default KulSpinner;
