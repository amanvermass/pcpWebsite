"use client";

import React, { useState } from "react";
import { Search, MapPin, Phone, Mail, Compass, Globe, Navigation, ArrowLeft, Building2 } from "lucide-react";
import { useToast } from "../ui/Toast";

interface Dealer {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  web?: string;
  mapUrl?: string;
  mapIframe?: string;
  coordinates: { x: number; y: number }; // relative %
}

export const DealerLocator: React.FC = () => {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredDealerId, setHoveredDealerId] = useState<string | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const states = [
    "All",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Delhi NCR",
    "West Bengal",
    "Telangana",
    "Madhya Pradesh",
    "Kerala",
    "Chhattisgarh",
    "Jharkhand"
  ];

  const dealers: Dealer[] = [
    {
      id: "pune-stone-studio",
      name: "The Stone Studio",
      state: "Maharashtra",
      city: "Pune",
      address: "28, Shanker Sheth Road, Between Vega Centre and Railway, Pune - 411037, Maharashtra, India",
      phone: "+91 90110 77205 / 020 2447 6646",
      email: "sales@thestonestudio.co.in",
      mapUrl: "https://goo.gl/maps/mjh68HW3zo2NFcU77",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6467067005715!2d73.85893288094967!3d18.49965542494244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea9c15fcb509%3A0xf455ae6db628810f!2sThe%20Stone%20Studio!5e0!3m2!1sen!2sin!4v1681540321282!5m2!1sen!2sin",
      coordinates: { x: 28, y: 64 },
    },
    {
      id: "pune-kalyan-assoc",
      name: "Kalyan Associates",
      state: "Maharashtra",
      city: "Pune",
      address: "47, New Timber Market Rd, New Timber Market, Ganj Peth, Pune, Maharashtra 411002",
      phone: "+91 93719 19248 / 080 4870 4500",
      mapUrl: "https://www.google.com/maps/place/The+Stone+Studio/@18.4996555,73.8616151,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc2ea9c15fcb509:0xf455ae6db628810f!8m2!3d18.4996504!4d73.8638038",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4502492728925!2d73.8632186234372!3d18.508544747165892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0406567f12f%3A0xbb84c7283dd471a2!2sKalyan%20Associates!5e0!3m2!1sen!2sin!4v1669806600572!5m2!1sen!2sin",
      coordinates: { x: 29, y: 65 },
    },
    {
      id: "pune-tisya",
      name: "Tisya Building Products",
      state: "Maharashtra",
      city: "Pune",
      address: "S no 28, Kanade Nagar, Katraj Handewadi Bypass road, Undri, Pune 411060, Maharashtra",
      phone: "+91 93719 19248",
      email: "sales@tisyaimpex.com",
      coordinates: { x: 30, y: 64 },
    },
    {
      id: "coimbatore-clay-world",
      name: "Clay World",
      state: "Tamil Nadu",
      city: "Coimbatore",
      address: "SF No 85/1 Part, Door No 12/944, Premise No 3, Trichy Road, Chintamanipudur, Coimbatore - 641103, Tamil Nadu, India",
      phone: "+91 90030 22023",
      email: "clayworldtraders@gmail.com",
      mapUrl: "https://www.google.com/maps?ll=11.002857,77.072847&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Chinthamanipudur+Coimbatore,+Tamil+Nadu",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.9520373233!2d77.06846987645031!3d11.002867200307367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba856ee63f67705%3A0x25d3a161f0181e94!2sChinthamanipudur%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1648272345105!5m2!1sen!2sin",
      coordinates: { x: 41, y: 85 },
    },
    {
      id: "coimbatore-greenz",
      name: "GreenZ Teck",
      state: "Tamil Nadu",
      city: "Coimbatore",
      address: "SF No 85/1 Part, Door No 12/94, Premise No 3, Trichy Road, Chintamanipudur, Coimbatore - 641103, Tamil Nadu, India",
      phone: "+91 86107 77950",
      email: "info@greenzteck.com",
      mapUrl: "https://www.google.com/maps?ll=11.002857,77.072847&z=15&t=m&hl=en&gl=IN&mapclient=embed&q=Chinthamanipudur+Coimbatore,+Tamil+Nadu",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7832.9520373233!2d77.06846987645031!3d11.002867200307367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba856ee63f67705%3A0x25d3a161f0181e94!2sChinthamanipudur%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1648272345105!5m2!1sen!2sin",
      coordinates: { x: 42, y: 86 },
    },
    {
      id: "bangalore-terazzo",
      name: "Terazzo",
      state: "Karnataka",
      city: "Bangalore",
      address: "No 70/9, Next to Sulikunte Bus Stop, Dommasandra Post, Varthur Hobli, Sulikunte, Sarjapur Main Road, Bangalore - 562125, Karnataka, India",
      phone: "+91 91086 07797",
      email: "sales@terazzo.co.in",
      mapUrl: "https://www.google.com/maps/place/Terazzo+Banglore/@12.8922537,77.7108275,15z/data=!4m10!1m2!2m1!1sNo+70%2F9,+next+to+sulikunte++Bus+stop,++Dommasandra+Post,+Varthur+Hobli,+Sulikunte,Sarjapur+Main+Road,++Banglore-562125!3m6!1s0x3bae1348b5572141:0x1874ec216009d204!8m2!3d12.8922537!4d77.728337!15sCnZObyA3MC85LCBuZXh0IHRvIHN1bGlrdW50ZSAgQnVzIHN0b3AsICBEb21tYXNhbmRyYSBQb3N0LCBWYXJ0aHVyIEhvYmxpLCBTdWxpa3VudGUsU2FyamFwdXIgTWFpbiBSb2FkLCAgQmFuZ2xvcmUtNTYyMTI1WnAibm5vIDcwIDkgbmV4dCB0byBzdWxpa3VudGUgYnVzIHN0b3AgZG9tbWFzYW5kcmEgcG9zdCB2YXJ0aHVyIGhvYmxpIHN1bGlrdW50ZSBzYXJqYXB1ciBtYWluIHJvYWQgYmFuZ2xvcmUgNTYyMTI1kgERdGlsZV9tYW51ZmFjdHVyZXLgAQA!16s%2Fg%2F11pdxvhy1h",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15556.961839818656!2d77.7108275!3d12.8922537!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1348b5572141%3A0x1874ec216009d204!2sTerazzo%20Banglore!5e0!3m2!1sen!2sin!4v1663833129550!5m2!1sen!2sin",
      coordinates: { x: 40, y: 79 },
    },
    {
      id: "bangalore-sabsun",
      name: "Sabsun Clay Stores - Mangalore Tiles, Jalis & More",
      state: "Karnataka",
      city: "Bangalore",
      address: "323, 3rd A Cross Rd, Sector A, Yelahanka Satellite Town, Yelahanka New Town, Bengaluru, Karnataka 560064",
      phone: "+91 98801 59919",
      email: "hello@sabsunclaystores.co",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.005856655287!2d77.5856569!3d13.0988152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23a3cda96cf7%3A0x72b52e1f8382989a!2sSabsun%20Clay%20Stores%20-%20Mangalore%20Tiles%2C%20Jalis%20%26%20More!5e0!3m2!1sen!2sin!4v1687942822747!5m2!1sen!2sin",
      coordinates: { x: 39, y: 78 },
    },
    {
      id: "kolkata-casa",
      name: "Casa Di Pietra",
      state: "West Bengal",
      city: "Kolkata",
      address: "77/1C, Christopher road, Opp China Pearl Restaurant, Seal lane, Tangra, Kolkata - 700046, West Bengal, India",
      phone: "+91 98310 09288",
      email: "info.casadipietra@gmail.com",
      mapUrl: "https://www.google.com/maps/place/77,+Christopher+Road,+Seal+Lane,+Tangra,+Kolkata,+West+Bengal+700046/@22.5476876,88.3800962,17z/data=!3m1!4b1!4m5!3m4!1s0x3a0276934a992885:0x4be2027bb369106!8m2!3d22.5476827!4d88.3822849",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.8394116067675!2d88.38009621541808!3d22.547687639565847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276934a992885%3A0x4be2027bb369106!2s77%2C%20Christopher%20Road%2C%20Seal%20Lane%2C%20Tangra%2C%20Kolkata%2C%20West%20Bengal%20700046!5e0!3m2!1sen!2sin!4v1648274532076!5m2!1sen!2sin",
      coordinates: { x: 70, y: 44 },
    },
    {
      id: "hyderabad-bansal",
      name: "Bansal Marbal",
      state: "Telangana",
      city: "Hyderabad",
      address: "7-3-45/A, Gagan Pahad, Opposite Indian petrol pump, Mandal, Rajendra Nagar, Hyderabad - 500052, Telangana, India",
      phone: "+91 90300 92454",
      email: "info@rockraft.in",
      mapUrl: "https://www.google.com/maps/place/Bansal+Marble+and+Granite/@17.4519992,78.3495672,12z/data=!4m9!1m2!2m1!1sBansal+Marbal+rajendra+nagar+telanganga!3m5!1s0x3bcb912a65555555:0x3023b8c85538419c!8m2!3d17.4303075!4d78.4348869!15sCidCYW5zYWwgTWFyYmFsIHJhamVuZHJhIG5hZ2FyIHRlbGFuZ2FuZ2GSARBncmFuaXRlX3N1cHBsaWVy",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d121797.15691693865!2d78.3495672!3d17.4519992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb912a65555555%3A0x3023b8c85538419c!2sBansal%20Marble%20and%20Granite!5e0!3m2!1sen!2sin!4v1649143510281!5m2!1sen!2sin",
      coordinates: { x: 42, y: 63 },
    },
    {
      id: "indore-stone-world",
      name: "Stone World",
      state: "Madhya Pradesh",
      city: "Indore",
      address: "Plot No 108, Sector - FB Scheme no 94, Near Arpit Hospital, Indore - 452016, Madhya Pradesh, India",
      phone: "+91 77728 77718",
      email: "lahotishubham@gmail.com",
      mapUrl: "https://www.google.com/maps/place/Arpit+hospital/@22.712229,75.9066417,18.75z/data=!4m5!3m4!1s0x3962e3452b59b68d:0x38e0fd5eac094455!8m2!3d22.7120911!4d75.9061641",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1094.1985819567456!2d75.90664165618318!3d22.712228973702953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3452b59b68d%3A0x38e0fd5eac094455!2sArpit%20hospital!5e0!3m2!1sen!2sin!4v1648277083040!5m2!1sen!2sin",
      coordinates: { x: 38, y: 47 },
    },
    {
      id: "mumbai-urban-clay",
      name: "Urban Clay",
      state: "Maharashtra",
      city: "Mumbai",
      address: "203 Anurag Business Center, Chembur, Mumbai, Maharashtra 400071, India",
      phone: "+91 80800 81951",
      mapUrl: "https://www.google.com/maps/place/Kailash+Esplanade/@19.0938551,72.9131927,21z/data=!4m5!3m4!1s0x3be7c7f389afaf2b:0xabbb2c8a30522660!8m2!3d19.0938747!4d72.913264?hl=en",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3771.2646800691987!2d72.9048898348877!3d19.052097000000007!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c799872a86cd%3A0xc94da1a331dcebff!2sUrbanClay!5e0!3m2!1sen!2sin!4v1669805085538!5m2!1sen!2sin",
      coordinates: { x: 24, y: 62 },
    },
    {
      id: "kozhikode-terazzo",
      name: "Terazzo",
      state: "Kerala",
      city: "Kozhikode",
      address: "37/743 , Mini Bypass Road , Thiruvannur Nada ( P.O) , Manari , Kozhikode - 673029, Kerala, India",
      phone: "+91 91086 07797",
      email: "sales@terazzo.co.in",
      mapUrl: "https://www.google.com/maps/place/Terazzo+Calicut/@11.229243,75.801434,16z/data=!4m6!3m5!1s0x3ba659c461710af7:0x5731451c690fe200!8m2!3d11.2292428!4d75.8014342!16s%2Fg%2F11fqq9l_r8?hl=en",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7826.873622778215!2d75.801434!3d11.229243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659c461710af7%3A0x5731451c690fe200!2sTerazzo%20Calicut!5e0!3m2!1sen!2sin!4v1663834267910!5m2!1sen!2sin",
      coordinates: { x: 36, y: 84 },
    },
    {
      id: "chennai-terazzo",
      name: "Terazzo",
      state: "Tamil Nadu",
      city: "Chennai",
      address: "DOOR NO.70/1, Nageshwaramman Nagar, 200 Feet Thuraipakkam - Pallavaram Radal Road, Pallikaranai, Chennai - 600100, India",
      phone: "+91 91086 07797",
      email: "sales@terazzo.co.in",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31107.827498018924!2d80.17708118298717!3d12.941208174801163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c4cfd14ffd9%3A0x3b4d050728e8600b!2sPallikaranai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1663838739293!5m2!1sen!2sin",
      coordinates: { x: 47, y: 79 },
    },
    {
      id: "raichur-shiv-sahay",
      name: "Shiv Sahay Granites",
      state: "Karnataka",
      city: "Raichur",
      address: "SHIV SAHAY GRANITES #1-11-37/12, Opp, Pragati Krishna Gramin Bank, Lingasugur Road, RAICHUR - 584102, Karnataka, India",
      phone: "+91 98869 36919",
      mapUrl: "https://www.google.com/maps/place/Shiv+Sahay+Granites/@16.207509,77.3201485,15z/data=!4m9!1m2!2m1!1sSHIV+SAHAY+GRANITES+RAICHUR!3m5!1s0x3bc9d7038d2385bb:0x638fbeaa977c3fa4!8m2!3d16.2075857!4d77.33763!15sChtTSElWIFNBSEFZIEdSQU5JVEVTIFJBSUNIVVKSAQVzdG9yZeABAA",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15325.00569881254!2d77.32014853955077!3d16.20750900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc9d7038d2385bb%3A0x638fbeaa977c3fa4!2sShiv%20Sahay%20Granites!5e0!3m2!1sen!2sin!4v1665657147432!5m2!1sen!2sin",
      coordinates: { x: 38, y: 72 },
    },
    {
      id: "mysuru-hinkal-tiles",
      name: "Hinkal Tiles",
      state: "Karnataka",
      city: "Mysuru",
      address: "Hunsur Main road, Opp Infant Jesus Church, Hinkal, Mysuru, Karnataka 570017, India",
      phone: "+91 87623 11974",
      email: "info@hinkaltiles.com",
      mapUrl: "https://www.google.com/maps/place/HINKAL+TILES/@12.326317,76.6079095,17z/data=!3m1!4b1!4m5!3m4!1s0x3baf7bbb655875bd:0x5ce081fd24f952ac!8m2!3d12.3263118!4d76.6100982",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.843522263547!2d76.60790951484522!3d12.326317032043187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7bbb655875bd%3A0x5ce081fd24f952ac!2sHINKAL%20TILES!5e0!3m2!1sen!2sin!4v1665656888126!5m2!1sen!2sin",
      coordinates: { x: 38, y: 82 },
    },
    {
      id: "ballari-shiv-sahay",
      name: "Shiv Sahay Granites",
      state: "Karnataka",
      city: "Ballari",
      address: "Showroom, Infantry Road, Sanjaygandhi Nagar, Ballari - 583104, Karnataka, India",
      phone: "+91 98440 99389",
      mapUrl: "https://www.google.com/maps/place/Shiv+Sahay+Granites/@15.1543238,76.9042874,17z/data=!3m1!4b1!4m5!3m4!1s0x3bb713d100ce9267:0xe200a3fe00cb2193!8m2!3d15.1543526!4d76.9087732",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.073205701114!2d76.90428742470276!3d15.154323833609673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb713d100ce9267%3A0xe200a3fe00cb2193!2sShiv%20Sahay%20Granites!5e0!3m2!1sen!2sin!4v1665656129548!5m2!1sen!2sin",
      coordinates: { x: 38, y: 75 },
    },
    {
      id: "raipur-bani-decore",
      name: "Bani Decore",
      state: "Chhattisgarh",
      city: "Raipur",
      address: "C/19 Shailendra Nagar, Near Rajput Gym, Raipur - 492001, Chhattisgarh, India",
      phone: "+91 98271 68548",
      email: "niks1982@gmail.com",
      coordinates: { x: 54, y: 50 },
    },
    {
      id: "aurangabad-aj-multitech",
      name: "A J Multi-Tech",
      state: "Maharashtra",
      city: "Aurangabad",
      address: "Shop no. B-18, Impact Trade Centre, Beside Woodlot Hotel, Padegaon, Aurangabad, Maharashtra - 431001, India",
      phone: "+91 97673 88873",
      email: "info.ajmultitech@gmail.com",
      mapUrl: "https://goo.gl/maps/QBWaDRZbTxgzL8NK8",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.9027023011577!2d75.28309488116868!3d19.886329978333897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb996295ce21c7%3A0x90d781b686078a75!2sA%20J%20MULTI-TECH!5e0!3m2!1sen!2sin!4v1681540024156!5m2!1sen!2sin",
      coordinates: { x: 32, y: 58 },
    },
    {
      id: "nashik-trirashmi",
      name: "Trirashmi International India",
      state: "Maharashtra",
      city: "Nashik",
      address: "W-91/A, MIDC, AMBAD, Nashik - 422010, Maharashtra, India",
      phone: "+91 92251 38545",
      email: "nikhil@trirashmiholdings.com",
      coordinates: { x: 26, y: 59 },
    },
    {
      id: "lucknow-krishna-ply",
      name: "Krishna Ply & Hardwares",
      state: "Uttar Pradesh",
      city: "Lucknow",
      address: "TC-14, Vibhuti Khand, Gomti Nagar, Lucknow - 226010, Uttar Pradesh, India",
      phone: "0522-4242495 / 0522-4309450",
      email: "krishnaply@yahoo.com",
      mapUrl: "https://goo.gl/maps/AiNKK1NtBLv6SXj79",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2768905425164!2d81.00299897538702!3d26.862942562227808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c09c60f6b3%3A0xb59bb20be582a998!2sKrishna%20Ply%20%26%20Hardwares%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1687246694279!5m2!1sen!2sin",
      coordinates: { x: 50, y: 30 },
    },
    {
      id: "lucknow-greenply",
      name: "Greenply - Krishna Ply & Hardwares",
      state: "Uttar Pradesh",
      city: "Lucknow",
      address: "102/25, Shivaji Marg, Hewett Road, Lucknow - 226001, Uttar Pradesh, India",
      phone: "0522-2626529 / 0522-4068540",
      email: "krishnaply@yahoo.com",
      mapUrl: "https://goo.gl/maps/bNrwdSCjjiKKuVm66",
      mapIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9303047402454!2d80.92683497538633!3d26.842168963118834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdb1f25fdceb%3A0x98451acfd10bb0d5!2sGreenply%20-%20Krishna%20Ply%20%26%20Hardwares%20Pvt.Ltd.!5e0!3m2!1sen!2sin!4v1687247193655!5m2!1sen!2sin",
      coordinates: { x: 49, y: 30 },
    },
    {
      id: "bhopal-gupta-sales",
      name: "Gupta Sales Corporation",
      state: "Madhya Pradesh",
      city: "Bhopal",
      address: "Plot No. 104, Zone 2, M.P. Nagar, Bhopal - 462011, Madhya Pradesh, India",
      phone: "+91 99261 55526 / +91 97524 57777 / 0755-4270442",
      email: "gsc_bhopal@yahoo.com",
      coordinates: { x: 43, y: 45 },
    },
    {
      id: "ranchi-gaia-home",
      name: "Gaia Home Solution",
      state: "Jharkhand",
      city: "Ranchi",
      address: "Mezzanine Floor, M2, SPG Mart, Ranchi - 834001, Jharkhand, India",
      phone: "+91 92043 31014",
      email: "amit.gaiahomes@gmail.com",
      coordinates: { x: 63, y: 44 },
    },
    {
      id: "noida-hq",
      name: "PCP Corporate Headquarters & Specifications Hub",
      state: "Delhi NCR",
      city: "Noida",
      address: "Sector 62, Noida, Uttar Pradesh 201301",
      phone: "+91 120 555 0180",
      email: "up.hub@prayagclay.com",
      web: "www.pcpindia.com",
      coordinates: { x: 44, y: 29 },
    },
    {
      id: "delhi-corporate-hub",
      name: "New Delhi Corporate Hub & Sales Desk",
      state: "Delhi NCR",
      city: "New Delhi",
      address: "Okhla Phase III, New Delhi, Delhi 110020, India",
      phone: "+91 11 4050 9900",
      email: "delhi@prayagclay.com",
      web: "www.pcpindia.com",
      coordinates: { x: 42, y: 29 },
    },
    {
      id: "prayagraj-plant",
      name: "Prayagraj Production Plant & Kilns",
      state: "Uttar Pradesh",
      city: "Prayagraj",
      address: "Naini Industrial Area, Prayagraj, Uttar Pradesh, India",
      phone: "+91 532 242 1200",
      email: "factory@prayagclay.com",
      web: "www.pcpindia.com",
      coordinates: { x: 52, y: 34 },
    }
  ];

  // Derive unique cities
  const uniqueCities = ["All Cities", ...Array.from(new Set(dealers.map((d) => d.city))).sort()];
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const filteredDealers = dealers.filter((d) => {
    const matchesState = selectedState === "All" || d.state === selectedState;
    const matchesCity = selectedCity === "All Cities" || d.city === selectedCity;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesCity && matchesQuery;
  });



  return (
    <section id="dealers" className="py-16 md:py-20 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-poppins">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
            PARTNERS & NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Where to Buy
          </h2>
          <p className="text-brand-slate-300 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Find certified PCP distributors and architectural hubs across India's metropolitan nodes to inspect physical clay products and secure specs consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Filters & Dealers list column */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Search & dropdown filter panels */}
            <div className="bg-brand-charcoal border border-brand-gold/10 rounded-none p-5 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-brand-slate-400" />
                <input
                  type="text"
                  placeholder="Search by city, state, or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-black border border-brand-gold/10 rounded-none pl-11 pr-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold placeholder:text-brand-slate-500 animate-fade-in"
                />
              </div>

              {/* City Selector Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-brand-slate-400 font-bold">Filter by City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedDealer(null); // Clear selected dealer to show main map
                  }}
                  className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3 py-2.5 text-xs font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold uppercase tracking-wider cursor-pointer"
                >
                  {uniqueCities.map((city) => (
                    <option key={city} value={city} className="bg-brand-charcoal text-brand-offwhite uppercase tracking-wider">
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Pills */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-brand-slate-400 font-bold">Filter by State</label>
                <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
                  {states.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedState(st);
                        setSelectedDealer(null); // Clear selected dealer to show main map
                      }}
                      className={`px-2.5 py-1.5 rounded-none text-[8px] uppercase tracking-wider font-poppins font-semibold border cursor-pointer transition-all ${
                        selectedState === st
                          ? "bg-brand-gold border-brand-gold text-brand-black"
                          : "bg-brand-black border-brand-gold/10 text-brand-sand hover:text-brand-offwhite"
                      }`}
                    >
                      {st === "All" ? "All India" : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredDealers.length === 0 ? (
                <div className="bg-brand-charcoal/50 border border-brand-gold/10 rounded-none p-8 text-center text-brand-slate-400 text-xs font-poppins">
                  No registered distributors found matching the criteria.
                </div>
              ) : (
                filteredDealers.map((d) => (
                  <div
                    key={d.id}
                    onMouseEnter={() => setHoveredDealerId(d.id)}
                    onMouseLeave={() => setHoveredDealerId(null)}
                    onClick={() => setSelectedDealer(d)}
                    className={`p-4 rounded-none border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      selectedDealer?.id === d.id
                        ? "bg-brand-charcoal border-brand-gold/60 shadow-lg"
                        : "bg-brand-charcoal/30 border-brand-gold/5 hover:border-brand-gold/20"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-normal font-cormorant text-base transition-colors ${
                          selectedDealer?.id === d.id ? "text-brand-gold" : "text-brand-offwhite"
                        }`}>{d.name}</h3>
                        <span className="text-[8px] bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-2 py-0.5 font-bold uppercase tracking-widest shrink-0">
                          {d.city}
                        </span>
                      </div>
                      <p className="text-[10px] text-brand-slate-300 mt-2 flex items-start gap-1.5 leading-relaxed">
                        <MapPin className="w-3 h-3 text-brand-gold shrink-0 mt-0.5" />
                        {d.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-1 text-[9px] text-brand-slate-400 border-t border-brand-gold/5 pt-2">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-brand-gold/60 shrink-0" /> {d.phone}
                      </span>
                      {d.email && (
                        <span className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-brand-gold/60 shrink-0" /> {d.email}
                        </span>
                      )}
                    </div>
                    {selectedDealer?.id === d.id && (
                      <div className="mt-3 pt-3 border-t border-brand-gold/10 flex flex-col gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent toggling selection
                            if (d.mapUrl) {
                              window.open(d.mapUrl, "_blank", "noopener,noreferrer");
                            } else {
                              const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                d.name + ", " + d.address
                              )}`;
                              window.open(searchUrl, "_blank", "noopener,noreferrer");
                            }
                          }}
                          className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black py-2.5 text-[9px] uppercase font-poppins font-bold tracking-[0.15em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Navigation className="w-3 h-3.5 fill-current" />
                          Locate Us
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

           {/* Map and Details display column */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 rounded-none p-5 flex flex-col justify-between relative overflow-hidden min-h-[480px]">
            <div className="absolute inset-0 bg-brand-slate-900/10 z-0" />

            <div className="relative z-10 w-full flex justify-between items-center pb-3 border-b border-brand-gold/10 shrink-0">
              <span className="text-[10px] font-bold text-brand-slate-300 uppercase tracking-widest flex items-center gap-1.5 font-poppins">
                <Compass className="w-3.5 h-3.5 text-brand-gold shrink-0 animate-spin-slow" />
                Distribution Coverage Map (India)
              </span>
            </div>

            {/* Content Display: Always Static India Map */}
            <div className="relative flex-grow flex items-center justify-center w-full min-h-[360px] z-10 py-6">
              <div className="relative w-full h-full max-w-[550px] aspect-[989/910] flex items-center justify-center overflow-hidden select-none animate-fade-in">
                {/* Visual India Map Image extracted from live site */}
                <img
                  src="/images/map.jpg"
                  className="w-full h-full object-contain opacity-100 transition-opacity duration-300 pointer-events-none border border-brand-gold/20 bg-brand-black/40"
                  alt="India Distribution Map"
                />
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="relative z-10 text-[9px] text-brand-slate-400 font-poppins border-t border-brand-gold/10 pt-3 flex justify-between shrink-0 select-none">
              <span>Interactive dealer map displaying active network nodes.</span>
              <span>Active Coverage Est. 1983</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DealerLocator;
