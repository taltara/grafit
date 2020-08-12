import React, { useState, useEffect } from "react";

import MovieCompareBar from "./MovieCompareBar";

const GrafMovieInfo = (props) => {
  const { data, theme } = props;
  const [movieInfo, setMovieInfo] = useState(data);

  useEffect(() => {
    if (data !== movieInfo) {
      setMovieInfo(data);
    }
  }, [data]);

  let actors;
  if(movieInfo) {
    actors = data.actors.join(", ");
    actors = actors.slice(0, actors.length - 2);

  }
  return (
    <>
      {movieInfo ? (
        <div className={`movie-info movie-${theme} flex column flex align-center space-center`}>
          <div className="upper-info-block flex column align-start space-center">
            <span className="flex align-center space-center">
              <p className="upper-plot">{data.plot}</p>
            </span>
            <div className="titled-info flex column align-start space-start">
            <span className="flex align-center space-center">
              <p className="secondary">{`Actors: `}</p>

              <p className="upper-actors">{actors}</p>
            </span>
            <span className="flex align-center space-center">
              <p className="secondary">{`Director: `}</p>

              <p className="upper-director">{data.director}</p>
            </span>
            <span className="flex align-center space-center">
              <p className="secondary">{`Awards: `}</p>

              <p className="upper-awards">{data.awards}</p>
            </span>
            
            <span className="flex align-center space-center">
              <p className="secondary">{`Country: `}</p>

              <p className="upper-country">{data.country}</p>
            </span>
            </div>
            
          </div>
          <MovieCompareBar
            name={movieInfo.name}
            dataCompare={{
              boxOffice: movieInfo.boxOffice ? movieInfo.boxOffice : null,
              rating: movieInfo.imdbRating,
            }}
            theme={theme}
          />
        </div>
      ) : null}
    </>
  );
};

export default GrafMovieInfo;
