import { scrapeNews } from '../src/scraper.js';
import { scrapeNewsByPage } from '../src/scraper.js';

describe('Scraper', () => {
    let news;

    beforeAll(async () => {
        news = await scrapeNews();
    });

    test('Should extract some news', () => {
        expect(news.length).toBeGreaterThan(0);
    });

    test('Each news item should have the expected properties', () => {
        news.forEach(item => {
            expect(item).toHaveProperty('rank');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('url');
            expect(item).toHaveProperty('score');
            expect(item).toHaveProperty('author');
            expect(item).toHaveProperty('age');
            expect(item).toHaveProperty('clickyHider');
            expect(item).toHaveProperty('comments');
        });
    });

    test('Rank, if present, should be a number', () => {
        news.forEach(item => {
            if (item.rank) {
                expect(Number.isInteger(parseInt(item.rank))).toBe(true);
            }
        });
    });

    test('URL should be valid', () => {
        news.forEach(item => {
            expect(item.url).toMatch(/^(http|https):\/\/[^ "]+$/);
        });
    });

    test('Score, if present, should be a number', () => {
        news.forEach(item => {
            if (item.score) {
                expect(Number.isInteger(parseInt(item.score))).toBe(true);
            }
        });
    });
});

describe('Scraper', () => {
    let news;

    beforeAll(async () => {
        news = await scrapeNewsByPage();
    });

    test('Each news item should have the expected properties', () => {
        news.forEach(item => {
            expect(item).toHaveProperty('rank');
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('url');
            expect(item).toHaveProperty('score');
            expect(item).toHaveProperty('author');
            expect(item).toHaveProperty('age');
            expect(item).toHaveProperty('clickyHider');
            expect(item).toHaveProperty('comments');
        });
    });

    test('Rank, if present, should be a number', () => {
        news.forEach(item => {
            if (item.rank) {
                expect(Number.isInteger(parseInt(item.rank))).toBe(true);
            }
        });
    });

    test('URL should be valid', () => {
        news.forEach(item => {
            expect(item.url).toMatch(/^(http|https):\/\/[^ "]+$/);
        });
    });

    test('Score, if present, should be a number', () => {
        news.forEach(item => {
            if (item.score) {
                expect(Number.isInteger(parseInt(item.score))).toBe(true);
            }
        });
    });
});