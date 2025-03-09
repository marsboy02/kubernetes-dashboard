import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';
import { V1Deployment } from '@kubernetes/client-node';
import { CoreV1Event } from '@kubernetes/client-node';

export class DeploymentItem {
  @ApiProperty({ type: 'string', example: 'coredns' })
  name: string;

  @ApiProperty({ type: 'string', example: 'kube-system' })
  namespace: string;

  @ApiProperty({ type: 'number', example: 1 })
  replicas: number;

  @ApiProperty({ type: 'number', example: 1 })
  availableReplicas: number;

  @ApiProperty({ type: 'number', example: 1 })
  readyReplicas: number;

  @ApiProperty({
    type: 'string',
    example: 'nginx',
  })
  container: string;

  @ApiProperty({
    type: 'string',
    example: 'nginx:latest',
  })
  image: string;

  @ApiProperty({ type: 'string', example: 'active' })
  status: string;

  @ApiProperty({ type: 'number', example: 30 })
  age: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { message: { type: 'string' }, reason: { type: 'string' } },
    },
    example: [
      { message: 'Scaling replica set', reason: 'NewReplicaSetAvailable' },
    ],
  })
  event: Array<{ message: string; reason: string }>;

  constructor(deployment: V1Deployment, events: CoreV1Event[]) {
    this.name = deployment.metadata?.name;
    this.namespace = deployment.metadata?.namespace;
    this.replicas = deployment.spec?.replicas || 0;
    this.availableReplicas = deployment.status?.availableReplicas || 0;
    this.readyReplicas = deployment.status?.readyReplicas || 0;

    this.container = deployment.spec.template.spec.containers[0].name;
    this.image = deployment.spec.template.spec.containers[0].image;
    this.status =
      deployment.status?.conditions?.[deployment.status.conditions.length - 1]
        ?.type || 'Unknown';
    this.age = moment().diff(deployment.metadata.creationTimestamp, 'day');

    this.event = events.map((event) => ({
      message: event.message || '',
      reason: event.reason || '',
    }));
  }
}

export class GetDeploymentsResponse {
  @ApiProperty({
    type: DeploymentItem,
    isArray: true,
    example: [
      {
        name: 'nginx-deployment',
        namespace: 'default',
        replicas: 2,
        availableReplicas: 2,
        readyReplicas: 2,
        containers: [{ name: 'nginx', image: 'nginx:latest' }],
        status: 'active',
        age: 30,
        event: [
          { message: 'Scaling replica set', reason: 'NewReplicaSetAvailable' },
        ],
      },
    ],
  })
  deployments: DeploymentItem[];

  constructor(deployments: DeploymentItem[]) {
    this.deployments = deployments;
  }
}
