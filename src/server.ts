import bodyParser from "body-parser";
import express from "express";
import { create } from "express-handlebars";
import http from "http";
import path from "path";
import WebSocket from "ws";

import { messageRepository } from "./repositories/messages";
import { apiRouter, authRouter, pagesRouter } from "./routers";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const viewsDir = path.join(__dirname, "..", "public", "views");

const hbs = create({
  partialsDir: [path.join(viewsDir, "partials")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use(`/`, pagesRouter);
app.use("/", authRouter);

app.use(express.static("public/"));

wss.on("connection", async (ws) => {
  ws.on("message", async (message) => {
    try {
      const action = JSON.parse(message.toString());

      if (!["create", "delete"].includes(action.type)) return;

      const getSendData = async () => {
        if (action.type === "delete") {
          await messageRepository.delete(action.payload.id);

          return JSON.stringify(action);
        }

        const data = await messageRepository.create(action.payload);

        return JSON.stringify({
          type: "create",
          payload: data,
        });
      };

      const sendData = await getSendData();

      wss.clients.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;

        client.send(sendData);
      });
    } catch (error) {
      console.error(error);
    }
  });

  ws.send(JSON.stringify(await messageRepository.getAll()));
});

// @ts-ignore
app.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
