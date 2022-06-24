const data = {
    columns: [],
    rows: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [],
                                    disabled: false,
                                    expandable: false,
                                    icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3AMO%253BLOCEXD.jsf?ln=smeupIcons',
                                    id: 'LOCEXD',
                                    isExpanded: false,
                                    obj: {
                                        k: 'LOCEXD',
                                        p: 'B£AMO',
                                        t: 'TA',
                                    },
                                    options: true,
                                    style: {},
                                    value: 'Scheda oggetto',
                                    visible: true,
                                },
                            ],
                            disabled: false,
                            expandable: true,
                            icon: 'table-large',
                            id: 'FOS',
                            isExpanded: true,
                            obj: {
                                k: 'FOS',
                                p: 'BRE',
                                t: 'TA',
                            },
                            options: true,
                            style: {},
                            value: 'FOR Debiti operaz. societ.',
                            visible: true,
                        },
                        {
                            children: [
                                {
                                    children: [],
                                    disabled: false,
                                    expandable: false,
                                    icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3AMO%253BLOCEXD.jsf?ln=smeupIcons',
                                    id: 'LOCEXD',
                                    isExpanded: false,
                                    obj: {
                                        k: 'LOCEXD',
                                        p: 'B£AMO',
                                        t: 'TA',
                                    },
                                    options: true,
                                    style: {},
                                    value: 'Scheda oggetto',
                                    visible: true,
                                },
                                {
                                    children: [],
                                    disabled: false,
                                    expandable: false,
                                    icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3AMO%253BLOCTML.jsf?ln=smeupIcons',
                                    id: 'LOCTML',
                                    isExpanded: false,
                                    obj: {
                                        k: 'LOCTML',
                                        p: 'B£AMO',
                                        t: 'TA',
                                    },
                                    options: true,
                                    style: {},
                                    value: 'Timeline',
                                    visible: true,
                                },
                            ],
                            disabled: false,
                            expandable: true,
                            icon: 'table-large',
                            id: 'FOS',
                            isExpanded: true,
                            obj: {
                                k: 'FOS',
                                p: 'BRE',
                                t: 'TA',
                            },
                            options: true,
                            style: {},
                            value: 'FOR Debiti operaz. societ.',
                            visible: true,
                        },
                        {
                            children: [],
                            disabled: false,
                            expandable: false,
                            icon: 'table-large',
                            id: 'AGE',
                            isExpanded: false,
                            obj: {
                                k: 'AGE',
                                p: 'BRE',
                                t: 'TA',
                            },
                            options: true,
                            style: {},
                            value: 'Agente',
                            visible: true,
                        },
                        {
                            children: [
                                {
                                    children: [],
                                    disabled: false,
                                    expandable: false,
                                    icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3AMO%253BLOCTML.jsf?ln=smeupIcons',
                                    id: 'LOCTML',
                                    isExpanded: false,
                                    obj: {
                                        k: 'LOCTML',
                                        p: 'B£AMO',
                                        t: 'TA',
                                    },
                                    options: true,
                                    style: {},
                                    value: 'Timeline',
                                    visible: true,
                                },
                                {
                                    children: [],
                                    disabled: false,
                                    expandable: false,
                                    icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3AMO%253BLOCTML.jsf?ln=smeupIcons',
                                    id: 'LOCTML',
                                    isExpanded: false,
                                    obj: {
                                        k: 'LOCTML',
                                        p: 'B£AMO',
                                        t: 'TA',
                                    },
                                    options: true,
                                    style: {},
                                    value: 'Timeline',
                                    visible: true,
                                },
                            ],
                            disabled: false,
                            expandable: true,
                            icon: 'table-large',
                            id: 'BAN',
                            isExpanded: true,
                            obj: {
                                k: 'BAN',
                                p: 'BRE',
                                t: 'TA',
                            },
                            options: true,
                            style: {},
                            value: 'Banche',
                            visible: true,
                        },
                    ],
                    disabled: false,
                    expandable: true,
                    icon: 'table-large',
                    id: '03',
                    isExpanded: true,
                    obj: {
                        k: '03',
                        p: 'V§R',
                        t: 'TA',
                    },
                    options: true,
                    style: {},
                    value: 'Lombardia',
                    visible: true,
                },
                {
                    children: [],
                    disabled: false,
                    expandable: false,
                    icon: 'table-large',
                    id: '14',
                    isExpanded: false,
                    obj: {
                        k: '14',
                        p: 'V§R',
                        t: 'TA',
                    },
                    options: true,
                    style: {},
                    value: 'Molise',
                    visible: true,
                },
            ],
            disabled: false,
            expandable: true,
            icon: '/Web/javax.faces.resource/TA%253BB%25C2%25A3A%253BD0.jsf?ln=smeupIcons',
            id: 'D0',
            isExpanded: true,
            obj: {
                k: 'D0',
                p: 'B£A',
                t: 'TA',
            },
            options: true,
            style: {},
            value: 'AcosUP Costi Avanzati',
            visible: true,
        },
    ],
};

const familyTree = document.querySelector('kup-family-tree');
familyTree.data = data;

document.addEventListener('kup-familytree-click', (e) => {
    console.log(e);
});
