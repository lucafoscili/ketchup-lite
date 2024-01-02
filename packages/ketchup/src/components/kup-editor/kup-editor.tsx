import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  KupManager,
  kupManagerInstance,
} from '../../managers/kup-manager/kup-manager';
import { componentWrapperId } from '../../variables/GenericVariables';
import { GenericObject, KupComponent, KupEventPayload } from '../../types/GenericTypes';
import Editor, { EditorOptions } from '@toast-ui/editor';
import { KupEditorEventPayload, KupEditorPreview, KupEditorProps, KupEditorType } from './kup-editor-declarations';
import Viewer, { ViewerOptions } from '@toast-ui/editor/dist/toastui-editor-viewer';
import { getProps, setProps } from '../../utils/utils';

@Component({
  tag: 'kup-editor',
  styleUrl: 'kup-editor.scss',
  shadow: false,
})

export class KupEditor {
  /**
    * References the root HTML element of the component (<kup-chip>).
  */
  @Element() rootElement: HTMLElement;

  /*-------------------------------------------------*/
  /*                   S t a t e s                   */
  /*-------------------------------------------------*/

  /**
   * The editor instance.
   * @default null
  */
  @State() editor: Editor = null;


  /**
   * The viewer instance.
   * @default null
  */
  @State() viewer: Viewer = null;

  /**
   * The editor instance.
   * @default null
  */
  @State() editorRef: HTMLDivElement;


  /*-------------------------------------------------*/
  /*                    P r o p s                    */
  /*-------------------------------------------------*/


  /**
   * Custom style of the component.
   * @default ""
   * @see https://ketchup.smeup.com/ketchup-showcase/#/customization
  */
  @Prop() customStyle: string = '';

  /**
   * The editor type.
   * @default 'markdown'
  */
  @Prop() initialEditType: KupEditorType = 'markdown';

  /**
   * The initial editor value.
   * @default ''
  */
  @Prop() initialValue: string = '';

  /**
   * Defines whether the editor is disabled or not.
   * @default false
  */
  @Prop() isReadOnly: boolean = false;

  /**
   * The editor preview style.
   * @default 'vertical'
  */
  @Prop() previewStyle: KupEditorPreview = 'vertical';

  /**
   * Defines whether to show the save button in editor's toolbar or not.
   * @default true
  */
  @Prop() showSaveButton: boolean = true;

  /**
   * Defines whether to show the editor's toolbar or not.
   * @default true
  */
  @Prop() showToolbar: boolean = true;

  /**
   * When specified, the component will emit the kup-editor-save event at regular intervals.
   * @default null
  */
  @Prop() autosaveTimer: number;

  /*-------------------------------------------------*/
  /*       I n t e r n a l   V a r i a b l e s       */
  /*-------------------------------------------------*/

  #kupManager: KupManager = kupManagerInstance();

  autosaveInterval: NodeJS.Timeout

  /*-------------------------------------------------*/
  /*                   E v e n t s                   */
  /*-------------------------------------------------*/

  /**
   * Triggered at regular intervals if autosaveTimer prop is initialised.
  */
  @Event({
    eventName: 'kup-editor-autosave',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kupAutoSave: EventEmitter<KupEditorEventPayload>;

  /**
   * Triggered when the component is ready.
  */
  @Event({
    eventName: 'kup-editor-ready',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kupReady: EventEmitter<KupEventPayload>;

  /**
   * Triggered when save button is clicked.
  */
  @Event({
    eventName: 'kup-editor-save',
    composed: true,
    cancelable: false,
    bubbles: true,
  })
  kupSave: EventEmitter<KupEditorEventPayload>;

  /*-------------------------------------------------*/
  /*           P u b l i c   M e t h o d s           */
  /*-------------------------------------------------*/

  /**
   * Used to retrieve component's props values.
   * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
   * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
   */
  @Method()
  async getProps(descriptions?: boolean): Promise<GenericObject> {
    return getProps(this, KupEditorProps, descriptions);
  }
  /**
   * Returns the component's internal value as html.
  */
  @Method()
  async getValueAsHTML(): Promise<string> {
    return this.editor?.getHtml() ?? "";
  }
  /**
   * Returns the component's internal value as markdown.
  */
  @Method()
  async getValueAsMarkdown(): Promise<string> {
    return this.editor?.getMarkdown() ?? "";
  }
  /**
   * This method is used to trigger a new render of the component.
   */
  @Method()
  async refresh(): Promise<void> {
    forceUpdate(this);
  }
  /**
   * Sets the props to the component.
   * @param {GenericObject} props - Object containing props that will be set to the component.
   */
  @Method()
  async setProps(props: GenericObject): Promise<void> {
    setProps(this, KupEditorProps, props);
  }

  /*-------------------------------------------------*/
  /*                  W a t c h e r s                */
  /*-------------------------------------------------*/

  @Watch('editorRef')
  onEditorRefUpdated() {
    if (this.editorRef && !this.editor) {
      if (!this.isReadOnly) {
        this.createEditor()
      } else {
        this.createViewer()
      }
    }
  }

  @Watch('editor')
  onEditorUpdate() {
    if (this.editor) {
      /*
        when we switch the tab in tab preview markdown editor
        the editor by defaults disables all the buttons of the toolbar which also
        disables the save button if present, to prevent that from happening we listen to
        preview tab change event from editor and remove the disable attribute when tab is switched
      */
      this.onEditorPreviewTabChanged()

      // to give focus to editor
      setTimeout(() => {
        this.editor && this.editor.moveCursorToStart()
      }, 100);
    }
  }

  @Watch('initialEditType')
  onInitialEditTypeChanged() {
    if (this.initialEditType != 'markdown' && this.initialEditType != 'wysiwyg') return;
    this.editor && this.editor.changeMode(this.initialEditType)
  }

  @Watch('initialValue')
  onInitialValueChanged() {
    const ref = this.editor ?? this.viewer;
    if (ref) {
      if (ref.isViewer()) {
        ref.setMarkdown(this.initialValue)
      } else {
        (ref as Editor).setHtml(this.initialValue)
      }
    }
  }

  @Watch('isReadOnly')
  onIsReadOnlyChanged() {
    if (this.isReadOnly) {
      this.editor.remove()
      this.editor = null;
      this.createViewer()
    } else {
      this.viewer.remove()
      this.viewer = null;
      this.createEditor()
    }
  }

  @Watch('previewStyle')
  onPreviewStyleChanged() {
    if ((this.previewStyle != 'tab' && this.previewStyle != 'vertical') || !this.editor) return;
    this.editor.isMarkdownMode() && this.editor.changePreviewStyle(this.previewStyle)

    /*
      this is a fix to a bug in editor, when editor is in tab style and preview tab is selected
      all toolbar buttons are disabled so at that point if we change the preview style to vertical
      the toolbar buttons still remains disabled, so we call the enable all button function manually
    */
    if (this.previewStyle == 'vertical') {
      this.editor.getUI().getToolbar().enableAllButton()
    }
  }

  @Watch('showSaveButton')
  onShowSaveButtonChanged() {
    if (this.editor) {
      const toolbar = this.editor.getUI().getToolbar()
      if (this.showSaveButton) {
        toolbar.insertItem(0, this.getToolBarWithSaveButton(false)[0])
      } else {
        toolbar.removeItem(0)
      }
    }
  }

  @Watch('showToolbar')
  onShowToolBarChanged() {
    if (this.editor) {
      this.updateToolbarVisiblity()
    }
  }

  @Watch('autosaveTimer')
  onAutosaveTimerChanged() {
    if (this.editor) {
      this.autosaveInterval && clearInterval(this.autosaveInterval);
      typeof this.autosaveTimer === 'number' && this.autosaveTimer > 0 && this.setAutosaveInterval()
    }
  }

  /*-------------------------------------------------*/
  /*          L i f e c y c l e   H o o k s          */
  /*-------------------------------------------------*/

  componentWillLoad() {
    this.#kupManager.debug.logLoad(this, false);
    this.#kupManager.theme.register(this);
  }

  componentDidLoad() {
    this.kupReady.emit({
      comp: this,
      id: this.rootElement.id,
    });
    this.#kupManager.debug.logLoad(this, true);
  }

  componentWillRender() {
    this.#kupManager.debug.logRender(this, false);
  }

  componentDidRender() {
    this.#kupManager.debug.logRender(this, true);
  }

  createEditor() {
    const editorProps: EditorOptions = {
      el: this.editorRef,
      height: 'var(--kup-editor-height)',
      initialEditType: this.initialEditType,
      previewStyle: this.previewStyle,
      initialValue: this.initialValue,
      hideModeSwitch: true,
      usageStatistics: false
    }

    if (this.showSaveButton) {
      editorProps.toolbarItems = this.getToolBarWithSaveButton()
    }

    this.editor = new Editor(editorProps);

    if (!this.showToolbar) {
      this.updateToolbarVisiblity()
    }

    typeof this.autosaveTimer === 'number' && this.autosaveTimer > 0 && this.setAutosaveInterval()
  }

  createViewer() {
    const viewerProps: ViewerOptions = {
      el: this.editorRef,
      initialValue: this.initialValue
    }

    this.viewer = new Viewer(viewerProps);
  }

  createSaveButton() {
    const button: HTMLElement = document.createElement('button');

    button.className = 'kup-editor-save-button';
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#585858" version="1.1" id="Capa_1" width="12px" height="12px" viewBox="0 0 407.096 407.096" xml:space="preserve">
        <g>
            <g>
                <path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086    c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032    C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"/>
                <path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08    c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"/>
            </g>
        </g>
        </svg>`
    button.addEventListener('click', this.onEditorSave.bind(this))

    return button;
  }

  updateToolbarVisiblity() {
    const toolbarElement = this.editor.getUI().getToolbar().el;
    if (this.showToolbar) {
      toolbarElement.style.display = "";
    } else {
      toolbarElement.style.display = "none";
    }
  }

  onEditorPreviewTabChanged() {
    this.editor.on('changePreviewTabPreview', function () {
      setTimeout(() => {
        document.querySelector('.kup-editor-save-button')?.removeAttribute('disabled')
      }, 100);
    })
  }

  setAutosaveInterval() {
    this.autosaveInterval = setInterval(() => {
      this.onEditorAutoSave()
    }, this.autosaveTimer);
  }

  onEditorSave() {
    this.kupSave.emit(this.getSaveAndAutoSaveProps())
  }

  onEditorAutoSave() {
    this.kupAutoSave.emit(this.getSaveAndAutoSaveProps())
  }

  getToolBarWithSaveButton(includeDefaultItems: boolean = true) {
    const toolbarItems = [
      {
        options: {
          el: this.createSaveButton(),
          tooltip: 'Save'
        },
        type: 'button'
      },
      ...(includeDefaultItems ? this.getDefaultToolBarItems() : [])
    ]

    return toolbarItems
  }

  getDefaultToolBarItems() {
    const toolBarItems = [
      'heading', 'bold', 'italic', 'strike',
      'hr', 'quote',
      'ul', 'ol', 'task', 'indent', 'outdent',
      'table', 'image', 'link',
      'code', 'codeblock'
    ]

    if (this.initialEditType == 'markdown') toolBarItems.push('scrollSync')
    return toolBarItems;
  }

  getSaveAndAutoSaveProps(): KupEditorEventPayload {
    return {
      comp: this,
      id: this.rootElement.id,
      htmlValue: this.editor.getHtml() ?? "",
      markdownValue: this.editor.getMarkdown() ?? ""
    }
  }

  render() {
    return (
      <Host>
        <style>
          {this.#kupManager.theme.setKupStyle(
            this.rootElement as KupComponent
          )}
        </style>
        <div id={componentWrapperId}>
          <div class="kup-editor-wrapper">
            <div ref={(el) => (this.editorRef = el)}></div>
          </div>
        </div>
      </Host>
    )
  }

  disconnectedCallback() {
    this.#kupManager.theme.unregister(this);
    this.autosaveInterval && clearInterval(this.autosaveInterval)
  }
}
