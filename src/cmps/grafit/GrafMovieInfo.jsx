import React from "react";

import MovieCompareLine from "./MovieCompareLine";

const GrafMovieInfo = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
      {data ? (
        <div className="movie-info flex column flex align-center space-center">
          {/* {data.name} */}

          <MovieCompareLine
            name={data.name}
            dataCompare={{
              boxOffice: data.boxOffice ? data.boxOffice : null,
              rating: data.imdbRating,
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default GrafMovieInfo;
