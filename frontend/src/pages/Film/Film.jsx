import FullsreenMediaLayout from "../../layouts/FullscreenMediaLayout/FullScreenMediaLayout";

import FilmOverlay from "../../components/Film/FilmOverlay/FilmOverlay";
import FilmTrailer from "../../components/Film/FilmTrailer/FilmTrailer";
import MediaScrollRow from "../../components/Media/MediaScrollRow/MediaScrollRow";
import PersonCard from "../../components/Person/PersonCard/PersonCard";

import PageLoading from "../../components/UI/PageLoading/PageLoading";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import { getFilm } from "../../api/film";

export default function Film2() {

    // get tmdbID from route params
    const { tmdbID } = useParams();

    const { loading, error, data, retry } = useFetch(
        () => getFilm(tmdbID), [tmdbID]
    );

    if (loading) return <PageLoading />;
    
    if (error) return <PageRetry retryAction={retry} />;

    return (
        <FullsreenMediaLayout 
            media={<FilmTrailer trailerImageURL={data?.banner} />}
            mediaOverlay={
                <FilmOverlay 
                    tmdbID={data?.tmdbid}
                    title={data?.title}
                    poster={data?.poster}
                    logo={data?.logo}
                    director={data?.director}
                    overview={data?.overview}
                    streaming={data?.streaming}
                    releaseDate={data?.release_date}
                    ageRating={data?.age}
                    runtime={data?.runtime}
                />
            }
        >
            <MediaScrollRow 
                title='Top Cast'
                items={data.top_cast}
                getKey={(person) => person.id}
                renderItem={(person) => (
                    <PersonCard
                        tmdbID={person.id}
                        name={person.name}
                        role={person.role}
                        posterPath={person.poster}
                    />
                )}
            />
        </FullsreenMediaLayout>
    );

}
