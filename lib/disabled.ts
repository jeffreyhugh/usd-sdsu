import { DateTime } from "luxon";
import { EndTime } from "./time";

export const IS_DISABLED =
  process.env.NEXT_PUBLIC_IS_DISABLED === "TRUE" ||
  DateTime.fromJSDate(EndTime).diffNow().as("second") < 0;
