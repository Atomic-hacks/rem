import React from "react";
import Link from "next/link";

const ReadyToListYourProperty = () => {
  return (
    <section className="w-full py-16 bg-[#F59E0B]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-[#F59E0B] px-8 py-12 md:px-16 md:py-16 shadow-lg flex items-center justify-center">
          {/* Background decorative blur */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to List Your Property?
            </h2>

            <p className="mt-3 text-white/90 text-base md:text-lg">
              Join thousands of property owners and agents successfully buying,
              selling, and renting across Africa with ease.
            </p>

            <Link href="/list-property">
              <button className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-[#F59E0B] shadow-md transition duration-300 hover:bg-white/90 hover:scale-105">
                List Your Property
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToListYourProperty;
