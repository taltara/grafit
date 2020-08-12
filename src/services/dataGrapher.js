

const fitShowtoGraf = (data) => {
  console.log(data);
  var dataAll = { dataSet: [] };

  let count = 1;
  var average = 0;
  var accumulator = 0;
  var validSeasons = 0;

  //== Per season flow
  data.forEach((season, index) => {
    if (season && season.Episodes[0].Released !== "N/A") {
      average = 0;

      if (!season.Error) {
        validSeasons += 1;
        if (!index) dataAll.name = season.Title;

        var dataObj = {
          id: `Season ${index + 1}`,
          data: [],
        };

        season.Episodes.forEach((episode, j) => {
          if (
            episode.Released !== "N/A" &&
            episode.imdbRating !== "N/A" &&
            +episode.imdbRating >= 0
          ) {
            let epNum = j + 1;
            average += +episode.imdbRating;
            dataObj.data.push({
              x: epNum,
              y: +episode.imdbRating,
              episodeName: episode.Title,
            });

            if (season.Episodes.length === j + 1) {
              accumulator += average / season.Episodes.length;
            }

            count++;
          }
        });

        dataAll.dataSet.push(dataObj);
      }
    }
  });
  accumulator /= validSeasons;

  dataAll.average = accumulator;
  dataAll.episodeCount = count - 1;
  return Promise.resolve(dataAll);
}

const fitMovieData = (data) => {

  console.log(data);
  console.log(data.Actors.split(", "));
  return Promise.resolve({
    actors: data.Actors.split(", "),
    awards: data.Awards,
    // boxOffice: +data.BoxOffice.slice(1).replace(/,/gi, ""),
    boxOffice: data.BoxOffice,
    country: data.Country,
    dvd: data.DVD,
    director: data.Director,
    genre: data.Genre.split(", "),
    language: data.Language.split(", "),
    plot: data.Plot,
    poster: data.Poster,
    production: data.Production,
    rated: data.Rated,
    ratings: [ ...data.Ratings ],
    released: data.Released,
    length: data.Runtime,
    name: data.Title,
    website: data.website ? data.website : null,
    writer: data.Writer.split(", "),
    year: data.Year,
    imdbVotes: data.imdbVotes,
    imdbRating: data.imdbRating,
    color: data.color
  })
}



export default {
  fitShowtoGraf,
  fitMovieData,
};