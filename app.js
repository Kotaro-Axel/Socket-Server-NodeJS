// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

//test:password@<IP>:5672 mqtt://wyymaeak:fDasodKlvvMTnipPrmFcbfHeHJaX07HM@fly.rmq.cloudamqp.com:1883
// Conexión a MQTT

const mqttClient = mqtt.connect('mqtt://wyymaeak:wyymaeak:fDasodKlvvMTnipPrmFcbfHeHJaX07HM@fly.rmq.cloudamqp.com:1883');
mqttClient.on('connect', () => {
  console.log('Conectado a MQTT');
  mqttClient.subscribe('sensor_data'); 
});

mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log('Datos recibidos: ', data);
});

app.listen(PORT, () => {
  console.log(`Servidor API REST corriendo en http://localhost:${PORT}`);
})