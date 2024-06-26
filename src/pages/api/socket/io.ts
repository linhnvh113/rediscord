import { type Server as NetServer } from "http";

import { type NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import type { NextApiResponseSocket } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseSocket) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
