import { configureEcho } from "@laravel/echo-react";
const csrfMeta = document?.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfMeta?.getAttribute('content') ?? '';

const isProd = Boolean(import.meta.env.PROD);
const envHost = import.meta.env.VITE_REVERB_HOST;
const envPortRaw = import.meta.env.VITE_REVERB_PORT;
const envScheme = import.meta.env.VITE_REVERB_SCHEME;

const shouldUseBrowserHost =
  isProd && (!envHost || envHost === "127.0.0.1" || envHost === "localhost");

const wsHost = shouldUseBrowserHost ? window.location.hostname : envHost;
const defaultPort = window.location.protocol === "https:" ? 443 : 80;
const wsPort = shouldUseBrowserHost
  ? defaultPort
  : Number(envPortRaw ?? 8080);
const scheme = envScheme ?? (window.location.protocol === "https:" ? "https" : "http");
const forceTLS = scheme === "https";

configureEcho({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY, // Use environment variables
    wsHost,
    wsPort,
    wssPort: wsPort,
    forceTLS,
    enabledTransports: ["ws", "wss"],
    auth: {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken
        },
    },
});
