import app from "../../utils/app";
import sharedagreements from "./assets/SharedAgreements.json" with { type: "json" };

export default function () {
    app.post("/eulatracking/api/shared/agreements/fn", async (c) => {
        return c.json(sharedagreements);
    });
    
    app.post("/eulatracking/api/public/agreements/fn/account/:accountId", async (c) => {
        return c.json({});
    });
}