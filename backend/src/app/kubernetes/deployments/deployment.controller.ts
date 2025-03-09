import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { GetDeploymentRequest } from './requests/get-deployment.request';
import { GetDeploymentsResponse } from './response/get-deployments.response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateDeploymentImageRequest } from './requests/update-deployment-image.request';
import { UpdateDeploymentReplicasRequest } from './requests/update-deployment-replicas.request';
import { ResponseEntity } from '../../../infrastructure/dto/response.entity';
import { UpdateDeploymentReplicasResponse } from './response/update-deployment-replicas.response';
import { UpdateDeploymentImageResponse } from './response/update-deployment-image.response';

@Controller('deployments')
@ApiTags('deployments')
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Get(':namespace')
  @ApiOkResponse({
    description: '정상적으로 응답이 반환되는 경우',
    type: GetDeploymentsResponse,
  })
  async getDeployments(
    @Param() param: GetDeploymentRequest,
  ): Promise<ResponseEntity<GetDeploymentsResponse>> {
    const data = await this.deploymentService.listDeployments(param);
    return ResponseEntity.OK_WITH_DATA('success get deployment info', data);
  }

  @Patch('image')
  @ApiOkResponse({
    description: 'Deployment 이미지 업데이트 성공',
  })
  async updateDeploymentImage(
    @Body() body: UpdateDeploymentImageRequest,
  ): Promise<ResponseEntity<UpdateDeploymentImageResponse>> {
    const data = await this.deploymentService.updateDeploymentImage(body);
    return ResponseEntity.OK_WITH_DATA('success update deployment image', data);
  }

  @Patch('replicas')
  @ApiOkResponse({
    description: 'Deployment ReplicaSet 수정 성공',
  })
  async updateReplicaCount(
    @Body() body: UpdateDeploymentReplicasRequest,
  ): Promise<ResponseEntity<UpdateDeploymentReplicasResponse>> {
    const data = await this.deploymentService.updateReplicaCount(body);
    return ResponseEntity.OK_WITH_DATA('success change to replicas', data);
  }
}
