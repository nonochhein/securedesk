import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app, incidents } from "../src/app.js";

beforeEach(() => incidents.splice(0));

describe("SecureDesk API", () => {
  it("expose son état", async () => {
    const r = await request(app).get("/health");
    expect(r.status).toBe(200);
    expect(r.body.status).toBe("UP");
  });

  it("crée un incident", async () => {
    const r = await request(app).post("/incidents")
      .send({ title: "Messagerie indisponible", severity: "CRITICAL" });
    expect(r.status).toBe(201);
    expect(r.body.id).toBeTypeOf("string");
  });

  it("refuse une sévérité inconnue", async () => {
    const r = await request(app).post("/incidents")
      .send({ title: "Incident à vérifier", severity: "URGENT" });
    expect(r.status).toBe(400);
  });

  it("liste les incidents créés", async () => {
    await request(app).post("/incidents")
      .send({ title: "Messagerie indisponible", severity: "HIGH" });
    const r = await request(app).get("/incidents");
    expect(r.status).toBe(200);
    expect(r.body.count).toBe(1);
    expect(r.body.items[0].status).toBe("OPEN");
  });
});
