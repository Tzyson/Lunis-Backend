import app from "../../utils/app";

export default function () {
  app.get("/fortnite/api/calendar/v1/timeline", async (c) => {
    const activeEvents = [
      {
        eventType: `EventFlag.Season19`,
        activeSince: "0001-01-01T00:00:00.000Z",
        activeUntil: "6767-01-01T00:00:00.000Z",
      },
      {
        eventType: `EventFlag.19`,
        activeSince: "0001-01-01T00:00:00.000Z",
        activeUntil: "6767-01-01T00:00:00.000Z",
      },
    ];
    const today = new Date();
    today.setHours(23, 59, 0, 0);
    const isoDate = today.toISOString();
    const channels = {
      "client-matchmaking": {
        states: [],
        cacheExpire: "6767-01-01T00:00:00.000Z",
      },
      "client-events": {
        states: [
          {
            validFrom: "0001-01-01T00:00:00.000Z",
            activeEvents,
            state: {
              activeStorefronts: [],
              eventNamedWeights: {},
              seasonNumber: 19,
              seasonTemplateId: `AthenaSeason:athenaseason19`,
              matchXpBonusPoints: 0,
              seasonBegin: "0001-01-01T00:00:00Z",
              seasonEnd: "6767-01-01T00:00:00Z",
              seasonDisplayedEnd: "6767-01-01T00:00:00Z",
              weeklyStoreEnd: isoDate,
              stwEventStoreEnd: "6767-01-01T00:00:00.000Z",
              stwWeeklyStoreEnd: "6767-01-01T00:00:00.000Z",
              sectionStoreEnds: { Featured: isoDate },
              dailyStoreEnd: isoDate,
            },
          },
        ],
        cacheExpire: isoDate,
      },
    };
    return c.json({
      channels,
      eventsTimeOffsetHrs: 0,
      cacheIntervalMins: 10,
      currentTime: new Date().toISOString(),
    });
  });
}