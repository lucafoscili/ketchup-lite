import {
  KulMessengerAdapter,
  KulMessengerAdapterGetters,
  KulMessengerAdapterSetters,
} from "../kul-messenger-declarations";

export const prepMessengerGetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterGetters["messenger"] => {
  return {
    config: () => {
      const { currentCharacter } = getAdapter().controller.get.compInstance;
      return {
        currentCharacter: currentCharacter.id,
        ui: "messenger.ui" as any,
      };
    },
    data: () => {
      const { kulData } = getAdapter().controller.get.compInstance;
      return kulData;
    },
    history: () => {
      const { history } = getAdapter().controller.get.compInstance;
      return history;
    },
    status: {
      connection: () => {
        const { connectionStatus } = getAdapter().controller.get.compInstance;
        return connectionStatus;
      },
      editing: () => {
        const { editingStatus } = getAdapter().controller.get.compInstance;
        return editingStatus;
      },
      hoveredCustomizationOption: () => {
        const { hoveredCustomizationOption } =
          getAdapter().controller.get.compInstance;
        return hoveredCustomizationOption;
      },
      save: {
        inProgress: () => {
          const { saveInProgress } = getAdapter().controller.get.compInstance;
          return saveInProgress;
        },
      },
    },
    ui: () => " messenger.ui" as any,
  };
};

export const prepMessengerSetters = (
  getAdapter: () => KulMessengerAdapter,
): KulMessengerAdapterSetters["messenger"] => {
  return {
    data: () => setData(getAdapter),
    status: {
      connection: (status) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.connectionStatus = status;
      },
      editing: (type, id) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.editingStatus[type] = id;
      },
      hoveredCustomizationOption: (node) => {
        const { compInstance } = getAdapter().controller.get;
        compInstance.hoveredCustomizationOption = node;
      },
      save: {
        inProgress: (value) => {
          const { compInstance } = getAdapter().controller.get;
          compInstance.saveInProgress = value;
        },
      },
    },
    ui: {
      customization: (value) => {
        const { compInstance } = getAdapter().controller.get;

        //compInstance.ui.customization = value;
        compInstance.refresh();
      },
      editing: async (value, type, node = null) => {
        const adapter = getAdapter();
        const { controller, elements } = adapter;
        const { compInstance, image } = controller.get;
        const {} = elements.refs;

        // compInstance.ui.editing[type] = value;
        compInstance.editingStatus[type] = node ? node.id : image.newId(type);
        if (!node) {
          compInstance.refresh();
        } else {
          await compInstance.refresh();
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
        const { compInstance } = getAdapter().controller.get;

        //compInstance.ui.filters = filters;
        compInstance.refresh();
      },
      options: (value, type) => {
        const { compInstance } = getAdapter().controller.get;

        //compInstance.ui.options[type] = value;
        compInstance.refresh();
      },
      panel: (
        panel,
        value = panel === "left"
          ? !messenger.ui.panels.isLeftCollapsed
          : !messenger.ui.panels.isRightCollapsed,
      ) => {
        const { compInstance } = getAdapter().controller.get;

        switch (panel) {
          case "left":
            compInstance.ui.panels.isLeftCollapsed = value;
            break;
          case "right":
            compInstance.ui.panels.isRightCollapsed = value;
            break;
        }
        compInstance.refresh();
        return value;
      },
    },
  };
};

const setData = (getAdapter: () => KulMessengerAdapter) => {
  const { controller, elements } = getAdapter();
  const { compInstance } = controller.get;
  const { save } = elements.refs.character;

  compInstance.save().then(() => {
    requestAnimationFrame(() => {
      save.kulIcon = "check";
      save.kulLabel = "Saved!";
      save.kulShowSpinner = false;
    });

    setTimeout(() => {
      requestAnimationFrame(() => (compInstance.saveInProgress = false));
    }, 1000);
  });
};
