/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    var feedOne,
        feedTwo;
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', function(){
            // for (var i = 0; i < allFeeds.length; i++){
            //     expect(allFeeds[i].url).toBeDefined();
            //     expect(allFeeds[i].url.length).not.toBe(0);
            // };
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function(){
            // for (var i = 0; i < allFeeds.length; i++){
            //     expect(allFeeds[i].name).toBeDefined();
            //     expect(allFeeds[i].name.length).not.toBe(0);
            // };
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });

    });


    /* Test suite named "The menu" */

    describe('The menu', function () {

        /* Test that ensures the menu element is
        * hidden by default.
        */

        it('hamburger menu items are hidden', function(){
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */

        it('hamburger menu toggle working on click', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

    });
    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* Test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */

        it('entry has more than 0 entries', function () {
            let feedContainer = document.querySelector('div.feed');
            let entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    /* Test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {

        beforeEach(function (done) {
            loadFeed(0, function() {
                feedOne = document.querySelector('div.feed').innerHTML;
                loadFeed(1, function (){
                    feedTwo = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
        * by the loadFeed function, than the content actually changes.
        */

        it('new feed different than previous one', function() {
            expect(feedOne).not.toBe(feedTwo);
        });
    });

}());
