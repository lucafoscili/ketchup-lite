'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import { type KulMessengerCustomEvent, type KulMessengerEventPayload } from "ketchup-lite";
import { KulMessenger as KulMessengerElement, defineCustomElement as defineKulMessenger } from "ketchup-lite/dist/components/kul-messenger.js";
import React from 'react';

type KulMessengerEvents = { onKulMessengerEvent: EventName<KulMessengerCustomEvent<KulMessengerEventPayload>> };

const KulMessenger: StencilReactComponent<KulMessengerElement, KulMessengerEvents> = /*@__PURE__*/ createComponent<KulMessengerElement, KulMessengerEvents>({
    tagName: 'kul-messenger',
    elementClass: KulMessengerElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onKulMessengerEvent: 'kul-messenger-event' } as KulMessengerEvents,
    defineCustomElement: defineKulMessenger
});

export default KulMessenger;
