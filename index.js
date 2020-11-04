const uuid = require('uuid');
const fs = require('fs');
const fetch = require('node-fetch');

const districts = require('./districts');

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
    for (const district of districts.districts) {
        console.log(`Downloading data for ${district}...`);
        const result = await fetch("https://wabi-west-europe-api.analysis.windows.net/public/reports/querydata?synchronous=true", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "sk,en-US;q=0.9,en;q=0.8",
                "activityid": "bf454abd-4401-411d-b66a-db893e38bb5b",
                "content-type": "application/json;charset=UTF-8",
                "requestid": uuid.v4(),
                "sec-ch-ua": "\"Chromium\";v=\"86\", \"\\\"Not\\\\A;Brand\";v=\"99\", \"Google Chrome\";v=\"86\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "x-powerbi-resourcekey": "450078b8-b12a-4c9a-b539-38e173bf4b5c"
            },
            "referrer": "https://app.powerbi.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"version\":\"1.0.0\",\"queries\":[{\"Query\":{\"Commands\":[{\"SemanticQueryDataShapeCommand\":{\"Query\":{\"Version\":2,\"From\":[{\"Name\":\"w\",\"Entity\":\"Web - Pozitivne nalezy\",\"Type\":0}],\"Select\":[{\"Aggregation\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Count\"}},\"Function\":0},\"Name\":\"Sum(Web - Pozitivne nalezy.Count)\"},{\"Measure\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"MedianValue\"},\"Name\":\"Web - Pozitivne nalezy.MedianValue\"},{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Dátum\"},\"Name\":\"Web - Pozitivne nalezy.Dátum\"}],\"Where\":[{\"Condition\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Nazov_okresu\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"'" + district + "'\"}}]]}}},{\"Condition\":{\"Not\":{\"Expression\":{\"In\":{\"Expressions\":[{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Nazov_okresu\"}}],\"Values\":[[{\"Literal\":{\"Value\":\"null\"}}]]}}}}},{\"Condition\":{\"Between\":{\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Dátum\"}},\"LowerBound\":{\"DateSpan\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"Now\":{}},\"Amount\":-1,\"TimeUnit\":0}},\"Amount\":1,\"TimeUnit\":0}},\"Amount\":-1,\"TimeUnit\":3}},\"TimeUnit\":0}},\"UpperBound\":{\"DateSpan\":{\"Expression\":{\"DateAdd\":{\"Expression\":{\"Now\":{}},\"Amount\":-1,\"TimeUnit\":0}},\"TimeUnit\":0}}}}}],\"OrderBy\":[{\"Direction\":1,\"Expression\":{\"Column\":{\"Expression\":{\"SourceRef\":{\"Source\":\"w\"}},\"Property\":\"Dátum\"}}}]},\"Binding\":{\"Primary\":{\"Groupings\":[{\"Projections\":[0,1,2]}]},\"DataReduction\":{\"DataVolume\":4,\"Primary\":{\"Window\":{\"Count\":1000}}},\"Version\":1}}}]},\"QueryId\":\"\"}],\"cancelQueries\":[],\"modelId\":3494954}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        });

        const json = await result.json();
        const text = JSON.stringify(json, null, 2);

        fs.writeFileSync(`./responses/${district}.json`, text);


        await wait(1000);
    }
})();
