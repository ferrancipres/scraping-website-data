
import { scrapeNews, scrapeNewsByPage } from '../src/scraper.js';

const testScrapeFunction = (scrapeFunction, functionName) => {
    describe(`Testing ${functionName}`, () => {
        let news;

        beforeAll(async () => {
            news = await scrapeFunction();
        });

        test('Should extract a non-empty array of news items', () => {
            expect(Array.isArray(news)).toBe(true);
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
};

testScrapeFunction(scrapeNews, 'scrapeNews');
testScrapeFunction(scrapeNewsByPage, 'scrapeNewsByPage');