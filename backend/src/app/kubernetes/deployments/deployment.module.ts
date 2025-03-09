import { Module } from '@nestjs/common';
import { DeploymentController } from './deployment.controller';
import { DeploymentService } from './deployment.service';

@Module({
  controllers: [DeploymentController],
  providers: [DeploymentService],
})
export class DeploymentModule {}
