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

## In short form

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

Run the following command in terminal

```
kubectl port-forward KAFKA_BROKER_POD_NAME 9092 -n kafka
```

## For curious minds

Follow the tutorial found here: https://dzone.com/articles/how-to-deploy-apache-kafka-with-kubernetes

But the following should be change:
I've changed the value of KAFKA_ADVERTISED_LISTENERS parameter in `02-kafka.yaml` from `PLAINTEXT://kafka-broker:9092` to `kafka-service.kafka.svc.cluster.local:9092`.
According to this, the content of `/etc/hosts` file should be changed from

```
127.0.0.1	kafka-broker
```

to

```
127.0.0.1 kafka-service.kafka.svc.cluster.local
```

To start the port forward
`kubectl port-forward kafka-broker-599478bdd8-gqq9t 9092 -n kafka`

# Producer

## Build / rebuild / reinstall the producer

in `kafka-producer` directory, execute the following command

```
npm run deploy
```

## Delete the producer

in `kafka-produer` directory, execute the following command

```
npm run undeploy
```

# Consumer

## Build / rebuild / reinstall the consumer

in `kafka-consumer` directory, execute the following command

```
npm run deploy
```

## Delete the consumer

in `kafka-produer` directory, execute the following command

```
npm run undeploy
```
