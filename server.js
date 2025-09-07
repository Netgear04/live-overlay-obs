
const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let lastMessage = "";

wss.on('connection', function connection(ws) {
  if (lastMessage) ws.send(lastMessage);
  ws.on('message', function incoming(message) {
    lastMessage = message.toString();
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(lastMessage);
      }
    });
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});
