import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

import { View_Leaderboard } from "../../lib/db";
import { IS_DISABLED } from "../../lib/disabled";

type Data = {
  data: View_Leaderboard[];
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NEXT_PUBLIC_IS_DISABLED === 'TRUE') {
    res.status(503).json({
      data: [] as View_Leaderboard[],
      error: "Temporarily Disabled",
    });
    return;
  }

  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.status(405).json({
        data: [] as View_Leaderboard[],
        error: "Method not allowed",
      });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Data>) {
  const supabase = createClient(
    process.env.NEXT_PRIVATE_SUPABASE_URL || "",
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE || ""
  );

  const { data, error } = await supabase.from<View_Leaderboard>(
    "usdsdsu_leaderboard"
  );

  if (error) {
    console.error(error);
    res.status(500).json({
      data: data || ([] as View_Leaderboard[]),
      error: "Internal server error",
    });
    return;
  }

  res.status(200).json({
    data,
    error: "",
  });
}
