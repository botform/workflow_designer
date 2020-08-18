import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class ConsoleActivities implements WorkflowPlugin {
  private static readonly Category: string = "GPIO";

  getName = (): string => "ConsoleActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([
    this.digitalRead(), 
    this.digitalWrite(),
    this.analogRead(),
    this.analogWrite()
    
  ]);

  analogWrite= (): ActivityDefinition => ({
    type: 'analogWrite',
    displayName: 'analogWrite',
    description: 'analogWrite',
    category: ConsoleActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'gpio',
      type: 'text',
      label: 'gpio number',
      hint: '请输入GPIO针脚号'
    },
    {
      name: 'value',
      type: 'text',
      label: 'value',
      hint: '请输入值0~255'
    }],
    runtimeDescription: 'x => !!x.state.gpio ? `PIN <strong>${ x.state.gpio } ${ x.state.value }</strong>` : x.definition.description'
  });

  analogRead= (): ActivityDefinition => ({
    type: 'analogRead',
    displayName: 'analogRead',
    description: 'analogRead',
    category: ConsoleActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'gpio',
      type: 'text',
      label: 'gpio number',
      hint: '请输入GPIO针脚号'
    }],
    runtimeDescription: 'x => !!x.state.gpio ? `PIN <strong>${ x.state.gpio }</strong>` : x.definition.description'
  });

  private digitalRead = (): ActivityDefinition => ({
    type: 'digitalRead',
    displayName: 'digitalRead',
    description: 'digitalRead',
    category: ConsoleActivities.Category,
    outcomes: [OutcomeNames.Done],
    icon: 'fas fa-terminal',
    properties: [{
      name: 'gpio',
      type: 'text',
      label: 'gpio number',
      hint: '请输入GPIO针脚号'
    }],
    runtimeDescription: 'x => !!x.state.gpio ? `PIN <strong>${ x.state.gpio }</strong>` : x.definition.description'
  });

  private digitalWrite = (): ActivityDefinition => ({
    type: 'digitalWrite',
    displayName: 'digitalWrite',
    description: 'digitalWrite',
    category: ConsoleActivities.Category,
    icon: 'fas fa-terminal',
    outcomes: [OutcomeNames.Done],
    properties: [{
        name: 'gpio',
        type: 'text',
        label: 'gpio number',
        hint: '请输入GPIO针脚号'
      },
      {
        name: 'value',
        type: 'select',
        label: '电平',
        hint: '选择针脚类型',
        options: {
          items: ['Low', 'High']
        }
      }
    ],
    runtimeDescription: 'x => !!x.state.gpio ? `PIN <strong>${ x.state.gpio }</strong> <strong>${ x.state.value }</strong>` : x.definition.description'
  });
}

pluginStore.add(new ConsoleActivities());
