import express from "express";
import helmet from "helmet";

export const incidents = [];
export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

app.get("/health", (_req, res) => res.json({ status: "UP" }));

app.get("/incidents", (_req, res) =>
  res.json({ items: incidents, count: incidents.length }));

app.post("/incidents", (req, res) => {
  const { title, severity } = req.body;
  const allowed = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  if (typeof title !== "string" || title.trim().length < 5 ||
      !allowed.includes(severity)) {
    return res.status(400).json({ error: "INVALID_INCIDENT" });
  }
  const incident = {
    id: crypto.randomUUID(), title: title.trim(), severity, status: "OPEN"
  };
  incidents.push(incident);
  return res.status(201).json(incident);
});
