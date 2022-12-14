import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

import { DateTime } from "luxon";
import { Row_Presses, View_Totals } from "../../lib/db";
import correctTag from "../../lib/correctTag";
import { IS_DISABLED } from "../../lib/disabled";

type Data = {
  data: View_Totals[];
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NEXT_PUBLIC_IS_DISABLED === 'TRUE') {
    res.status(503).json({
      data: [] as View_Totals[],
      error: "Temporarily Disabled",
    });
    return;
  }

  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "POST":
      await handlePost(req, res);
      break;
    default:
      res.status(405).json({
        data: [] as View_Totals[],
        error: "Method not allowed",
      });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Data>) {
  const supabase = createClient(
    process.env.NEXT_PRIVATE_SUPABASE_URL || "",
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE || ""
  );

  const { data, error } = await supabase.from("usdsdsu_totals").select("*");

  if (error) {
    console.error(error);
    res.status(500).json({
      data: data || ([] as View_Totals[]),
      error: "Internal server error",
    });
    return;
  }

  res.status(200).json({
    data,
    error: "",
  });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<Data>) {
  const supabase = createClient(
    process.env.NEXT_PRIVATE_SUPABASE_URL || "",
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE || ""
  );

  const { ts, clicks }: { ts: string; clicks: Row_Presses[] } = req.body;

  if (!ts || Math.abs(DateTime.fromISO(ts).diffNow().as("seconds")) > 10) {
    res.status(400).json({
      data: [] as View_Totals[],
      error: "Bad request",
    });
    return;
  }

  const { error } = await supabase.from<Row_Presses>("usdsdsu_presses").insert(
    clicks.map((c) => {
      return {
        ...c,
        tag: c.tag ? correctTag(c.tag) : undefined,
      };
    })
  );

  if (error) {
    console.error(error);
    res.status(500).json({
      data: [] as View_Totals[],
      error: "Internal server error",
    });
    return;
  }

  res.status(200).json({
    data: [] as View_Totals[],
    error: "",
  });
}
