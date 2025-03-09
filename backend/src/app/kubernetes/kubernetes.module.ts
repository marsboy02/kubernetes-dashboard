import { Module } from '@nestjs/common';
import { NamespaceModule } from './namespaces/namespace.module';
import { DeploymentModule } from './deployments/deployment.module';

@Module({
  imports: [NamespaceModule, DeploymentModule],
})
export class KubernetesModule {}
