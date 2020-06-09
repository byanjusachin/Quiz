const finalScore = document.getElementById('finalScore');
const obtainedScore = localStorage.getItem('obtainedScore');

finalScore.innerText = obtainedScore;