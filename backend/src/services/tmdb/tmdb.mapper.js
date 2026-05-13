import * as providersModel from '../../models/provider.model.js';

/* old */
const STREAMING_PROVIDERS = new Map([
    [8, "NETFLIX"],
    [1796, "NETFLIX"],
    [9, "PRIME"],
    [119, "PRIME"],
    [613, "PRIME"],
    [2100, "PRIME"],
    [38, "BBC"],
    [41, "ITVX"],
    [103, "C4"],
]);

export function extractDirectors(crew = []) {
    return crew
        .filter(person => person.job === 'Director')
        .map(person => ({
            id: person.id,
            name: person.name,
        }));
}

export function extractCast(cast = [], quantity = cast.length) {
    return cast
        .slice(0, Math.max(0, quantity))
        .map(person => ({
            id: person.id,
            name: person.name,
            role: person.character,
            poster: person.profile_path,
        }));
}

// get streaming availablility in GB
// Docs only say flatrate, buy, rent
// but I have confirmed these from api responses:
// free, rent, buy, flatrate, ads
export function extractWatchProviders(watchProviders) {
    return [
        ...(watchProviders?.GB?.flatrate ?? []),
        ...(watchProviders?.GB?.ads ?? []),
        ...(watchProviders?.GB?.free ?? [])
    ];
}
