export interface Resource {
  id: string;
  name: string;
  format: "PDF" | "RVT" | "DWG";
  size: string;
  type: "CAD Detail" | "BIM Revit Object" | "Technical Datasheet" | "Installation Guide";
  productId: string;
  productName: string;
  author: string;
  updatedAt: string;
  desc: string;
  compatibility?: string;
  downloadsCount: number;
}

export const resources: Resource[] = [
  {
    id: "r1",
    name: "Classic Clay Brick Details",
    format: "DWG",
    size: "2.3 MB",
    type: "CAD Detail",
    productId: "facing-bricks",
    productName: "Facing Bricks (Extruded)",
    author: "PCP CAD Department",
    updatedAt: "2026-04-12",
    desc: "Standard elevation, section view, and corner joint layout details for single-skin and cavity brick masonry work in AutoCAD formats.",
    compatibility: "AutoCAD 2018 or newer, DXF compatible",
    downloadsCount: 342
  },
  {
    id: "r2",
    name: "Classic Clay Facing Brick - Revit Object",
    format: "RVT",
    size: "8.4 MB",
    type: "BIM Revit Object",
    productId: "facing-bricks",
    productName: "Facing Bricks (Extruded)",
    author: "PCP BIM Department",
    updatedAt: "2026-05-18",
    desc: "Fully parametrized Revit building material families with physical and structural thermal properties mapped according to standard U-values.",
    compatibility: "Autodesk Revit 2021+, IFC standard exportable",
    downloadsCount: 521
  },
  {
    id: "r3",
    name: "Natural Terracotta Cladding Rainscreen Details",
    format: "DWG",
    size: "4.1 MB",
    type: "CAD Detail",
    productId: "cladding-bricks-tiles",
    productName: "Cladding Bricks & Tiles",
    author: "PCP CAD Department",
    updatedAt: "2026-03-29",
    desc: "Structural wall bracket assemblies, vertical channel framing details, and joint gaskets for ventilated facades.",
    compatibility: "AutoCAD 2018 or newer",
    downloadsCount: 189
  },
  {
    id: "r4",
    name: "Natural Terracotta Wall Panel - Revit Object",
    format: "RVT",
    size: "12.8 MB",
    type: "BIM Revit Object",
    productId: "cladding-bricks-tiles",
    productName: "Cladding Bricks & Tiles",
    author: "PCP BIM Department",
    updatedAt: "2026-05-20",
    desc: "Parametric terracotta facade wall profiles with adjustable thickness, vertical rails, grid layouts, and color mapping properties.",
    compatibility: "Autodesk Revit 2022+",
    downloadsCount: 298
  },
  {
    id: "r5",
    name: "PCP Clay Roofing Tiles - Roman Interlocking Specs",
    format: "PDF",
    size: "1.8 MB",
    type: "Technical Datasheet",
    productId: "roofing-tiles",
    productName: "Roofing Tiles",
    author: "PCP Technical Sales Group",
    updatedAt: "2026-01-15",
    desc: "Full structural technical datasheet including compressive bending thresholds, water absorption rates, chemical resilience, and sizing tolerances.",
    compatibility: "Adobe Acrobat Reader, PDF standard viewers",
    downloadsCount: 812
  },
  {
    id: "r6",
    name: "Supreme Insulated Terraplast Installation Guide",
    format: "PDF",
    size: "3.2 MB",
    type: "Installation Guide",
    productId: "terraplast",
    productName: "Terraplast",
    author: "PCP Construction Advisory Group",
    updatedAt: "2026-02-10",
    desc: "Step-by-step handling, mortar application, thin-bed jointing techniques, and thermal bridge reduction guidelines for Terraplastwork.",
    compatibility: "PDF reader",
    downloadsCount: 943
  }
];
