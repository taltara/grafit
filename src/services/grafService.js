// import utilService from './utilService.js'
// import storageService from './storageService.js'

const searchMediaData = (searchObj) => {
  const { type, search } = searchObj;

  return fetch(
    `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&s=${search}`
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.Response === "True") {
          let titles = [];
          result.Search.forEach(searchItem => {
            titles.push({ title: searchItem.Title, id: searchItem.imdbID, img: searchItem.Poster });
          })
        return { error: false, results: result.Search, titles };
      } else {
        return { error: true, searchTerm: search };
      }
    });
};


const getGrafData = (searchObj) => {
  const { type, search } = searchObj;
  var seriesInfo;

  if (type === "series") {
    let promises = [];

    return fetch(
      `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&t=${search}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          const id = result.imdbID;
          seriesInfo = result;
          for (let i = 0; i < result.totalSeasons; i++) {
            promises[i] = fetch(
              `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&i=${id}&Season=${
                i + 1
              }`
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
      `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&s=${search}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.Response === "True") {
            return fetch(
              `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&i=${result.Search[0].imdbID}`
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
};

const getMediaData = (searchObj) => {
  const { type, imdbID } = searchObj;
  var seriesInfo;

  if (type === "series") {
    let promises = [];

    return fetch(
      `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&i=${imdbID}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          const id = result.imdbID;
          seriesInfo = result;
          for (let i = 0; i < result.totalSeasons; i++) {
            promises[i] = fetch(
              `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&i=${id}&Season=${
                i + 1
              }`
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
            // console.log(data);
            return data;
          });
        },
        (error) => {
          console.error(error);
        }
      );
  } else {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=7b9ab2e6&i=${imdbID}`
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
  }
};

const getTopBoxOfficeMovies = () => {};

export default {
  getGrafData,
  searchMediaData,
  getMediaData,
  getTopBoxOfficeMovies,
};
