import { OutcomeNames } from "../models/outcome-names";
import { WorkflowPlugin } from "../models";
import { ActivityDefinition } from "../models";
import pluginStore from '../services/workflow-plugin-store';

export class HttpActivities implements WorkflowPlugin {
  private static readonly Category: string = "网络";

  getName = (): string => "HttpActivities";
  getActivityDefinitions = (): Array<ActivityDefinition> => ([
    this.http(),
    this.mqttpub(),
    this.mqttsub()
  ]);

  private mqttsub = (): ActivityDefinition => ({
    type: "MQTTSub",
    displayName: "MQTT Sub",
    description: "MQTT Sub",
    category: HttpActivities.Category,
    icon: 'fas fa-cloud',
    properties: [{
      name: 'host',
      type: 'text',
      label: 'host',
      hint: 'MQTT borker address'
    },{
        name: 'topic',
        type: 'text',
        label: 'topic',
        hint: 'MQTT 订阅主题'
    }],
    outcomes: 'x => !!x.state.topic ? x.state.topic : []'
  });

  private mqttpub = (): ActivityDefinition => ({
    type: "MQTTPub",
    displayName: "MQTT Pub",
    description: "MQTT Pub",
    category: HttpActivities.Category,
    icon: 'fas fa-cloud',
    properties: [{
      name: 'host',
      type: 'text',
      label: 'host',
      hint: 'MQTT borker address'
    },{
        name: 'topic',
        type: 'text',
        label: 'topic',
        hint: 'MQTT 发布主题'
    }],
    outcomes: 'x => !!x.state.topic ? x.state.topic : []'
  });

  private http = (): ActivityDefinition => ({
    type: "Http",
    displayName: "Http",
    description: "Http",
    category: HttpActivities.Category,
    icon: 'fas fa-cloud',
    properties: [{
      name: 'url',
      type: 'text',
      label: 'URL',
      hint: 'The URL to send the HTTP request to.'
    },
      {
        name: 'method',
        type: 'select',
        label: 'Method',
        hint: 'The HTTP method to use when making the request.',
        options: {
          items: ['GET', 'POST', 'PUT', 'DELETE']
        }
      },
      {
        name: 'Content-Type',
        type: 'select',
        label: 'Content-Type',
        hint: 'Content-Type',
        options: {
          items: ['x-www-form-urlencoded', 'json']
        }
      },
      {
        name: 'data',
        type: 'text',
        label: 'data',
        hint: 'The HTTP content to send along with the request.'
      },
      {
        name: 'cookie',
        type: 'text',
        label: 'cookie',
        hint: '如果没有，可以留空'
      }, {
        name: 'Bearer',
        type: 'text',
        label: 'Bearer token',
        hint: '如果没有，可以留空'
      }
    ],
    outcomes: 'x => !!x.state.statusCodes ? x.state.statusCodes : []'
  });

  
}

pluginStore.add(new HttpActivities());
