"use client";

import { useState, useMemo } from "react";
import {
  Bug,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Search,
  Maximize2,
  Minimize2,
  FileJson,
  Layers,
  Database,
  ListFilter,
  Calendar,
  Image as ImageIcon,
  Tag,
  ShieldAlert,
  ExternalLink,
  Globe,
  Terminal,
} from "lucide-react";

/**
 * Interactive JSON Node Component for Debug Tree Rendering
 */
function JsonNode({ name, value, depth = 0, searchTerm = "", initialExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded && depth < 2);
  const [copied, setCopied] = useState(false);

  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  // Filter check for search matching
  const matchesSearch = useMemo(() => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    if (name && String(name).toLowerCase().includes(term)) return true;
    if (!isObject && String(value).toLowerCase().includes(term)) return true;
    if (isObject) {
      const jsonStr = JSON.stringify(value).toLowerCase();
      return jsonStr.includes(term);
    }
    return false;
  }, [name, value, isObject, searchTerm]);

  if (!matchesSearch) return null;

  const handleCopyNode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderValue = () => {
    if (value === null) {
      return <span className="text-red-400 font-mono text-xs">null</span>;
    }
    if (value === undefined) {
      return <span className="text-stone-500 font-mono text-xs">undefined</span>;
    }
    if (typeof value === "boolean") {
      return <span className="text-purple-400 font-mono text-xs font-semibold">{String(value)}</span>;
    }
    if (typeof value === "number") {
      return <span className="text-amber-400 font-mono text-xs font-medium">{value}</span>;
    }
    if (typeof value === "string") {
      const isUrl = value.startsWith("http://") || value.startsWith("https://");
      return (
        <span className="text-emerald-400 font-mono text-xs break-all">
          &quot;{value}&quot;
          {isUrl && (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-[10px] underline text-sky-400 opacity-80 hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              [link]
            </a>
          )}
        </span>
      );
    }
    return null;
  };

  if (!isObject) {
    return (
      <div className="flex items-start py-0.5 font-mono text-xs hover:bg-slate-800/60 rounded px-1.5 transition-colors">
        {name !== undefined && (
          <span className="text-sky-300 font-semibold mr-1.5 shrink-0">
            {name}:
          </span>
        )}
        <div className="flex-1 overflow-hidden">{renderValue()}</div>
      </div>
    );
  }

  const keys = Object.keys(value);
  const count = keys.length;
  const bracketOpen = isArray ? "[" : "{";
  const bracketClose = isArray ? "]" : "}";

  return (
    <div className="font-mono text-xs my-0.5">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 py-1 px-1.5 rounded cursor-pointer hover:bg-slate-800/80 transition-colors select-none text-slate-200 group"
      >
        <span className="text-slate-400 group-hover:text-slate-200">
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </span>

        {name !== undefined && (
          <span className="text-sky-300 font-semibold">{name}:</span>
        )}

        <span className="text-amber-300 font-bold">{bracketOpen}</span>

        {!isExpanded && (
          <span className="text-slate-500 italic text-[11px] mx-1">
            {isArray ? `${count} items` : `${count} keys`} ... {bracketClose}
          </span>
        )}

        {isExpanded && (
          <span className="text-slate-500 text-[11px]">
            {isArray ? `${count} items` : `${count} keys`}
          </span>
        )}

        <button
          type="button"
          onClick={handleCopyNode}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
          title="Copy node JSON"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>

      {isExpanded && (
        <div className="pl-4 border-l border-slate-700/60 ml-2 space-y-0.5">
          {keys.map((key) => (
            <JsonNode
              key={key}
              name={isArray ? key : key}
              value={value[key]}
              depth={depth + 1}
              searchTerm={searchTerm}
              initialExpanded={initialExpanded}
            />
          ))}
          <div className="text-amber-300 font-bold pt-0.5 select-none">{bracketClose}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Main DebugPreview Module
 * Completely isolated component for displaying itinerary API fetched data & full request URL.
 *
 * @param {Object} props
 * @param {Object} props.itinerary - API fetched itinerary object
 * @param {Object} props.data - Alternative prop alias for itinerary
 * @param {string} props.apiUrl - Full API request endpoint URL used to fetch data
 */
export default function DebugPreview({ itinerary, data, apiUrl }) {
  const payload = itinerary || data;

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("summary"); // "summary" | "tree" | "raw"
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Compute or resolve final API endpoint URL
  const resolvedApiUrl = useMemo(() => {
    if (apiUrl) return apiUrl;
    if (payload?._apiUrl) return payload._apiUrl;

    return "API Endpoint URL Not Passed";
  }, [apiUrl, payload]);

  const jsonString = useMemo(() => {
    if (!payload) return "";
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return "Error stringifying API data payload";
    }
  }, [payload]);

  const payloadSizeKB = useMemo(() => {
    if (!jsonString) return "0 KB";
    const bytes = new Blob([jsonString]).size;
    return `${(bytes / 1024).toFixed(2)} KB`;
  }, [jsonString]);

  const handleCopyFullJson = () => {
    if (!jsonString) return;
    navigator.clipboard.writeText(jsonString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyUrl = () => {
    if (!resolvedApiUrl) return;
    navigator.clipboard.writeText(resolvedApiUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Metrics summary extraction
  const metrics = useMemo(() => {
    if (!payload) return null;
    return {
      id: payload._id || payload.id || "N/A",
      slug: payload.slug || "N/A",
      title: payload.title || "Untitled Itinerary",
      days: payload.duration?.days || 0,
      nights: payload.duration?.nights || 0,
      dayWiseCount: Array.isArray(payload.dayWiseItinerary) ? payload.dayWiseItinerary.length : 0,
      totalActivities: Array.isArray(payload.dayWiseItinerary)
        ? payload.dayWiseItinerary.reduce(
          (acc, d) => acc + (Array.isArray(d?.activities) ? d.activities.length : 0),
          0
        )
        : 0,
      galleryCount: Array.isArray(payload.gallery) ? payload.gallery.length : 0,
      packagesCount: Array.isArray(payload.startingFrom)
        ? payload.startingFrom.length
        : Array.isArray(payload.packages)
          ? payload.packages.length
          : 0,
      inclusionsCount: Array.isArray(payload.inclusions) ? payload.inclusions.length : 0,
      exclusionsCount: Array.isArray(payload.exclusions) ? payload.exclusions.length : 0,
      faqsCount:
        (Array.isArray(payload.customFaqs) ? payload.customFaqs.length : 0) +
        (Array.isArray(payload.faqs) ? payload.faqs.length : 0),
      hasSeo: Boolean(payload.seo),
      tripType: payload.tripType || "N/A",
      locationsCount: Array.isArray(payload.locations) ? payload.locations.length : 0,
    };
  }, [payload]);

  return (
    <div
      className={`w-full bg-[#0b0f19] text-slate-100 font-sans border-t-4 border-amber-500/80 shadow-2xl selection:bg-amber-500/30 selection:text-amber-200 ${isFullWidth ? "px-2" : ""
        }`}
    >
      <div className="max-w-[1920px] mx-auto px-3 sm:px-6 py-4 space-y-3">
        {/* Module Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-md">
          {/* Left Title & Status Badges */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Bug className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm font-bold tracking-wider text-amber-400 uppercase">
                  DEBUG PREVIEW MODULE
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  API FETCHED DATA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Target: {metrics?.slug !== "N/A" ? `/itinerary/${metrics?.slug}` : "Live Context"} · Size: {payloadSizeKB}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Tabs */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-1 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("summary")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${activeTab === "summary"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Summary</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("tree")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${activeTab === "tree"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Tree View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("raw")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${activeTab === "raw"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>Raw JSON</span>
              </button>
            </div>

            {/* Copy Full Payload */}
            <button
              type="button"
              onClick={handleCopyFullJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Copy entire API response"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            {/* Toggle Fullwidth */}
            <button
              type="button"
              onClick={() => setIsFullWidth(!isFullWidth)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title={isFullWidth ? "Center layout" : "Full width layout"}
            >
              {isFullWidth ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Open/Close Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-mono font-semibold border border-amber-500/40 transition-colors"
            >
              <span>{isOpen ? "Hide Panel" : "Show Panel"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* PROMINENT API ENDPOINT URL BAR */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold shrink-0">
              <Globe className="w-3.5 h-3.5" />
              <span>GET</span>
            </div>
            <div className="text-slate-400 shrink-0 font-semibold hidden sm:inline">
              API Endpoint:
            </div>
            <span className="text-amber-300 font-bold tracking-tight truncate select-all">
              {resolvedApiUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Copy complete API URL"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">URL Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px]">Copy URL</span>
                </>
              )}
            </button>

            {resolvedApiUrl.startsWith("http") && (
              <a
                href={resolvedApiUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 text-sky-300 hover:text-white transition-colors"
                title="Open API endpoint URL directly in new tab"
              >
                <span className="text-[11px]">Open URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Collapsible Content Drawer */}
        {isOpen && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-inner">
            {/* If no API data provided */}
            {!payload && (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <ShieldAlert className="w-10 h-10 text-amber-500 opacity-80" />
                <p className="font-mono text-sm text-slate-300">
                  No itinerary API data payload detected or component prop is null.
                </p>
                <p className="text-xs text-slate-500 max-w-md">
                  Ensure you pass the fetched data object to{" "}
                  <code className="text-amber-400 font-mono">&lt;DebugPreview itinerary={"{itinerary}"} apiUrl={"{apiUrl}"} /&gt;</code>.
                </p>
              </div>
            )}

            {payload && (
              <>
                {/* Search Bar for Tree and Raw tabs */}
                {(activeTab === "tree" || activeTab === "raw") && (
                  <div className="mb-4 relative max-w-md">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search API keys or values..."
                      className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 font-mono"
                      >
                        clear
                      </button>
                    )}
                  </div>
                )}

                {/* TAB 1: SUMMARY METRICS */}
                {activeTab === "summary" && metrics && (
                  <div className="space-y-4">
                    {/* Primary Info Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                          <span>ITINERARY TITLE</span>
                          <Tag className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <p className="font-serif-display text-base font-bold text-slate-100 truncate">
                          {metrics.title}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 truncate">ID: {metrics.id}</p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                          <span>DURATION</span>
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <p className="font-mono text-lg font-bold text-amber-400">
                          {metrics.days} Days / {metrics.nights} Nights
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">Trip Mode: {metrics.tripType}</p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                          <span>DAY WISE ITINERARY</span>
                          <Database className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <p className="font-mono text-lg font-bold text-emerald-400">
                          {metrics.dayWiseCount} Days ({metrics.totalActivities} Activities)
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">
                          Locations: {metrics.locationsCount}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                          <span>MEDIA & FAQS</span>
                          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <p className="font-mono text-lg font-bold text-sky-400">
                          {metrics.galleryCount} Gallery Images
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">
                          FAQs: {metrics.faqsCount} items · SEO: {metrics.hasSeo ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* Deep Data Attribute Inspector Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs font-mono pt-2">
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">PACKAGES</span>
                        <span className="font-bold text-slate-200">{metrics.packagesCount} Pricing Tiers</span>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">INCLUSIONS</span>
                        <span className="font-bold text-slate-200">{metrics.inclusionsCount} Items</span>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">EXCLUSIONS</span>
                        <span className="font-bold text-slate-200">{metrics.exclusionsCount} Items</span>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">BEST TIME</span>
                        <span className="font-bold text-slate-200">
                          {payload.bestTime ? `${payload.bestTime.fromMonth || ""}-${payload.bestTime.toMonth || ""}` : "Not Set"}
                        </span>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">STATE</span>
                        <span className="font-bold text-slate-200">{payload.state || "N/A"}</span>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800/80 rounded p-2.5">
                        <span className="text-slate-500 block text-[10px]">CARBON FOOTPRINT</span>
                        <span className="font-bold text-slate-200">
                          {payload.carbonFootprint !== undefined ? `${payload.carbonFootprint} kg` : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* API Request Details Box */}
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <Terminal className="w-4 h-4" />
                        <span>API REQUEST METADATA</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                        <div>
                          <span className="text-slate-500">HTTP Method:</span> <span className="text-emerald-400 font-bold">GET</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Payload Format:</span> <span className="text-sky-300">JSON (application/json)</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-slate-500">Full Request Endpoint:</span>{" "}
                          <span className="text-amber-300 select-all font-semibold break-all">{resolvedApiUrl}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TREE VIEW */}
                {activeTab === "tree" && (
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 max-h-[600px] overflow-auto">
                    <JsonNode value={payload} searchTerm={searchTerm} initialExpanded={true} />
                  </div>
                )}

                {/* TAB 3: RAW JSON */}
                {activeTab === "raw" && (
                  <div className="relative">
                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 max-h-[600px] overflow-auto whitespace-pre-wrap break-all leading-relaxed">
                      {searchTerm
                        ? jsonString
                          .split("\n")
                          .filter((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))
                          .join("\n") || `No lines matching "${searchTerm}"`
                        : jsonString}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
