To start the port forward
`kubectl port-forward kafka-broker-9ddf7bf6b-qhzw8 9092 -n kafka`

Build and install the image
```
docker build --tag kafka-consumer .
kind load docker-image kafka-consumer --name k8s-sandbox
kubectl apply -f .\03-kafka-consumer.yaml
```