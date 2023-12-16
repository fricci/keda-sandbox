To start the port forward
`kubectl port-forward kafka-broker-599478bdd8-gqq9t 9092 -n kafka`

Build and install the image

```
docker build --tag kafka-consumer .
kind load docker-image kafka-consumer --name k8s-sandbox
kubectl apply -f .\03-kafka-consumer.yaml
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