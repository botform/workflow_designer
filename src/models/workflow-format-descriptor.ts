// export type WorkflowFormat = 'json' | 'yaml' | 'xml' | 'object';
export type WorkflowFormat = 'json' | 'yaml';
export type WorkflowFormatDescriptor = {
  format: WorkflowFormat
  fileExtension: string
  mimeType: string
  displayName: string
}

export type WorkflowFormatDescriptorDictionary = { [key: string]: WorkflowFormatDescriptor };
