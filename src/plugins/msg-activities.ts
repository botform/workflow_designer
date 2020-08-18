import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class MsgActivities implements WorkflowPlugin {
  private static readonly Category: string = "文本";

  getName = (): string => "MsgActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([
    this.msgin(),
    this.msgout()
  ]);

  msgin= (): ActivityDefinition => ({
    type: 'msgin',
    displayName: 'msg in',
    description: 'msg in',
    category: MsgActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'keyname',
      type: 'text',
      label: '请输入字段名称',
      hint: ''
    }],
    runtimeDescription: 'x => !!x.state.keyname ? `key <strong>${ x.state.keyname }</strong>` : x.definition.description'
  });

  msgout= (): ActivityDefinition => ({
    type: 'msgout',
    displayName: 'msg out',
    description: 'msg out',
    category: MsgActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'text',
      type: 'text',
      label: '输出内容',
      hint: ''
    }],
    runtimeDescription: 'x => !!x.state.text ? `value <strong>${ x.state.text }</strong>` : x.definition.description'
  });

  
}

pluginStore.add(new MsgActivities());
