// Dane gracza
let player = {
  name: "Bohater",
  level: 1,
  exp: 0,
  hp: 100,
  maxHp: 100,
  gold: 100,
  stats: {
    strength: 5,
    stamina: 5,
    intelligence: 5,
    agility: 5
  },
  inventory: []
};

let currentScreen = "missions";

// Wyświetlanie statystyk gracza
function updateStats() {
  document.getElementById("player-stats").innerHTML = `
    <p>${player.name} | LvL: ${player.level}</p>
    <p>HP: ${player.hp}/${player.maxHp}</p>
    <p>Gold: ${player.gold} | Exp: ${player.exp}</p>
    <p>Siła: ${player.stats.strength}, Kondycja: ${player.stats.stamina}, 
    Inteligencja: ${player.stats.intelligence}, Intuicja: ${player.stats.agility}</p>
  `;
}

// Misje czasowe
const missions = [
  { name: "Patrol po mieście", time: 5, reward: { exp: 10, gold: 20 } },
  { name: "Wyprawa do lasu", time: 15, reward: { exp: 30, gold: 50 } },
  { name: "Walka w lochu", time: 30, reward: { exp: 80, gold: 100 } }
];

// Potwory
const monsters = [
  { name: "Szczur", hp: 30, dmg: 5, exp: 20, gold: 10 },
  { name: "Goblin", hp: 60, dmg: 10, exp: 50, gold: 30 },
  { name: "Smok", hp: 150, dmg: 25, exp: 200, gold: 100 }
];

function showScreen(screen) {
  currentScreen = screen;
  let html = "";

  if (screen === "missions") {
    html = "<h2>Misje</h2>";
    missions.forEach((m, i) => {
      html += `<button onclick="startMission(${i})">${m.name} (${m.time}s)</button><br>`;
    });
  }

  if (screen === "fight") {
    html = "<h2>Walka</h2>";
    monsters.forEach((m, i) => {
      html += `<button onclick="fight(${i})">Walcz z ${m.name}</button><br>`;
    });
  }

  if (screen === "shop") {
    html = "<h2>Sklep</h2><p>(wkrótce)</p>";
  }

  if (screen === "inventory") {
    html = "<h2>Ekwipunek</h2><p>(wkrótce)</p>";
  }

  if (screen === "profile") {
    html = `<h2>Profil</h2><p>Gracz: ${player.name}</p>`;
  }

  document.getElementById("screen").innerHTML = html;
  updateStats();
}

// Misje czasowe
function startMission(i) {
  let m = missions[i];
  document.getElementById("screen").innerHTML = `<p>W trakcie: ${m.name}...</p>`;
  setTimeout(() => {
    player.exp += m.reward.exp;
    player.gold += m.reward.gold;
    document.getElementById("screen").innerHTML = `<p>Misja zakończona! Nagroda: ${m.reward.exp} exp, ${m.reward.gold} gold</p>`;
    updateStats();
  }, m.time * 1000);
}

// Walka
function fight(i) {
  let monster = { ...monsters[i] };
  let log = `<h3>Walka z ${monster.name}</h3><p>HP: ${monster.hp}</p>`;
  while (monster.hp > 0 && player.hp > 0) {
    // atak gracza
    let dmg = player.stats.strength + Math.floor(Math.random() * 5);
    monster.hp -= dmg;
    log += `<p>Zadałeś ${dmg} dmg. Potwór ma ${monster.hp > 0 ? monster.hp : 0} HP.</p>`;

    if (monster.hp <= 0) {
      log += `<p>Pokonałeś ${monster.name}! Zdobywasz ${monster.exp} exp i ${monster.gold} gold.</p>`;
      player.exp += monster.exp;
      player.gold += monster.gold;
      break;
    }

    // atak potwora
    let enemyDmg = monster.dmg;
    player.hp -= enemyDmg;
    log += `<p>${monster.name} zadał Ci ${enemyDmg} dmg. Masz ${player.hp > 0 ? player.hp : 0} HP.</p>`;

    if (player.hp <= 0) {
      log += "<p>Zostałeś pokonany!</p>";
      break;
    }
  }
  document.getElementById("screen").innerHTML = log;
  updateStats();
}

showScreen("missions");
