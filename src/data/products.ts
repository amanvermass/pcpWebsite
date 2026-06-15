export interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  specs: {
    length: string;
    width: string;
    height: string;
    weight: string;
    density: string;
    waterAbsorption: string;
    compStrength: string;
    thermalInsulation?: string;
    fireResistance: string;
  };
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Clay Facing Brick",
    category: "Clay Bricks",
    desc: "Traditional extruded clay brick featuring high compressive strength and clean aesthetics for exterior facades.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "230 mm",
      width: "110 mm",
      height: "75 mm",
      weight: "3.2 kg",
      density: "1900 kg/m³",
      waterAbsorption: "7.8%",
      compStrength: "35 N/mm²",
      thermalInsulation: "0.45 W/mK",
      fireResistance: "Class A1 (4 Hours)",
    },
  },
  {
    id: "p2",
    name: "Natural Terracotta Cladding Tile",
    category: "Terracotta",
    desc: "Ventilated facade tiles made from 100% organic clay, offering natural UV stability and building envelope insulation.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "600 mm",
      width: "300 mm",
      height: "20 mm",
      weight: "8.5 kg",
      density: "2100 kg/m³",
      waterAbsorption: "5.5%",
      compStrength: "25 N/mm²",
      thermalInsulation: "0.38 W/mK",
      fireResistance: "Class A1 (2 Hours)",
    },
  },
  {
    id: "p3",
    name: "Tuscan Roman Roofing Tile",
    category: "Roofing Tiles",
    desc: "Interlocking clay roofing tiles designed to withstand severe weather, offering classic Mediterranean architectural style.",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "420 mm",
      width: "270 mm",
      height: "30 mm",
      weight: "3.4 kg",
      density: "1850 kg/m³",
      waterAbsorption: "9.2%",
      compStrength: "1.8 kN (Bending)",
      fireResistance: "Class A1 (Non-combustible)",
    },
  },
  {
    id: "p4",
    name: "Heavy-Duty Interlocking Paver",
    category: "Pavers",
    desc: "High-density clay pavers engineered for civic squares, driveways, and heavy vehicular traffic applications.",
    image: "https://images.unsplash.com/photo-1599809275671-b5941cabc7a5?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "200 mm",
      width: "100 mm",
      height: "80 mm",
      weight: "3.6 kg",
      density: "2350 kg/m³",
      waterAbsorption: "4.8%",
      compStrength: "55 N/mm²",
      thermalInsulation: "N/A",
      fireResistance: "Class A1 (4 Hours)",
    },
  },
  {
    id: "p5",
    name: "Thermolite Structural Hollow Block",
    category: "Hollow Blocks",
    desc: "Multicellular clay blocks designed for thermal-insulating loadbearing and non-loadbearing wall masonry.",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "400 mm",
      width: "200 mm",
      height: "200 mm",
      weight: "11.5 kg",
      density: "850 kg/m³",
      waterAbsorption: "11.5%",
      compStrength: "8.5 N/mm²",
      thermalInsulation: "0.22 W/mK",
      fireResistance: "Class A1 (4 Hours)",
    },
  },
  {
    id: "p6",
    name: "Supreme Insulated AAC Block",
    category: "AAC Blocks",
    desc: "Autoclaved Aerated Concrete blocks providing ultimate lightweight efficiency, speed of work, and acoustic control.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80",
    specs: {
      length: "600 mm",
      width: "200 mm",
      height: "150 mm",
      weight: "7.8 kg",
      density: "600 kg/m³",
      waterAbsorption: "15.0%",
      compStrength: "4.5 N/mm²",
      thermalInsulation: "0.15 W/mK",
      fireResistance: "Class A1 (4 Hours)",
    },
  },
];
