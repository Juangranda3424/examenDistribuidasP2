// src/instrument.js
import 'dotenv/config'; // <-- ESTA LINEA ES CRÍTICA PARA ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0,
});

console.log("🚀 Sentry inicializado con DSN real:", process.env.SENTRY_DSN ? "DETECTADO ✅" : "VACÍO ❌");