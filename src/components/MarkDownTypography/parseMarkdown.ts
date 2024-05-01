export type MarkdownSection = {
    header: string;
    level: number;
    content: string[];
    sections: MarkdownSection[];
};

// Helper function to count number of hash symbols to determine the level
const countHashes = (header: string): number => {
    const match = /^#+/.exec(header);
    return match ? match[0].length : 0;
};

/**
 * Parses a Markdown content and returns an array of Markdown sections.
 * Each section represents a header and its corresponding content.
 *
 * @param content - The Markdown content to parse.
 * @returns An array of MarkdownSection objects representing the parsed sections.
 */
export const parseMarkdown = (
    content: string
): { baseContent: string[]; sections: MarkdownSection[] } => {
    const lines = content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    const rootSections: MarkdownSection[] = [];
    const stack: MarkdownSection[] = [];
    const baseContent: string[] = [];

    lines.forEach((line) => {
        const level = countHashes(line);

        if (level > 0) {
            // It's a header
            const newSection: MarkdownSection = {
                header: line,
                level: level,
                content: [],
                sections: [],
            };

            // Manage the stack for proper nesting
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop(); // Pop until finding a level less than the current level
            }

            if (stack.length === 0) {
                rootSections.push(newSection); // No parent, add to root
            } else {
                stack[stack.length - 1].sections.push(newSection); // Nest inside the last section on the stack
            }

            stack.push(newSection); // Push the new section onto the stack
        } else if (stack.length > 0) {
            stack[stack.length - 1].content.push(line); // Add non-header lines to the content of the current section
        } else {
            baseContent.push(line);
        }
    });

    return {
        baseContent,
        sections: rootSections,
    };
};
