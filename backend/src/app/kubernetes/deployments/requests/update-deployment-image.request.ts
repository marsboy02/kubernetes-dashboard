import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppsV1ApiReadNamespacedDeploymentRequest } from '@kubernetes/client-node/dist/gen/types/ObjectParamAPI';

export class UpdateDeploymentImageRequest
  implements AppsV1ApiReadNamespacedDeploymentRequest
{
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
    type: 'string',
    description: '새로운 이미지',
    example: 'nginx:lts',
  })
  @IsString()
  image: string;
}
