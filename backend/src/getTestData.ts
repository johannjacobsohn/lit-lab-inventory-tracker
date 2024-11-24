import fs from 'fs';
import path from 'path';

function getTestData() {
    const filePath = path.resolve(__dirname, '../testdata/data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
}

export default getTestData;