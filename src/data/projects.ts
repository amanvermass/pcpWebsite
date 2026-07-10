export interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  architect: string;
  builder: string;
  year: string;
  productsUsed: string[];
  image: string;
  desc: string;
}

export const projects: Project[] = [
  {
    id: "proj1",
    name: "The Slate Facade Atrium",
    location: "Noida, Uttar Pradesh",
    type: "Commercial",
    architect: "Sanjay Puri Architects",
    builder: "L&T Construction",
    year: "2025",
    productsUsed: ["Natural Terracotta Cladding Tile", "Supreme Insulated Terraplast"],
    image: "/images/hero-1.jpg",
    desc: "A 14-storey commercial office structure utilizing custom fired terracotta rainscreen panels for energy shielding, supported by high-insulating Terraplast interior infill walls.",
  },
  {
    id: "proj2",
    name: "Verdant Clay Eco-Villa",
    location: "Alibaug, Maharashtra",
    type: "Residential",
    architect: "Studio Mumbai",
    builder: "Shapoorji Pallonji Group",
    year: "2024",
    productsUsed: ["Classic Clay Facing Brick", "Thermolite Structural Hollow Block"],
    image: "/images/hero-3.jpg",
    desc: "A luxury passive-solar residence incorporating structural clay hollow blocks to create high thermal mass walls, faced with traditional clay facing bricks.",
  },
  {
    id: "proj3",
    name: "Logistics Center & Factory HQ",
    location: "Gurugram, Haryana",
    type: "Industrial",
    architect: "Morphogenesis",
    builder: "Ahluwalia Contracts",
    year: "2024",
    productsUsed: ["Heavy-Duty Interlocking Paver", "Thermolite Structural Hollow Block"],
    image: "/images/hero-4.jpg",
    desc: "Heavy-duty manufacturing complex requiring high load-bearing brick masonry for separation walls and acid-resistant chemical processing floors.",
  },
  {
    id: "proj4",
    name: "Metropolitan Plaza Square",
    location: "Bengaluru, Karnataka",
    type: "Civic",
    architect: "Mathew & Ghosh Architects",
    builder: "Tata Projects",
    year: "2025",
    productsUsed: ["Heavy-Duty Interlocking Paver"],
    image: "/images/hero-2.jpg",
    desc: "Renovation of the central civic pedestrian plaza utilizing interlocking clay pavers capable of supporting heavy support vehicles and standing up to severe weather cycles.",
  },
];
