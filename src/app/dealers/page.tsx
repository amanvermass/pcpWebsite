import React from "react";
import { Metadata } from "next";
import WhereToBuyClient from "../where-to-buy/where-to-buy-client";

export const metadata: Metadata = {
  title: "Authorized Dealers & Distribution Network | PCP India",
  description: "Browse the official list of authorized PCP distributors and showrooms across India's metropolitan hubs to inspect fired clay product samples and request physical delivery quotes.",
  keywords: [
    "where to buy pcp bricks",
    "prayag clay products dealers",
    "clay hollow blocks distributors"
  ],
};

export default function DealersPage() {
  return <WhereToBuyClient />;
}
