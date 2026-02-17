export function formatDate(date : any) {
    //check if date is in 2023-03-15T10:00:00Z format
    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
        date = new Date(date);
    }
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

export const getFirstChar = (str = "") => {
        if (str == null) return "";
        const s = String(str);
        return s.length ? s.charAt(0) : "";
};

export const formatTimestamp = (ts : any) => {
        if (ts == null) return '';
        const n = Number(ts);
        // if date is in UTC format, return how long ago it was
        if (!Number.isNaN(n) && n.toString().length === 10) {
            const secondsAgo = Math.floor((Date.now() - n * 1000) / 1000);
            if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
            if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
            // check for days
            if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
            if (secondsAgo < 31536000) return `${Math.floor(secondsAgo / 86400)} days ago`;
            return `${Math.floor(secondsAgo / 31536000)} years ago`;
        }
        if (Number.isNaN(n)) return String(ts);
        // if timestamp looks like seconds (<= 1e11), convert to ms
        const ms = n < 1e12 ? n * 1000 : n;
        const d = new Date(ms);
        return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    };


export const ucFirst = (str : string) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};
