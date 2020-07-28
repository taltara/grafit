import React from "react";

import MovieCompareLine from "./MovieCompareLine";

const GrafMovieInfo = (props) => {
  const { data, theme } = props;
  console.log(data);
  return (
    <>
      {data ? (
        <div className="movie-info flex column flex align-center space-center">

          {/* <MovieCompareLine
            name={data.name}
            dataCompare={{
              boxOffice: data.boxOffice ? data.boxOffice : null,
              rating: data.imdbRating,
            }}
            theme={theme}
          /> */}
        </div>
      ) : null}
    </>
  );
};

export default GrafMovieInfo;
