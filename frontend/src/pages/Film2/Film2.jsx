import FullsreenMediaLayout from "../../layouts/FullscreenMediaLayout/FullScreenMediaLayout";

import Trailer from "../../components/Film/Trailer/Trailer";
import MetaData from "../../components/Film/MetaData/MetaData";
import MediaScrollRow from "../../components/Media/MediaScrollRow/MediaScrollRow";
import PersonCard from "../../components/Person/PersonCard/PersonCard";

import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { getFilm } from "../../api/film";

import MediaTitle from '../../components/Media/MediaTitle/MediaTitle';
import MediaReleaseInfo from "../../components/Media/MediaReleaseInfo/MediaReleaseInfo";
import MediaOverview from "../../components/Media/MediaOverview/MediaOverview";
import WatchlistButton from "../../components/UI/WatchlistButton/WatchlistButton";
import Streaming from "../../components/Film/Streaming/Streaming";
import MediaActions from "../../components/Media/MediaActions/MediaActions";

import FilmIdentity from "../../components/Film/FilmIdentity/FilmIdentity";

export default function Film2() {

    // get tmdbID from route params
    const { tmdbID } = useParams();

    const { loading, error, data, retry } = useFetch(
        () => getFilm(tmdbID), [tmdbID]
    );

    return (
        <FullsreenMediaLayout 
            media={<Trailer trailerImageURL={data?.banner} />}
            mediaOverlay={
                <>
                    <FilmIdentity 
                        poster={data.poster}
                        title={data.title}
                        logo={data.logo}
                    />
                    <MediaOverview
                        overview={data?.overview}
                    />
                    <MediaActions>
                        <Streaming service={data?.streaming?.[0]} />
                        <WatchlistButton tmdbId={data?.tmdbid}/>
                    </MediaActions>
                </>
                
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
                        poster={person.poster}
                    />
                )}
            />
        </FullsreenMediaLayout>
    );

}
