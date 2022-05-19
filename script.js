//4.Create functionality for topic-based searching and search for playlists or channels

const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyBNXA6AAT4RJXSLr4tExN1av7dCEdUtTLg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})


var myChannel="https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=AIzaSyBNXA6AAT4RJXSLr4tExN1av7dCEdUtTLg";
var anychannel="https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&forUsername=Googledevelopers&key=AIzaSyBNXA6AAT4RJXSLr4tExN1av7dCEdUtTLg";
var activity="https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=AIzaSyBNXA6AAT4RJXSLr4tExN1av7dCEdUtTLg";

//1. retrive a channel information
async function retrieveMyUploads(){
    try{
let out=await fetch(myChannel);
let output=await out.json();
console.log(output);
    }
    catch(error){
        console.log(error); // see result in console after clicking my CHANNEL BUTTON
    }
}

async function anychannelinfo(){//example:google channel
    try{

    let res=await fetch(anychannel);
    let result=await res.json();
    console.log(result);// see result in console after clicking google channel info
    }catch(error){
        console.log(error);
    }
}

//Create functionality to Retrieve Subscriptions and user activity.
async function activityinfo(){
    try{
        let res=await fetch(activity);
        let result=await res.json();
        console.log(result);// see result in console after clicking google activity info
    }catch(error){
        console.log(error);
    }

}   



/*function retrieveMyUploads() {
  var results = YouTube.Channels.list('contentDetails', {mine: true});
  for(var i in results.items) {
    var item = results.items[i];
    // Get the playlist ID, which is nested in contentDetails, as described in the
    // Channel resource: https://developers.google.com/youtube/v3/docs/channels
    var playlistId = item.contentDetails.relatedPlaylists.uploads;

    var nextPageToken = '';

    // This loop retrieves a set of playlist items and checks the nextPageToken in the
    // response to determine whether the list contains additional items. It repeats that process
    // until it has retrieved all of the items in the list.
    while (nextPageToken != null) {
      var playlistResponse = YouTube.PlaylistItems.list('snippet', {
        playlistId: playlistId,
        maxResults: 25,
        pageToken: nextPageToken
      });

      for (var j = 0; j < playlistResponse.items.length; j++) {
        var playlistItem = playlistResponse.items[j];
        Logger.log('[%s] Title: %s',
                   playlistItem.snippet.resourceId.videoId,
                   playlistItem.snippet.title);

      }
      nextPageToken = playlistResponse.nextPageToken;
    }
  }
}
*/
