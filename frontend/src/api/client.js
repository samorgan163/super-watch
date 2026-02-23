const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}
