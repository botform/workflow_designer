import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class CmdActivities implements WorkflowPlugin {
  private static readonly Category: string = "命令";

  getName = (): string => "MsgActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([
    this.exec()
  ]);

  exec= (): ActivityDefinition => ({
    type: 'exec',
    displayName: 'exec',
    description: '执行外部脚本',
    category: CmdActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'cmd',
      type: 'text',
      label: '请输入命令',
      hint: ''
    }],
    runtimeDescription: 'x => !!x.state.cmd ? `key <strong>${ x.state.cmd }</strong>` : x.definition.description'
  });
  
}

pluginStore.add(new CmdActivities());
