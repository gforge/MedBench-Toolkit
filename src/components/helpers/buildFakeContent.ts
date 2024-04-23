import { faker } from '@faker-js/faker';

export const buildFakeContent = (length?: number): string => {
    const content = [];
    length = length ?? faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < length; i++) {
        let headerLevel = '##';
        if (i > 0 && faker.number.binary() === '1') {
            headerLevel = '###';
        }
        content.push(`${headerLevel} ${faker.lorem.sentence(2)}`);
        content.push(
            faker.lorem.paragraph(faker.number.int({ min: 1, max: 5 }))
        );
    }

    return content.join('\n\n');
};
