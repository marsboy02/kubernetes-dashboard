import { ApiProperty } from '@nestjs/swagger';

export class NamespaceInfo {
  name: string;
  labels: Record<string, string>;
  createdTime: string;
  aged: number;
  status: string;
  uid: string;

  constructor(
    name: string,
    labels: Record<string, string>,
    createdTime: string,
    aged: number,
    status: string,
    uid: string,
  ) {
    this.name = name;
    this.labels = labels;
    this.createdTime = createdTime;
    this.aged = aged;
    this.status = status;
    this.uid = uid;
  }
}

export class NamespaceListResponse {
  @ApiProperty({
    type: NamespaceInfo,
    isArray: true,
    example: [
      {
        name: 'kube-system',
        labels: {
          'kubernetes.io/metadata.name': 'kube-system',
        },
        createdTime: '2024-12-24',
        aged: 43,
        status: 'Active',
        uid: '173b4b93-ae4f-49ef-b781-5bd814a40e51',
      },
    ],
  })
  namespaces: NamespaceInfo[];

  constructor(namespaces: NamespaceInfo[]) {
    this.namespaces = namespaces;
  }
}
