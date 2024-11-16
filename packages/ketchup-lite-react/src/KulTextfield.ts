'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { type KulTextfieldCustomEvent, type KulTextfieldEventPayload } from "ketchup-lite";
import { KulTextfield as KulTextfieldElement, defineCustomElement as defineKulTextfield } from "ketchup-lite/dist/components/kul-textfield.js";
import React from 'react';

type KulTextfieldEvents = { onKulTextfieldEvent: EventName<KulTextfieldCustomEvent<KulTextfieldEventPayload>> };

const KulTextfield: StencilReactComponent<KulTextfieldElement, KulTextfieldEvents> = /*@__PURE__*/ createComponent<KulTextfieldElement, KulTextfieldEvents>({
    tagName: 'kul-textfield',
    elementClass: KulTextfieldElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onKulTextfieldEvent: 'kul-textfield-event' } as KulTextfieldEvents,
    defineCustomElement: defineKulTextfield
});

export default KulTextfield;
