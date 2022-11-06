const APIKEY = "AIzaSyBhA2x3hP8bIcL1CwTy1fX2k6Sii-YGWBs";

const chn = "https://www.youtube.com/c/Officialfromis9"

let temp;

/**
 * 
 * @param {object} video title, description, thumbnail, videoUrl, date
 * @returns return html element
 */
const loadVideoHtml = (video) => {
    let videoElement = document.createElement("div");
    videoElement.classList.add("video");
    videoElement.classList.add("video-container");
    

    const videoHtml = `
        <div class="video-preview">
            <img class="video-thumbnail" src="${video.thumbnail}">
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-detail">
                    <span class="video-description">${video.description}</span>
                    <span class="video-date">날짜 : ${video.date} </span>
                </div>
            </div>
            <div class="video-toggle-md">
                <div class="video-toggle-btn">
                    🔽
                </div>
            </div>
        </div>
        <iframe class="video video-youtube" width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="${video.videoUrl}"></iframe>
        <div class="video-write">
            <div class="video-write-md" contenteditable="true"></div>
            <div class="video-write-view markdown-body"></div>
        </div>
    `
    videoElement.innerHTML = videoHtml;

    return videoElement;
}
/**
 * 
 * @param {string} videoId 
 * @returns 
 */
const loadVideoInfo = async (videoId) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const video = data.items[0].snippet;
    const videoInfo = {
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnails.high.url,
        videoUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        date: video.publishedAt
    }
    return videoInfo;
}


/**
 * 
 * @param {int} id 
 */
const loadVideos = async (id) => {
    console.log(id) 
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&channelId=${id}&part=snippet,id&order=date&maxResults=20`)
    const data = await res.json()
    console.log(data);
    const videos = data.items;

    // wait for all video list to load and add to html
    const videoList = await Promise.all(videos.map(async (video) => {
        const videoInfo = await loadVideoInfo(video.id.videoId);
        const videoElement = loadVideoHtml(videoInfo);
        return videoElement;
    }));

    const videoContainer = document.querySelector(".container");
    videoContainer.innerHTML = "";
    videoList.forEach(video => {
        videoContainer.appendChild(video);
    });
    return true;
}

/**
 * 
 * @param {string} channel_url 
 */
const loadChannelId = async (channel_url, callback) => {
    const name = channel_url.split("/").pop()
    const res = await fetch('http://localhost:3000/youtube/channel/id?name=' + name, {
        method: 'GET',
        // mode: 'no-cors',
        // responseType: 'json',
        
        headers: {
            'Accept': 'application/json',
        }
    })
    const json = await res.json();
    await loadVideos(json.id);
    callback();
}
