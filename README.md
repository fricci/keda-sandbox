# Preparation

```
kubectl apply -f ./00-namespace.yaml
kubectl apply -f ./01-zookeeper.yaml
```

Check the result of the following command: `kubectl get services -n kafka`
Add the value of the CLUSTER-IP to the 02-kafka.yaml

```
- name: KAFKA_ZOOKEEPER_CONNECT
  value: SERVICE_IP:2181
``` 

Add the following line to the `/etc/hosts`

```
127.0.0.1 kafka-service.kafka.svc.cluster.local
```

To start the port forward
`kubectl port-forward kafka-broker-599478bdd8-gqq9t 9092 -n kafka`

# Build and install the image

```
docker build --tag kafka-consumer .
kind load docker-image kafka-consumer --name local-sandbox
kubectl apply -f ./03-kafka-consumer.yaml
```

# Install KEDA

Link: https://keda.sh/docs/2.11/deploy/

Deploying KEDA with Helm is very simple:

1. Add Helm repo

```
helm repo add kedacore https://kedacore.github.io/charts
```

2. Update Helm repo

```
helm repo update
```

3. Install keda Helm chart

```
helm install keda kedacore/keda --namespace keda --create-namespace
```

# Install Kafka

kafka-service.kafka.svc.cluster.local