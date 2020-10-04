// https://ccd-school.de/en/coding-dojo/function-katas/loc/

import * as fs from 'fs';
import { ICalculatorResult } from './models';

export class LinesOfCodeCalculator {
    private readonly lineBreakDelimiter = '\n';
    private readonly returnDelimiter = '\r';
    private readonly singleLineCommentDelimiter = '//';
    private readonly multiLineCommentStartDelimiter = '/*';
    private readonly multiLineCommentEndDelimiter = '*/';

    async analyzeFile(path: string): Promise<ICalculatorResult | null> {
        try {
            const fileResult = await fs.promises.readFile(path, { encoding: 'utf-8' });
            return this.analyzeCode(fileResult);
        } catch (error) {
            console.error('Error: No file found under given path.');
            return null;
        }
    }

    analyzeCode(codeContent: string): ICalculatorResult {
        const codeLines = this.codeContentToLineArray(codeContent);
        return this.analyzeLines(codeLines);
    }

    private codeContentToLineArray(fileContent: string | null): string[] {
        if (fileContent === null || fileContent.length === 0) {
            return [];
        }

        return fileContent.split(this.lineBreakDelimiter).map((line) => line.trim());
    }

    private analyzeLines(codeLines: string[]): ICalculatorResult {
        let whitespaceOrCommentLines = 0;
        let isMultiCommentLineStart = false;

        for (let i = 0; i < codeLines.length; i++) {
            const line = codeLines[i];

            if (this.isStartOfMultiLineComment(line)) {
                isMultiCommentLineStart = true;
            }

            // TODO: refactor to one statement
            if (this.isWhitespaceLine(line)) {
                whitespaceOrCommentLines++;
                continue;
            }
            if (this.isFullCommentLine(line)) {
                whitespaceOrCommentLines++;
                continue;
            }
            if (isMultiCommentLineStart && this.isNestedMultiLineComment(line)) {
                whitespaceOrCommentLines++;
            }
            if (this.isEndOfMultiLineComment(line)) {
                isMultiCommentLineStart = false;
            }
        }

        return {
            executableLines: codeLines.length - whitespaceOrCommentLines,
            whitespaceOrCommentLines: whitespaceOrCommentLines,
        };
    }

    private isFullCommentLine(line: string): boolean {
        return (
            line.startsWith(this.singleLineCommentDelimiter) ||
            (line.startsWith(this.multiLineCommentStartDelimiter) &&
                !line.includes(this.multiLineCommentEndDelimiter)) ||
            (line.startsWith(this.multiLineCommentStartDelimiter) && line.endsWith(this.multiLineCommentEndDelimiter))
        );
    }

    private isWhitespaceLine(line: string): boolean {
        return ['', null, this.lineBreakDelimiter, this.returnDelimiter].includes(line);
    }

    private isStartOfMultiLineComment(line: string): boolean {
        return (
            line.includes(this.multiLineCommentStartDelimiter) &&
            line.lastIndexOf(this.multiLineCommentEndDelimiter) < line.lastIndexOf(this.multiLineCommentStartDelimiter)
        );
    }

    private isEndOfMultiLineComment(line: string): boolean {
        return line.includes(this.multiLineCommentEndDelimiter);
    }

    private isNestedMultiLineComment(line: string): boolean {
        return (
            (!line.includes(this.multiLineCommentStartDelimiter) &&
                !line.includes(this.multiLineCommentEndDelimiter)) ||
            line.endsWith(this.multiLineCommentEndDelimiter) ||
            (!line.includes(this.multiLineCommentEndDelimiter) && line.startsWith(this.multiLineCommentStartDelimiter))
        );
    }
}
