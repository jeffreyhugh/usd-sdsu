import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import CountUp from "react-countup";
import LineGraph from "../components/graphs";
import { hour1, hour12, hour24, hour48 } from "../lib/data";

export default function Page({ city }: { city: string }) {
  const side = city && city.toLowerCase() === "vermillion" ? "usd" : "sdsu";

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
        <div className="absolute mt-6 flex w-full justify-center">
          <div className="stats shadow-xl">
            <div className="stat bg-usd-secondary">
              <div className="stat-title text-usd-primary">USD</div>
              <div className="stat-value text-center text-usd-primary">
                <CountUp
                  duration={2}
                  preserveValue={true}
                  end={396368}
                  useEasing={true}
                />
              </div>
              <div className="stat-desc flex flex-col text-usd-primary opacity-100">
                <span className="font-bold">
                  😎{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={34152}
                    useEasing={true}
                  />
                </span>
                <span className="font-bold">
                  🧸{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={17043}
                    useEasing={true}
                  />
                </span>
                <span className="font-bold">
                  🟪‍🍌{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={6520}
                    useEasing={true}
                  />
                </span>
              </div>
            </div>
            <div className="stat bg-sdsu-secondary">
              <div className="stat-title text-sdsu-primary">USD</div>
              <div className="stat-value text-center text-sdsu-primary">
                <CountUp
                  duration={2}
                  preserveValue={true}
                  end={163680}
                  useEasing={true}
                />
              </div>
              <div className="stat-desc flex flex-col text-usd-primary opacity-100">
                <span className="font-bold">
                  👌{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={105031}
                    useEasing={true}
                  />
                </span>
                <span className="font-bold">
                  🎾{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={2568}
                    useEasing={true}
                  />
                </span>
                <span className="font-bold">
                  🥸{" "}
                  <CountUp
                    duration={2}
                    preserveValue={true}
                    end={2156}
                    useEasing={true}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
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
          <div className="hero-content w-full flex-col">
            <Link href="/">
              <a className="text-4xl font-bold md:text-6xl">usd-sdsu.com</a>
            </Link>
            <div className="block md:hidden">
              <div className="mt-4 text-2xl">
                Thanks for participating! The final scores are above.
              </div>
              <div className="mt-2 text-2xl">
                You can download the full database and see some graphs by
                visiting the website on your computer.
              </div>
            </div>
            <div className="carousel hidden w-full md:flex">
              <div
                id="hour1"
                className="carousel-item relative h-96 w-full flex-col items-center"
              >
                <h1 className="mb-6 flex justify-center text-2xl font-bold md:text-4xl">
                  Hour 1
                </h1>
                <div className="flex h-full w-5/6">
                  <LineGraph data={hour1} />
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#hour48" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#hour12" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div
                id="hour12"
                className="carousel-item relative h-96 w-full flex-col items-center"
              >
                <h1 className="mb-6 flex justify-center text-2xl font-bold md:text-4xl">
                  Hour 12
                </h1>
                <div className="flex h-full w-5/6">
                  <LineGraph data={hour12} />
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#hour1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#hour24" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div
                id="hour24"
                className="carousel-item relative h-96 w-full flex-col items-center"
              >
                <h1 className="mb-6 flex justify-center text-2xl font-bold md:text-4xl">
                  Hour 24
                </h1>
                <div className="flex h-full w-5/6">
                  <LineGraph data={hour24} />
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#hour12" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#hour48" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div
                id="hour48"
                className="carousel-item relative h-96 w-full flex-col items-center"
              >
                <h1 className="mb-6 flex justify-center text-2xl font-bold md:text-4xl">
                  Hour 48
                </h1>
                <div className="flex h-full w-5/6">
                  <LineGraph data={hour48} />
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#hour24" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#hour1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a
                href="https://storage.queue.bot/dl/f/usdsdsu_full.csv"
              >
                <div className="btn">Download the full database</div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { "x-vercel-ip-city": city } = ctx.req.headers;

  return {
    props: {
      city: city || "",
    },
  };
};
