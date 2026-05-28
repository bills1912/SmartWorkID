const BASE = process.env.REACT_APP_API_URL || "";

async function get(path) {
  const res = await fetch(`${BASE}/api${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API error: ${res.status}`);
  }
  return res.json();
}

export const api = {
  jobs: {
    list: (params = {}) => {
      const filtered = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
      );
      const qs = new URLSearchParams(filtered).toString();
      return get(`/jobs${qs ? `?${qs}` : ""}`);
    },
    get: (id) => get(`/jobs/${id}`),
  },
  applications: {
    create: (data) => post("/applications", data),
    list: (email) => get(`/applications?email=${encodeURIComponent(email)}`),
  },
  courses: {
    list: (params = {}) => {
      const filtered = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
      );
      const qs = new URLSearchParams(filtered).toString();
      return get(`/courses${qs ? `?${qs}` : ""}`);
    },
  },
  careerPaths: {
    list: () => get("/career-paths"),
    get: (id) => get(`/career-paths/${id}`),
  },
  stats: {
    dashboard: () => get("/stats"),
    regions: () => get("/stats/regions"),
    industries: () => get("/stats/industries"),
  },
};
