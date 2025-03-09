import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';
import {
  NamespaceListResponse,
  NamespaceInfo,
} from './response/namespace-list.response';
import * as moment from 'moment';
import { V1Namespace } from '@kubernetes/client-node';

@Injectable()
export class NamespaceService {
  private readonly logger = new Logger('NamespaceService');
  private kc: k8s.KubeConfig;
  private k8sCoreApi: k8s.CoreV1Api;

  constructor() {
    this.kc = new k8s.KubeConfig();
    this.kc.loadFromDefault();
    this.k8sCoreApi = this.kc.makeApiClient(k8s.CoreV1Api);
  }

  public async listNamespaces(): Promise<NamespaceListResponse> {
    try {
      const { items } = await this.k8sCoreApi.listNamespace();
      const namespaces: NamespaceInfo[] = this.buildNamespaceInfos(items);
      return new NamespaceListResponse(namespaces);
    } catch (error) {
      this.logger.error(`Failed to list namespace: ${error.message}`);
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  private buildNamespaceInfos(items: V1Namespace[]): NamespaceInfo[] {
    return items.map((item) => {
      const { name, labels = {}, creationTimestamp, uid } = item.metadata;
      const { phase: status } = item.status;
      const ageInDays = moment().diff(creationTimestamp, 'day');

      return new NamespaceInfo(
        name,
        labels,
        moment(creationTimestamp).format('YYYY-MM-DD').toString(),
        ageInDays,
        status,
        uid,
      );
    });
  }
}
