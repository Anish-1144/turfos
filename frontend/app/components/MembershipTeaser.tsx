"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$499",
    period: "/month",
    desc: "Perfect for casual players looking for flexible access.",
    features: [
      "3 bookings/month",
      "Standard courts",
      "Email support",
      "Basic analytics",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$1,299",
    period: "/month",
    desc: "For the regular athlete who wants the best every week.",
    features: [
      "Unlimited bookings",
      "Priority court access",
      "Dedicated support",
      "Advanced analytics",
      "Guest passes (2/mo)",
    ],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$2,499",
    period: "/month",
    desc: "Everything Pro, plus exclusive perks for serious teams.",
    features: [
      "Unlimited bookings",
      "VIP court reservations",
      "24/7 phone support",
      "Team management",
      "Monthly coaching session",
      "Merch discount 20%",
    ],
    cta: "Go Elite",
    highlight: false,
  },
];

export const MembershipTeaser = () => (
  <section className="py-16 md:py-24 bg-[#1A4526] relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#A8E040]/10 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#A8E040]/5 blur-3xl pointer-events-none" />

    <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="font-dm text-[13px] text-[#A8E040] mb-3 uppercase tracking-widest">
          Membership
        </p>
        <h2 className="font-syne font-bold text-[30px] md:text-[46px] text-white leading-tight tracking-tight mb-4">
          Unlock Your Full
          <br className="hidden md:block" /> Potential
        </h2>
        <p className="font-dm text-[15px] text-white/60 max-w-lg mx-auto leading-relaxed">
          Join TurfOS membership and get priority access to courts, exclusive
          deals, and a supportive community of athletes.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className={`rounded-2xl p-7 flex flex-col relative ${
              plan.highlight
                ? "bg-[#A8E040] text-gray-900 ring-4 ring-[#A8E040]/30"
                : "bg-white/5 border border-white/10 text-white"
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-5 right-5 bg-[#1A4526] text-[#A8E040] text-[10px] font-dm font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            )}

            <div className="mb-6">
              <p
                className={`font-dm text-[13px] font-semibold mb-1 ${plan.highlight ? "text-gray-700" : "text-white/50"}`}
              >
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-syne font-extrabold text-[36px] leading-none">
                  {plan.price}
                </span>
                <span
                  className={`font-dm text-[14px] ${plan.highlight ? "text-gray-600" : "text-white/40"}`}
                >
                  {plan.period}
                </span>
              </div>
              <p
                className={`font-dm text-[13px] mt-2 leading-relaxed ${plan.highlight ? "text-gray-600" : "text-white/50"}`}
              >
                {plan.desc}
              </p>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 font-dm text-[14px]"
                >
                  <Check
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[#1A4526]" : "text-[#A8E040]"}`}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-full py-3 font-dm font-bold text-[14px] inline-flex items-center justify-center gap-2 group transition-colors ${
                plan.highlight
                  ? "bg-[#1A4526] text-white hover:bg-[#0F2916]"
                  : "bg-[#A8E040] text-gray-900 hover:bg-[#96cc38]"
              }`}
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
