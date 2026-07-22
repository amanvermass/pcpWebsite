import React from "react";
import { Metadata } from "next";
import WhereToBuyClient from "./where-to-buy-client";

export const metadata: Metadata = {
  title: "Authorized Dealers & Distribution Network | PCP India",
  description: "Browse the official list of authorized PCP distributors and showrooms across India's metropolitan hubs to inspect fired clay product samples and request physical delivery quotes.",
  keywords: [
    "where to buy pcp bricks",
    "prayag clay products dealers",
    "clay hollow blocks distributors",
    "terracotta wall cladding showroom",
    "hollow blocks delhi",
    "clay pavers bangalore",
    "facade bricks pune"
  ],
};

export default function WhereToBuyPage() {
  return <WhereToBuyClient />;
}
