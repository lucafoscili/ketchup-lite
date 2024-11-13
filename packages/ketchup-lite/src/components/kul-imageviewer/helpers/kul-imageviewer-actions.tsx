import { KulDataCell } from '../../../managers/kul-data/kul-data-declarations';
import { KulImageviewerAdapterActions } from '../kul-imageviewer-declarations';

export const ACTIONS: KulImageviewerAdapterActions = {
    async clearHistory(adapter, index = null) {
        const history = adapter.set.state.history;

        if (index === null) {
            history.clear();
            adapter.actions.clearSelection(adapter);
        } else {
            history.clear(index);
        }
    },
    async clearSelection(adapter) {
        const stateSetter = adapter.set.state;

        stateSetter.currentShape({});
        stateSetter.history.index(null);
        adapter.components.refs.masonry.setSelectedShape(null);
    },
    async delete(adapter) {
        const getters = adapter.get;

        const imageviewer = getters.imageviewer();
        const dataset = getters.imageviewer().kulData;
        const manager = getters.manager();

        const currentSelectedShape = getters.state.currentShape();
        await adapter.actions.clearHistory(
            adapter,
            currentSelectedShape.shape.index
        );

        const cell = adapter.actions.findImage(adapter);
        const node = manager.data.node.findNodeByCell(dataset, cell);
        manager.data.node.pop(dataset.nodes, node);
        imageviewer.kulData = { ...dataset };

        await adapter.actions.clearSelection(adapter);
    },
    findImage(adapter) {
        const imageviewer = adapter.get.imageviewer();
        const manager = adapter.get.manager();

        const currentSelectedShape = adapter.get.state.currentShape();
        const cells = manager.data.cell.shapes.getAll(
            imageviewer.kulData,
            false
        );

        return cells['image'].find(
            (c) =>
                c.value === currentSelectedShape.value ||
                c.kulValue === currentSelectedShape.value
        );
    },
    async load(adapter) {
        const imageviewer = adapter.get.imageviewer();
        const refs = adapter.components.refs;
        const textfield = refs.textfield;

        try {
            await imageviewer.kulLoadCallback(
                imageviewer,
                await textfield.getValue()
            );
            adapter.actions.clearHistory(adapter);
        } catch (error) {
            console.error('Load operation failed:', error);
        }
    },
    async redo(adapter) {
        const currentHistory = adapter.get.state.history.current();
        const index = adapter.get.state.history.index();
        if (currentHistory && index < currentHistory.length - 1) {
            adapter.set.state.history.index(index + 1);
        }
    },
    async save(adapter) {
        const currentSelectedShape = adapter.get.state.currentShape();
        if (!currentSelectedShape) {
            return;
        }
        const imageviewer = adapter.get.imageviewer();
        const manager = adapter.get.manager();
        const index = currentSelectedShape.shape.index;
        const shape = currentSelectedShape.shape.shape;

        const currentSnapshot = adapter.get.state.history.currentSnapshot();
        const value = currentSnapshot.value;

        const cell = adapter.actions.findImage(adapter);
        cell.value = value;
        cell.kulValue = value;

        adapter.actions.updateValue(shape, value);
        await adapter.actions.clearHistory(adapter, index);

        imageviewer.kulData = { ...imageviewer.kulData };
    },
    async undo(adapter) {
        const index = adapter.get.state.history.index();
        if (index > 0) {
            const newIndex = index - 1;
            adapter.set.state.history.index(newIndex);
        }
    },
    updateValue(shape, value) {
        const s = shape as Partial<KulDataCell<'image'>>;
        shape.value = value;
        if (s.kulValue) {
            s.kulValue = value;
        }
    },
};
