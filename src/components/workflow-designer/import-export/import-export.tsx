import { Component, Element, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { ImportedWorkflowData, Workflow, WorkflowFormat, WorkflowFormatDescriptor } from "../../../models";
// import YAML from 'json2yaml';
import axios from 'axios'
@Component({
  tag: 'wf-import-export',
  styleUrl: 'import-export.scss',
  shadow: false
})
export class ImportExport {

  blobUrl: string;
  fileInput: HTMLInputElement;

  @Element()
  el: HTMLElement;

  @Event({ eventName: 'import-workflow' })
  importEvent: EventEmitter<Workflow>;

  @Method()
  async export(designer: HTMLWfDesignerElement, formatDescriptor: WorkflowFormatDescriptor) {
    let blobUrl = this.blobUrl;
    console.log(blobUrl)
    if (!!blobUrl) {
      window.URL.revokeObjectURL(blobUrl)
    }


    const workflow = designer.workflow;
    const data = this.serialize(workflow, 'json');

    //部署
    if(formatDescriptor.format=='yaml'){
      //发送data到后端api，进行存储。
      console.log(data)
      axios.post('http://localhost:9000',data)
      .then(res=>{
          console.log('res=>',res);            
      }).catch(console.log)
    }
    
    if(formatDescriptor.format=='json'){
      const blob = new Blob([data], { type: formatDescriptor.mimeType });
      this.blobUrl = blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', blobUrl);
      downloadLink.setAttribute('download', `workflow.${ formatDescriptor.fileExtension }`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    
  }

  @Method()
  async import(data?: ImportedWorkflowData) {

    if (!data) {
      this.fileInput.click();
    } else {
      const workflow = JSON.parse(data.data) as Workflow;
      this.importEvent.emit(workflow);
    }
  }

  render() {
    return (
      <host>
        <input type="file" class="import-button" onChange={ this.importWorkflow } ref={ el => this.fileInput = el } />
      </host>
    )
  }

  private importWorkflow = () => {
    const file = this.fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const data = reader.result as string;
      const format: WorkflowFormat = 'json';
      const importedData: ImportedWorkflowData = {
        data: data,
        format: format
      };
      await this.import(importedData);
    };

    reader.readAsText(file);
  };

  private serialize = (workflow: Workflow, format: WorkflowFormat): any => {
    switch (format) {
      case 'json':
        return JSON.stringify(workflow);
      case 'yaml':
        console.log(workflow)
        return false
        // return YAML.stringify(workflow);
      default:
        return workflow;
    }
  };
}
