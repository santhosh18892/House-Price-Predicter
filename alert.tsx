import { useState } from "react";
import { hyderabadAreas, predictPrice, PredictionInput, PredictionResult } from "@/data/areaData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home, Bath, Car, Maximize } from "lucide-react";

interface Props {
  onPredict: (result: PredictionResult, input: PredictionInput) => void;
}

const PredictionForm = ({ onPredict }: Props) => {
  const [form, setForm] = useState<PredictionInput>({
    area: "",
    bhk: 2,
    sqft: 1200,
    bathrooms: 2,
    parking: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = predictPrice(form);
    if (result) onPredict(result, form);
  };

  const selectedArea = hyderabadAreas.find((a) => a.name === form.area);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Select Area
        </Label>
        <Select value={form.area} onValueChange={(v) => setForm({ ...form, area: v })}>
          <SelectTrigger className="h-12 bg-card border-border text-base">
            <SelectValue placeholder="Choose a Hyderabad area" />
          </SelectTrigger>
          <SelectContent>
            {hyderabadAreas.map((a) => (
              <SelectItem key={a.name} value={a.name}>
                <span className="font-medium">{a.name}</span>
                <span className="text-muted-foreground ml-2 text-sm">₹{a.ratePerSqft.toLocaleString()}/sqft</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedArea && (
          <p className="text-sm text-muted-foreground mt-1.5 italic">{selectedArea.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" /> BHK
          </Label>
          <Input
            type="number"
            min={1}
            max={6}
            value={form.bhk}
            onChange={(e) => setForm({ ...form, bhk: Number(e.target.value) })}
            className="h-12 bg-card text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" /> Sq. Feet
          </Label>
          <Input
            type="number"
            min={300}
            max={10000}
            value={form.sqft}
            onChange={(e) => setForm({ ...form, sqft: Number(e.target.value) })}
            className="h-12 bg-card text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" /> Bathrooms
          </Label>
          <Input
            type="number"
            min={1}
            max={6}
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
            className="h-12 bg-card text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" /> Parking
          </Label>
          <Input
            type="number"
            min={0}
            max={4}
            value={form.parking}
            onChange={(e) => setForm({ ...form, parking: Number(e.target.value) })}
            className="h-12 bg-card text-base"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!form.area}
        className="w-full h-13 text-base font-semibold bg-accent text-accent-foreground hover:bg-gold-dark transition-colors"
      >
        Predict Price
      </Button>
    </form>
  );
};

export default PredictionForm;
