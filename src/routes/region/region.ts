import app from "../../utils/app";

export default function () {
    app.get("/region", async (c) => {
        return c.json({});
    });
}