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
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  overview: {
    definitionQuestion: string;
    definitionText: string;
    positioningText: string;
  };
  variants: {
    name: string;
    image: string;
  }[];
  applications: {
    anchorText: string;
    link: string;
    desc: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  variationType?: string;
}

export const products: Product[] = [
  {
    id: "ecotherm-clay-hollow-blocks",
    name: "Ecotherm Clay Hollow Blocks",
    category: "Hollow Blocks",
    desc: "Flagship multi-chambered thermal hollow blocks engineered to provide certified natural insulation, thermal comfort, and high compressive strength for loadbearing and partition walls.",
    image: "/images/products/clay-hollow-bricks.jpg",
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
    seo: {
      title: "Ecotherm Clay Hollow Blocks | High-Insulating Walling Blocks | PCP India",
      description: "Explore specifications, thermal conductivity, and compressive strength values for Ecotherm clay hollow blocks. Certified by GRIHA. Request a technical quote today.",
      keywords: ["clay hollow blocks", "ecotherm blocks", "pcp hollow bricks", "thermal insulation wall blocks"]
    },
    h1: "Ecotherm Clay Hollow Blocks",
    overview: {
      definitionQuestion: "What Are Ecotherm Clay Hollow Blocks?",
      definitionText: "Ecotherm clay hollow blocks are advanced, multicellular structural building blocks made of fired clay, engineered to provide thermal insulation and high load-bearing strength.",
      positioningText: "Prayag Clay Products' flagship hollow block line integrates proprietary internal cell geometry to reduce dead weight by up to 45% while achieving certified high thermal resistance."
    },
    variants: [
      { name: "Tettenhal Red Clay Hollow Block - PCP India", image: "/images/products/clay-hollow-bricks.jpg" },
      { name: "Standard Classic Clay Hollow Block - PCP India", image: "/images/ecotherm-hollow.jpg" }
    ],
    applications: [
      {
        anchorText: "structural clay blocks for load-bearing walls",
        link: "/products/applications/structural-walling",
        desc: "High load-bearing partition and exterior envelope structures."
      }
    ],
    faqs: [
      {
        question: "How do Ecotherm blocks compare to conventional concrete blocks?",
        answer: "Ecotherm clay hollow blocks offer significantly better thermal performance with a thermal conductivity (λ) value of 0.22 W/mK compared to concrete blocks. Fired clay naturally regulates temperature, is 45% lighter, and has a certified 4-hour fire rating, making it a superior structural choice."
      },
      {
        question: "Are Ecotherm blocks loadbearing?",
        answer: "Yes, Ecotherm blocks have an audited compressive strength of 8.5 N/mm², which exceeds the requirements for load-bearing masonry walls in multi-story buildings. They can be used for both structural load-bearing and partition wall structures."
      },
      {
        question: "What mortar is recommended for installation?",
        answer: "We recommend using thin-bed jointing mortar or high-performance adhesive paste for laying Ecotherm blocks. Since the blocks have high dimensional precision, thin-bed joints of 2-3 mm reduce thermal bridging and speed up construction."
      },
      {
        question: "Are these blocks GRIHA certified?",
        answer: "Yes, Ecotherm blocks are GRIHA listed. This certification confirms that their low thermal conductivity masonry qualifies green building designs for rating credits by reducing mechanical cooling requirements."
      }
    ],
    variationType: "Ecotherm"
  },
  {
    id: "facing-bricks",
    name: "Facing Bricks (Extruded)",
    category: "Clay Bricks",
    desc: "Premium extruded wirecut facing bricks designed for structural facades. High durability, low water absorption, and clean architectural lines. Includes Domestic Series (Common Bricks Tier) for standard structural projects.",
    image: "/images/products/extruded-wirecut.jpg",
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
    seo: {
      title: "Extruded Facing Bricks | High-Strength Facade Masonry | PCP India",
      description: "Technical specifications for premium extruded wirecut facing bricks. Compressive strength 35+ N/mm2, water absorption <8%. Browse our commercial and domestic pricing tiers.",
      keywords: ["facing bricks", "wirecut facing bricks", "extruded facing bricks", "facade brick masonry"]
    },
    h1: "Extruded Facing Bricks",
    overview: {
      definitionQuestion: "What Are Extruded Facing Bricks?",
      definitionText: "Extruded facing bricks are precision-engineered clay units extruded through dies and wirecut to exact dimensions, providing uniform aesthetics, high density, and weather protection.",
      positioningText: "Prayag Clay Products merges organic clay refinement with automated tunnel-kiln automation to deliver facing bricks with superior mechanical tolerance and structural integrity."
    },
    variants: [
      { name: "Tettenhal Red Extruded Facing Brick - PCP India", image: "/images/products/extruded-wirecut.jpg" },
      { name: "Crimson Blend Extruded Facing Brick - PCP India", image: "/images/hero-1.jpg" },
      { name: "Charcoal Rust Extruded Facing Brick - PCP India", image: "/images/hero-4.jpg" },
      { name: "Autumn Amber Extruded Facing Brick - PCP India", image: "/images/hero-3.jpg" }
    ],
    applications: [
      {
        anchorText: "brick cladding solutions",
        link: "/products/applications/facades-cladding",
        desc: "Exposed architectural brick facades and weather screens."
      }
    ],
    faqs: [
      {
        question: "What makes extruded bricks different from handmade bricks?",
        answer: "Extruded facing bricks are machine-pressed through dies and wirecut, resulting in sharp, clean edges and uniform sizing. Handmade bricks are manually molded, which gives them unique, rustic surfaces and organic textures. Extruded bricks typically have higher compressive strength."
      },
      {
        question: "Can facing bricks be used for structural load-bearing walls?",
        answer: "Yes, with an audited compressive strength of 35 N/mm², our extruded facing bricks are fully certified for load-bearing structural masonry. They resist high vertical loads while serving as the decorative face."
      },
      {
        question: "What is the water absorption rate of these facing bricks?",
        answer: "PCP extruded facing bricks have an average water absorption rate of 7.8%. This low rate prevents moisture ingress, protects the wall cavity from dampness, and resists efflorescence in harsh climates."
      },
      {
        question: "Do you offer a domestic series tier?",
        answer: "Yes, we provide the Domestic Series (Common Bricks Tier) alongside our premium facing bricks. This tier offers a cost-effective alternative for structural walling projects that still require fired clay durability."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "traditional-handmade-bricks",
    name: "Traditional Handmade Bricks",
    category: "Handmade Bricks",
    desc: "Heritage hand-molded facing bricks combining historic rustic textures with structural strength. Certified for exposed masonry and feature walls. Available in commercial and local domestic tiers.",
    image: "/images/products/handmade-bricks.jpg",
    specs: {
      length: "230 mm",
      width: "110 mm",
      height: "70 mm",
      weight: "3.0 kg",
      density: "1800 kg/m³",
      waterAbsorption: "12.5%",
      compStrength: "15 N/mm²",
      thermalInsulation: "0.52 W/mK",
      fireResistance: "Class A1 (4 Hours)",
    },
    seo: {
      title: "Traditional Handmade Bricks India | Heritage Facing Bricks | PCP India",
      description: "Artisanal hand-molded clay bricks combining historic heritage textures with structural durability. Certified specifications for exposed brick walls in India.",
      keywords: ["handmade bricks India", "traditional handmade bricks", "heritage clay bricks", "exposed masonry bricks"]
    },
    h1: "Traditional Handmade Bricks",
    overview: {
      definitionQuestion: "What Are Traditional Handmade Bricks?",
      definitionText: "Traditional handmade bricks are hand-molded clay units fired in traditional kilns, capturing natural rustic variations, organic textures, and historic aesthetics for exposed brickwork.",
      positioningText: "PCP preserves the ancestral craft of handmade brickmaking while testing each batch to ensure modern structural compliance for exposed facades."
    },
    variants: [
      { name: "Vintage Red Traditional Handmade Brick - PCP India", image: "/images/products/handmade-bricks.jpg" },
      { name: "Weathered Tudor Traditional Handmade Brick - PCP India", image: "/images/hero-1.jpg" },
      { name: "Harvest Blend Traditional Handmade Brick - PCP India", image: "/images/hero-5.jpg" }
    ],
    applications: [
      {
        anchorText: "structural clay blocks for load-bearing walls",
        link: "/products/applications/structural-walling",
        desc: "Exposed rustic structural masonry and design-first loadbearing walls."
      }
    ],
    faqs: [
      {
        question: "Are handmade bricks structurally compliant for modern code?",
        answer: "Yes, our handmade bricks are fully tested and certified with a compressive strength of 15 N/mm², satisfying Indian and international code parameters for exposed facing masonry."
      },
      {
        question: "How do you control texture variation?",
        answer: "Texture variation is a natural result of the manual molding process. We control consistency by sourcing native Varanasi clays and firing them in controlled zones, ensuring a balanced heritage blend."
      },
      {
        question: "Can these bricks be used for interior feature walls?",
        answer: "Absolutely, traditional handmade bricks are highly popular for interior exposed brick walls, fireplaces, and accent features, bringing natural warmth and acoustic absorption to spaces."
      },
      {
        question: "What mortar style works best with handmade bricks?",
        answer: "We recommend using a slightly recessed or flush mortar joint with natural lime mortars. This highlights the irregular, handmade contours of the brick edges, enhancing the rustic look."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "linea-series",
    name: "Linea Handmade Series",
    category: "Linea Series",
    desc: "Artisanal elongated linear handmade bricks designed to create dramatic horizontal visual bands on modern architectural facade profiles.",
    image: "/images/hero-5.jpg",
    specs: {
      length: "440 mm",
      width: "100 mm",
      height: "40 mm",
      weight: "2.4 kg",
      density: "1850 kg/m³",
      waterAbsorption: "10.0%",
      compStrength: "20 N/mm²",
      thermalInsulation: "0.48 W/mK",
      fireResistance: "Class A1 (2 Hours)",
    },
    seo: {
      title: "Linea Handmade Series | Elongated Brick Slips & Facades | PCP India",
      description: "Explore the Linea series of elongated brick slips and clay facade formats. Premium organic finishes for modern architectural expressions.",
      keywords: ["brick slips / elongated bricks", "linea bricks", "elongated brick slips", "linear clay facades"]
    },
    h1: "Linea Handmade Series Bricks",
    overview: {
      definitionQuestion: "What Is the Linea Handmade Series?",
      definitionText: "The Linea Handmade Series consists of elongated clay brick slips designed to create dramatic horizontal visual expressions and elegant linear brick patterns.",
      positioningText: "Our Linea series combines the organic touch of handmade clay with a sleek, contemporary elongated profile (440mm length) preferred by modern architects."
    },
    variants: [
      { name: "Charcoal Linear Linea Series Brick - PCP India", image: "/images/hero-5.jpg" },
      { name: "Tuscan Ochre Linea Series Brick - PCP India", image: "/images/hero-1.jpg" }
    ],
    applications: [
      {
        anchorText: "brick cladding solutions",
        link: "/products/applications/facades-cladding",
        desc: "Linea elongated slips for dynamic horizontal structural facade details."
      }
    ],
    faqs: [
      {
        question: "What are the dimensions of the Linea series?",
        answer: "The standard dimensions are 440 mm length, 100 mm width, and 40 mm height. This elongated format accentuates the horizontal lines of facades, creating a unique modern aesthetic."
      },
      {
        question: "How are Linea brick slips anchored to facades?",
        answer: "Linea slips can be installed using structural adhesive backing directly on a solid masonry backing, or secured mechanically on a sub-girt facade anchoring grid for high-rise buildings."
      },
      {
        question: "Can Linea bricks be used for internal design?",
        answer: "Yes, the Linea Series is frequently specified for interior feature columns, lobbies, and visual statement walls to create texturized horizontal layering."
      },
      {
        question: "What is the fire rating of the Linea Series?",
        answer: "The Linea series has a certified Class A1 fire rating (2 Hours non-combustible), complying with international high-rise envelope safety standards."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "cladding-bricks-tiles",
    name: "Cladding Bricks & Tiles",
    category: "Terracotta",
    desc: "Thin terracotta cladding slips and split tiles designed for mechanical facade anchoring or adhesive backing. Creates a solid brick aesthetic with low weight.",
    image: "/images/cladding-showcase.jpg",
    specs: {
      length: "240 mm",
      width: "15 mm",
      height: "60 mm",
      weight: "0.5 kg",
      density: "2100 kg/m³",
      waterAbsorption: "5.5%",
      compStrength: "25 N/mm²",
      thermalInsulation: "0.38 W/mK",
      fireResistance: "Class A1 (2 Hours)",
    },
    seo: {
      title: "Terracotta Cladding Tiles & Brick Slips | Facade Cladding | PCP India",
      description: "Ventilated terracotta cladding tiles and lightweight visual brick slips. Discover structural anchoring details and thermal shield specifications.",
      keywords: ["cladding tiles", "terracotta cladding tiles", "brick slips cladding", "ventilated facade cladding"]
    },
    h1: "Terracotta Cladding Bricks & Tiles",
    overview: {
      definitionQuestion: "What Are Terracotta Cladding Bricks & Tiles?",
      definitionText: "Cladding tiles and bricks are thin, lightweight clay facade slips designed to be anchored mechanically or adhered to structural walls, providing a brick face without full weight.",
      positioningText: "PCP's cladding range offers architects a premium rainscreen shield that insulates the building envelope against solar radiation and water ingress."
    },
    variants: [
      { name: "Natural Terracotta Cladding Tile - PCP India", image: "/images/cladding-showcase.jpg" },
      { name: "Glazed Umber Cladding Tile - PCP India", image: "/images/hero-3.jpg" }
    ],
    applications: [
      {
        anchorText: "brick cladding solutions",
        link: "/products/applications/facades-cladding",
        desc: "Rainscreen panel facade finishes and thermal backing tiles."
      }
    ],
    faqs: [
      {
        question: "How does cladding differ from facing bricks?",
        answer: "Facing bricks are full-size structural blocks that bear loads. Cladding tiles and brick slips are thin (15-20 mm), lightweight elements designed purely for aesthetic facade finish and weatherproofing."
      },
      {
        question: "Are cladding tiles suitable for high-rise ventilated facades?",
        answer: "Yes, our cladding tiles are engineered for mechanical sub-girt track attachment, making them ideal for ventilated facade layouts in multi-story commercial and residential buildings."
      },
      {
        question: "Can these tiles be installed with adhesive?",
        answer: "Yes, for low-rise applications or interior feature walls, they can be directly adhered to concrete block or brick backings using polymer-modified mortar adhesives."
      },
      {
        question: "Do cladding tiles fade under UV exposure?",
        answer: "No, our tiles are fired from 100% natural clay at temperatures exceeding 1000°C. The color is locked in chemically, ensuring complete UV stability and zero fading over decades."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "clay-pavers",
    name: "Clay Pavers",
    category: "Pavers",
    desc: "Heavy-duty vitrified clay pavers engineered for pedestrian malls, public plazas, and residential driveways. High slip resistance and structural durability.",
    image: "/images/products/clay-pavers.jpg",
    specs: {
      length: "200 mm",
      width: "100 mm",
      height: "60 mm",
      weight: "2.8 kg",
      density: "2300 kg/m³",
      waterAbsorption: "4.8%",
      compStrength: "50 N/mm²",
      thermalInsulation: "N/A",
      fireResistance: "Class A1 (4 Hours)",
    },
    seo: {
      title: "Vitrified Clay Pavers | Heavy-Duty Paving & Flooring | PCP India",
      description: "Heavy-load vitrified clay pavers engineered for pedestrian plazas, public square walkways, and high-traffic municipal zones. High compressive strength.",
      keywords: ["clay pavers", "vitrified clay pavers", "heavy duty pavers", "interlocking clay pavers"]
    },
    h1: "Vitrified Clay Pavers",
    overview: {
      definitionQuestion: "What Are Vitrified Clay Pavers?",
      definitionText: "Clay pavers are high-density, vitrified clay blocks fired at high temperatures to withstand heavy vehicular and pedestrian traffic loads in outdoor spaces.",
      positioningText: "PCP vitrified clay pavers offer natural slip resistance, acid resistance, and a lifetime of high-load performance under intensive civic and industrial usage."
    },
    variants: [
      { name: "Brick Red Clay Paver - PCP India", image: "/images/products/clay-pavers.jpg" },
      { name: "Ochre Sand Clay Paver - PCP India", image: "/images/hero-4.jpg" }
    ],
    applications: [
      {
        anchorText: "heavy-duty clay pavers",
        link: "/products/clay-pavers",
        desc: "Civic squares, shopping malls, parking lots, and driveway pavings."
      }
    ],
    faqs: [
      {
        question: "How do clay pavers compare to concrete pavers?",
        answer: "Clay pavers are naturally vitrified, meaning their color is permanent and won't fade like pigment-dyed concrete pavers. They have higher slip resistance, better acid resistance, and are more durable over long lifespans."
      },
      {
        question: "What is the compressive strength of PCP clay pavers?",
        answer: "Our heavy-duty pavers have a certified compressive strength of 50 N/mm² (exceeding 500 kg/cm²), making them fully suitable for driveways, pedestrian plazas, and public roads."
      },
      {
        question: "Are they slip-resistant when wet?",
        answer: "Yes, the natural texture of fired clay provides excellent slip resistance (high skid resistance values), complying with civic walkway safety codes even in rainy conditions."
      },
      {
        question: "What layout patterns are possible?",
        answer: "They can be laid in multiple patterns, including Herringbone (best for heavy vehicular loads), Basket Weave, Running Bond, and Stacked Bond on a sand or mortar bed."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "roofing-tiles",
    name: "Roofing Tiles",
    category: "Roofing Tiles",
    desc: "Weatherproof interlocking clay roofing tiles offering classic Tuscan and Roman Mediterranean styles with modern drainage joints.",
    image: "/images/hero-2.jpg",
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
    seo: {
      title: "Terracotta Roofing Tiles | Tuscan Roman Clay Roof Tiles | PCP India",
      description: "Interlocking clay roofing tiles designed to withstand severe weather, offering classic Mediterranean architectural style.",
      keywords: ["clay roof tiles", "terracotta roofing tiles", "tuscan roofing tiles", "roman roofing tiles"]
    },
    h1: "Terracotta Roofing Tiles",
    overview: {
      definitionQuestion: "What Are Terracotta Roofing Tiles?",
      definitionText: "Terracotta roofing tiles are interlocking clay units fired to be waterproof, designed to cover sloped roofs and protect buildings from rain, wind, and solar heat.",
      positioningText: "PCP interlocking roof tiles combine classic Mediterranean silhouettes with modern precision joints, ensuring absolute wind uplift resistance and thermal shielding."
    },
    variants: [
      { name: "Tuscan Red Terracotta Roofing Tile - PCP India", image: "/images/hero-2.jpg" },
      { name: "Roman Clay Roofing Tile - PCP India", image: "/images/hero-1.jpg" }
    ],
    applications: [
      {
        anchorText: "clay roof tiles",
        link: "/products/roofing-tiles",
        desc: "Interlocking roofing tiles for sloped residential and eco-resort building architectures."
      }
    ],
    faqs: [
      {
        question: "How do interlocking roofing tiles prevent water leaks?",
        answer: "PCP roofing tiles feature double interlocking channels along the edges. When laid, these channels form a labyrinth that prevents wind-driven rain from passing through the joints."
      },
      {
        question: "What is the lifespan of clay roofing tiles?",
        answer: "Interlocking clay roof tiles can easily last 50 to 100 years. Fired clay does not decay, rot, or rust under salt air or monsoon rain, making it a lifetime roofing solution."
      },
      {
        question: "Do they help with indoor temperature control?",
        answer: "Yes, terracotta has natural thermal mass properties. It absorbs solar heat during the day and radiates it slowly, reducing heat transfer into the building and lowering cooling loads."
      },
      {
        question: "How are the tiles secured against wind uplift?",
        answer: "Each tile has a pre-molded nail hole. The tiles are screwed or nailed to batten lines, and their interlocking design helps them act as a single resistant layer against strong wind forces."
      }
    ],
    variationType: "Standard"
  },
  {
    id: "terraplast",
    name: "Terraplast",
    category: "Terraplasts",
    desc: "Eco-friendly natural clay interior wall plaster available in 22+ custom earthy tones. Regulates indoor humidity and prevents mold growth naturally.",
    image: "/images/ecotherm-hollow.jpg",
    specs: {
      length: "N/A (Liquid)",
      width: "N/A",
      height: "10 mm (Dry Layer)",
      weight: "1.2 kg/m²",
      density: "1300 kg/m³",
      waterAbsorption: "N/A",
      compStrength: "2.5 N/mm²",
      thermalInsulation: "0.15 W/mK",
      fireResistance: "Class A1 (Non-combustible)",
    },
    seo: {
      title: "Terraplast Earthy Wall Plasters | Clay Wall Plaster | PCP India",
      description: "Discover Terraplast natural clay wall plasters available in 22+ custom earthy tones. Eco-friendly interior wall finishes with natural humidity regulation.",
      keywords: ["clay wall plaster", "terraplast", "earthy wall plaster", "natural clay plaster India"]
    },
    h1: "Terraplast Clay Wall Plaster",
    overview: {
      definitionQuestion: "What Is Terraplast Clay Wall Plaster?",
      definitionText: "Terraplast clay wall plaster is an eco-friendly interior wall finish made from blended clays and organic aggregates, providing humidity regulation and natural tones.",
      positioningText: "Terraplast provides an education-first sustainable wall coating that acts as a natural humidity sponge, absorbing excess moisture and releasing it to improve indoor air quality."
    },
    variants: [
      { name: "Clay Gold Terraplast Plaster - PCP India", image: "/images/ecotherm-hollow.jpg" },
      { name: "Terracotta Earth Terraplast Plaster - PCP India", image: "/images/hero-1.jpg" }
    ],
    applications: [
      {
        anchorText: "clay wall plaster interior wall finish",
        link: "/products/terraplast",
        desc: "Breathable interior finish coat for feature accents, residential walls, and acoustic-absorbing surfaces."
      }
    ],
    faqs: [
      {
        question: "How does clay plaster compare to cement or gypsum plaster?",
        answer: "Unlike cement or gypsum plasters, clay wall plaster is 100% organic, non-toxic, and free from volatile compounds. It is highly vapor-permeable, allowing walls to breathe, and naturally regulates indoor humidity levels."
      },
      {
        question: "Can Terraplast be used for exterior walls?",
        answer: "No, Terraplast is formulated exclusively for interior walls and ceilings. Since it is water-soluble, direct rain exposure will wash it away, but indoors it is highly durable."
      },
      {
        question: "How many finishes and colors are available?",
        answer: "Terraplast is available in 22+ custom earthy tones, sourced from natural clays without artificial pigments. It can be finished with a smooth trowel, textured finish, or rustic sand look."
      },
      {
        question: "Does clay plaster prevent mold growth?",
        answer: "Yes, by naturally absorbing moisture and regulating local relative humidity, clay plaster keeps walls dry, eliminating the conditions required for mold and mildew growth."
      }
    ],
    variationType: "Terraplast"
  },
];
