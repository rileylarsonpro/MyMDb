

import Poster from '../ui/Poster';

const MoviePreview = ({ movie, ...props }) => (
    <div>
        <Poster src={`https://image.tmdb.org/t/p/w154${movie.poster}`} wrapperClasses="mx-1" />
    </div>
);
export default MoviePreview;