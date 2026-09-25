const teamCountButtons = Array.from(document.querySelectorAll('.count-btn'));
const teamsWrapper = document.getElementById('teamsWrapper');
const summaryPills = document.getElementById('summaryPills');

const fixedTeamPalette = ['#4CC9F0', '#5DD39E', '#FF7CC8', '#F8D75B', '#A78BFA', '#7DD3FC'];
let teamCount = 4;

function getFixedTeamColor(index) {
  return fixedTeamPalette[index % fixedTeamPalette.length];
}

function updateSummary() {
  const timer = Number(document.getElementById('timerDuration').value || 30);
  summaryPills.innerHTML = `
    <span>${teamCount} فرق</span>
    <span>${timer} ثانية</span>
    <span>مكافأة +10</span>
  `;
}

function updateTeamCountButtons() {
  teamCountButtons.forEach(button => {
    const isActive = Number(button.dataset.teamCount) === teamCount;
    button.classList.toggle('active', isActive);
  });
}

function generateTeams() {
  teamsWrapper.innerHTML = '';

  for (let i = 1; i <= teamCount; i++) {
    const teamBox = document.createElement('div');
    teamBox.className = 'team-box';

    teamBox.innerHTML = `
      <h3>الفريق ${i}</h3>
      <label>اسم الفريق:</label>
      <input type="text" class="team-name" placeholder="اكتب اسم الفريق" value="فريق ${i}">
    `;

    teamsWrapper.appendChild(teamBox);
  }
}

teamCountButtons.forEach(button => {
  button.addEventListener('click', () => {
    teamCount = Number(button.dataset.teamCount);
    updateTeamCountButtons();
    generateTeams();
    updateSummary();
  });
});

document.getElementById('timerDuration').addEventListener('change', updateSummary);

generateTeams();
updateTeamCountButtons();
updateSummary();

document.getElementById('startGameBtn').addEventListener('click', () => {
  const settings = {
    teamsCount: teamCount,
    teams: [],
    timerDuration: Number(document.getElementById('timerDuration').value || 30),
    timerAuto: true
  };

  const teamNames = document.querySelectorAll('.team-name');

  for (let i = 0; i < settings.teamsCount; i++) {
    settings.teams.push({
      name: teamNames[i].value || `فريق ${i + 1}`,
      color: getFixedTeamColor(i)
    });
  }

  localStorage.setItem('challengeSettings', JSON.stringify(settings));
  window.location.href = 'game.html';
});
