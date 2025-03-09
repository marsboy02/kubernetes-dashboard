import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';
import { GetDeploymentRequest } from './requests/get-deployment.request';
import { V1Deployment } from '@kubernetes/client-node';
import {
  DeploymentItem,
  GetDeploymentsResponse,
} from './response/get-deployments.response';
import { UpdateDeploymentImageRequest } from './requests/update-deployment-image.request';
import { AppsV1ApiReplaceNamespacedDeploymentRequest } from '@kubernetes/client-node/dist/gen/types/ObjectParamAPI';
import { UpdateDeploymentReplicasRequest } from './requests/update-deployment-replicas.request';
import { UpdateDeploymentReplicasResponse } from './response/update-deployment-replicas.response';
import { UpdateDeploymentImageResponse } from './response/update-deployment-image.response';

@Injectable()
export class DeploymentService {
  private logger: Logger = new Logger('DeploymentService');
  private kc: k8s.KubeConfig;
  private k8sAppsApi: k8s.AppsV1Api;
  private k8sCoreApi: k8s.CoreV1Api;

  constructor() {
    this.kc = new k8s.KubeConfig();
    this.kc.loadFromDefault();
    this.k8sAppsApi = this.kc.makeApiClient(k8s.AppsV1Api);
    this.k8sCoreApi = this.kc.makeApiClient(k8s.CoreV1Api);
  }

  async listDeployments(
    namespace: GetDeploymentRequest,
  ): Promise<GetDeploymentsResponse> {
    try {
      const events = await this.k8sCoreApi.listNamespacedEvent(namespace);
      const deploymentList =
        await this.k8sAppsApi.listNamespacedDeployment(namespace);

      const deployments = deploymentList.items.map((deployment) => {
        const deploymentEvents = events.items.filter(
          (event) =>
            event.involvedObject.name === deployment.metadata.name &&
            event.involvedObject.kind === 'Deployment',
        );

        return new DeploymentItem(deployment, deploymentEvents);
      });

      return new GetDeploymentsResponse(deployments);
    } catch (error) {
      this.handleDeploymentError(error);
    }
  }

  async updateDeploymentImage(
    body: UpdateDeploymentImageRequest,
  ): Promise<UpdateDeploymentImageResponse> {
    try {
      const deployment = await this.k8sAppsApi.readNamespacedDeployment(body);
      const updateData = this.makeDeploymentRequestForReplaceApi(
        body.name,
        body.namespace,
        deployment,
      );
      const updatedDeployment =
        await this.k8sAppsApi.replaceNamespacedDeployment(updateData);
      return new UpdateDeploymentImageResponse(updatedDeployment, body.image);
    } catch (error) {
      this.handleDeploymentError(error);
    }
  }

  async updateReplicaCount(
    body: UpdateDeploymentReplicasRequest,
  ): Promise<UpdateDeploymentReplicasResponse> {
    try {
      const deployment = await this.k8sAppsApi.readNamespacedDeployment(body);
      if (deployment.spec) deployment.spec.replicas = body.replicas;

      const updateData = this.makeDeploymentRequestForReplaceApi(
        body.name,
        body.namespace,
        deployment,
      );
      const updatedDeployment =
        await this.k8sAppsApi.replaceNamespacedDeployment(updateData);
      return new UpdateDeploymentReplicasResponse(updatedDeployment);
    } catch (error) {
      this.handleDeploymentError(error);
    }
  }

  private makeDeploymentRequestForReplaceApi(
    name: string,
    namespace: string,
    body: V1Deployment,
  ): AppsV1ApiReplaceNamespacedDeploymentRequest {
    return {
      name,
      namespace,
      body,
    } as AppsV1ApiReplaceNamespacedDeploymentRequest;
  }

  private handleDeploymentError(error: any): never {
    this.logger.error(
      `[deployment] K8s API Error: ${error.message}`,
      error.stack,
    );
    const statusCode = error.response?.statusCode;

    if (statusCode === 400)
      throw new BadRequestException(error.body?.message ?? error.message);
    if (statusCode === 404)
      throw new NotFoundException(error.body?.message ?? error.message);
    throw new InternalServerErrorException(
      error.body?.message ?? error.message,
    );
  }
}
