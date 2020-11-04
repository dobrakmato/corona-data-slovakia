const jsonata = require('jsonata');
const fs = require('fs');

const transform = jsonata(`$.results[0].result.data.dsr.DS[0].PH[0].DM0.$merge([{"timestamp": 0, "new_cases": 0}, {"timestamp": C[0], "new_cases": C[1]}])`);
let globalSql = 'DROP TABLE IF EXISTS  new_cases;\nCREATE TABLE new_cases (timestamp date, district varchar(64), new_cases int);\n';

for (const file of fs.readdirSync('./responses')) {

    console.log(`Transforming file ${file}...`);

    const buff = fs.readFileSync('./responses/' + file, 'utf8');
    const text = buff.toString();

    const json = JSON.parse(text);
    const transformed = transform.evaluate(json);

    let sql = 'INSERT INTO new_cases (timestamp, district, new_cases) VALUES \n';

    // clean up transformer json
    for (let i = 0; i < transformed.length; i++) {
        if (typeof transformed[i].new_cases === 'string') {
            transformed[i].new_cases = parseInt(transformed[i].new_cases.replace('L', ''));
        }

        const sqlDate = new Date(transformed[i].timestamp);
        transformed[i].timestamp /= 1000;

        sql += `  ('${sqlDate.toISOString().slice(0, 10)}', '${file.replace('.json', '')}', ${transformed[i].new_cases}),\n`;
    }

    sql = sql.substring(0, sql.length - 2) + ';\n';
    globalSql += sql;

    fs.writeFileSync(`./output/${file.replace('.json', '.sql')}`, sql);
    fs.writeFileSync(`./output/${file}`, JSON.stringify(transformed, null, 2));
}

fs.writeFileSync(`./output/all.sql`, globalSql);
