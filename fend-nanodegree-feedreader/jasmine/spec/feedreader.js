/* feedreader.js */
$(function () {

    describe('RSS Feeds', () => {

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL defined in each object and that the URL is not empty.', () => {
            const is_url = str => {
                /*
                Check that a string appears to be an valid URL.
                Function source (modified): https://stackoverflow.com/a/15855457
                Original MIT: https://gist.github.com/dperini/729294
                */
                return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
            }
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
                expect(is_url(feed.url)).toBe(true);
            });
        });

        it('has a name defined in each object and that the name is not empty.', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });

    describe('The menu', () => {

        const theBody = document.body,
            menuIcon = document.querySelector('.menu-icon-link');

        it('is hidden by default.', () => {
            expect(theBody.classList.contains('menu-hidden')).toBe(true);
        });

        it('changes visibility when clicked.', () => {
            // Click menu on and off and check results.
            menuIcon.click();
            expect(theBody.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(theBody.classList.contains('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', () => {

        beforeEach(done => {
            // Pass a sample feed as an argument and wait for completion.
            loadFeed(0, done);
        });

        it('have loaded at least one entry into the feed.', () => {
            // Check sample feed was loaded.
            const theFeed = document.querySelectorAll('.feed .entry');
            expect(theFeed.length).not.toBe(0);
        });

    });

    describe('New Feed Selection', () => {

        const theFeed = [];

        beforeEach(done => {
            /*
            Pass the first feed into loadFeed(), when that is complete
            push the innerText to an array. Load a second feed and repeat.
            */
            loadFeed(0, () => {
                theFeed.push(document.querySelector('.feed .entry').innerText);
                loadFeed(1, () => {
                    theFeed.push(document.querySelector('.feed .entry').innerText);
                    done();
                });
            });
        });

        it('content actually changes when a new feed is loaded.', () => {
            // Compare the two samples.
            expect(theFeed.length).toBe(2);
            expect(theFeed[0] == theFeed[1]).toBe(false);
        });

    });

}());