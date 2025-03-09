import * as k8s from '@kubernetes/client-node';

export function loadKubeConfig(): k8s.KubeConfig {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  return kc;
}