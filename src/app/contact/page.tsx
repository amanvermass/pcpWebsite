import React from "react";
import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Specifications Desk & Dealers | PCP India",
  description: "Connect with Prayag Clay Productions (PCP) for brick quantity calculations, CAD layout advice, and dealer applications.",
  keywords: ["contact prayag clay", "dealer enquiry blocks", "specifications desk bricks", "terracotta panels quote", "factory location prayagraj"],
};

export default function ContactPage() {
  return <ContactClient />;
}
