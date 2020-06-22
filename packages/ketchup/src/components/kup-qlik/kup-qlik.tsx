import { Component, Prop, h, State} from '@stencil/core';
import qApp from './qApp';
import { QlikServer, KupQlikGrid } from './kup-qlik-declarations'

@Component({
  tag: 'kup-qlik',
  styleUrls: ['kup-qlik.scss'],
  shadow: false
})
export class KupQlik {
  
  /**
   * Set Qlik Server's connection parameters 
   * {host:'<server host>', port:'<server port http default:80 https default:443 >', prefix:'<virtual proxy prefix dafault: blank>', isSecure:<true/false>}
   */
  @Prop() config: QlikServer
  /**
   * Set Qlik App's id would you like to use
   * How to find app id --> https://support.qlik.com/articles/000026239
   */
  @Prop() appid: string = '';
  /**
   * Set the grid structure (JSON)
   * selections --> Data selection array
   *    field   --> Qlik field on which to make the selection
   *    values  --> Array of int or string value which to select
   * rows
   *    colums --> they define the structure of grid
   *      obj     --> Qlik Object id would you like to render (How to find Qlik obj id --> https://help.qlik.com/en-US/sense-developer/June2020/Subsystems/Mashups/Content/Sense_Mashups/Howtos/mashups-obtain-app-object-id.htm)
   *      colDim  --> define column's dimension, it could have values from 1 to 10 where 10 is 100%
   *      size    --> define size height of obj's div container, it colud have this values XS|S|M|L|XL  
   * Example:
  {
  selections:[
      {
          field: 'Anno',
          values:[2020]
      }
  ],
  rows:[
      {
        columns:[
            {
                obj:'KvqdmD', colDim:5, size:'L'
            },
            {
                obj:'JjSaVm', colDim:5, size:'S'
            }
        ]
      }
    ]
  }
  
   */
  @Prop() grid: Array<KupQlikGrid> = [];
  /**
   * Do connection to Qlik Sever, if you have more component only one must have doconnection = "true"
   */
  @Prop() doconnection:  boolean = false
  /**
   * System prop
   */
  @Prop() qlik

  /* Style prop */  

  /**
   * Define width of grid, with true width = 100% responsive, false 1200px
   */
  @Prop() fluid:  boolean = false
  /**
   * Set gird border 
   */
  @Prop() bordered: boolean = false

  /**
   * Set default obj's container pixel height
   */
  @Prop() defobjsize: string = '400px'

  @State() divlist: Array<object> = [];
  
  
  private isload = false
  private app = null
   
  /**
   * Set in DOM head require import
   * <script src="<https/http>://<server host>:<port><prefix>/resources/assets/external/requirejs/require.js"></script>
   */
  setCapabilityApisJS() {
    return new Promise((resolve) => {
      const capabilityApisJS = document.createElement('script');
      const prefix = (this.config.prefix !== '') ? `/${this.config.prefix}` : '';
      capabilityApisJS.src = `${(this.config.isSecure ? 'https://' : 'http://') + this.config.host + (this.config.port ? `:${this.config.port}` : '') + prefix}/resources/assets/external/requirejs/require.js`;
      document.head.appendChild(capabilityApisJS);
      capabilityApisJS.onload = () => { resolve('Caricato capabilityApisJS!!'); };
    });
  }

  /**
   * Set in DOM head import of qlik-styles.css
   * <link href="<https/http>://<server host>:<port><prefix>/resources/autogenerated/qlik-styles.css" type="text/css" rel="stylesheet">
   */
  setCapabilityApisCSS(){
    return new Promise((resolve) => {
      const capabilityApisCSS = document.createElement('link');
      const prefix = (this.config.prefix !== '') ? `/${this.config.prefix}` : '';
      capabilityApisCSS.href = `${(this.config.isSecure ? 'https://' : 'http://') + this.config.host + (this.config.port ? `:${this.config.port}` : '') + prefix}/resources/autogenerated/qlik-styles.css`;
      capabilityApisCSS.type = 'text/css';
      capabilityApisCSS.rel = 'stylesheet';
      document.head.appendChild(capabilityApisCSS);
      capabilityApisCSS.onload = () => { resolve('Caricato capabilityApisCSS!!'); };
    });
  }
  
/**
 * Do connection to qlik server and Qlik API's import 
 */
  loadApp(){
    return new Promise((resolve) => {
      if(!this.isload){
        this.setCapabilityApisJS().then((x)=>{
          console.log(x)
          this.setCapabilityApisCSS().then((x)=>{
            console.log(x)
            qApp(this.config).then(()=>{
              this.isload = true
              resolve(true)
            })        
          })
        })   
      }
      else
      resolve(true)
    })   
  }

/**
 * Get objects from qlik and assign id to html div
 * @param grid 
 */
  getObjects(grid){
    return new Promise((resolve)=>{
      grid.rows.forEach(row => {
        row.columns.forEach(column => {
          this.app.getObject(column.obj, column.obj)
        });    
      });
      resolve(true)
    })
  }

/**
 * Do field selection in Qlik app 
 * @param grid 
 */
  doSelection(grid){
    return new Promise((resolve)=>{
      if(grid.selections){
        grid.selections.forEach(selection => {
          this.app.field(selection.field).selectValues(selection.values, false, true)
        });
      }        
      resolve(true)
    })
  }

/**
 * Set dimamic variable "divlist" with grid structure before render
 * @param grid 
 */
  setRender(grid){
    return new Promise((resolve)=>{
      this.divlist = []
      grid.rows.forEach(row => {
        let tmp: Array<object> = []      
        row.columns.forEach(column => {
          let style = 'qvobject '
          if(this.bordered) {
            style = style + 'bordered '
          }          

          style = style + 'col-'+column.colDim + ' size-'+column.size
          if(column.obj!='')
            tmp.push(<div id={column.obj} class={style}></div>)
          else
            tmp.push(<div class={style}></div>)
        });
      this.divlist.push(<div class="kup-qlik-row">{tmp}</div>)     
      });
      
      resolve(true)
    })
  }

  componentWillLoad(){
    if(this.doconnection){
      this.loadApp()
    }
  }
    
  componentWillRender(){
    this.setRender(this.grid)
  }

  
  render() {
    let classLayout = null
    let layoutStyle = null;

    if(this.fluid){
      classLayout = {
        ['kup-qlik-container-fluid']: true,
      }; 
    }
    else{
      classLayout = {
        ['kup-qlik-container']: true,
      };
    }

    layoutStyle = {
      ['--lyo_obj-height']: this.defobjsize,
    };

    return (
      <div class={classLayout} style={layoutStyle}>
          {this.divlist}  
      </div>      
    );    
  }

  componentDidRender(){
    if(this.qlik){
      this.app = this.qlik.openApp(this.appid, this.config);
    }
    if(this.app){
      this.getObjects(this.grid).then(()=>{
        this.doSelection(this.grid)
      })
    }
  }
}