// main.js (timeline結合用)
const jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', 'data.csv');
  }
});

const timeline = [
  {
    type: jsPsychHtmlButtonResponse,
    stimulus: '実験を開始します',
    choices: ['OK']
  },
];

function uploadData(filename, csvData) {
        fetch("/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: filename, data: csvData })
        })
        .then(response => response.text())
        .then(result => {
          console.log("Upload success:", result);
        })
        .catch(err => console.error("Upload error:", err));
      } 

// 各フェーズを追加
timeline.push(intro1);
timeline.push(intro2);
timeline.push(intro3_id);
timeline.push(intro4);
timeline.push(practice_intro);
timeline.push(createPractice(jsPsych));
timeline.push(createSurvey(jsPsych));
timeline.push(outro);

// 実行
jsPsych.run(timeline);

