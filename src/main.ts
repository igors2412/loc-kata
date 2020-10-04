import { LinesOfCodeCalculator } from './loc/loc';

const loc = new LinesOfCodeCalculator();
const testFilePath = './test-data/t7.cs';

console.log(`Parsing file "${testFilePath}"...`);

loc.analyzeFile(testFilePath).then((result) => {
    console.log('Parsing complete.');

    if (result === null) {
        console.error('An error occured while parsing the file.');
    } else {
        console.log(`Total lines of code: ${result.executableLines + result.whitespaceOrCommentLines}`);
        console.log(`Executable lines: ${result.executableLines}.`);
        console.log(`Commented or whitespace lines: ${result.whitespaceOrCommentLines}`);
    }
});
