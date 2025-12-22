import app from "../../utils/app";

export default function () {
    app.get("/fortnite/api*/versioncheck*", async (c) => {
        return c.json({
            "type": "NO_UPDATE"
        });
    });
}