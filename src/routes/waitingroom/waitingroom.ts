import app from "../../utils/app";

export default function () {
  app.get("/waitingroom/api/waitingroom", async (c) => {
    return c.json({});
  });
}