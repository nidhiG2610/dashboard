import { configureEcho } from "@laravel/echo-react";
 const csrfMeta = document?.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMeta?.getAttribute('content') ?? '';

configureEcho({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY, // Use environment variables
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    auth: {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfToken
        },
    },
});
