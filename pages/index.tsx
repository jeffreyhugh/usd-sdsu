import { DateTime } from "luxon";
import useSWR, { useSWRConfig } from "swr";
import CountUp from "react-countup";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Head from "next/head";
import Script from "next/script";
import { ScopedMutator } from "swr/dist/types";
import correctTag from "../lib/correctTag";
import { Row_Presses, View_Leaderboard, View_Totals } from "../lib/db";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

const MAX_CLICKS_PER_SUBMIT = 8;

declare global {
  interface Window {
    umami: (tag: any) => void;
  }
}

export default function Page({ city }: { city: string }) {
  const side = city && city.toLowerCase() === "vermillion" ? "usd" : "sdsu";

  const [tag, setTag] = useState("");
  const [clicks, setClicks] = useState<Row_Presses[]>([]);
  const [waitUntil, setWaitUntil] = useState(DateTime.now().toJSDate());

  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(
    "/api/button",
    async () => {
      const res = await fetch("/api/button");
      return await res.json();
    },
    {
      refreshInterval: 5000,
    }
  );

  const { data: leaderboard, error: leaderboardError } = useSWR(
    "/api/leaderboard",
    async () => {
      const res = await fetch("/api/leaderboard");
      return await res.json();
    },
    {
      refreshInterval: 5000,
    }
  );

  if (error || leaderboardError) {
    console.error(error, leaderboardError);
    return (
      <div data-theme="main">
        <main className="w-full">
          <div className="hero min-h-screen bg-neutral">
            <h1 className="text-xl text-error-content">
              Something went wrong, please check the console
            </h1>
          </div>
        </main>
      </div>
    );
  }

  if (!data || !leaderboard) {
    return (
      <div data-theme="main">
        <main className="w-full">
          <div className="hero min-h-screen bg-neutral">
            <h1 className="text-xl text-error-content">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div data-theme="main">
      <Head>
        <title>USD vs SDSU</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:title" content="USD vs SDSU" />
        <meta property="og:url" content="https://usd-sdsu.com" />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        async
        defer
        data-website-id="4be00181-a6e4-4827-b1cb-fb1400a79ba3"
        src="https://umami.queue.bot/umami.js"
      />
      <main className="relative w-full">
        <Stats data={data.data} leaderboard={leaderboard.data} />
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              side === "usd"
                ? 'url("https://blog.akademos.com/hubfs/University+of+South+Dakota.jpg")'
                : 'url("https://www.sdstate.edu/sites/default/files/2020-06/OverviewOfCampus.jpg")',
          }}
        >
          <div className="hero-overlay bg-opacity-80" />
          <div className="hero-content flex-col">
            <Link href="/">
              <a className="text-4xl font-bold md:text-6xl">usd-sdsu.com</a>
            </Link>
            {process.env.NEXT_PUBLIC_IS_DISABLED === "TRUE" ? (
              <h1 className="text-4xl font-bold text-red-500 md:text-6xl">
                Temporarily Disabled
              </h1>
            ) : null}
            <div className="input-group shadow-xl">
              <button
                className={[
                  "btn w-1/2 border-none font-bold",
                  "bg-usd-secondary hover:bg-usd-primary",
                  "text-usd-primary hover:text-usd-secondary",
                ].join(" ")}
                disabled={process.env.NEXT_PUBLIC_IS_DISABLED === "TRUE"}
                onClick={(e) => {
                  e.screenX && e.screenY
                    ? onButtonPress(
                        "usd",
                        tag,
                        waitUntil,
                        setWaitUntil,
                        clicks,
                        setClicks,
                        mutate
                      )
                    : null;
                }}
              >
                USD
              </button>
              <button
                className={[
                  "btn w-1/2 border-none font-bold",
                  "bg-sdsu-secondary hover:bg-sdsu-primary",
                  "text-sdsu-primary hover:text-sdsu-secondary",
                ].join(" ")}
                disabled={process.env.NEXT_PUBLIC_IS_DISABLED === "TRUE"}
                onClick={(e) => {
                  e.screenX && e.screenY
                    ? onButtonPress(
                        "sdsu",
                        tag,
                        waitUntil,
                        setWaitUntil,
                        clicks,
                        setClicks,
                        mutate
                      )
                    : null;
                }}
              >
                SDSU
              </button>
            </div>
            <div
              className="tooltip tooltip-bottom"
              data-tip="Optional tag for leaderboards. Use emoji and spaces only."
            >
              <input
                type="text"
                className="input input-bordered"
                placeholder="Tag (optional)"
                onChange={(e) => setTag(correctTag(e.target.value))}
                value={tag}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const onButtonPress = async (
  side: string,
  tag: string,
  waitUntil: Date,
  setWaitUntil: Dispatch<SetStateAction<Date>>,
  clicks: Row_Presses[],
  setClicks: Dispatch<SetStateAction<Row_Presses[]>>,
  mutate: ScopedMutator<any>
) => {
  setClicks((c) =>
    [
      {
        side,
        tag,
      } as Row_Presses,
      ...c,
    ].slice(0, MAX_CLICKS_PER_SUBMIT)
  );

  if (DateTime.fromJSDate(waitUntil).diffNow().as("millisecond") < 0) {
    setWaitUntil(DateTime.now().plus({ hours: 1 }).toJSDate());

    await submitClicks(clicks, mutate);
    setClicks([]);
    
    setWaitUntil(DateTime.now().plus({ seconds: 1 }).toJSDate());
  }
};

const submitClicks = async (
  clicks: Row_Presses[],
  mutate: ScopedMutator<any>
) => {
  if (clicks.length === 0) {
    return;
  }

  await fetch("/api/button", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ts: DateTime.now().toISO(),
      clicks: clicks,
    }),
  });
  mutate("/api/button");
  for (let i = 0; i < clicks.length; i++) {
    if (clicks[i].tag) {
      mutate("/api/leaderboard");
      break;
    }
  }
  for (let i = 0; i < clicks.length; i++) {
    const tag = clicks[i].tag;
    const side = clicks[i].side;
    if (window.umami) {
      window.umami(
        `click-${side}${tag && tag !== "" ? `-${correctTag(tag.trim())}` : ""}`
      );
    }
  }
};

const Stats = ({
  data,
  leaderboard,
}: {
  data: View_Totals[];
  leaderboard: View_Leaderboard[];
}) => {
  const usdTotal = data.filter((r) => r.side === "usd")[0]?.count || 0;
  const sdsuTotal = data.filter((r) => r.side === "sdsu")[0]?.count || 0;

  return (
    <div className="absolute mt-6 flex w-full justify-center">
      <div className="stats shadow-xl">
        <div className="stat bg-usd-secondary">
          <div className="stat-title text-usd-primary">USD</div>
          <div className="stat-value text-center text-usd-primary">
            <CountUp
              duration={2}
              preserveValue={true}
              end={usdTotal}
              useEasing={true}
            />
          </div>
          <div className="stat-desc flex flex-col text-usd-primary opacity-100">
            {leaderboard
              .filter((r) => r.side === "usd")
              .filter((r) => r.tag !== "")
              .sort((a, b) => b.count - a.count)
              .map((r, i) =>
                i < 3 ? (
                  <span key={r.tag} className="font-bold">
                    {r.tag}{" "}
                    <CountUp
                      duration={2}
                      preserveValue={true}
                      end={r.count || 0}
                      useEasing={true}
                    />
                  </span>
                ) : null
              )}
          </div>
        </div>
        <div className="stat bg-sdsu-secondary">
          <div className="stat-title text-sdsu-primary">SDSU</div>
          <div className="stat-value text-center text-sdsu-primary">
            <CountUp
              duration={2}
              preserveValue={true}
              end={sdsuTotal}
              useEasing={true}
            />
          </div>
          <div className="stat-desc flex flex-col text-sdsu-primary opacity-100">
            {leaderboard
              .filter((r) => r.side === "sdsu")
              .filter((r) => r.tag !== "")
              .sort((a, b) => b.count - a.count)
              .map((r, i) =>
                i < 3 ? (
                  <span key={r.tag} className="font-bold">
                    {r.tag}{" "}
                    <CountUp
                      duration={2}
                      preserveValue={true}
                      end={r.count || 0}
                      useEasing={true}
                    />
                  </span>
                ) : null
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { "x-vercel-ip-city": city } = ctx.req.headers;

  return {
    props: {
      city: city || "",
    },
  };
};
