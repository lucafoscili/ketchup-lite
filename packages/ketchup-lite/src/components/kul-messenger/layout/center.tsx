import { h } from '@stencil/core';
import { KulDataDataset } from '../../../components';

export const prepCenter = () => {
    return (
        <div class="messenger__center">
            <div class="navigation">{prepNavigation()}</div>
            <div class="chat">{prepChat()}</div>
        </div>
    );
};

const prepNavigation = () => {
    const navDataset: KulDataDataset = {
        nodes: [
            { icon: 'chevron_left', id: 'previous', value: 'Previous' },
            { icon: 'account', id: 'char_name', value: '' },
            { icon: 'chevron_right', id: 'next', value: 'Next' },
        ],
    };
    return <kul-tabbar kulData={navDataset}></kul-tabbar>;
};

const prepChat = () => {
    return <kul-chat kulLayout="bottom-textarea"></kul-chat>;
};
