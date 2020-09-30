import { LinesOfCodeCalculator } from './loc/loc';

const loc = new LinesOfCodeCalculator();
const testFilePath = './test-data/t1.cs';

console.log(`Parsing file "${testFilePath}"...`);

loc.analyseFile(testFilePath).then((result) => {
    console.log('Parsing complete.');

    if (result === null) {
        console.error('An error occured while parsing the file.');
    } else {
        console.log(`Total lines of code: ${result.executableLines + result.commentLines + result.whitespaceLines}`);
        console.log(`Executable lines: ${result.executableLines}.`);
        console.log(`Commented lines: ${result.commentLines}`);
        console.log(`Empty or whitespace lines: ${result.whitespaceLines}`);
    }
});
