import { hyderabadAreas } from "@/data/areaData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  selectedArea: string;
  sqft: number;
}

const PriceComparisonChart = ({ selectedArea, sqft }: Props) => {
  const data = hyderabadAreas
    .map((a) => ({
      name: a.name,
      price: Math.round((a.ratePerSqft * sqft) / 100000),
      isSelected: a.name === selectedArea,
    }))
    .sort((a, b) => b.price - a.price);

  return (
    <div className="bg-card rounded-xl p-5 shadow-card">
      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
        Price Comparison
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Estimated price for {sqft.toLocaleString()} sqft across areas (in Lakhs)
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" tickFormatter={(v) => `₹${v}L`} fontSize={11} stroke="hsl(var(--muted-foreground))" />
          <YAxis type="category" dataKey="name" width={100} fontSize={11} stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            formatter={(value: number) => [`₹${value} Lakhs`, "Est. Price"]}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="price" radius={[0, 6, 6, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.isSelected ? "hsl(var(--accent))" : "hsl(var(--muted))"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceComparisonChart;
