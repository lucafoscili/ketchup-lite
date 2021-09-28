const data = {
    columns: [
        {
            name: 'date',
            title: 'Date',
        },
        {
            name: 'descr',
            title: 'Description',
        },
        {
            name: 'start',
            title: 'Start',
        },
        {
            name: 'end',
            title: 'End',
        },
        {
            name: 'image',
            title: 'Image',
        },
    ],
    rows: [
        {
            cells: {
                date: {
                    obj: {
                        t: 'D8',
                        p: '*YYMD',
                        k: '20210919',
                    },
                    value: '2021-09-19',
                },
                descr: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: 'Dentist',
                },
                start: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: '10:00:00',
                },
                end: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: '11:00:00',
                },
                image: {
                    obj: {
                        t: 'J4',
                        p: 'IMG',
                        k: '...',
                    },
                    value: 'https://via.placeholder.com/64?text=PF;https://via.placeholder.com/64?text=CF;https://via.placeholder.com/64?text=DG',
                },
            },
        },
        {
            cells: {
                date: {
                    obj: {
                        t: 'D8',
                        p: '*YYMD',
                        k: '20210917',
                    },
                    value: '2021-09-17',
                },
                descr: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: 'Cinema',
                },
                start: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: '21:00:00',
                },
                end: {
                    obj: {
                        t: '',
                        p: '',
                        k: '',
                    },
                    value: '23:00:00',
                },
                image: {
                    obj: {
                        t: 'J4',
                        p: 'IMG',
                        k: '...',
                    },
                    value: 'https://via.placeholder.com/64?text=PF;https://via.placeholder.com/64?text=CF;https://via.placeholder.com/64?text=DG',
                },
            },
        },
    ],
};

const callback = (e) => {
    console.log(e);
};

const basicCal = document.getElementById('basic');
const weekViewCal = document.getElementById('week-view');
const hiddenNavigationCal = document.getElementById('hidden-navigation');
const initialDateCal = document.getElementById('initial-date');
const withImagesCal = document.getElementById('with-images');
const calendars = [
    basicCal,
    weekViewCal,
    hiddenNavigationCal,
    initialDateCal,
    withImagesCal,
];
for (let index = 0; index < calendars.length; index++) {
    const calendar = calendars[index];
    calendar.data = { ...data };
    calendar.addEventListener('kup-calendar-dateclick', callback);
    calendar.addEventListener('kup-calendar-eventclick', callback);
    calendar.addEventListener('kup-calendar-eventdrop', callback);
    calendar.addEventListener('kup-calendar-viewchange', callback);
}
