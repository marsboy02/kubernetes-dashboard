import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { API_PREFIX } from '../../constants';

import { tags } from './swagger.tags';
import { INestApplication } from '@nestjs/common';

const document = new DocumentBuilder()
  .setTitle(`쿠버네티스 대시보드 ${API_PREFIX} API`)
  .setDescription(`쿠버네티스 대시보드 ${API_PREFIX} API 문서`)
  .setContact('강형준', 'https://github.com/marsboy02', 'marsboy0619@gmail.com')
  .addServer(
    (process.env.APP_URL || 'http://localhost:3000') + '/' + API_PREFIX,
  )
  .setVersion('0.0.1');

tags.forEach((tag) => document.addTag(tag.name, tag.description));

export default function generateSwaggerDocument(app: INestApplication<any>) {
  return SwaggerModule.createDocument(app, document.build());
}
