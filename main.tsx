export interface AreaData {
  name: string;
  ratePerSqft: number;
  lat: number;
  lng: number;
  nearbyFacilities: string[];
  description: string;
}

export const hyderabadAreas: AreaData[] = [
  { name: "Gachibowli", ratePerSqft: 8500, lat: 17.4401, lng: 78.3489, nearbyFacilities: ["ISB", "DLF Cyber City", "Botanical Garden", "IKEA", "Mindspace"], description: "IT hub with premium developments" },
  { name: "Hitech City", ratePerSqft: 9200, lat: 17.4435, lng: 78.3772, nearbyFacilities: ["Shilparamam", "Mindspace IT Park", "Inorbit Mall", "HITEX", "Cyber Towers"], description: "Hyderabad's silicon valley" },
  { name: "Madhapur", ratePerSqft: 8800, lat: 17.4483, lng: 78.3915, nearbyFacilities: ["Durgam Cheruvu", "Ayyappa Society", "GVK One Mall", "Image Hospital"], description: "Vibrant residential & commercial area" },
  { name: "Kondapur", ratePerSqft: 7500, lat: 17.4590, lng: 78.3596, nearbyFacilities: ["Kondapur Lake", "Meridian School", "Botanical Garden", "Continental Hospital"], description: "Rapidly developing residential hub" },
  { name: "Banjara Hills", ratePerSqft: 12000, lat: 17.4156, lng: 78.4347, nearbyFacilities: ["GVK One", "Apollo Hospital", "KBR Park", "City Center Mall", "NTR Garden"], description: "Hyderabad's most upscale locality" },
  { name: "Jubilee Hills", ratePerSqft: 11500, lat: 17.4325, lng: 78.4073, nearbyFacilities: ["Peddamma Temple", "Jubilee Hills Club", "Forum Mall", "Care Hospital"], description: "Premium residential neighborhood" },
  { name: "Kukatpally", ratePerSqft: 6200, lat: 17.4849, lng: 78.3918, nearbyFacilities: ["KPHB Colony", "JNTU", "Forum Mall", "Kukatpally Y Junction"], description: "Well-connected suburban area" },
  { name: "Miyapur", ratePerSqft: 5800, lat: 17.4969, lng: 78.3534, nearbyFacilities: ["Miyapur Metro", "Allwyn Colony", "Janapriya Township"], description: "Affordable with metro connectivity" },
  { name: "Manikonda", ratePerSqft: 6800, lat: 17.4044, lng: 78.3850, nearbyFacilities: ["Lanco Hills", "Manchirevula", "OU Campus", "Narsingi"], description: "Growing residential area near IT corridor" },
  { name: "Nallagandla", ratePerSqft: 6500, lat: 17.4570, lng: 78.3210, nearbyFacilities: ["Aparna Sarovar", "Nallagandla Lake", "Tellapur"], description: "Serene suburban living" },
  { name: "Begumpet", ratePerSqft: 8000, lat: 17.4437, lng: 78.4673, nearbyFacilities: ["Begumpet Airport (old)", "Secunderabad Railway", "Paradise Restaurant"], description: "Central location with heritage charm" },
  { name: "Secunderabad", ratePerSqft: 7000, lat: 17.4399, lng: 78.4983, nearbyFacilities: ["Secunderabad Station", "Parade Ground", "Hussain Sagar", "Rashtrapati Nilayam"], description: "Historic twin city area" },
  { name: "Ameerpet", ratePerSqft: 7200, lat: 17.4375, lng: 78.4482, nearbyFacilities: ["Ameerpet Metro", "SR Nagar", "ESI Hospital", "Coaching Centers Hub"], description: "Central hub with excellent connectivity" },
  { name: "Uppal", ratePerSqft: 4800, lat: 17.4010, lng: 78.5594, nearbyFacilities: ["Uppal Metro", "ECIL", "Ramoji Film City (nearby)", "Nagole"], description: "Affordable east Hyderabad locality" },
  { name: "LB Nagar", ratePerSqft: 5200, lat: 17.3488, lng: 78.5455, nearbyFacilities: ["LB Nagar Metro", "Kothapet", "Saroornagar", "NTR Stadium"], description: "Well-developed south-east hub" },
];

export interface PredictionInput {
  area: string;
  bhk: number;
  sqft: number;
  bathrooms: number;
  parking: number;
}

export interface PredictionResult {
  estimatedPrice: number;
  pricePerSqft: number;
  area: AreaData;
  breakdown: {
    basePrice: number;
    bhkPremium: number;
    bathroomPremium: number;
    parkingPremium: number;
  };
}

export function predictPrice(input: PredictionInput): PredictionResult | null {
  const area = hyderabadAreas.find((a) => a.name === input.area);
  if (!area) return null;

  const basePrice = area.ratePerSqft * input.sqft;
  const bhkPremium = input.bhk > 2 ? basePrice * 0.05 * (input.bhk - 2) : 0;
  const bathroomPremium = input.bathrooms > input.bhk ? basePrice * 0.02 * (input.bathrooms - input.bhk) : 0;
  const parkingPremium = input.parking * 300000;

  const estimatedPrice = basePrice + bhkPremium + bathroomPremium + parkingPremium;

  return {
    estimatedPrice,
    pricePerSqft: area.ratePerSqft,
    area,
    breakdown: { basePrice, bhkPremium, bathroomPremium, parkingPremium },
  };
}
