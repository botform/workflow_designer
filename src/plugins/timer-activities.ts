import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class TimerActivities implements WorkflowPlugin {
  private static readonly Category: string = "时间";

  getName = (): string => "TimerActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([this.setTimeout(),this.setInterval()]);

  private setTimeout = (): ActivityDefinition => ({
    type: "TimeOut",
    displayName: "setTimeout",
    description: "setTimeout",
    category: TimerActivities.Category,
    icon: 'fas fa-hourglass-start',
    properties: [
      {
        name: 'time',
        type: 'text',
        label: '毫秒',
        hint: ''
      }],
    runtimeDescription: 'x => !!x.state.time ? `Triggers after <strong>${ x.state.time }</strong>` : x.definition.description',
    outcomes: [OutcomeNames.Done]
  });

  private setInterval = (): ActivityDefinition => ({
    type: "TimeInterval",
    displayName: "setInterval",
    description: "setInterval",
    category: TimerActivities.Category,
    icon: 'fas fa-hourglass-start',
    properties: [
      {
        name: 'time',
        type: 'text',
        label: '毫秒',
        hint: ''
      }],
    runtimeDescription: 'x => !!x.state.time ? `Triggers after <strong>${ x.state.time }</strong>` : x.definition.description',
    outcomes: [OutcomeNames.Done]
  });
  
}

pluginStore.add(new TimerActivities());
