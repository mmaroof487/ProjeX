import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://87ea92a439d64839923a0235128881ec@o4510290958811136.ingest.de.sentry.io/4510290962939984",
	integrations: [Sentry.browserTracingIntegration()],
	tracesSampleRate: 1.0,
});
