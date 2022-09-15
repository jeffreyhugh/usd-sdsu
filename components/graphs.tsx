import { DateTime } from "luxon";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import nFormatter from "../lib/numberFormat";

const CustomizedDot = (props: any) => null;

export default function LineGraph({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="ts"
          tickFormatter={(ts) =>
            DateTime.fromISO(ts).toLocaleString(DateTime.DATETIME_SHORT)
          }
        />
        <YAxis tickFormatter={(val) => nFormatter(val, 1)} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="usd"
          stroke="#d21633"
          dot={<CustomizedDot />}
        />
        <Line
          type="monotone"
          dataKey="sdsu"
          stroke="#0100a3"
          dot={<CustomizedDot />}
        />
        <Line
          type="monotone"
          dataKey="😎 (USD)"
          stroke="#000000"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
        <Line
          type="monotone"
          dataKey="🧸 (USD)"
          stroke="#9b5839"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
        <Line
          type="monotone"
          dataKey="🟪‍🍌 (USD)"
          stroke="#ab47bc"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
        <Line
          type="monotone"
          dataKey="👌 (SDSU)"
          stroke="#f7ad00"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
        <Line
          type="monotone"
          dataKey="🎾 (SDSU)"
          stroke="#4f92df"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
        <Line
          type="monotone"
          dataKey="🥸 (SDSU)"
          stroke="#53bbea"
          dot={<CustomizedDot />}
          strokeDasharray={"4 4"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
