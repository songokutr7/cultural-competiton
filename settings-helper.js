// عناصر HTML
const teamsCountSelect = document.getElementById("teamsCount");
const teamsWrapper = document.getElementById("teamsWrapper");

// تشغيل توليد الفرق عند تغيير العدد
teamsCountSelect.addEventListener("change", generateTeams);

// دالة توليد الفرق
function generateTeams() {
  const count = parseInt(teamsCountSelect.value);
  teamsWrapper.innerHTML = ""; // يمسح القديم

  for (let i = 1; i <= count; i++) {
    const teamBox = document.createElement("div");
    teamBox.className = "team-box";

    teamBox.innerHTML = `
      <h3>الفريق ${i}</h3>

      <label>اسم الفريق:</label>
      <input type="text" class="team-name" placeholder="اكتب اسم الفريق">

      <label>لون الفريق:</label>
      <select class="team-color">
        <option value="#3ABEF9">أزرق سماوي</option>
        <option value="#4ADE80">أخضر منت</option>
        <option value="#F472B6">وردي فاتح</option>
        <option value="#FACC15">أصفر مشرق</option>
        <option value="#A78BFA">بنفسجي ناعم</option>
      </select>
    `;

    teamsWrapper.appendChild(teamBox);
  }
}

// تشغيل أول مرة
generateTeams();


// زر بدء اللعبة
document.getElementById("startGameBtn").addEventListener("click", () => {
  const settings = {
    teamsCount: parseInt(teamsCountSelect.value),
    teams: [],
    showPoints: document.getElementById("showPointsSwitch").checked,
    showPenalties: document.getElementById("showPenaltiesSwitch").checked,
    latePenalty: document.getElementById("latePenaltySwitch").checked,
    timePenalty: document.getElementById("timePenaltySwitch").checked,
    timerDuration: parseInt(document.getElementById("timerDuration").value),
    timerAuto: document.getElementById("timerModeSwitch").checked
  };

  // حفظ بيانات الفرق
  const teamNames = document.querySelectorAll(".team-name");
  const teamColors = document.querySelectorAll(".team-color");

  for (let i = 0; i < settings.teamsCount; i++) {
    settings.teams.push({
      name: teamNames[i].value || `فريق ${i + 1}`,
      color: teamColors[i].value
    });
  }

  // حفظ الإعدادات في التخزين المحلي
  localStorage.setItem("challengeSettings", JSON.stringify(settings));

  // الانتقال لصفحة اللعبة
  window.location.href = "game.html";
});
سس