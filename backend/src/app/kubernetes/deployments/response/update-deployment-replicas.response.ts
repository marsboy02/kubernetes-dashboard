import { ApiProperty } from '@nestjs/swagger';
import { V1Deployment } from '@kubernetes/client-node';

export class UpdateDeploymentReplicasResponse {
  @ApiProperty({
    type: 'string',
    example: 'deployment-nginx',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'nginx',
  })
  namespace: string;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  replicas: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  availableReplicas: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  readyReplicas: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  updatedReplicas: number;

  constructor(deployment: V1Deployment) {
    this.name = deployment.metadata.name;
    this.namespace = deployment.metadata.namespace;
    this.replicas = deployment.spec.replicas;
    this.availableReplicas = deployment.status.availableReplicas;
    this.readyReplicas = deployment.status.readyReplicas;
    this.updatedReplicas = deployment.status.updatedReplicas;
  }
}
