let comp = document.getElementById('editor-html');

comp.addEventListener('kup-editor-autosave', (e) => {
    console.log('kup-editor-autosave (html) ' + new Date().toISOString(), e);
});

let props = {
    customStyle: '',
    initialEditType: 'wysiwyg',
    initialValue:
        '<div data-tomark-pass="">prova prova 123456 56<br></div><div data-tomark-pass=""><br></div><div data-tomark-pass="">e vado a capo<br></div><div data-tomark-pass=""><br></div><div data-tomark-pass="">ancora<br></div><div data-tomark-pass=""><br></div><div data-tomark-pass="">e ancora</div>',
    isReadOnly: false,
    previewStyle: 'tab',
    showSaveButton: false,
    showToolbar: true,
    autosaveTimer: 5000,
};

comp.style = '--kup-editor-height: 400px;';

if (props) {
    for (const key in props) {
        comp[key] = props[key];
    }
}

comp = document.getElementById('editor-markdown');

comp.addEventListener('kup-editor-autosave', (e) => {
    console.log(
        'kup-editor-autosave (markdown) ' + new Date().toISOString(),
        e
    );
});

props = {
    customStyle: '',
    initialEditType: 'markdown',
    initialValue: '# title 1 \n ## title2',
    isReadOnly: false,
    previewStyle: 'tab',
    showSaveButton: false,
    showToolbar: true,
    autosaveTimer: 5000,
};

comp.style = '--kup-editor-height: 300px;';

if (props) {
    for (const key in props) {
        comp[key] = props[key];
    }
}
