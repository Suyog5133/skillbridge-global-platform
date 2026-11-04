"use client";

import { FormEvent, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";

const searchTypes = ["Jobs", "Skills", "Opportunities"] as const;

export function OpportunitySearch() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof searchTypes)[number]>("Jobs");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full rounded-2xl border border-navy/10 bg-white p-2 shadow-[0_20px_50px_-24px_rgba(11,31,58,0.35)] sm:p-2.5"
      role="search"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="opportunity-search" className="sr-only">
          Search jobs, skills, and opportunities
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2">
          <SearchIcon className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            id="opportunity-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs, skills, and opportunities"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400 sm:text-[15px]"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="search-type" className="sr-only">
            Search category
          </label>
          <select
            id="search-type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as (typeof searchTypes)[number])
            }
            className="h-12 w-full rounded-xl border border-navy/10 bg-slate-50 px-3 text-sm font-medium text-navy sm:w-40"
          >
            {searchTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Button type="submit" variant="secondary" size="lg" className="shrink-0 px-6">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
