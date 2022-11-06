const APIKEY = "AIzaSyBhA2x3hP8bIcL1CwTy1fX2k6Sii-YGWBs";

const chn = "https://www.youtube.com/c/ukitivi"

let temp;

const loadVideos = async (id) => {
    console.log(id) 
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&channelId=${id}&part=snippet,id&order=date&maxResults=20`)
    const data = await res.json()
    console.log(data);
}

const loadChannelId = async (channel_url) => {
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
    loadVideos(json.id);
}
