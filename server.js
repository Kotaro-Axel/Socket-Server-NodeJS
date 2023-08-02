const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

var global_data = 0.00;

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {
      origin: '*',
    }
});

// Conexión a MQTT
const mqttClient = mqtt.connect('mqtt://wyymaeak:wyymaeak:fDasodKlvvMTnipPrmFcbfHeHJaX07HM@fly.rmq.cloudamqp.com:1883');
mqttClient.on('connect', () => {
  console.log('Conectado a MQTT');
  mqttClient.subscribe('sensor_data');
});

mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log('Datos recibidos: ', data);
  global_data = data
  io.emit('mqtt-data', data);
});

// Configurar el servidor HTTP con Socket.IO
httpServer.listen(PORT, () => {
  console.log(`Servidor API REST y WebSocket corriendo en http://localhost:${PORT}`);
});

// Configurar Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado');
});
