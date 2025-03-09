import { AppsV1ApiListNamespacedDeploymentRequest } from '@kubernetes/client-node';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetDeploymentRequest
  implements AppsV1ApiListNamespacedDeploymentRequest
{
  @ApiProperty({
    type: 'string',
    example: 'kube-system',
  })
  @IsString()
  namespace: string;
}
