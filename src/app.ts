import express, { Application, NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routes";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  /** SENT TO PARTICULAR CLIENT*/
  // socket.emit("message", { message: "hello" });
  /** SENT MESSAGE TO ALL CLIENTS*/
  // io.emit("user:connected", { message: "USER CONNECTED!" });
  /** SENT TO CLIENTS EXCEPT SENDER */
  // socket.broadcast.emit("user:connected", { message: "USER CONNECTED!" });

  socket.on("message:send", (text) => {
    io.emit("message:get", `${text}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// --- ERROR HANDLER ---
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`);
});
