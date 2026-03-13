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

export function extractWatchProviders(watchProviders) {
    // get streaming availablility in UK
    const watchProvidersGB = [
        ...(watchProviders?.GB?.flatrate ?? []),
        ...(watchProviders?.GB?.ads ?? []),
    ];

    if (watchProvidersGB.length < 1) {
        return [];
    }

    const streamingSet = new Set();

    // filter from given services
    watchProvidersGB.forEach(service => {
        const providerName = STREAMING_PROVIDERS.get(service.provider_id);
        if (providerName) {
            streamingSet.add(providerName); // duplicates automatically ignored
        }
    });
    
    return Array.from(streamingSet);
}
