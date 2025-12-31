import app from "../../utils/app";

export default function () {
    app.get("/socialban/api/public/v1/*", async (c) => {
        return c.json({
            "bans": [],
            "warnings": []
        });
    });
}