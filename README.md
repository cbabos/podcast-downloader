podcast-downloader (pdl) 
========================

This is a console-mode podcast downloader. 
Planned features: 
 - add podcasts based on URL
 - fetch new episodes and list them
 - fetch new episodes and download them
 - configure download path 
 - configure to run command after downloads 
 - async downloads so it can download multiple episodes at the same time

The main reason for creating this, is that I'm using `mpd` and `mpc` to handle and play audio files on my computer, and I wanted to automate the podcast downloading. I've plan to use this util with CRON so my system can check for new podcasts and download them, add them to my music library, and maybe I can manage a 'listened to' feature in the future.
