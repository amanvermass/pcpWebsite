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
    location: "Portland, Oregon",
    type: "Commercial",
    architect: "Kohn Pedersen Fox (KPF)",
    builder: "Turner Construction",
    year: "2025",
    productsUsed: ["Natural Terracotta Cladding Tile", "Supreme Insulated AAC Block"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "A 14-storey commercial office structure utilizing custom fired terracotta rainscreen panels for energy shielding, supported by high-insulating AAC block interior infill walls.",
  },
  {
    id: "proj2",
    name: "Verdant Clay Eco-Villa",
    location: "Austin, Texas",
    type: "Residential",
    architect: "Studio Rick Joy",
    builder: "Beck Group",
    year: "2024",
    productsUsed: ["Classic Clay Facing Brick", "Thermolite Structural Hollow Block"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "A luxury passive-solar residence incorporating structural clay hollow blocks to create high thermal mass walls, faced with traditional charcoal-toned clay facing bricks.",
  },
  {
    id: "proj3",
    name: "Logistics Center & Factory HQ",
    location: "Chicago, Illinois",
    type: "Industrial",
    architect: "Olson Kundig",
    builder: "Clayco",
    year: "2024",
    productsUsed: ["Heavy-Duty Interlocking Paver", "Thermolite Structural Hollow Block"],
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy-duty manufacturing complex requiring high load-bearing brick masonry for separation walls and acid-resistant chemical processing floors.",
  },
  {
    id: "proj4",
    name: "Metropolitan Plaza Square",
    location: "Denver, Colorado",
    type: "Civic",
    architect: "Snøhetta",
    builder: "Mortenson Construction",
    year: "2025",
    productsUsed: ["Heavy-Duty Interlocking Paver"],
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80",
    desc: "Renovation of the central civic pedestrian plaza utilizing interlocking clay pavers capable of supporting heavy support vehicles and standing up to winter freeze-thaw cycles.",
  },
];
