export interface DeploymentEvent {
  message: string;
  reason: string;
}

export interface DeploymentContainer {
  name: string;
  image: string;
}

export interface Deployment {
  name: string;
  namespace: string;
  replicas: number;
  availableReplicas: number;
  readyReplicas: number;
  containers: DeploymentContainer[];
  status: string;
  age: number;
  event: DeploymentEvent[];
}
