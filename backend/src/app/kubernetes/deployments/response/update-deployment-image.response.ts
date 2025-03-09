import { ApiProperty } from '@nestjs/swagger';
import { V1Deployment } from '@kubernetes/client-node';

export class UpdateDeploymentImageResponse {
  @ApiProperty({
    example: 'nginx-deployment',
    description: 'Deployment의 이름',
  })
  name: string;

  @ApiProperty({
    example: 'default',
    description: 'Deployment가 위치한 네임스페이스',
  })
  namespace: string;

  @ApiProperty({
    example: 'nginx:1.21.6',
    description: '변경된 컨테이너 이미지',
  })
  updatedImage: string;

  @ApiProperty({
    example: 2,
    description: '설정된 복제본 수',
  })
  replicas: number;

  @ApiProperty({
    example: 2,
    description: '사용 가능한 복제본 수',
  })
  availableReplicas: number;

  @ApiProperty({
    example: 2,
    description: '준비된 복제본 수',
  })
  readyReplicas: number;

  @ApiProperty({
    example: '3',
    description: 'Deployment의 현재 리비전 번호',
  })
  revision: string;

  @ApiProperty({
    example: '2024-12-20T06:30:03.000Z',
    description: 'Deployment가 생성된 타임스탬프',
  })
  creationTimestamp: string;

  constructor(deployment: V1Deployment, updatedImage: string) {
    this.name = deployment.metadata.name;
    this.namespace = deployment.metadata.namespace;
    this.updatedImage = updatedImage;
    this.replicas = deployment.spec.replicas;
    this.availableReplicas = deployment.status?.availableReplicas || 0;
    this.readyReplicas = deployment.status?.readyReplicas || 0;
    this.revision =
      deployment.metadata.annotations['deployment.kubernetes.io/revision'];
    this.creationTimestamp =
      deployment.metadata.creationTimestamp.toISOString();
  }
}
