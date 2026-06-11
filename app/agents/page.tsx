"use client";

import { useEffect, useMemo, useState } from "react";
import { FiMapPin, FiSearch, FiX } from "react-icons/fi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbBuilding } from "react-icons/tb";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getProperties } from "@/services";
import type { ApiProperty } from "@/services";

type AgentType = "AGENT" | "AGENCY";
type ProfileTab = "Overview" | "Ratings" | "Location" | "Contact";

type Agent = {
  id: string;
  initials: string;
  name: string;
  type: AgentType;
  rating: number;
  reviews: number;
  location: string;
  city: string;
  specialty: string;
  listings: number;
  phone: string;
  email: string;
  serviceAreas: string[];
  about: string;
  verified: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function agentsFromProperties(properties: ApiProperty[]) {
  const map = new Map<string, Agent>();

  properties.forEach((property) => {
    if (!property.agent?.id) {
      return;
    }

    const current = map.get(property.agent.id);
    if (current) {
      current.listings += 1;
      return;
    }

    const fullName = property.agent.full_name || "Property Agent";
    const type = property.agent.company_name ? "AGENCY" : "AGENT";
    const location = property.location || "Location unavailable";

    map.set(property.agent.id, {
      id: property.agent.id,
      initials: initials(fullName) || "RA",
      name: fullName,
      type,
      rating: Number(property.agent.rating ?? 0),
      reviews: 0,
      location,
      city: location,
      specialty: property.listing_type_display,
      listings: property.agent.total_listings ?? 1,
      phone: property.agent.phone || "",
      email: property.agent.email || "",
      serviceAreas: location.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 3),
      about: `${fullName} manages real estate listings on REM across sale, rent, and short-let opportunities.`,
      verified: Boolean(property.agent.verified),
    });
  });

  return Array.from(map.values());
}

const ratingRows = [
  { label: "Knowledge", value: 4.6 },
  { label: "Responsive", value: 4.6 },
  { label: "Communication", value: 4.6 },
  { label: "Professionalism", value: 4.6 },
];

const tabs: ProfileTab[] = ["Overview", "Ratings", "Location", "Contact"];

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={i} size={11} className="text-amber-400" />
      ))}
      {half && <FaStarHalfAlt size={11} className="text-amber-400" />}
    </div>
  );
};

const AgentCard = ({
  agent,
  onViewProfile,
  onContact,
}: {
  agent: Agent;
  onViewProfile: () => void;
  onContact: () => void;
}) => (
  <div className="bg-white border border-stone-100 rounded-2xl p-5 flex flex-col items-center shadow-sm">
    <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm mb-2.5">
      {agent.initials}
    </div>
    <p className="text-stone-800 font-semibold text-sm">{agent.name}</p>
    <span
      className={`mt-1.5 mb-2 text-[9px] font-semibold tracking-wider px-3 py-0.5 rounded-full ${
        agent.type === "AGENT"
          ? "bg-amber-50 text-amber-600 border border-amber-200"
          : "bg-stone-100 text-stone-500 border border-stone-200"
      }`}
    >
      {agent.type}
    </span>
    <div className="flex items-center gap-1.5 mb-4">
      <StarRating rating={agent.rating} />
      <span className="text-stone-500 text-[11px]">
        {agent.rating} ({agent.reviews})
      </span>
    </div>

    <div className="w-full h-px bg-stone-100 mb-3" />

    <div className="w-full flex flex-col gap-2 mb-1.5">
      <div className="flex items-center gap-2 text-stone-500 text-[11.5px]">
        <FiMapPin size={12} className="text-amber-400 shrink-0" />
        {agent.location}
      </div>
      <div className="flex items-center gap-2 text-stone-500 text-[11.5px]">
        <MdOutlineBedroomParent size={13} className="text-amber-400 shrink-0" />
        {agent.specialty}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11.5px]">
          <TbBuilding size={13} className="text-amber-400 shrink-0" />
          <span className="text-amber-500 font-medium">
            {agent.listings} Listings
          </span>
        </div>
        {agent.verified && (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            <span className="text-green-500 text-[10px] font-medium">
              Verified
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="w-full flex gap-2 mt-3">
      <button
        type="button"
        onClick={onViewProfile}
        className="flex-1 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-white text-[11.5px] font-semibold transition-colors"
      >
        View Profile
      </button>
      <button
        type="button"
        onClick={onContact}
        className="flex-1 py-2 rounded-lg border border-stone-200 text-stone-600 text-[11.5px] font-medium hover:border-amber-300 hover:text-amber-500 transition-colors"
      >
        Contact
      </button>
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: string }) => (
  <h3 className="inline-block border-b-2 border-yellow-400 pb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-500">
    {children}
  </h3>
);

const ProfileModal = ({
  agent,
  activeTab,
  onTabChange,
  onClose,
}: {
  agent: Agent;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-300/70 px-1 py-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="agent-profile-title"
  >
    <div className="w-full max-w-[374px] overflow-hidden rounded-lg bg-[#fffaf4] shadow-sm">
      <div className="relative flex h-[73px] items-center gap-4 bg-white px-[15px]">
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#ffc20f] text-[16px] font-semibold text-stone-900">
          {agent.initials}
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <h2
            id="agent-profile-title"
            className="truncate text-[15px] font-semibold leading-none text-stone-900"
          >
            {agent.name}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-[8px] leading-none">
            <span className="font-semibold uppercase tracking-[0.22em] text-stone-700">
              {agent.type}
            </span>
            <span className="text-stone-400">{agent.location}</span>
            {agent.verified && (
              <span className="font-medium text-green-500">Verified</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close agent profile"
          className="absolute right-[14px] top-[25px] flex h-[20px] w-[24px] items-center justify-center rounded border border-stone-400 bg-white text-[12px] text-stone-600 transition-colors hover:border-stone-600 hover:text-stone-900"
        >
          <FiX size={12} />
        </button>
      </div>

      <div className="bg-[#fffcf8] px-[15px]">
        <div className="flex h-[37px] items-end border-b border-stone-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`h-[30px] px-[11px] text-[9px] font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-yellow-400 text-stone-900"
                  : "border-b-2 border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[239px] pb-[24px] pt-[17px]">
          {activeTab === "Overview" && <OverviewTab agent={agent} />}
          {activeTab === "Ratings" && <RatingsTab agent={agent} />}
          {activeTab === "Location" && <LocationTab agent={agent} />}
          {activeTab === "Contact" && <ContactTab />}
        </div>
      </div>
    </div>
  </div>
);

const OverviewTab = ({ agent }: { agent: Agent }) => (
  <div>
    <SectionTitle>Profile Details</SectionTitle>
    <div className="mt-[13px] grid grid-cols-2 gap-x-2 gap-y-[6px]">
      {[
        ["Rating", `${agent.rating} / 5.0`],
        ["Reviews", String(agent.reviews)],
        ["Specialty", agent.specialty],
        ["Listings", String(agent.listings)],
        ["Email", agent.email],
        ["Phone", agent.phone],
      ].map(([label, value]) => (
        <div
          key={label}
          className="h-[32px] rounded-[3px] bg-white px-2 py-[5px]"
        >
          <p className="text-[8px] leading-none text-stone-400">{label}</p>
          <p className="mt-[4px] truncate text-[9px] font-medium leading-none text-stone-800">
            {value}
          </p>
        </div>
      ))}
    </div>

    <div className="mt-[24px]">
      <SectionTitle>About</SectionTitle>
      <p className="mt-[13px] text-[10px] leading-[1.55] text-stone-500">
        {agent.about}
      </p>
    </div>
  </div>
);

const RatingsTab = ({ agent }: { agent: Agent }) => (
  <div>
    <div className="rounded border border-yellow-400 bg-white px-[9px] py-[24px]">
      <div className="flex items-center gap-[25px]">
        <div className="w-[78px] shrink-0">
          <p className="text-[38px] font-medium leading-none text-stone-900">
            {agent.rating}
          </p>
          <p className="mt-[3px] text-[9px] tracking-[0.12em] text-yellow-500">
            ★★★★★
          </p>
          <p className="mt-[2px] text-[7px] text-stone-500">
            Based on {agent.reviews} verified client reviews
          </p>
        </div>
        <div className="flex-1 space-y-[5px]">
          {ratingRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[50px_1fr_14px] items-center gap-2"
            >
              <span className="text-[7px] font-semibold text-stone-700">
                {row.label}
              </span>
              <span className="h-[5px] rounded-full bg-stone-200">
                <span
                  className="block h-full rounded-full bg-yellow-400"
                  style={{ width: `${(row.value / 5) * 100}%` }}
                />
              </span>
              <span className="text-right text-[8px] text-stone-600">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-[16px]">
      <SectionTitle>Client Reviews</SectionTitle>
      <div className="mt-[8px] space-y-[5px]">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded border border-yellow-400 bg-white px-[6px] py-[6px]"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-stone-600">
              Lanre. B
            </p>
            <p className="mt-[7px] text-[9px] leading-[1.5] text-stone-500">
              Greenfield is so professional with their work, they handled our
              estate sales with the most care
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LocationTab = ({ agent }: { agent: Agent }) => (
  <div>
    <SectionTitle>Service Areas</SectionTitle>
    <div className="mt-[13px] flex h-[50px] items-center justify-center rounded-[2px] bg-white text-[10px] text-stone-800">
      <FiMapPin size={16} className="mr-1 text-yellow-500" />
      {agent.city} - Service Map
    </div>
    <div className="mt-[12px] flex flex-wrap gap-[5px]">
      {agent.serviceAreas.map((area) => (
        <span
          key={area}
          className="rounded-[2px] bg-yellow-200 px-[5px] py-[2px] text-[8px] font-semibold tracking-[0.08em] text-stone-700"
        >
          @ {area}
        </span>
      ))}
    </div>
  </div>
);

const ContactTab = () => (
  <div>
    <SectionTitle>Get In Touch</SectionTitle>
    <form className="mt-[13px] space-y-[7px]">
      <input
        type="text"
        placeholder="Your full name"
        className="h-[23px] w-full rounded-[3px] bg-stone-200 px-[7px] text-[10px] text-stone-700 placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-yellow-400"
      />
      <input
        type="tel"
        placeholder="Your phone number"
        className="h-[23px] w-full rounded-[3px] bg-stone-200 px-[7px] text-[10px] text-stone-700 placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-yellow-400"
      />
      <input
        type="email"
        placeholder="Your email address"
        className="h-[23px] w-full rounded-[3px] bg-stone-200 px-[7px] text-[10px] text-stone-700 placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-yellow-400"
      />
      <textarea
        placeholder="Describe what you are looking for"
        className="h-[50px] w-full resize-none rounded-[3px] bg-stone-200 px-[7px] py-[18px] text-[10px] text-stone-700 placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-yellow-400"
      />
      <div className="pt-[5px] text-center">
        <button
          type="button"
          className="h-[28px] w-[237px] rounded-[7px] bg-yellow-300 text-[11px] font-semibold text-stone-900 transition-colors hover:bg-yellow-400"
        >
          Send
        </button>
      </div>
    </form>
  </div>
);

export default function AgentPage() {
  const [tab, setTab] = useState<"All" | "Agents" | "Agencies">("All");
  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeProfileTab, setActiveProfileTab] =
    useState<ProfileTab>("Overview");

  useEffect(() => {
    let mounted = true;

    getProperties({ limit: 100, ordering: "-created_at" })
      .then((response) => {
        if (mounted) {
          setAgents(agentsFromProperties(response.results));
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unable to load agents.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    const openFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const agentId = params.get("agent");
      const profileTab = params.get("tab") as ProfileTab | null;
      const nextAgent = agents.find((agent) => agent.id === agentId) ?? null;

      setSelectedAgent(nextAgent);
      if (profileTab && tabs.includes(profileTab)) {
        setActiveProfileTab(profileTab);
      } else if (nextAgent) {
        setActiveProfileTab("Overview");
      }
    };

    openFromUrl();
    window.addEventListener("popstate", openFromUrl);
    return () => window.removeEventListener("popstate", openFromUrl);
  }, [agents, loading]);

  const filtered = useMemo(
    () =>
      agents.filter((agent) => {
        const query = search.toLowerCase();
        const matchTab =
          tab === "All" ||
          (tab === "Agents" && agent.type === "AGENT") ||
          (tab === "Agencies" && agent.type === "AGENCY");
        const matchSearch =
          agent.name.toLowerCase().includes(query) ||
          agent.location.toLowerCase().includes(query) ||
          agent.specialty.toLowerCase().includes(query);

        return matchTab && matchSearch;
      }),
    [search, tab],
  );

  const openProfile = (agent: Agent, profileTab: ProfileTab = "Overview") => {
    setSelectedAgent(agent);
    setActiveProfileTab(profileTab);
    window.history.pushState(
      null,
      "",
      `/agents?agent=${agent.id}&tab=${profileTab}`,
    );
  };

  const closeProfile = () => {
    setSelectedAgent(null);
    window.history.pushState(null, "", "/agents");
  };

  const changeProfileTab = (profileTab: ProfileTab) => {
    setActiveProfileTab(profileTab);
    if (selectedAgent) {
      window.history.replaceState(
        null,
        "",
        `/agents?agent=${selectedAgent.id}&tab=${profileTab}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <div className="pt-10 pb-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
          Find Your <span className="text-amber-500">Trusted Agent</span> or
          Agency
        </h1>
        <p className="text-stone-400 text-xs mt-2">
          Connect with verified real estate professionals across Africa
        </p>
      </div>

      <div className=" mx-auto px-4 mt-5">
        <div className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-sm">
          <FiSearch size={14} className="text-stone-300 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location or specialty..."
            className="flex-1 text-xs text-stone-700 placeholder:text-stone-300 bg-transparent outline-none"
          />
        </div>
      </div>

      <div className=" mx-auto px-4 mt-3.5 flex gap-2">
        {(["All", "Agents", "Agencies"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`text-[11px] px-4 py-1.5 rounded-full border transition-colors ${
              tab === t
                ? "bg-amber-400 text-white border-amber-400 font-medium"
                : "bg-white text-stone-500 border-stone-200 hover:border-amber-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl mx-auto px-4 mt-3.5">
        <div className="max-w-3xl mx-auto py-3 px-4 grid grid-cols-4 text-center">
          {[
            { value: String(filtered.length), label: "Professionals Found" },
            { value: String(new Set(agents.map((agent) => agent.city)).size), label: "Cities Covered" },
            { value: String(agents.reduce((sum, agent) => sum + agent.listings, 0)), label: "Active Listings" },
            { value: String(agents.filter((agent) => agent.verified).length), label: "Verified Profiles" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-0.5">
              <span className="text-stone-800 text-xs font-semibold">
                {s.value}
              </span>
              <span className="text-stone-800 text-[10px]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className=" mx-auto px-4  mt-5">
        <h2 className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest pb-2 border-b-2 border-amber-400 inline-block">
          Agents &amp; Agencies
        </h2>
      </div>

      <div className=" mx-auto px-4 md:px-8 mt-4 pb-16 grid grid-cols-2 gap-3.5">
        {loading && (
          <div className="col-span-2 rounded-xl border border-stone-100 bg-white px-4 py-10 text-center text-xs text-stone-400">
            Loading agents...
          </div>
        )}
        {error && (
          <div className="col-span-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="col-span-2 rounded-xl border border-stone-100 bg-white px-4 py-10 text-center text-xs text-stone-400">
            No agents found.
          </div>
        )}
        {filtered.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onViewProfile={() => openProfile(agent)}
            onContact={() => openProfile(agent, "Contact")}
          />
        ))}
      </div>

      {selectedAgent && (
        <ProfileModal
          agent={selectedAgent}
          activeTab={activeProfileTab}
          onTabChange={changeProfileTab}
          onClose={closeProfile}
        />
      )}
    </div>
  );
}
