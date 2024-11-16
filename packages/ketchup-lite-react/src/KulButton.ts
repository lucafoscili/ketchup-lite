'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { type KulButtonCustomEvent, type KulButtonEventPayload } from "ketchup-lite";
import { KulButton as KulButtonElement, defineCustomElement as defineKulButton } from "ketchup-lite/dist/components/kul-button.js";
import React from 'react';

type KulButtonEvents = { onKulButtonEvent: EventName<KulButtonCustomEvent<KulButtonEventPayload>> };

const KulButton: StencilReactComponent<KulButtonElement, KulButtonEvents> = /*@__PURE__*/ createComponent<KulButtonElement, KulButtonEvents>({
    tagName: 'kul-button',
    elementClass: KulButtonElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onKulButtonEvent: 'kul-button-event' } as KulButtonEvents,
    defineCustomElement: defineKulButton
});

export default KulButton;
