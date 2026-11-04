"use client";

import { useMemo, useState } from "react";

type VerificationType =
  | "Email Verification"
  | "Phone Verification"
  | "Identity Verification"
  | "Education Verification"
  | "Employment Verification";

type VerificationStatus = "Pending" | "Approved" | "Rejected";

type VerificationRequest = {
  id: number;
  name: string;
  email: string;
  country: string;
  type: VerificationType;
  submitted: string;
  status: VerificationStatus;
  reference: string;
};

const verificationTypes: VerificationType[] = [
  "Email Verification",
  "Phone Verification",
  "Identity Verification",
  "Education Verification",
  "Employment Verification",
];

const initialRequests: VerificationRequest[] = [
  { id: 4101, name: "Aarav Sharma", email: "aarav.sharma@example.com", country: "India", type: "Identity Verification", submitted: "Nov 03, 2026", status: "Pending", reference: "IDV-2026-4101" },
  { id: 4102, name: "Sofia Martin", email: "sofia.martin@example.com", country: "Spain", type: "Education Verification", submitted: "Nov 02, 2026", status: "Pending", reference: "EDU-2026-4102" },
  { id: 4103, name: "Noah Williams", email: "noah.williams@example.com", country: "United States", type: "Employment Verification", submitted: "Nov 01, 2026", status: "Approved", reference: "EMP-2026-4103" },
  { id: 4104, name: "Amara Okafor", email: "amara.okafor@example.com", country: "Nigeria", type: "Phone Verification", submitted: "Oct 31, 2026", status: "Pending", reference: "PHN-2026-4104" },
  { id: 4105, name: "Liam Chen", email: "liam.chen@example.com", country: "Singapore", type: "Email Verification", submitted: "Oct 30, 2026", status: "Approved", reference: "EML-2026-4105" },
  { id: 4106, name: "Maya Patel", email: "maya.patel@example.com", country: "Canada", type: "Identity Verification", submitted: "Oct 29, 2026", status: "Rejected", reference: "IDV-2026-4106" },
  { id: 4107, name: "Oliver Fischer", email: "oliver.fischer@example.com", country: "Germany", type: "Employment Verification", submitted: "Oct 28, 2026", status: "Pending", reference: "EMP-2026-4107" },
  { id: 4108, name: "Isabella Rossi", email: "isabella.rossi@example.com", country: "Italy", type: "Education Verification", submitted: "Oct 27, 2026", status: "Rejected", reference: "EDU-2026-4108" },
];

const statuses: Array<"All" | VerificationStatus> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
];

function getStatusStyle(status: VerificationStatus) {
  if (status === "Approved") return "bg-green-100 text-green-700";
  if (status === "Rejected") return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700";
}

export default function AdminCandidateVerificationPage() {
  const [requests, setRequests] =
    useState<VerificationRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | VerificationStatus>(
    "All"
  );
  const [typeFilter, setTypeFilter] = useState<"All" | VerificationType>("All");
  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesSearch = [
        request.name,
        request.email,
        request.country,
        request.type,
        request.reference,
      ].some((value) => value.toLowerCase().includes(query));
      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;
      const matchesType = typeFilter === "All" || request.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, search, statusFilter, typeFilter]);

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;
  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;
  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  function updateRequestStatus(
    request: VerificationRequest,
    status: VerificationStatus
  ) {
    if (
      status === "Rejected" &&
      !window.confirm(`Are you sure you want to reject ${request.name}'s request?`)
    ) {
      return;
    }
    setRequests((currentRequests) =>
      currentRequests.map((item) =>
        item.id === request.id ? { ...item, status } : item
      )
    );
    setSelectedRequest((currentSelected) =>
      currentSelected?.id === request.id
        ? { ...currentSelected, status }
        : currentSelected
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <p className="text-sm font-medium text-blue-600">
            Admin / Trust & Verification
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Candidate Verification Management
          </h1>
          <p className="mt-2 text-slate-500">
            Review candidate verification requests and update their status.
          </p>
        </header>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">Verification Review</h2>
          <p className="mt-1 text-sm leading-6 text-blue-800">
            Demo requests contain sample candidate records only. Review each
            request before approving or rejecting it.
          </p>
        </div>

        <section
          aria-label="Verification request summary"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Requests</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {requests.length}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-orange-500">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Approved</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {approvedCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Rejected</p>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Candidate Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search, filter, and review submitted verification requests.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <label className="md:col-span-1">
              <span className="sr-only">Search candidates</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or country..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label>
              <span className="sr-only">Filter by verification status</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "All" | VerificationStatus)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by verification type</span>
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as "All" | VerificationType)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="All">All verification types</option>
                {verificationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th scope="col" className="p-3 font-medium">Candidate</th>
                  <th scope="col" className="p-3 font-medium">Country</th>
                  <th scope="col" className="p-3 font-medium">Verification Type</th>
                  <th scope="col" className="p-3 font-medium">Submitted</th>
                  <th scope="col" className="p-3 font-medium">Status</th>
                  <th scope="col" className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-t border-slate-100">
                    <td className="p-3">
                      <p className="font-semibold text-slate-900">{request.name}</p>
                      <p className="text-xs text-slate-500">{request.email}</p>
                    </td>
                    <td className="p-3 text-slate-600">{request.country}</td>
                    <td className="p-3 text-slate-600">{request.type}</td>
                    <td className="p-3 text-slate-500">{request.submitted}</td>
                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRequests.length === 0 && (
            <div className="py-10 text-center text-slate-500">
              <p className="font-medium text-slate-700">
                No verification requests found
              </p>
              <p className="mt-1 text-sm">
                Adjust your search or filters to see more requests.
              </p>
            </div>
          )}
        </section>

        {selectedRequest && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedRequest(null);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="verification-dialog-title"
              className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 id="verification-dialog-title" className="text-xl font-bold text-slate-900">
                    Candidate Verification Details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review this demo request and choose an outcome.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close details"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-lg p-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-400">Candidate Name</dt>
                  <dd className="mt-1 font-semibold text-slate-900">{selectedRequest.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Email</dt>
                  <dd className="mt-1 break-all text-slate-700">{selectedRequest.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Country</dt>
                  <dd className="mt-1 text-slate-700">{selectedRequest.country}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Verification Type</dt>
                  <dd className="mt-1 text-slate-700">{selectedRequest.type}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Submission Date</dt>
                  <dd className="mt-1 text-slate-700">{selectedRequest.submitted}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Reference</dt>
                  <dd className="mt-1 text-slate-700">{selectedRequest.reference}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-slate-400">Current Status</dt>
                  <dd className="mt-1">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                  </dd>
                </div>
              </dl>

              <p className="mt-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
                Demo record only. No identity, education, employment, or contact documents are attached.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={selectedRequest.status === "Approved"}
                  onClick={() => updateRequestStatus(selectedRequest, "Approved")}
                  className="rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Approve Request
                </button>
                <button
                  type="button"
                  disabled={selectedRequest.status === "Rejected"}
                  onClick={() => updateRequestStatus(selectedRequest, "Rejected")}
                  className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reject Request
                </button>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="mt-3 w-full rounded-lg border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </section>
          </div>
        )}

        <p className="text-center text-xs text-slate-400">
          SkillBridge Global · Candidate Verification Admin Panel
        </p>
      </div>
    </main>
  );
}
