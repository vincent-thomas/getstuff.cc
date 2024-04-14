import {WebSocketServer} from "ws";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import { appRouter } from "backend";
import { createContext } from "./trpc";

const wsServer = new WebSocketServer({ port: 3001 });

const handler = applyWSSHandler({
  wss: wsServer,
  router: appRouter,
  createContext: ({req}) => {
    const testingCookies =req.headers.cookie?.split("; ")?.map(v => v.split("="))
    return createContext({ cookies: testingCookies !== undefined ? Object.fromEntries(testingCookies) : {} })
  }
});

wsServer.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wsServer.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wsServer.clients.size})`);
  });
})

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wsServer.close();
});