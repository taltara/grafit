// import utilService from './utilService.js'
// import storageService from './storageService.js'



const getGrafData = (searchObj) => {
  const { type, search } = searchObj;
  var seriesInfo;

  if (type === "series") {
    let promises = [];

    return fetch(
      `http://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&t=${search}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let id = result.imdbID;
          seriesInfo = result;
          for (let i = 0; i < result.totalSeasons; i++) {
            promises[i] = fetch(
              `http://www.omdbapi.com/?apikey=7b9ab2e6&i=${id}&Season=${i + 1}`
            )
              .then((res) => res.json())
              .then(
                (result) => {
                  return Promise.resolve(result);
                },
                (error) => {
                  console.error(error);
                }
              );
          }

          return Promise.all(promises).then((values) => {
            let data = { values, seriesInfo };
            console.log(data);
            return data;
          });
        },
        (error) => {
          console.error(error);
        }
      );
  } else {
    return fetch(
      `http://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&s=${search}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.Response === "True") {
            return fetch(
              `http://www.omdbapi.com/?apikey=7b9ab2e6&i=${result.Search[0].imdbID}`
            )
              .then((result) => result.json())
              .then(
                (result) => {
                  console.log(result);
                  return Promise.resolve(result);
                },
                (error) => {
                  console.error(error);
                }
              );
          } else {
            return Promise.reject();
          }
        },
        (error) => {
          console.error(error);
          return Promise.reject();
        }
      );
  }
}

const getTopBoxOfficeMovies = () => {
  
}


export default {
  getGrafData,
  getTopBoxOfficeMovies,
};