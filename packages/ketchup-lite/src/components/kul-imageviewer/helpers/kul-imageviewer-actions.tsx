import { KulImageviewerAdapterActions } from '../kul-imageviewer-declarations';

export const ACTIONS: KulImageviewerAdapterActions = {
    async load(adapter) {
        const imageviewer = adapter.get.imageviewer();
        const refs = adapter.components.refs;
        const textfield = refs.textfield;

        await imageviewer.kulLoadCallback(
            imageviewer,
            await textfield.getValue()
        );
    },
};
