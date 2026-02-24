// backend base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// to handle redirect to login page for 401 responses.
let onUnauthorized = null;
export function setUnauthorizedHandler(handler) {
    onUnauthorized = handler;
}

/**
 * Backend api base request
 * 
 * @param {*} endpoint 
 * @param {*} options 
 * @returns json response
 */
export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (response.status === 401) {
        if (onUnauthorized) {
            onUnauthorized();
        }
        throw new Error('Unauthorised');
    }

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}
