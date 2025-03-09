import { Module } from '@nestjs/common';
import { NamespaceController } from './namespace.controller';
import { NamespaceService } from './namespace.service';

@Module({
  controllers: [NamespaceController],
  providers: [NamespaceService],
})
export class NamespaceModule {}
