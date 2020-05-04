// import utilService from './utilService.js'
// import storageService from './storageService.js'

export default {
    getGrafData,
}


function getGrafData(searchObj) {

    const { type, search } = searchObj;

    if (type === 'series') {
        let promises = [];

        return fetch(`http://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&t=${search}`)
            .then(res => res.json())
            .then(
                (result) => {
                    
                    let id = result.imdbID;

                    for(let i = 0; i < result.totalSeasons; i++) {

                        promises[i] = fetch(`http://www.omdbapi.com/?apikey=7b9ab2e6&i=${id}&Season=${i + 1}`)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                return Promise.resolve(result);
                            },
                            (error) => {
                                console.error(error);
                            }
                        );
                    }

                    return Promise.all(promises)
                    .then(values => values)
                },
                (error) => {
                    console.error(error);
                }

            );


    } else {

        return fetch(`http://www.omdbapi.com/?apikey=7b9ab2e6&type=${type}&t=${search}&Season=1,2`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    return Promise.resolve(result);

                },
                (error) => {
                    console.error(error);
                }
            );

    }

}