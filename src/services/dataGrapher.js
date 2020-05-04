

export default {
    fitShowtoGraf,
}



function fitShowtoGraf(data) {

    console.log(data);
    var dataAll = { dataSet: [] }
    // let id = data[0].title;
    let count = 1;
    var average = 0;
    var accumulator = 0;
    var validSeasons = 0;

    //== Per season flow
    data.forEach((season, i) => {

        average = 0;

        if (!season.Error) {
            validSeasons += 1;
            if (!i) dataAll.name = season.Title;

            var dataObj = {
                id: `Season ${i + 1}`,
                data: []
            }

            season.Episodes.forEach((episode, j) => {

                let epNum = (j + 1);
                average += +episode.imdbRating;

                dataObj.data.push({
                    x: epNum,
                    y: +episode.imdbRating
                });
                
                if(season.Episodes.length === j + 1) {
                    accumulator += (average / season.Episodes.length);
                }

                count++;
            });

            // dataObj.data.unshift(seasonAvg);

            dataAll.dataSet.push(dataObj);
            // dataObj.data.push(seasonAvg);

        }
    });
    accumulator /= validSeasons;
    //== Single line flow
    // data.forEach((season, i) => {
    //     seasonSize = season.
    //     season.Episodes.forEach((episode, j) => {
    //         if(!i && !j) count = episode.Episode;

    //         dataObj.data.push({
    //             x: count++,
    //             y: episode.imdbRating
    //         });
    //     });
    // });

    // dataSet.push(dataObj);
    dataAll.average = accumulator;
    dataAll.episodeCount = count - 1;
    return Promise.resolve(dataAll);
}