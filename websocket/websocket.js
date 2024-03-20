import { Server as WebSocketServer } from "ws";

export const configureWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("Cliente conectado al servidor WebSocket.");

        ws.on("message", (message) => {
            console.log(`Mensaje recibido: ${message}`);
            // Puedes manejar el mensaje aquí
        });

        ws.on("close", () => {
            console.log("Cliente desconectado del servidor WebSocket.");
        });
    });
};
