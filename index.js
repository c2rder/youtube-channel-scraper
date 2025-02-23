const { google } = require('googleapis');

async function youtubeVideoLinks(channelId, apiKey, maxResults = 50) {
  try {
    const youtube = google.youtube('v3');
    let videoLinks = [];
    let nextPageToken;

    do {
      const response = await youtube.search.list({
        key: apiKey,
        part: 'snippet',
        channelId: channelId,
        type: 'video',
        maxResults: maxResults,
        pageToken: nextPageToken
      });

      if (response.data.items) {
        response.data.items.forEach(item => {
          const videoId = item.id.videoId;
          const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
          videoLinks.push(videoLink);
        });
      }

      nextPageToken = response.data.nextPageToken;

    } while (nextPageToken)

    videoLinks.forEach(link => console.log(link));

  } catch (error) {
    console.error('Hata:', error);
  }
}

const channelId = 'UCjpcHM47hRe2TCA6symePng'; // channel id
const apiKey = 'AIzaSyBK_vc_iyx-FE6GwwdKIKvyiFD8oHcD9Io'; // youtube api
youtubeVideoLinks(channelId, apiKey);
