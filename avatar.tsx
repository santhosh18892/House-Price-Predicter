import { PredictionResult } from "@/data/areaData";
import { IndianRupee, MapPin, Home, Bath, Car, Maximize, Building, TreePine } from "lucide-react";

interface Props {
  result: PredictionResult;
  input: { bhk: number; sqft: number; bathrooms: number; parking: number };
}

const formatPrice = (price: number): string => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

const ResultCard = ({ result, input }: Props) => {
  return (
    <div className="animate-fade-up space-y-6">
      {/* Price Hero */}
      <div className="bg-gradient-hero rounded-xl p-8 text-center">
        <p className="text-primary-foreground/70 text-sm uppercase tracking-widest mb-2">Estimated Price</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold">
          {formatPrice(result.estimatedPrice)}
        </h2>
        <p className="text-primary-foreground/60 mt-2 flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4" /> {result.area.name}, Hyderabad
        </p>
      </div>

      {/* Property Specs */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Home, label: "BHK", value: input.bhk },
          { icon: Maximize, label: "Sq.ft", value: input.sqft.toLocaleString() },
          { icon: Bath, label: "Bath", value: input.bathrooms },
          { icon: Car, label: "Parking", value: input.parking },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card rounded-lg p-3 text-center shadow-card">
            <Icon className="w-5 h-5 mx-auto text-accent mb-1" />
            <p className="text-lg font-semibold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="bg-card rounded-xl p-5 shadow-card space-y-3">
        <h3 className="font-display text-lg font-semibold text-foreground">Price Breakdown</h3>
        {[
          { label: "Base Price", value: result.breakdown.basePrice, desc: `${input.sqft} sqft × ₹${result.pricePerSqft.toLocaleString()}` },
          { label: "BHK Premium", value: result.breakdown.bhkPremium },
          { label: "Bathroom Premium", value: result.breakdown.bathroomPremium },
          { label: "Parking Value", value: result.breakdown.parkingPremium, desc: `${input.parking} × ₹3,00,000` },
        ].map(({ label, value, desc }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <div>
              <span className="text-foreground">{label}</span>
              {desc && <span className="text-muted-foreground ml-2 text-xs">({desc})</span>}
            </div>
            <span className="font-medium text-foreground">{formatPrice(value)}</span>
          </div>
        ))}
        <div className="border-t pt-3 flex justify-between font-semibold">
          <span className="text-foreground">Total</span>
          <span className="text-accent">{formatPrice(result.estimatedPrice)}</span>
        </div>
      </div>

      {/* Nearby Facilities */}
      <div className="bg-card rounded-xl p-5 shadow-card">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Nearby Facilities</h3>
        <div className="flex flex-wrap gap-2">
          {result.area.nearbyFacilities.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
            >
              <Building className="w-3 h-3" /> {f}
            </span>
          ))}
        </div>
      </div>

      {/* Map Embed */}
      <div className="bg-card rounded-xl overflow-hidden shadow-card">
        <iframe
          title="Location Map"
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(result.area.name + ", Hyderabad, India")}&zoom=14`}
        />
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <TreePine className="w-4 h-4" /> {result.area.name}, Hyderabad
          </span>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${result.area.lat},${result.area.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:text-gold-dark transition-colors"
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
