import FullsreenMediaLayout from "../../layouts/FullscreenMediaLayout/FullScreenMediaLayout";
import PageLayout from "../../layouts/PageLayout/PageLayout";

import FilmTrailer from "../../components/Film/FilmTrailer/FilmTrailer";
import MediaScrollRow from "../../components/Media/MediaScrollRow/MediaScrollRow";
import PersonCard from "../../components/Cards/PersonCard/PersonCard";

import PageLoading from "../../components/UI/PageLoading/PageLoading";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

import { useParams } from "react-router-dom";

import { useFilmPage } from "../../features/film/hooks";
import FilmMetaDataOverlay from "../../components/Film/FilmMetaDataOverlay/FilmMetaDataOverlay";

export default function Film() {

    // get tmdbID from route params
    const { tmdbID } = useParams();

    const { data, isLoading, isError, refetch } = useFilmPage(tmdbID);

    if (isLoading) return <PageLoading />;
    if (isError) return <PageRetry retryAction={refetch} />;

    const film = data ?? {};
    const {
        title,
        poster_path,
        overview,
        release_date,
        age_rating,
        runtime,
        directors,
        top_cast,
        logo,
        providers,
        id,
        backdrop_path,
    } = film;

    const overlayMobile = (
        <FilmMetaDataOverlay 
            title={title}
            logoPath={logo}
            posterPath={poster_path}
            overview={overview}
            releaseDate={release_date}
            ageRating={age_rating}
            runtime={runtime}
            directors={directors}
            providers={providers}
            tmdbID={id}
        />
    );

    const renderCastItem = (person) => (
        <PersonCard
            tmdbID={person.id}
            name={person.name}
            role={person.role}
            posterPath={person.poster}
        />
    );


    return (
        <PageLayout fullWidth fullHeight>
            <FullsreenMediaLayout 
                media={<FilmTrailer trailerImageURL={backdrop_path} />}
                mediaOverlay={overlayMobile}
            >
                <MediaScrollRow 
                    title='Top Cast'
                    items={top_cast}
                    getKey={(person) => person.id}
                    renderItem={renderCastItem}
                />
            </FullsreenMediaLayout>
        </PageLayout>
    );

}
