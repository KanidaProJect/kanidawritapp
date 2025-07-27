// js/storySetup.js

export function askStorySetup(callback) {
  const total = prompt("นิยายเรื่องนี้จะมีกี่ตอนโดยประมาณ?");
  const duration = prompt("ใช้เวลาสมมุติในเรื่องกี่วัน / เดือน / ปี?");
  const episodes = [];

  for (let i = 1; i <= Number(total); i++) {
    episodes.push({
      title: `ตอนที่ ${i}`,
      timeframe: `ตอนที่ ${i} ของ ${duration}`,
      strings: {
        couple: "",
        antagonist: "",
        support: "",
        twist: "",
        setting: ""
      }
    });
  }

  const projectData = {
    meta: {
      totalEpisodes: Number(total),
      storyDuration: duration
    },
    episodes
  };

  callback(projectData);
}
