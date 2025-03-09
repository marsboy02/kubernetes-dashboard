export const tags: SwaggerTag[] = [
  { name: 'kubernetes API', description: '서비스 상태' },
  { name: 'namespaces', description: 'namespace 조회' },
  { name: 'deployments', description: 'deployment 조회' },
];

type SwaggerTag = { name: string; description: string };
