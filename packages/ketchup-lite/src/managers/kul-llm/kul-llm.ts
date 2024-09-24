import { kulManagerInstance } from '../kul-manager/kul-manager';
import { KulLLMRequest } from './kul-llm-declarations';

/**
 * Handles LLM operations.
 * @module KulLLM
 */
export class KulLLM {
    async fetch(request: KulLLMRequest, url: string) {
        try {
            const response = await fetch(`${url}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error calling LLM:', error);
            throw error;
        }
    }

    async poll(url: string) {
        return fetch(url);
    }

    async speechToText(
        textarea: HTMLKulTextfieldElement,
        button: HTMLKulButtonElement
    ) {
        const kulManager = kulManagerInstance();

        const speechConstructor =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!speechConstructor) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        const recognition = new speechConstructor();
        recognition.lang = kulManager.language.getBCP47();
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.addEventListener(
            'result',
            (event: SpeechRecognitionEvent) => {
                const transcript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join('');
                kulManager.debug.logMessage(
                    'KulChat (stt)',
                    'STT response: ' + transcript
                );
                textarea.setValue(transcript);
                const isFinal = event.results[event.results.length - 1].isFinal;
                if (isFinal) {
                    recognition.stop();
                }
            }
        );

        recognition.addEventListener('end', () => {
            recognition.stop();
            button.kulShowSpinner = false;
        });

        recognition.addEventListener('start', () => {
            textarea.setFocus();
            button.kulShowSpinner = true;
        });

        try {
            recognition.start();
        } catch (err) {
            kulManager.debug.logMessage('KulLLM', 'Error: ' + err, 'error');
        }
    }
}
