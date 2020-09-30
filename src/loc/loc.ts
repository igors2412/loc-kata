import * as fs from 'fs';
import { ICalculatorResult } from './models';

export class LinesOfCodeCalculator {
    private readonly lineBreakDelimiter = '\n';
    private readonly returnDelimiter = '\r';
    private readonly singleLineCommentDelimiter = '//';
    private readonly multiLineCommentDelimiter = '/*';

    async analyseFile(path: string): Promise<ICalculatorResult | null> {
        try {
            const fileResult = await fs.promises.readFile(path, { encoding: 'utf-8' });
            const codeLines = this.fileContentToLineArray(fileResult);

            const numberOfEmptyLines = codeLines.filter((l) => this.isWhitespaceLine(l)).length;
            const numberOfCommentLines = codeLines.filter((l) => this.isCommentLine(l)).length;

            const result: ICalculatorResult = {
                executableLines: codeLines.length - numberOfEmptyLines - numberOfCommentLines,
                commentLines: numberOfCommentLines,
                whitespaceLines: numberOfEmptyLines,
            };
            return result;
        } catch (error) {
            console.error('Error: No file found under given path.');
            return null;
        }
    }

    private fileContentToLineArray(fileContent: string): string[] {
        if (fileContent === null || fileContent.length === 0) {
            return [];
        }

        return fileContent.split(this.lineBreakDelimiter).map((line) => line.trim());
    }

    private isWhitespaceLine(line: string): boolean {
        return ['', null, this.lineBreakDelimiter, this.returnDelimiter].includes(line);
    }

    private isCommentLine(line: string): boolean {
        return line.startsWith(this.singleLineCommentDelimiter) || line.startsWith(this.multiLineCommentDelimiter);
    }
}
