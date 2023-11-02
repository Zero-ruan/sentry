import { useCallback, useMemo } from "react";
import * as Sentry from "@sentry/react";
import { HttpClient } from "@sentry/integrations";
import dayjs from "dayjs";

import type { SentryContextProps } from "./types";

function useInteractions() {
  const replayMap = useMemo(() => new Map(), []);
  console.log({ replayMap });

  const onGetSessionReplayInstance = useCallback(() => {
    if (replayMap.has("replay")) {
      return replayMap.get("replay");
    } else {
      const replayInstance = new Sentry.Replay({
        networkDetailAllowUrls: [
          window.location.origin
          // process.env.REACT_APP_API!,
          // process.env.REACT_APP_API_V2!
        ],
        stickySession: false,
        networkRequestHeaders: ["*/*", "Cache-Control"],
        networkResponseHeaders: ["*", "Referrer-Policy"],
        maskAllText: false
        // mutationBreadcrumbLimit: 1000,
        // mutationLimit: 700
      });
      replayMap.set("replay", replayInstance);
      return replayInstance;
    }
  }, [replayMap]);

  const onStartReplay = useCallback<
    SentryContextProps["onStartReplay"]
  >(async () => {
    const client = Sentry.getCurrentHub().getClient();
    const replay = client?.getIntegration(Sentry.Replay);

    if (replay) {
      console.log("start");
      //   await replay.setupOnce();
      await replay.startBuffering();
    } else {
      console.warn("replay start failed");
    }
  }, []);

  const onStopReplay = useCallback<
    SentryContextProps["onStopReplay"]
  >(async () => {
    const client = Sentry.getCurrentHub().getClient();
    const replay = client?.getIntegration(Sentry.Replay);

    if (replay) {
      console.log("stop");
      await replay.stop();
    } else {
      console.warn("replay stop failed");
    }
  }, []);

  const onRegisterSentry = useCallback<
    SentryContextProps["onRegisterSentry"]
  >(async () => {
    if (process.env.REACT_APP_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
          new Sentry.BrowserTracing({
            //  With BrowserTracing, Sentry tracks your
            //  software performance, measuring metrics like throughput and latency, and displaying the impact of errors across multiple systems.
          }),
          new HttpClient({
            failedRequestStatusCodes: [400, 599]
          })
        ],
        // This option is required for capturing headers and cookies.
        sendDefaultPii: true,
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
        // Session Replay
        // replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });
      console.log("onRegisterSentry");
      const client = Sentry.getCurrentHub().getClient();
      const replay = onGetSessionReplayInstance();
      console.log({ replay });

      if (client && replay) {
        console.log("addIntegration");
        client.addIntegration?.(replay);
      }
    } else {
      console.warn("Sentry register failed");
    }
  }, [onGetSessionReplayInstance]);

  const onDestroy = useCallback<SentryContextProps["onDestroy"]>(async () => {
    Sentry.close(200).finally(() => {
      console.log("onDestroy");

      //   replayMap.clear();
    });
  }, []);

  const onIdentify = useCallback<SentryContextProps["onIdentify"]>(
    ({ username, email }) => {
      try {
        const currentDate = dayjs();
        const nowDate = currentDate.format("MM/DD/YYYY HH:mm:ss");
        console.log({ nowDate });

        Sentry.setUser({ username: `${username}-${nowDate}`, email });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return {
    onStartReplay,
    onStopReplay,
    onRegisterSentry,
    onDestroy,
    onIdentify
  };
}

export default useInteractions;
