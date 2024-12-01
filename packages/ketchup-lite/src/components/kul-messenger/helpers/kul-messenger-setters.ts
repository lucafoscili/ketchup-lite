import {
  KulMessengerAdapter,
  KulMessengerAdapterSetters,
} from '../kul-messenger-declarations';

export const setters: (
  adapter: KulMessengerAdapter,
  hasCharacters: boolean,
) => KulMessengerAdapterSetters = (adapter, hasCharacters) => {
  const messenger = adapter.components.messenger;
  return {
    character: {
      chat: (chat, character = messenger.currentCharacter) =>
        (messenger.chat[character.id] = chat),
      current: (character) => {
        messenger.currentCharacter = character;
      },
      history: (history, character = messenger.currentCharacter) => {
        if (messenger.history[character.id] !== history) {
          messenger.history[character.id] = history;

          if (messenger.kulAutosave) {
            adapter.set.messenger.data();
          }
        }
      },
      next: (character = messenger.currentCharacter) => {
        if (!hasCharacters) {
          return;
        }
        const nextC = adapter.get.character.next(character);
        adapter.set.character.current(nextC);
      },
      previous: (character = messenger.currentCharacter) => {
        if (!hasCharacters) {
          return;
        }
        const previousC = adapter.get.character.previous(character);
        adapter.set.character.current(previousC);
      },
    },
    image: {
      cover: (type, value, character = messenger.currentCharacter) => {
        messenger.covers[character.id][type] = value;
        messenger.refresh();
      },
    },
    messenger: {
      data: () => {
        messenger.saveInProgress = true;

        adapter.actions.save().then(() => {
          requestAnimationFrame(() => {
            const button = adapter.components.saveButton;
            button.kulIcon = 'check';
            button.kulLabel = 'Saved!';
            button.kulShowSpinner = false;
          });

          setTimeout(() => {
            requestAnimationFrame(() => (messenger.saveInProgress = false));
          }, 1000);
        });
      },
      status: {
        connection: (status) => (messenger.connectionStatus = status),
        editing: (type, id) => (messenger.editingStatus[type] = id),
        hoveredCustomizationOption: (node) =>
          (messenger.hoveredCustomizationOption = node),
        save: {
          inProgress: (value) => (messenger.saveInProgress = value),
        },
      },
      ui: {
        customization: (value) => {
          messenger.ui.customization = value;
          messenger.refresh();
        },
        editing: async (value, type, node = null) => {
          messenger.ui.editing[type] = value;
          messenger.editingStatus[type] = node
            ? node.id
            : adapter.get.image.newId(type);
          if (!node) {
            messenger.refresh();
          } else {
            await messenger.refresh();
            requestAnimationFrame(() => {
              const comps = adapter.components.editing[type];
              const hasImage = node?.cells?.kulImage?.value;
              comps.descriptionTextarea.setValue(node.description);
              comps.titleTextarea.setValue(node.value);
              if (hasImage) {
                comps.imageUrlTextarea.setValue(node.cells.kulImage.value);
              }
            });
          }
        },
        filters: (filters) => {
          messenger.ui.filters = filters;
          messenger.refresh();
        },
        options: (value, type) => {
          messenger.ui.options[type] = value;
          messenger.refresh();
        },
        panel: (
          panel,
          value = panel === 'left'
            ? !messenger.ui.panels.isLeftCollapsed
            : !messenger.ui.panels.isRightCollapsed,
        ) => {
          switch (panel) {
            case 'left':
              messenger.ui.panels.isLeftCollapsed = value;
              break;
            case 'right':
              messenger.ui.panels.isRightCollapsed = value;
              break;
          }
          messenger.refresh();
          return value;
        },
      },
    },
  };
};
