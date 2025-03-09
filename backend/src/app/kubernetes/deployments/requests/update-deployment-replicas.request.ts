import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeploymentReplicasRequest {
  @ApiProperty({
    type: 'string',
    description: 'deployment의 name',
    example: 'coredns',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'deployment의 namespace',
    example: 'kube-system',
  })
  @IsString()
  namespace: string;

  @ApiProperty({
    type: 'number',
    description: '새로운 replicaset',
    example: 3,
  })
  @IsInt()
  replicas: number;
}
