const dashboard1 = document.getElementById('dashboard1');
const dashboard2 = document.getElementById('dashboard2');

dashboard1.addEventListener('kup-dashboard-save', function (ev) {
    console.log(ev);
    alert('Saved!');
});
dashboard2.addEventListener('kup-dashboard-save', function (ev) {
    console.log(ev);
    alert('Saved!');
});

const data1 = {
    layout: 'column',
    sections: [
        {
            layout: 'column',
            sections: [],
            id: 'SA',
            loaded: true,
            dim: '10%',
        },
        {
            layout: 'column',
            sections: [],
            id: 'SB',
            loaded: true,
            dim: '10%',
        },
        {
            layout: 'column',
            sections: [],
            id: 'SC',
            loaded: true,
        },
        {
            layout: 'column',
            sections: [],
            id: 'SD',
            loaded: true,
        },
    ],
    fun: 'F(EXD;*SCO;) 2(MB;SCP_SCH;MU_X21_01)',
    type: 'SCH',
    loaded: true,
};

const data2 = {
    layout: 'column',
    sections: [
        {
            layout: 'row',
            sections: [
                {
                    layout: 'column',
                    sections: [],
                    id: 'SA1',
                    loaded: true,
                },
                {
                    layout: 'column',
                    sections: [],
                    id: 'SA2',
                    loaded: true,
                },
            ],
            id: 'SA',
            loaded: true,
        },
        {
            layout: 'column',
            sections: [],
            id: 'SB',
            loaded: true,
        },
        {
            layout: 'column',
            sections: [],
            id: 'SC',
            loaded: true,
        },
        {
            layout: 'column',
            sections: [],
            id: 'SD',
            loaded: true,
        },
    ],
    fun: 'F(EXD;*SCO;) 2(MB;SCP_SCH;MU_X21_06)',
    type: 'SCH',
    loaded: true,
};

dashboard1.data = data1;
dashboard2.data = data2;
