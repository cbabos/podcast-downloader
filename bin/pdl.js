#!/usr/bin/env node
var pp = require('podchoosee-parser');
var path = require('path');
var fs = require('fs');


var PodcastDownloader = function () {
    var podcast_url = process.argv[3];
    var feedFile = path.join(__dirname, 'feeds.json');
    var feeds;

    try {
        feeds = require(feedFile);
    } catch (e) {
        feeds = {};
    }
    
    var saveSubscription = function(parsed_feed) {
        var feed = feeds[podcast_url] || {};
        feed.title = parsed_feed.subscription.title;
        feed.episodes = feed.episodes || [];

        feed.episodes = parsed_feed.episodes.sort(function(a, b) {
            var aTime = new Date(a.pubDate).getTime(); 
            var bTime = new Date(b.pubDate).getTime(); 
            if (aTime > bTime) {
                return 1;
            } else if (aTime === bTime) {
                return 0;
            } else {
                return -1;
            }
        }).map(function(ep, index) {
            // Until we write the ES6 version 
            var findEp = function(episodes, epKey) {
                var epIndex = undefined;
                episodes.forEach(function(episode, index) {
                    if (episode.title === epKey) {
                        epIndex = index;   
                    }
                });

                if (epIndex !== undefined) {
                    return episodes[epIndex];
                }
                return epIndex;
            };

            return findEp(feed.episodes, ep.title) || {
                title: ep.title,
                episode: index + 1,
                date: ep.pubDate,
                downloaded: false,
                url: ep.mediaFileUrl
            };
        });

        feeds[podcast_url] = feed;
    };
        
    var saveFeeds = function() {
        fs.writeFile(feedFile,
            JSON.stringify(feeds, null, '  '));
    }

    this.add = function(url) {
        podcast_url = url || podcast_url;
        pp.getSubscription(podcast_url, {}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                saveSubscription(response);
                saveFeeds();
            }
        });
    }

};

var pdl = new PodcastDownloader(process.argv[3]);

if (typeof pdl[process.argv[2]] === "function") {
    pdl[process.argv[2]]();
} else {
    pdl.add(process.argv[2]);
}

