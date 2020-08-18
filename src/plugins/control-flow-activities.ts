import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class ControlFlowActivities implements WorkflowPlugin {
  private static readonly Category: string = "判断";

  getName = (): string => "ControlFlowActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([
    // this.fork(),
    this.lowHigh(),
    this.msg()
    // this.join(),
    // this.switch()
  ]);

  private fork = (): ActivityDefinition => ({
    type: "Fork",
    displayName: "Fork",
    description: "Fork workflow execution into multiple branches.",
    category: ControlFlowActivities.Category,
    icon: 'fas fa-code-branch fa-rotate-180',
    outcomes: 'x => x.state.branches',
    properties: [{
      name: 'branches',
      type: 'list',
      label: 'Branches',
      hint: 'Enter one or more names representing branches, separated with a comma. Example: Branch 1, Branch 2'
    }]
  });

  private msg = (): ActivityDefinition => ({
    type: "msg",
    displayName: "文本判断",
    description: "文本判断",
    category: ControlFlowActivities.Category,
    runtimeDescription: 'x => !!x.state.value ? `当文本为 <strong>${ x.state.value }</strong> 时` : x.definition.description',
    outcomes: [OutcomeNames.True, OutcomeNames.False],
    properties: [{
      name: 'value',
      type: 'text',
      label: '值',
      hint: ''
    }]
  });

  private lowHigh = (): ActivityDefinition => ({
    type: "lowHigh",
    displayName: "电平判断",
    description: "电平判断",
    category: ControlFlowActivities.Category,
    runtimeDescription: 'x => !!x.state.value ? `当电平为 <strong>${ x.state.value }</strong> 时` : x.definition.description',
    outcomes: [OutcomeNames.True, OutcomeNames.False],
    properties: [{
      name: 'value',
      type: 'select',
      label: '电平',
      hint: '',
      options: {
        items: ['Low', 'High']
      }
    }]
  });

  private join = (): ActivityDefinition => ({
    type: "Join",
    displayName: "Join",
    description: "Merge workflow execution back into a single branch.",
    category: ControlFlowActivities.Category,
    icon: 'fas fa-code-branch',
    runtimeDescription: 'x => !!x.state.joinMode ? `Merge workflow execution back into a single branch using mode <strong>${ x.state.joinMode }</strong>` : x.definition.description',
    outcomes: [OutcomeNames.Done],
    properties: [{
      name: 'joinMode',
      type: 'text',
      label: 'Join Mode',
      hint: 'Either \'WaitAll\' or \'WaitAny\''
    }]
  });

  private switch = (): ActivityDefinition => ({
    type: "Switch",
    displayName: "Switch",
    description: "Switch execution based on a given expression.",
    category: ControlFlowActivities.Category,
    icon: 'far fa-list-alt',
    runtimeDescription: 'x => !!x.state.expression ? `Switch execution based on <strong>${ x.state.expression.expression }</strong>.` : x.definition.description',
    outcomes: 'x => x.state.cases.map(c => c.toString())',
    properties: [{
      name: 'expression',
      type: 'expression',
      label: 'Expression',
      hint: 'The expression to evaluate. The evaluated value will be used to switch on.'
    },
      {
        name: 'cases',
        type: 'list',
        label: 'Cases',
        hint: 'A comma-separated list of possible outcomes of the expression.'
      }]
  });
}

pluginStore.add(new ControlFlowActivities());
