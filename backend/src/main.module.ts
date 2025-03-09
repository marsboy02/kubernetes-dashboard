import { Module } from '@nestjs/common';
import { KubernetesModule } from './app/kubernetes/kubernetes.module';
import { InfrastructureModule } from './infrastructure/infrastrucutre.module';

@Module({
  imports: [KubernetesModule, InfrastructureModule],
})
export class MainModule {}
