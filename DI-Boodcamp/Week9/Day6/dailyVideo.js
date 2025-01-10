class Video {
    constructor(title, uploader, time) {
      this.title = title;
      this.uploader = uploader;
      this.time = time;
    }
    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
      }
    }

    const bill = new Video('JS Adv', "Bill", 5);
    bill.watch();

    const kiHun = new Video('squid game', 'Son Ki Hun', 2)
    kiHun.watch();

    const videoData = [
        { title: 'JS Basics', uploader: 'Garri', time: 120 },
        { title: 'Node.js Advanced', uploader: 'Tom', time: 200 },
        { title: 'React Tutorial', uploader: 'Charlie', time: 150 },
        { title: 'Vue.js', uploader: 'Albus', time: 180 },
        { title: 'JavaScript', uploader: 'Severus', time: 240 }
      ];

//1 bonus
const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));

    videos.forEach(video => video.watch());

//2 bonus
 const videos = [];


videoData.forEach(data => {
  const videoInstance = new Video(data.title, data.uploader, data.time);
  videos.push(videoInstance); 
});

videos.forEach(video => video.watch());