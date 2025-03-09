import { Controller, Get } from '@nestjs/common';
import { NamespaceService } from './namespace.service';
import { NamespaceListResponse } from './response/namespace-list.response';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '../../../infrastructure/dto/response.entity';

@Controller('namespaces')
@ApiTags('namespaces')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get()
  @ApiOkResponse({
    description: '정상적으로 응답이 반환되는 경우',
    type: NamespaceListResponse,
  })
  async getNamespaces(): Promise<ResponseEntity<NamespaceListResponse>> {
    const data: NamespaceListResponse =
      await this.namespaceService.listNamespaces();
    return ResponseEntity.OK_WITH_DATA('success response namespace data', data);
  }
}
