// ============================================================
//  DATA
// ============================================================
const GROUPS = {
  A: { teams: [
    {name:'México',flag:'🇲🇽',fifaPoints:1700},{name:'África do Sul',flag:'🇿🇦',fifaPoints:1450},
    {name:'Coreia do Sul',flag:'🇰🇷',fifaPoints:1480},{name:'Tchéquia',flag:'🇨🇿',fifaPoints:1570}
  ]},
  B: { teams: [
    {name:'Canadá',flag:'🇨🇦',fifaPoints:1420},{name:'Bósnia e Herzegovina',flag:'🇧🇦',fifaPoints:1510},
    {name:'Catar',flag:'🇶🇦',fifaPoints:1430},{name:'Suíça',flag:'🇨🇭',fifaPoints:1690}
  ]},
  C: { teams: [
    {name:'Brasil',flag:'🇧🇷',fifaPoints:1825},{name:'Marrocos',flag:'🇲🇦',fifaPoints:1710},
    {name:'Haiti',flag:'🇭🇹',fifaPoints:1350},{name:'Escócia',flag:'🏴',fifaPoints:1630}
  ]},
  D: { teams: [
    {name:'Estados Unidos',flag:'🇺🇸',fifaPoints:1645},{name:'Paraguai',flag:'🇵🇾',fifaPoints:1550},
    {name:'Austrália',flag:'🇦🇺',fifaPoints:1540},{name:'Turquia',flag:'🇹🇷',fifaPoints:1640}
  ]},
  E: { teams: [
    {name:'Alemanha',flag:'🇩🇪',fifaPoints:1745},{name:'Curaçao',flag:'🇨🇼',fifaPoints:1250},
    {name:'Costa do Marfim',flag:'🇨🇮',fifaPoints:1530},{name:'Equador',flag:'🇪🇨',fifaPoints:1590}
  ]},
  F: { teams: [
    {name:'Países Baixos',flag:'🇳🇱',fifaPoints:1780},{name:'Japão',flag:'🇯🇵',fifaPoints:1670},
    {name:'Suécia',flag:'🇸🇪',fifaPoints:1600},{name:'Tunísia',flag:'🇹🇳',fifaPoints:1500}
  ]},
  G: { teams: [
    {name:'Bélgica',flag:'🇧🇪',fifaPoints:1795},{name:'Egito',flag:'🇪🇬',fifaPoints:1470},
    {name:'Irã',flag:'🇮🇷',fifaPoints:1650},{name:'Nova Zelândia',flag:'🇳🇿',fifaPoints:1340}
  ]},
  H: { teams: [
    {name:'Espanha',flag:'🇪🇸',fifaPoints:1755},{name:'Cabo Verde',flag:'🇨🇻',fifaPoints:1400},
    {name:'Arábia Saudita',flag:'🇸🇦',fifaPoints:1490},{name:'Uruguai',flag:'🇺🇾',fifaPoints:1720}
  ]},
  I: { teams: [
    {name:'França',flag:'🇫🇷',fifaPoints:1835},{name:'Senegal',flag:'🇸🇳',fifaPoints:1660},
    {name:'Iraque',flag:'🇮🇶',fifaPoints:1280},{name:'Noruega',flag:'🇳🇴',fifaPoints:1610}
  ]},
  J: { teams: [
    {name:'Argentina',flag:'🇦🇷',fifaPoints:1850},{name:'Argélia',flag:'🇩🇿',fifaPoints:1580},
    {name:'Áustria',flag:'🇦🇹',fifaPoints:1620},{name:'Jordânia',flag:'🇯🇴',fifaPoints:1320}
  ]},
  K: { teams: [
    {name:'Portugal',flag:'🇵🇹',fifaPoints:1770},{name:'RD Congo',flag:'🇨🇩',fifaPoints:1240},
    {name:'Uzbequistão',flag:'🇺🇿',fifaPoints:1300},{name:'Colômbia',flag:'🇨🇴',fifaPoints:1680}
  ]},
  L: { teams: [
    {name:'Inglaterra',flag:'🏴',fifaPoints:1810},{name:'Croácia',flag:'🇭🇷',fifaPoints:1730},
    {name:'Gana',flag:'🇬🇭',fifaPoints:1520},{name:'Panamá',flag:'🇵🇦',fifaPoints:1380}
  ]}
};
function getFlagCode(team) {
  if (team.name === 'Inglaterra') return 'gb-eng';
  if (team.name.startsWith('Esc')) return 'gb-sct';

  const points = Array.from(team.flag || '');
  if (points.length < 2) return '';

  const letters = points
    .slice(0, 2)
    .map(char => char.codePointAt(0) - 0x1F1E6 + 97);

  if (letters.some(code => code < 97 || code > 122)) return '';
  return String.fromCharCode(...letters);
}

function flagMarkup(team, className = 'flag') {
  const code = getFlagCode(team);
  const fallback = team.flag || '⚑';

  if (!code) return `<span class="${className} flag-placeholder">${fallback}</span>`;

  return `<span class="${className}" title="${team.name}">
    <img src="https://flagcdn.com/${code}.svg" alt="${team.name}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${fallback}'))">
  </span>`;
}

// Generate matches for all phases
function generateMatches() {
  const matches = [];
  let id = 1;

  const GROUP_DATES = {
    A: ['2026-06-11T16:00','2026-06-18T22:00','2026-06-24T22:00','2026-06-24T22:00','2026-06-18T13:00','2026-06-11T23:00'],
    B: ['2026-06-12T16:00','2026-06-18T19:00','2026-06-24T16:00','2026-06-24T16:00','2026-06-18T16:00','2026-06-13T16:00'],
    C: ['2026-06-13T19:00','2026-06-19T21:30','2026-06-24T19:00','2026-06-24T19:00','2026-06-19T19:00','2026-06-13T22:00'],
    D: ['2026-06-12T22:00','2026-06-19T16:00','2026-06-25T23:00','2026-06-25T23:00','2026-06-20T00:00','2026-06-14T01:00'],
    E: ['2026-06-14T14:00','2026-06-20T17:00','2026-06-25T17:00','2026-06-25T17:00','2026-06-20T21:00','2026-06-14T20:00'],
    F: ['2026-06-14T17:00','2026-06-20T14:00','2026-06-25T20:00','2026-06-25T20:00','2026-06-21T01:00','2026-06-14T23:00'],
    G: ['2026-06-15T16:00','2026-06-21T16:00','2026-06-27T00:00','2026-06-27T00:00','2026-06-21T22:00','2026-06-15T22:00'],
    H: ['2026-06-15T13:00','2026-06-21T13:00','2026-06-26T21:00','2026-06-26T21:00','2026-06-21T19:00','2026-06-15T19:00'],
    I: ['2026-06-16T16:00','2026-06-22T18:00','2026-06-26T16:00','2026-06-26T16:00','2026-06-22T21:00','2026-06-16T19:00'],
    J: ['2026-06-16T22:00','2026-06-22T14:00','2026-06-27T23:00','2026-06-27T23:00','2026-06-23T00:00','2026-06-17T01:00'],
    K: ['2026-06-17T14:00','2026-06-23T14:00','2026-06-27T20:30','2026-06-27T20:30','2026-06-23T23:00','2026-06-17T23:00'],
    L: ['2026-06-17T17:00','2026-06-23T17:00','2026-06-27T18:00','2026-06-27T18:00','2026-06-23T20:00','2026-06-17T20:00']
  };

  Object.entries(GROUPS).forEach(([g, data]) => {
    const teams = data.teams;
    const dates = GROUP_DATES[g] || [];
    let matchIdx = 0;
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: id++,
          phase: 'Grupos',
          group: g,
          homeRef: null,
          awayRef: null,
          home: teams[i],
          away: teams[j],
          date: dates[matchIdx] || null,
          label: `Grupo ${g}`
        });
        matchIdx++;
      }
    }
  });

  const KO_DATES = {
    73:'2026-06-28T16:00',74:'2026-06-29T17:30',75:'2026-06-29T22:00',76:'2026-06-29T14:00',
    77:'2026-06-30T18:00',78:'2026-06-30T14:00',79:'2026-06-30T22:00',80:'2026-07-01T13:00',
    81:'2026-07-01T21:00',82:'2026-07-01T17:00',83:'2026-07-02T20:00',84:'2026-07-02T16:00',
    85:'2026-07-03T00:00',86:'2026-07-03T19:00',87:'2026-07-03T22:30',88:'2026-07-03T15:00',
    89:'2026-07-04T18:00',90:'2026-07-04T14:00',91:'2026-07-05T17:00',92:'2026-07-05T21:00',
    93:'2026-07-06T16:00',94:'2026-07-06T21:00',95:'2026-07-07T13:00',96:'2026-07-07T17:00',
    97:'2026-07-09T17:00',98:'2026-07-10T16:00',99:'2026-07-11T18:00',100:'2026-07-11T22:00',
    101:'2026-07-14T16:00',102:'2026-07-15T16:00',103:'2026-07-18T18:00',104:'2026-07-19T16:00'
  };

  const add = (matchId, phase, homeRef, awayRef, label) => {
    matches.push({
      id: matchId,
      phase,
      group: null,
      homeRef,
      awayRef,
      home: placeholderTeam(homeRef),
      away: placeholderTeam(awayRef),
      date: KO_DATES[matchId] || null,
      label
    });
  };

  add(73, '32avos', '2A', '2B', 'Fase de 32');
  add(74, '32avos', '1E', '3ABCDF', 'Fase de 32');
  add(75, '32avos', '1F', '2C', 'Fase de 32');
  add(76, '32avos', '1C', '2F', 'Fase de 32');
  add(77, '32avos', '1I', '3CDFGH', 'Fase de 32');
  add(78, '32avos', '2E', '2I', 'Fase de 32');
  add(79, '32avos', '1A', '3CEFHI', 'Fase de 32');
  add(80, '32avos', '1L', '3EHIJK', 'Fase de 32');
  add(81, '32avos', '1D', '3BEFIJ', 'Fase de 32');
  add(82, '32avos', '1G', '3AEHIJ', 'Fase de 32');
  add(83, '32avos', '2K', '2L', 'Fase de 32');
  add(84, '32avos', '1H', '2J', 'Fase de 32');
  add(85, '32avos', '1B', '3EFGIJ', 'Fase de 32');
  add(86, '32avos', '1J', '2H', 'Fase de 32');
  add(87, '32avos', '1K', '3DEIJL', 'Fase de 32');
  add(88, '32avos', '2D', '2G', 'Fase de 32');

  add(89, 'Oitavas', 'W74', 'W77', 'Oitavas de Final');
  add(90, 'Oitavas', 'W73', 'W75', 'Oitavas de Final');
  add(91, 'Oitavas', 'W76', 'W78', 'Oitavas de Final');
  add(92, 'Oitavas', 'W79', 'W80', 'Oitavas de Final');
  add(93, 'Oitavas', 'W83', 'W84', 'Oitavas de Final');
  add(94, 'Oitavas', 'W81', 'W82', 'Oitavas de Final');
  add(95, 'Oitavas', 'W86', 'W88', 'Oitavas de Final');
  add(96, 'Oitavas', 'W85', 'W87', 'Oitavas de Final');

  add(97, 'Quartas', 'W89', 'W90', 'Quartas de Final');
  add(98, 'Quartas', 'W91', 'W92', 'Quartas de Final');
  add(99, 'Quartas', 'W93', 'W94', 'Quartas de Final');
  add(100, 'Quartas', 'W95', 'W96', 'Quartas de Final');

  add(101, 'Semis', 'W97', 'W98', 'Semifinais');
  add(102, 'Semis', 'W99', 'W100', 'Semifinais');

  add(103, 'Terceiro', 'L101', 'L102', '3º Lugar');
  add(104, 'Final', 'W101', 'W102', 'Final');

  return matches;
}

const ALL_MATCHES = generateMatches();
const PHASES = ['Grupos','32avos','Oitavas','Quartas','Semis','Terceiro','Final'];
const CHAMPION_BONUS = 20;

function refLabel(ref) {
  if (!ref) return 'A definir';
  if (/^[123][A-L]$/.test(ref)) {
    const pos = { '1':'1º','2':'2º','3':'3º' }[ref[0]];
    return `${pos} do Grupo ${ref[1]}`;
  }
  if (/^3[A-L]+$/.test(ref)) {
    const groups = ref.slice(1).split('').join('/');
    return `3º Melhor (${groups})`;
  }
  if (/^W\d+$/.test(ref)) return `Vencedor Jogo ${ref.slice(1)}`;
  if (/^L\d+$/.test(ref)) return `Perdedor Jogo ${ref.slice(1)}`;
  return ref;
}

function placeholderTeam(label) {
  return { name: refLabel(label), flag: '🏳️', isPlaceholder: true };
}

function getGroupMatches(group) {
  return ALL_MATCHES.filter(m => m.phase === 'Grupos' && m.group === group);
}

function isGroupComplete(group, results) {
  return getGroupMatches(group).every(m => results[m.id]);
}

function getGroupStandings(group, results) {
  const teams = GROUPS[group].teams.map((team, index) => ({
    ...team, group, originalIndex: index, pts: 0, played: 0, gf: 0, ga: 0, gd: 0, wins: 0
  }));
  const byName = Object.fromEntries(teams.map(team => [team.name, team]));

  getGroupMatches(group).forEach(match => {
    const result = results[match.id];
    if (!result) return;
    const home = byName[match.home.name];
    const away = byName[match.away.name];
    if (!home || !away) return;

    home.played++; away.played++;
    home.gf += result.home; home.ga += result.away;
    away.gf += result.away; away.ga += result.home;

    if (result.home > result.away) { home.pts += 3; home.wins++; }
    else if (result.away > result.home) { away.pts += 3; away.wins++; }
    else { home.pts++; away.pts++; }
  });

  teams.forEach(team => { team.gd = team.gf - team.ga; });
  return teams.sort((a, b) =>
    b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || b.wins - a.wins || a.originalIndex - b.originalIndex
  );
}

function getThirdPlacedTeams(results) {
  return Object.keys(GROUPS)
    .filter(group => isGroupComplete(group, results))
    .map(group => getGroupStandings(group, results)[2])
    .sort((a, b) =>
      b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || b.wins - a.wins || a.group.localeCompare(b.group)
    )
    .slice(0, 8);
}

function getThirdTeamAssignments(results) {
  const thirds = getThirdPlacedTeams(results);
  if (thirds.length < 8) return {};

  const thirdByGroup = Object.fromEntries(thirds.map(team => [team.group, team]));
  const slots = ALL_MATCHES
    .filter(m => m.phase === '32avos' && (m.homeRef?.startsWith('3') || m.awayRef?.startsWith('3')))
    .map(match => {
      const ref = match.homeRef.startsWith('3') ? match.homeRef : match.awayRef;
      return { matchId: match.id, ref, groups: ref.slice(1).split('').filter(group => thirdByGroup[group]) };
    })
    .sort((a, b) => a.groups.length - b.groups.length || a.matchId - b.matchId);

  const assignments = {};
  const used = new Set();
  function place(index) {
    if (index === slots.length) return true;
    const slot = slots[index];
    for (const group of slot.groups) {
      if (used.has(group)) continue;
      used.add(group);
      assignments[slot.matchId] = group;
      if (place(index + 1)) return true;
      used.delete(group);
      delete assignments[slot.matchId];
    }
    return false;
  }

  place(0);
  return assignments;
}

function getMatchById(matchId) {
  return ALL_MATCHES.find(match => match.id === Number(matchId));
}

function getMatchWinner(matchId, results) {
  const match = getResolvedMatch(getMatchById(matchId), results);
  const result = results[matchId];
  if (!match || !result || result.home === result.away) return null;
  return result.home > result.away ? match.home : match.away;
}

function getMatchLoser(matchId, results) {
  const match = getResolvedMatch(getMatchById(matchId), results);
  const result = results[matchId];
  if (!match || !result || result.home === result.away) return null;
  return result.home > result.away ? match.away : match.home;
}

function resolveTeamRef(ref, results, thirdAssignments, matchId) {
  if (!ref) return null;
  if (/^[123][A-L]$/.test(ref)) {
    const position = Number(ref[0]) - 1;
    const group = ref[1];
    if (!isGroupComplete(group, results)) return placeholderTeam(ref);
    return getGroupStandings(group, results)[position] || placeholderTeam(ref);
  }
  if (ref.startsWith('3')) {
    const group = thirdAssignments[matchId];
    if (!group) return placeholderTeam(ref);
    return getGroupStandings(group, results)[2] || placeholderTeam(ref);
  }
  if (/^W\d+$/.test(ref)) return getMatchWinner(ref.slice(1), results) || placeholderTeam(ref);
  if (/^L\d+$/.test(ref)) return getMatchLoser(ref.slice(1), results) || placeholderTeam(ref);
  return placeholderTeam(ref);
}

function getResolvedMatch(match, results = getData('bolao_results', {}), thirdAssignments = null) {
  if (!match || match.phase === 'Grupos') return match;
  const assignments = thirdAssignments || getThirdTeamAssignments(results);
  return {
    ...match,
    home: resolveTeamRef(match.homeRef, results, assignments, match.id),
    away: resolveTeamRef(match.awayRef, results, assignments, match.id)
  };
}

function getMatchesForPhase(phase) {
  const results = getData('bolao_results', {});
  const thirdAssignments = getThirdTeamAssignments(results);
  return ALL_MATCHES
    .filter(m => m.phase === phase)
    .map(m => getResolvedMatch(m, results, thirdAssignments));
}
// ============================================================
//  STORAGE HELPERS
// ============================================================
const STORAGE_KEYS = ['bolao_users', 'bolao_palpites', 'bolao_results', 'bolao_bets'];

let db = null;
let unsubscribeUsers = null, unsubscribePalpites = null, unsubscribeResults = null, unsubscribeBets = null;
let auth = null;
let usersRef = null;
let palpitesRef = null;
let resultsRef = null;
let adminRef = null;
let betsRef = null;
let dataReadyPromise = null;
let isFirebaseReady = false;
let isApplyingRemoteData = false;
let _authHandled = false;
let currentGroup = '';

let appData = {
  bolao_users: {},
  bolao_palpites: {},
  bolao_results: {},
  bolao_bets: {}
};

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadLocalData() {
  STORAGE_KEYS.forEach(key => {
    try {
      appData[key] = JSON.parse(localStorage.getItem(key)) || {};
    } catch {
      appData[key] = {};
    }
  });
}

function mergeBetsLocal(remoteBets) {
  const merged = cloneData(remoteBets);
  try {
    const localRaw = localStorage.getItem('bolao_bets');
    if (!localRaw || !currentUser) return merged;
    const localBets = JSON.parse(localRaw);
    for (const matchId of Object.keys(localBets)) {
      if (localBets[matchId] && localBets[matchId][currentUser] !== undefined) {
        if (!merged[matchId]) merged[matchId] = {};
        merged[matchId][currentUser] = localBets[matchId][currentUser];
      }
    }
    for (const matchId of Object.keys(merged)) {
      if (merged[matchId] && merged[matchId][currentUser] !== undefined) {
        if (!localBets[matchId] || localBets[matchId][currentUser] === undefined) {
          delete merged[matchId][currentUser];
          if (!Object.keys(merged[matchId]).length) delete merged[matchId];
        }
      }
    }
  } catch (e) {}
  return merged;
}

function saveLocalData(fromSnapshot) {
  STORAGE_KEYS.forEach(key => {
    const newData = appData[key] || {};
    if (key === 'bolao_users') {
      try {
        const oldRaw = localStorage.getItem('bolao_users');
        if (oldRaw) {
          const oldData = JSON.parse(oldRaw);
          for (const uid of Object.keys(newData)) {
            if (fromSnapshot && oldData[uid] && oldData[uid].bets_balance !== undefined) {
              newData[uid].bets_balance = oldData[uid].bets_balance;
            }
          }
        }
      } catch (e) {}
    }
    localStorage.setItem(key, JSON.stringify(newData));
  });
}

function getData(key, def) {
  return cloneData(appData[key] ?? def);
}

function setData(key, val) {
  appData[key] = cloneData(val);
  saveLocalData();
  saveRemoteData(key);
}

function isFirebaseConfigFilled() {
  const cfg = window.firebaseConfig || {};
  return Boolean(
    cfg.apiKey && cfg.projectId && cfg.appId &&
    !cfg.apiKey.includes('COLE_') &&
    !cfg.projectId.includes('SEU_') &&
    !cfg.appId.includes('SEU_')
  );
}

async function waitDataReady() {
  if (dataReadyPromise) await dataReadyPromise;
}

function refreshCurrentView() {
  if (document.getElementById('app').style.display === 'none') return;

  const activePage = document.querySelector('.page.active');
  if (!activePage) return;

  if (activePage.id === 'page-grupos') renderGroups();
  if (activePage.id === 'page-palpites') renderMatches(currentPhase);
  if (activePage.id === 'page-resultados') renderResults(currentPhase);
  if (activePage.id === 'page-ranking') renderRanking();
  if (activePage.id === 'page-minhasApostas') renderMyBets();
}

async function initFirebaseData() {
  loadLocalData();

  if (!isFirebaseConfigFilled() || !window.firebase || !firebase.auth || !firebase.firestore) {
    console.info('Firebase não configurado. Usando armazenamento local.');
    return;
  }

  try {
    const fbApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
    auth = firebase.auth(fbApp);
    db = firebase.firestore(fbApp);
    db.settings({ experimentalForceLongPolling: true });
    usersRef = db.collection('bolao_users');
    palpitesRef = db.collection('bolao_palpites');
    resultsRef = db.collection('bolao_config').doc('results');
    adminRef = db.collection('bolao_config').doc('admin');
    betsRef = db.collection('bolao_config').doc('bets');

    if (!auth.currentUser) {
      isFirebaseReady = true;
      return;
    }

    const [usersSnap, palpitesSnap, resultsSnap, betsSnap] = await Promise.all([
      usersRef.get(),
      palpitesRef.get(),
      resultsRef.get(),
      betsRef.get()
    ]);

    isApplyingRemoteData = true;
    appData.bolao_users = {};
    usersSnap.forEach(doc => {
      const data = doc.data();
        appData.bolao_users[doc.id] = {
          name: data.name || data.email || 'Participante',
          email: data.email || '',
          isAdmin: data.isAdmin === true,
          avatar: data.avatar || '',
          accentColor: data.accentColor || '',
          champion: data.champion || '',
          bets_balance: data.bets_balance !== undefined ? data.bets_balance : undefined
        };
    });

    appData.bolao_palpites = {};
    palpitesSnap.forEach(doc => {
      appData.bolao_palpites[doc.id] = doc.data().matches || {};
    });

    if (resultsSnap.exists) {
      appData.bolao_results = resultsSnap.data().matches || {};
    }

    if (betsSnap.exists) {
      const remoteBets = betsSnap.data().matches || {};
      const merged = mergeBetsLocal(remoteBets);
      appData.bolao_bets = merged;
    }
    saveLocalData();
    isApplyingRemoteData = false;

    unsubscribeUsers = usersRef.onSnapshot(snapshot => {
      isApplyingRemoteData = true;
      appData.bolao_users = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        appData.bolao_users[doc.id] = {
          name: data.name || data.email || 'Participante',
          email: data.email || '',
          isAdmin: data.isAdmin === true,
          avatar: data.avatar || '',
          accentColor: data.accentColor || '',
          champion: data.champion || '',
          bets_balance: data.bets_balance !== undefined ? data.bets_balance : undefined
        };
      });
      saveLocalData(true);
      isApplyingRemoteData = false;
      refreshCurrentView();
    }, error => {
      if (error.code !== 'permission-denied' && error.code !== 'aborted' && error.code !== 'unavailable') {
        console.error('Erro no snapshot users:', error);
      }
    });

    unsubscribePalpites = palpitesRef.onSnapshot(snapshot => {
      isApplyingRemoteData = true;
      appData.bolao_palpites = {};
      snapshot.forEach(doc => {
        appData.bolao_palpites[doc.id] = doc.data().matches || {};
      });
      saveLocalData(true);
      isApplyingRemoteData = false;
      refreshCurrentView();
    }, error => {
      if (error.code !== 'permission-denied' && error.code !== 'aborted' && error.code !== 'unavailable') {
        console.error('Erro no snapshot palpites:', error);
      }
    });

    unsubscribeResults = resultsRef.onSnapshot(snapshot => {
      if (!snapshot.exists) return;
      isApplyingRemoteData = true;
      appData.bolao_results = snapshot.data().matches || {};
      saveLocalData(true);
      isApplyingRemoteData = false;
      refreshCurrentView();
    }, error => {
      if (error.code !== 'permission-denied' && error.code !== 'aborted' && error.code !== 'unavailable') {
        console.error('Erro ao sincronizar resultados:', error);
      }
    });

    unsubscribeBets = betsRef.onSnapshot(snapshot => {
      if (!snapshot.exists) return;
      isApplyingRemoteData = true;
      const remoteBets = snapshot.data().matches || {};
      appData.bolao_bets = mergeBetsLocal(remoteBets);
      saveLocalData(true);
      isApplyingRemoteData = false;
      refreshCurrentView();
    }, error => {
      if (error.code !== 'permission-denied' && error.code !== 'aborted' && error.code !== 'unavailable') {
        console.error('Erro ao sincronizar bets:', error);
      }
    });

    isFirebaseReady = true;
  } catch (error) {
    console.error('Erro ao iniciar Firebase:', error);
    showToast('Firebase não conectou. Usando dados locais.', true);
  }
}

function saveRemoteData(key) {
  if (!isFirebaseReady || isApplyingRemoteData) return;

  let writePromise = null;

  if (key === 'bolao_palpites' && currentUser) {
    writePromise = palpitesRef.doc(currentUser).set({
      matches: appData.bolao_palpites[currentUser] || {},
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  if (key === 'bolao_results' && currentUserIsAdmin()) {
    writePromise = resultsRef.set({
      matches: appData.bolao_results || {},
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  if (key === 'bolao_users' && currentUser) {
    const myData = appData.bolao_users[currentUser];
    if (myData) {
      writePromise = usersRef.doc(currentUser).set(myData, { merge: true });
    }
  }

  if (key === 'bolao_bets') {
    writePromise = betsRef.set({
      matches: appData.bolao_bets || {},
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  if (!writePromise) return;

  writePromise.catch(error => {
    console.error('Erro ao salvar no Firebase:', error);
    showToast('Não consegui salvar no Firebase.', true);
  });
}

// users: { uid: { name, email, isAdmin } }
// palpites: { uid: { matchId: {home, away} } }
// results: { matchId: {home, away} }

let currentUser = null;
let currentUserName = null;

function currentUserIsAdmin() {
  return currentUser && appData.bolao_users[currentUser]?.isAdmin === true;
}

function authErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/weak-password': 'Senha fraca. Use pelo menos 6 caracteres.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'E-mail ou senha inválidos.',
    'auth/network-request-failed': 'Sem conexão com o Firebase.'
  };
  return messages[error.code] || 'Não foi possível autenticar. Tente novamente.';
}

// ============================================================
//  AUTH
// ============================================================
function togglePassword(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁'; }
}

function updateCountdown() {
  const el = document.getElementById('countdownBanner');
  if (!el) return;
  const firstMatch = new Date('2026-06-11T12:00:00-03:00');
  const now = new Date();
  if (now > firstMatch) { el.textContent = '🏆 COPA 2026 ACONTECENDO!'; return; }
  const diff = Math.ceil((firstMatch - now) / (1000 * 60 * 60 * 24));
  el.textContent = diff > 1 ? `⏳ Faltam ${diff} dias para a Copa!` : diff === 1 ? '⏳ Falta 1 dia para a Copa!' : '🔥 É HOJE! COPA 2026!';
}

function toggleForms() {
  const lf = document.getElementById('loginForm');
  const rf = document.getElementById('registerForm');
  lf.style.display = lf.style.display === 'none' ? 'block' : 'none';
  rf.style.display = rf.style.display === 'none' ? 'block' : 'none';
  document.getElementById('loginError').style.display = 'none';
  document.getElementById('registerError').style.display = 'none';
  document.getElementById('registerSuccess').style.display = 'none';
}

async function doLogin() {
  await waitDataReady();

  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');

  if (!email || !pass) { showError(errEl, 'Preencha todos os campos.'); return; }
  if (!auth) { showError(errEl, 'Firebase Auth não está carregado.'); return; }

  if (document.getElementById('rememberEmail').checked) {
    localStorage.setItem('bolao_login_email', email);
    localStorage.setItem('bolao_login_pass', pass);
  } else {
    localStorage.removeItem('bolao_login_email');
    localStorage.removeItem('bolao_login_pass');
  }

  try {
    _authHandled = true;
    const credential = await auth.signInWithEmailAndPassword(email, pass);
    currentUser = credential.user.uid;
    await initFirebaseData();

    const profile = appData.bolao_users[currentUser];
    currentUserName = profile?.name || credential.user.email;

    errEl.style.display = 'none';
    const flash = document.createElement('div');
    flash.className = 'transform-flash';
    document.body.appendChild(flash);
    setTimeout(() => { flash.remove(); enterApp(); }, 800);
  } catch (error) {
    showError(errEl, authErrorMessage(error));
  }
}

async function doRegister() {
  await waitDataReady();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const pass2 = document.getElementById('regPass2').value;
  const errEl = document.getElementById('registerError');
  const sucEl = document.getElementById('registerSuccess');

  if (!name || !email || !pass || !pass2) { showError(errEl, 'Preencha todos os campos.'); return; }
  if (pass !== pass2) { showError(errEl, 'As senhas não coincidem.'); return; }
  if (pass.length < 6) { showError(errEl, 'Senha muito curta (mín. 6 caracteres).'); return; }
  if (!auth) { showError(errEl, 'Firebase Auth não está carregado.'); return; }

  try {
    _authHandled = true;
    const credential = await auth.createUserWithEmailAndPassword(email, pass);
    currentUser = credential.user.uid;

    const usersSnap = await usersRef.get();
    const adminSnap = await adminRef.get();
    const isFirst = usersSnap.empty && !adminSnap.exists;

    await credential.user.updateProfile({ displayName: name });
    await usersRef.doc(currentUser).set({
      name,
      email,
      isAdmin: isFirst,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (isFirst) {
      await adminRef.set({
        uid: currentUser,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    appData.bolao_users[currentUser] = { name, email, isAdmin: isFirst };
    saveLocalData();
    await initFirebaseData();
    currentUserName = name;

    errEl.style.display = 'none';
    sucEl.style.display = 'none';
    const flash = document.createElement('div');
    flash.className = 'transform-flash';
    document.body.appendChild(flash);
    setTimeout(() => { flash.remove(); enterApp(); showToast(isFirst ? 'Conta criada! Você é o admin.' : 'Conta criada!'); }, 800);
  } catch (error) {
    showError(errEl, authErrorMessage(error));
  }
}

function logout() {
  sessionStorage.removeItem('bolao_session');
  _authHandled = false;
  isFirebaseReady = false;
  if (unsubscribeUsers) unsubscribeUsers();
  if (unsubscribePalpites) unsubscribePalpites();
  if (unsubscribeResults) unsubscribeResults();
  currentUser = null;
  currentUserName = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
  if (auth) auth.signOut().catch(() => {});
}

function enterApp() {
  sessionStorage.setItem('bolao_session', '1');
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('headerUserName').textContent = currentUserName || currentUser;
  renderGroups();
  renderPhaseTabs();
  renderResultPhaseTabs();
  showPage('grupos', document.querySelector('.nav-btn[data-page="grupos"]'));
}

function showError(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
}

// ============================================================
//  PAGES
// ============================================================
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (btn) btn.classList.add('active');

  const inner = document.querySelector('.nav-inner');
  const overlay = document.getElementById('navOverlay');
  if (inner && overlay) {
    inner.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (name === 'ranking') renderRanking();
  if (name === 'minhasApostas') renderMyBets();
  if (name === 'bracket') renderBracket();
  if (name === 'grupos') renderGroups();
  if (name === 'palpites') renderMatches('Grupos');
  if (name === 'bets') renderBets();
  if (name === 'resultados') renderResults('Grupos');
  if (name === 'regras') { /* static page, nothing to render */ }
}

function toggleSidebar() {
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('navOverlay');
  const inner = nav.querySelector('.nav-inner');
  inner.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = inner.classList.contains('open') ? 'hidden' : '';
}

function showSkeleton(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-line w40"></div>
      <div class="skeleton-line h3"></div>
      <div class="skeleton-line w60"></div>
    </div>
  `).join('');
}

// ============================================================
//  GROUPS
// ============================================================
function getNextMatches(limit) {
  const results = getData('bolao_results', {});
  const thirdAssignments = getThirdTeamAssignments(results);
  const now = new Date();
  return ALL_MATCHES
    .filter(m => m.date && !results[m.id])
    .map(m => getResolvedMatch(m, results, thirdAssignments))
    .filter(m => new Date(m.date + '-03:00') > now)
    .sort((a, b) => new Date(a.date + '-03:00') - new Date(b.date + '-03:00'))
    .slice(0, limit);
}

function getChampionHtml() {
  const results = getData('bolao_results', {});
  const users = getData('bolao_users', {});
  const myProfile = users[currentUser] || {};
  const allTeams = Object.values(GROUPS).flatMap(g => g.teams).sort((a, b) => a.name.localeCompare(b.name));
  const currentPick = myProfile.champion || '';
  const champWinner = results._champion;
  return `
    <div class="champion-card">
      <div class="champion-icon">👑</div>
      <div class="champion-body">
        <div class="champion-title">PREVISÃO DO CAMPEÃO</div>
        ${champWinner ? `
          <div class="champion-winner">Campeão: ${flagMarkup(champWinner, 'flag flag-inline')} ${champWinner.name} 🏆</div>
        ` : `
          <div class="champion-pick-row">
            <div class="champion-flag-preview" id="championFlagPreview">${currentPick ? flagMarkup(getTeamByName(currentPick), 'flag flag-inline') : ''}</div>
            <select class="champion-select" id="championSelect" onchange="updateChampionFlagPreview()">
              <option value="">— Escolha o campeão —</option>
              ${allTeams.map(t => `<option value="${t.name}" ${currentPick === t.name ? 'selected' : ''}>${t.name}</option>`).join('')}
            </select>
            <button class="btn-champion" onclick="saveChampion()">${currentPick ? '🔄 Trocar' : '✅ Definir'}</button>
          </div>
          ${currentPick ? `<div class="champion-current-pick">Seu palpite: ${flagMarkup(getTeamByName(currentPick), 'flag flag-inline')} ${currentPick}</div>` : ''}
          <div class="champion-pick-hint">Você só pode trocar antes do primeiro jogo da Copa</div>
        `}
      </div>
    </div>`;
}

function renderGroups() {
  const results = getData('bolao_results', {});
  const grid = document.getElementById('groupsGrid');

  const nextMatches = getNextMatches(5);

  const nextHtml = nextMatches.length ? `
    <div class="next-matches-bar">
      <div class="next-matches-title">📅 PRÓXIMOS JOGOS</div>
      <div class="next-matches-list">
        ${nextMatches.map(m => {
          const d = formatDateBR(m.date);
          const isLocked = m.date && new Date() > new Date(m.date + '-03:00');
          return `<div class="next-match ${isLocked ? 'next-live' : ''}" onclick="goToMatch(${m.id})" style="cursor:pointer;">
            <span class="next-date">${d}</span>
            <span class="next-teams">${flagMarkup(m.home,'flag flag-inline')} ${m.home.name} × ${m.away.name} ${flagMarkup(m.away,'flag flag-inline')}</span>
            <span class="next-phase">${phaseLabel(m.phase)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>` : '';

  grid.innerHTML = nextHtml + Object.entries(GROUPS).map(([g, data], gi) => {
    const standings = getGroupStandings(g, results);
    const hasResults = standings.some(t => t.played > 0);
    const groupPlayed = getGroupMatches(g).filter(m => results[m.id]).length;
    return `
    <div class="group-card card-stagger" style="--i:${gi}" onclick="goToGroupMatches('${g}')">
      <div class="group-header">
        <div class="group-letter">${g}</div>
        <div class="group-name">Grupo ${g}</div>
        ${hasResults ? `<div class="group-status">${groupPlayed}/6</div>` : '<div class="group-status">—</div>'}
      </div>
      <div class="group-teams">
        ${data.teams.map((t, idx) => {
          const pos = hasResults ? standings.findIndex(s => s.name === t.name) : -1;
          const cls = pos === 0 || pos === 1 ? 'team-qualified' : pos === 2 ? 'team-third' : '';
          return `<div class="team-row ${cls}">
            ${flagMarkup(t)}
            <div class="team-name">${t.name}</div>
            ${hasResults ? `<div class="team-stats">${standings[pos].pts}<span class="team-stats-label">pts</span></div>` : ''}
          </div>`;
        }).join('')}
      </div>
      ${hasResults ? `
      <div class="group-table">
        <div class="gtable-row gtable-header">
          <span class="gtable-pos">#</span>
          <span class="gtable-team">Time</span>
          <span>J</span>
          <span>V</span>
          <span>E</span>
          <span>D</span>
          <span>GP</span>
          <span>GC</span>
          <span>SG</span>
          <span>P</span>
        </div>
        ${standings.map((s, i) => `
        <div class="gtable-row ${i<2?'gtable-qualified':i===2?'gtable-third':''}">
          <span class="gtable-pos">${i+1}</span>
          <span class="gtable-team">${flagMarkup(s,'flag flag-inline')} ${s.name}</span>
          <span>${s.played}</span>
          <span>${s.wins}</span>
          <span>${s.pts - s.wins * 3}</span>
          <span>${s.played - s.wins - (s.pts - s.wins * 3)}</span>
          <span>${s.gf}</span>
          <span>${s.ga}</span>
          <span class="${s.gd>0?'gd-pos':s.gd<0?'gd-neg':''}">${s.gd>0?'+':''}${s.gd}</span>
          <span class="gtable-pts">${s.pts}</span>
        </div>`).join('')}
      </div>` : ''}
    </div>`;
  }).join('');

  // 👇 Append bet history section
  renderBetsHistory();
}

function renderBetsHistory() {
  const container = document.getElementById('betReviewList');
  const users = getData('bolao_users', {});
  const myProfile = users[currentUser] || {};
  let history = myProfile.bet_history || [];

  if (!history.length) {
    const el = document.getElementById('betsHistoryWrap');
    if (el) el.remove();
    return;
  }

  // Sort newest first
  history = [...history].reverse();

  const totalProfit = history.reduce((s, h) => s + (h.profit || 0), 0);
  const wins = history.filter(h => (h.profit || 0) > 0).length;
  const losses = history.filter(h => (h.profit || 0) < 0).length;
  const balance = getBetsBalance();

  let existing = document.getElementById('betsHistoryWrap');
  if (!existing) {
    existing = document.createElement('div');
    existing.id = 'betsHistoryWrap';
    container.parentNode.insertBefore(existing, container.nextSibling);
  }

  existing.innerHTML = `
    <div class="section-sub" style="margin-top:1.5rem;margin-bottom:0.3rem;">💰 Histórico de Bets</div>
    <div class="bets-history-cards">
      <div class="bh-card"><span class="bh-label">Saldo Atual</span><span class="bh-val">R$ ${balance.toFixed(2)}</span></div>
      <div class="bh-card ${totalProfit >= 0 ? 'bh-profit' : 'bh-loss'}"><span class="bh-label">Lucro Total</span><span class="bh-val">${totalProfit >= 0 ? '+' : ''}R$ ${totalProfit.toFixed(2)}</span></div>
      <div class="bh-card"><span class="bh-label">Vitórias</span><span class="bh-val bh-wins">${wins}</span></div>
      <div class="bh-card"><span class="bh-label">Derrotas</span><span class="bh-val bh-losses">${losses}</span></div>
    </div>
    <div class="bets-history-list">
      ${history.map(h => {
        const outcomeLabel = { home: h.matchLabel?.split('×')[0]?.trim() || 'Casa', draw: 'Empate', away: h.matchLabel?.split('×')[1]?.trim() || 'Fora', lost: 'Perdeu' }[h.outcome] || h.outcome;
        const isWin = (h.profit || 0) > 0;
        const isLoss = (h.profit || 0) < 0;
        return `<div class="bh-item ${isWin ? 'bh-win' : isLoss ? 'bh-loss-item' : ''}">
          <div class="bh-top">
            <span class="bh-match">${h.matchLabel}</span>
            <span class="bh-result-badge">${h.result}</span>
          </div>
          <div class="bh-bottom">
            <span class="bh-detail">${outcomeLabel}</span>
            <span class="bh-detail">R$ ${h.amount}</span>
            ${h.odd > 0 ? `<span class="bh-detail">${h.odd}x</span>` : ''}
            <span class="bh-profit ${isWin ? 'bh-p-profit' : isLoss ? 'bh-p-loss' : ''}">${h.profit >= 0 ? '+' : ''}R$ ${(h.profit || 0).toFixed(2)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}


//  PALPITES
// ============================================================
let currentPhase = 'Grupos';

function renderPhaseTabs() {
  const tabs = document.getElementById('phaseTabs');
  tabs.innerHTML = PHASES.map(p => `
    <button class="phase-tab ${p === currentPhase ? 'active' : ''}"
      onclick="switchPhase('${p}',this,'match')">${phaseLabel(p)}</button>
  `).join('');
}

function phaseLabel(p) {
  const map = { Grupos:'Grupos', '32avos':'Fase de 32', Oitavas:'Oitavas', Quartas:'Quartas', Semis:'Semis', Terceiro:'3º Lugar', Final:'Final' };
  return map[p] || p;
}

function getTeamByName(name) {
  return Object.values(GROUPS).flatMap(g => g.teams).find(t => t.name === name) || { name, flag: '🏳️' };
}

function saveChampion() {
  const select = document.getElementById('championSelect');
  const teamName = select.value;
  if (!teamName) { showToast('Selecione um time!', true); return; }
  const users = getData('bolao_users', {});
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].champion = teamName;
  setData('bolao_users', users);
  showToast(`Campeão definido: ${teamName} 👑`);
  renderGroups();
  renderMatches(currentPhase);
}

function selectAccentColor(hex) {
  const users = getData('bolao_users', {});
  if (!users[currentUser]) users[currentUser] = {};
  if (hex) users[currentUser].accentColor = hex;
  else delete users[currentUser].accentColor;
  setData('bolao_users', users);
  document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.color-option').forEach(el => { if (el.style.background === hex || (!hex && el.style.background === 'var(--gray-mid)')) el.classList.add('selected'); });
  showToast(hex ? `🎨 Cor definida!` : '🎨 Cor padrão restaurada');
}

function selectAvatar(emoji) {
  const users = getData('bolao_users', {});
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].avatar = emoji;
  setData('bolao_users', users);
  document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.avatar-option').forEach(el => { if (el.textContent === emoji) el.classList.add('selected'); });
  const display = document.getElementById('currentAvatarDisplay');
  if (display) display.textContent = emoji;
  showToast(`🎭 Avatar: ${emoji}`);
}

function updateChampionFlagPreview() {
  const select = document.getElementById('championSelect');
  const preview = document.getElementById('championFlagPreview');
  const name = select.value;
  if (name) {
    const team = getTeamByName(name);
                preview.innerHTML = flagMarkup(team, 'flag flag-inline');
  } else {
    preview.innerHTML = '';
  }
}

function switchPhase(phase, btn, type) {
  currentPhase = phase;
  document.querySelectorAll(type === 'match' ? '#phaseTabs .phase-tab' : '#resultPhaseTabs .phase-tab')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (phase !== 'Grupos') currentGroup = '';
  if (type === 'match') renderMatches(phase);
  else renderResults(phase);
  document.querySelector('.section-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToMatch(matchId) {
  const match = ALL_MATCHES.find(m => m.id === matchId);
  if (!match) return;
  currentGroup = match.phase === 'Grupos' ? match.group : '';
  showPage('palpites', document.querySelector('.nav-btn[data-page="palpites"]'));
  const tabs = document.querySelectorAll('#phaseTabs .phase-tab');
  const targetTab = Array.from(tabs).find(t => t.textContent.trim() === phaseLabel(match.phase));
  if (targetTab) switchPhase(match.phase, targetTab, 'match');
  setTimeout(() => {
    const el = document.getElementById(`mc-${matchId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

function goToGroupMatches(group) {
  currentGroup = group;
  showPage('palpites', document.querySelector('.nav-btn[data-page="palpites"]'));
  const tab = document.querySelector('#phaseTabs .phase-tab');
  if (tab) switchPhase('Grupos', tab, 'match');
}

function filterByGroup(group) {
  currentGroup = group;
  renderMatches('Grupos');
  document.querySelectorAll('.group-pill').forEach(p => p.classList.toggle('active', p.dataset.group === group));
}

function renderGroupPills() {
  const container = document.getElementById('groupPills');
  if (!container) return;
  const groups = Object.keys(GROUPS);
  container.innerHTML = `<button class="group-pill ${!currentGroup ? 'active' : ''}" data-group="" onclick="filterByGroup('')">Todos</button>
    ${groups.map(g => `<button class="group-pill ${currentGroup === g ? 'active' : ''}" data-group="${g}" onclick="filterByGroup('${g}')">Grupo ${g}</button>`).join('')}`;
  container.style.display = currentPhase === 'Grupos' ? 'flex' : 'none';
}

function getBetsBalance() {
  const raw = localStorage.getItem('bolao_users');
  if (!raw) return 100;
  try {
    const users = JSON.parse(raw);
    const myProfile = users[currentUser] || {};
    return myProfile.bets_balance !== undefined ? myProfile.bets_balance : 100;
  } catch (e) { return 100; }
}

function saveBetsBalance(amount) {
  const users = getData('bolao_users', {});
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].bets_balance = amount;
  setData('bolao_users', users);
}

function calcBetsOdds(matchId) {
  const bets = getData('bolao_bets', {});
  const matchBets = bets[matchId] || {};
  let home = 0, draw = 0, away = 0;
  Object.values(matchBets).forEach(b => {
    home += b.home || 0;
    draw += b.draw || 0;
    away += b.away || 0;
  });
  const total = home + draw + away;
  if (total === 0) return { home: 2, draw: 2, away: 2 };
  return {
    home: +(total / (home || 1)).toFixed(2),
    draw: +(total / (draw || 1)).toFixed(2),
    away: +(total / (away || 1)).toFixed(2)
  };
}

function getTeamFifaPoints(teamName) {
  for (const g of Object.keys(GROUPS)) {
    const team = GROUPS[g].teams.find(t => t.name === teamName);
    if (team && team.fifaPoints) return team.fifaPoints;
  }
  return 1500;
}

function calcFifaOdds(homeName, awayName) {
  const rA = getTeamFifaPoints(homeName);
  const rB = getTeamFifaPoints(awayName);
  const total = rA + rB;
  const strengthA = rA / total;
  const strengthB = rB / total;
  const balance = 1 - Math.abs(strengthA - strengthB);
  const drawProb = +(0.12 + balance * 0.20).toFixed(4);
  const remain = 1 - drawProb;
  const pA = strengthA / (strengthA + strengthB) * remain;
  const pB = strengthB / (strengthA + strengthB) * remain;
  return {
    home: +(1 / pA).toFixed(2),
    draw: +(1 / drawProb).toFixed(2),
    away: +(1 / pB).toFixed(2)
  };
}

function placeBet(matchId, outcome) {
  const input = document.getElementById(`bet-val-${matchId}`);
  const amount = parseInt(input.value);
  if (!amount || amount <= 0) { showToast('Digite um valor válido!', true); return; }

  const match = getMatchById(matchId);
  if (match && match.date && new Date() > new Date(match.date + '-03:00')) {
    showToast('⛔ Jogo já começou!', true); return;
  }

  const bets = getData('bolao_bets', {});
  const existing = (bets[matchId] && bets[matchId][currentUser]) || { home: 0, draw: 0, away: 0 };
  const totalExisting = (existing.home || 0) + (existing.draw || 0) + (existing.away || 0);

  const users = getData('bolao_users', {});
  const myProfile = users[currentUser] || {};
  const balance = myProfile.bets_balance !== undefined ? myProfile.bets_balance : 100;
  const newBalance = balance - amount + totalExisting;
  if (newBalance < 0) { showToast('Saldo insuficiente!', true); return; }

  if (!bets[matchId]) bets[matchId] = {};
  bets[matchId][currentUser] = { home: 0, draw: 0, away: 0, [outcome]: amount };
  localStorage.setItem('bolao_bets', JSON.stringify(bets));
  appData['bolao_bets'] = bets;

  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].bets_balance = newBalance;
  localStorage.setItem('bolao_users', JSON.stringify(users));
  appData['bolao_users'] = users;

  saveRemoteData('bolao_bets');
  saveRemoteData('bolao_users');

  showToast(`Aposta de R$ ${amount} registrada!`);
  renderBets();
}

function setQuickBet(matchId, amount) {
  const input = document.getElementById(`bet-val-${matchId}`);
  if (input) {
    input.value = amount;
    input.focus();
    input.classList.add('bets-input-pulse');
    setTimeout(() => input.classList.remove('bets-input-pulse'), 300);
  }
}

function removeBet(matchId) {
  const bets = getData('bolao_bets', {});
  const existing = (bets[matchId] && bets[matchId][currentUser]) || { home: 0, draw: 0, away: 0 };
  const totalExisting = (existing.home || 0) + (existing.draw || 0) + (existing.away || 0);
  if (!totalExisting) return;

  const users = getData('bolao_users', {});
  const myProfile = users[currentUser] || {};
  const balance = myProfile.bets_balance !== undefined ? myProfile.bets_balance : 100;

  delete bets[matchId][currentUser];
  if (!Object.keys(bets[matchId]).length) delete bets[matchId];
  localStorage.setItem('bolao_bets', JSON.stringify(bets));
  appData['bolao_bets'] = bets;

  const newBalance = balance + totalExisting;
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].bets_balance = newBalance;
  localStorage.setItem('bolao_users', JSON.stringify(users));
  appData['bolao_users'] = users;

  saveRemoteData('bolao_bets');
  saveRemoteData('bolao_users');

  showToast(`Aposta cancelada. R$ ${totalExisting} devolvidos.`);
  renderBets();
}

let betsView = 'jogos';

function renderBets() {
  const results = getData('bolao_results', {});
  const bets = getData('bolao_bets', {});
  const balance = getBetsBalance();

  document.getElementById('betsSaldo').innerHTML = `
    <div class="bets-balance-card" style="display:flex;justify-content:space-between;align-items:center;width:100%;">
      <div>
        <span class="bets-balance-label">💰 Saldo</span>
        <span class="bets-balance-value">R$ ${balance.toFixed(2)}</span>
      </div>
      <div class="bets-view-toggle">
        <button class="bv-btn ${betsView === 'jogos' ? 'bv-active' : ''}" onclick="switchBetsView('jogos')">🎲 Jogos</button>
        <button class="bv-btn ${betsView === 'ranking' ? 'bv-active' : ''}" onclick="switchBetsView('ranking')">🏆 Ranking</button>
      </div>
    </div>`;

  if (betsView === 'ranking') { renderBetsRanking(); return; }

  const phaseTabs = document.getElementById('betsPhaseTabs');
  phaseTabs.innerHTML = PHASES.map(p => `
    <button class="phase-tab ${p === 'Grupos' ? 'active' : ''}"
      onclick="switchBetsPhase('${p}',this)">${phaseLabel(p)}</button>`).join('');

  renderBetsMatches('Grupos');
}

function switchBetsView(view) {
  betsView = view;
  document.querySelectorAll('.bv-btn').forEach(b => b.classList.remove('bv-active'));
  document.querySelector(`.bv-btn[onclick*="${view}"]`)?.classList.add('bv-active');
  if (view === 'ranking') renderBetsRanking();
  else renderBets();
}

function renderBetsRanking() {
  const phaseTabs = document.getElementById('betsPhaseTabs');
  phaseTabs.innerHTML = '';
  document.getElementById('betsGroupPills').style.display = 'none';

  const users = getData('bolao_users', {});

  const list = Object.entries(users)
    .map(([uid, p]) => ({
      uid,
      name: p.name || uid.slice(0, 8),
      avatar: p.avatar || '',
      balance: p.bets_balance !== undefined ? p.bets_balance : 100,
      isYou: uid === currentUser
    }))
    .sort((a, b) => b.balance - a.balance || a.name.localeCompare(b.name));

  const listEl = document.getElementById('betsList');
  listEl.innerHTML = `
    <div class="bets-ranking-title">🏆 Ranking de Bets</div>
    <div class="bets-ranking-list">
      ${list.map((u, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}º`;
        const profit = u.balance - 100;
        return `<div class="bets-rank-item ${u.isYou ? 'bets-rank-you' : ''}">
          <span class="bets-rank-pos">${medal}</span>
          <span class="avatar-circle avatar-circle-sm">${u.avatar || '⚽'}</span>
          <span class="bets-rank-name">${u.isYou ? '⭐ ' : ''}${u.name}</span>
          <div class="bets-rank-stats">
            <span class="bets-rank-balance">R$ ${u.balance.toFixed(2)}</span>
            <span class="bets-rank-profit ${profit >= 0 ? 'bets-rank-prof' : 'bets-rank-loss'}">${profit >= 0 ? '+' : ''}R$ ${profit.toFixed(2)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

let betsPhase = 'Grupos';
let betsGroup = '';

function switchBetsPhase(phase, btn) {
  betsView = 'jogos';
  betsPhase = phase;
  betsGroup = '';
  document.querySelectorAll('#betsPhaseTabs .phase-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBetsMatches(phase);
}

function renderBetsMatches(phase) {
  const results = getData('bolao_results', {});
  const thirdAssignments = getThirdTeamAssignments(results);
  let matches = ALL_MATCHES.filter(m => m.phase === phase);
  if (phase === 'Grupos' && betsGroup) matches = matches.filter(m => m.group === betsGroup);

  const pillsContainer = document.getElementById('betsGroupPills');
  if (pillsContainer) {
    if (phase === 'Grupos') {
      const groups = Object.keys(GROUPS);
      pillsContainer.innerHTML = `<button class="group-pill ${!betsGroup ? 'active' : ''}" onclick="betsGroup='';renderBetsMatches('Grupos')">Todos</button>
        ${groups.map(g => `<button class="group-pill ${betsGroup === g ? 'active' : ''}" onclick="betsGroup='${g}';renderBetsMatches('Grupos')">Grupo ${g}</button>`).join('')}`;
      pillsContainer.style.display = 'flex';
    } else {
      pillsContainer.style.display = 'none';
    }
  }

  const list = document.getElementById('betsList');
  if (!matches.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">🎲</div><div class="empty-text">Nenhum jogo nesta fase.</div></div>';
    return;
  }

  const allBets = getData('bolao_bets', {});

  list.innerHTML = matches.map((m, mi) => {
    const odds = calcBetsOdds(m.id);
    const myBet = (allBets[m.id] && allBets[m.id][currentUser]) || {};
    const locked = m.date && new Date() > new Date(m.date + '-03:00');
    return `
      <div class="bets-match-card">
        <div class="bets-header">
          <span>${m.label}</span>
          ${m.date ? `<span class="match-time-badge">📅 ${formatDateBR(m.date)}</span>` : ''}
        </div>
        <div class="bets-teams">
          <div class="bets-option ${myBet.home ? 'bets-selected' : ''}" onclick="${!locked ? `placeBet(${m.id},'home')` : ''}">
            <div class="bets-team">${flagMarkup(m.home)} ${m.home.name}</div>
            <div class="bets-odd">Odd: ${odds.home}x</div>
            ${myBet.home ? `<div class="bets-my"><span>R$ ${myBet.home}</span><button class="bets-remove-inline" onclick="event.stopPropagation();removeBet(${m.id})">✕</button></div>` : ''}
          </div>
          <div class="bets-option ${myBet.draw ? 'bets-selected' : ''}" onclick="${!locked ? `placeBet(${m.id},'draw')` : ''}">
            <div class="bets-team">Empate</div>
            <div class="bets-odd">Odd: ${odds.draw}x</div>
            ${myBet.draw ? `<div class="bets-my"><span>R$ ${myBet.draw}</span><button class="bets-remove-inline" onclick="event.stopPropagation();removeBet(${m.id})">✕</button></div>` : ''}
          </div>
          <div class="bets-option ${myBet.away ? 'bets-selected' : ''}" onclick="${!locked ? `placeBet(${m.id},'away')` : ''}">
            <div class="bets-team">${flagMarkup(m.away)} ${m.away.name}</div>
            <div class="bets-odd">Odd: ${odds.away}x</div>
            ${myBet.away ? `<div class="bets-my"><span>R$ ${myBet.away}</span><button class="bets-remove-inline" onclick="event.stopPropagation();removeBet(${m.id})">✕</button></div>` : ''}
          </div>
        </div>
        ${!locked ? `<div class="bets-input-area">
          <div class="bets-input-row">
            <span class="bets-currency">R$</span>
            <input class="bets-input" id="bet-val-${m.id}" type="number" min="0" step="1" placeholder="0">
          </div>
          <div class="bets-quick-amounts">
            <button class="bets-quick-btn" onclick="setQuickBet(${m.id},5)">R$5</button>
            <button class="bets-quick-btn" onclick="setQuickBet(${m.id},10)">R$10</button>
            <button class="bets-quick-btn" onclick="setQuickBet(${m.id},20)">R$20</button>
            <button class="bets-quick-btn" onclick="setQuickBet(${m.id},50)">R$50</button>
          </div>
          <div class="bets-input-hint">Escolha um valor e clique no resultado</div>
        </div>` : '<div class="bets-locked-row">🔒 Jogo já começou</div>'}
        <div class="bets-pool">Pool: R$ ${(Object.values(allBets[m.id]||{}).reduce((s,b) => s+(b.home||0)+(b.draw||0)+(b.away||0), 0)).toFixed(2)}</div>
      </div>`;
  }).join('');
}

let matchSearch = '';

function filterMatchesBySearch(matches, search) {
  if (!search) return matches;
  const q = search.toLowerCase().trim();
  return matches.filter(m =>
    m.home.name.toLowerCase().includes(q) ||
    m.away.name.toLowerCase().includes(q)
  );
}

function filterPalpites(val) {
  matchSearch = val;
  renderMatches(currentPhase);
}

function filterResults(val) {
  matchSearch = val;
  renderResults(currentPhase);
}

function renderMatches(phase) {
  const palpites = getData('bolao_palpites', {});
  const userP = palpites[currentUser] || {};
  let matches = getMatchesForPhase(phase);
  if (phase === 'Grupos' && currentGroup) matches = matches.filter(m => m.group === currentGroup);
  matches = filterMatchesBySearch(matches, matchSearch);
  const list = document.getElementById('matchList');
  renderGroupPills();

  list.innerHTML = getChampionHtml() + (matches.length
    ? matches.map((m, mi) => {
    const p = userP[m.id];
    const hasP = p !== undefined;
    const isLocked = m.date && new Date() > new Date(m.date + '-03:00');
    const timeLabel = m.date ? formatDateBR(m.date) : '';
    return `
      <div class="match-card card-stagger ${hasP ? 'has-palpite' : ''}" style="--i:${mi}" id="mc-${m.id}">
        <div class="match-header">
          <span>${m.label}</span>
          ${hasP ? `<span class="palpite-saved">✓ ${p.home}×${p.away}</span>` : ''}
        </div>
        <div class="match-teams">
          <div class="match-team">
            ${flagMarkup(m.home)}
            <div class="match-team-name">${m.home.name}</div>
          </div>
          <div class="match-vs-score">
            <div class="match-meta">
              ${timeLabel ? `<span class="match-time-badge">📅 ${timeLabel}</span>` : ''}
              ${isLocked ? '<span class="match-locked-badge">🔒</span>' : ''}
            </div>
            <div class="match-vs">VS</div>
            <div class="score-input-wrap">
              <input class="score-input ${isLocked ? 'locked' : ''}" type="number" min="0" max="99" id="ph-${m.id}"
                value="${hasP ? p.home : ''}" placeholder="0" ${isLocked ? 'disabled' : ''}>
              <span class="score-sep">×</span>
              <input class="score-input ${isLocked ? 'locked' : ''}" type="number" min="0" max="99" id="pa-${m.id}"
                value="${hasP ? p.away : ''}" placeholder="0" ${isLocked ? 'disabled' : ''}>
            </div>
          </div>
          <div class="match-team">
            ${flagMarkup(m.away)}
            <div class="match-team-name">${m.away.name}</div>
          </div>
        </div>
        <div class="match-footer">
          <span class="match-phase-badge">${phaseLabel(m.phase)}${m.group ? ` · Grupo ${m.group}` : ''}${m.ref ? ` · ${refLabel(m.ref)}` : ''}</span>
          <div class="match-footer-btns">
            ${hasP && !isLocked ? `<button class="btn-cancel-palpite" onclick="cancelPalpite(${m.id})">✕ Cancelar</button>` : ''}
            <button class="btn-save-palpite" onclick="savePalpite(${m.id})" ${isLocked ? 'disabled style="opacity:0.3"' : ''}>💾 Salvar</button>
          </div>
        </div>
      </div>
    `;
  }).join('')
  : '<div class="empty-state"><div class="empty-icon">⚽</div><div class="empty-text">Nenhum jogo nesta fase.</div></div>');
}

// ============================================================
function savePalpite(matchId) {
  let h = document.getElementById(`ph-${matchId}`).value;
  let a = document.getElementById(`pa-${matchId}`).value;
  if (h === '') h = '0';
  if (a === '') a = '0';

  const match = getMatchById(matchId);
  if (match && match.date && new Date() > new Date(match.date + '-03:00')) {
    showToast('⛔ Jogo já começou! Palpite bloqueado.', true);
    return;
  }

  const palpites = getData('bolao_palpites', {});
  if (!palpites[currentUser]) palpites[currentUser] = {};
  palpites[currentUser][matchId] = { home: parseInt(h), away: parseInt(a) };
  setData('bolao_palpites', palpites);

  showToast(`✅ Palpite salvo: ${h} × ${a}`);
  confetti(30);
  renderMatches(currentPhase);
}

function cancelPalpite(matchId) {
  const palpites = getData('bolao_palpites', {});
  if (!palpites[currentUser] || !palpites[currentUser][matchId]) return;
  delete palpites[currentUser][matchId];
  setData('bolao_palpites', palpites);
  showToast('✕ Palpite cancelado');
  renderMatches(currentPhase);
}

// ============================================================
function confetti(count = 50) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  const colors = ['#00C851','#39FF14','#FFD700','#FF6B00','#FF2222','#c0c0c0','#FF69B4','#00BFFF','#FF4500','#ADFF2F'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;animation-delay:${Math.random()*0.4}s;border-radius:${Math.random()>0.5?'50%':'0'};`;
    container.appendChild(piece);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 2500);
}

function renderResultPhaseTabs() {
  const tabs = document.getElementById('resultPhaseTabs');
  tabs.innerHTML = PHASES.map((p, i) => `
    <button class="phase-tab ${i === 0 ? 'active' : ''}"
      onclick="switchPhase('${p}',this,'result')">${phaseLabel(p)}</button>
  `).join('');
}

function formatDateBR(iso) {
  if (!iso) return '';
  const d = new Date(iso + '-03:00');
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function renderResults(phase) {
  const results = getData('bolao_results', {});
  let matches = getMatchesForPhase(phase);
  const list = document.getElementById('resultList');
  const isAdmin = currentUserIsAdmin();

  // Search filter
  matches = filterMatchesBySearch(matches, matchSearch);

  // Sort: most recent first (by date descending), no-date last
  matches = [...matches].sort((a, b) => {
    const aDate = a.date ? new Date(a.date + '-03:00') : null;
    const bDate = b.date ? new Date(b.date + '-03:00') : null;
    const aPast = aDate && aDate < new Date();
    const bPast = bDate && bDate < new Date();
    // Both past → most recent first (desc)
    if (aPast && bPast) return bDate - aDate;
    // Both future → earliest first (asc)
    if (!aPast && !bPast) { if (aDate && bDate) return aDate - bDate; if (aDate) return -1; if (bDate) return 1; return 0; }
    // Past before future
    if (aPast) return -1;
    if (bPast) return 1;
    return 0;
  });

  list.innerHTML = matches.map((m, mi) => {
    const r = results[m.id];
    const hasR = r !== undefined;
    const matchDate = m.date ? new Date(m.date + '-03:00') : null;
    const started = matchDate && new Date() > matchDate;
    return `
      <div class="result-card card-stagger" style="--i:${mi}">
        <div class="match-header" style="margin-bottom:0.5rem;">
          <span style="font-weight:700;font-size:0.85rem;">${flagMarkup(m.home, 'flag flag-inline')} ${m.home.name} × ${m.away.name} ${flagMarkup(m.away, 'flag flag-inline')}</span>
          ${hasR ? `<span class="result-saved-badge">✓ ${r.home}×${r.away}</span>` : ''}
          ${started ? `<button class="btn-view-bets" onclick="showMatchBets(${m.id})" title="Ver palpites dos participantes">👁</button>` : ''}
        </div>
        ${isAdmin ? `
        <div class="result-row">
          <div class="result-team-label">${m.home.name}</div>
          <div class="result-score-wrap">
            <input class="score-result" type="number" min="0" max="99" id="rh-${m.id}"
              value="${hasR ? r.home : ''}" placeholder="0">
            <span style="color:var(--silver);font-family:'Bangers',cursive;font-size:1.2rem;">×</span>
            <input class="score-result" type="number" min="0" max="99" id="ra-${m.id}"
              value="${hasR ? r.away : ''}" placeholder="0">
          </div>
          <div class="result-team-label right">${m.away.name}</div>
          <button class="btn-save-result" onclick="saveResult(${m.id})">💾 Salvar Resultado</button>
          ${hasR ? `<button class="btn-cancel-result" onclick="clearResult(${m.id})">✕</button>` : ''}
        </div>` : `
        <div class="result-row result-view">
          ${hasR ? `
            <div class="result-final-score">
              <span class="result-final-home">${flagMarkup(m.home, 'flag flag-inline')} ${m.home.name}</span>
              <span class="result-final-value">${r.home} × ${r.away}</span>
              <span class="result-final-away">${m.away.name} ${flagMarkup(m.away, 'flag flag-inline')}</span>
            </div>
            ${r.fifaOdds ? `
            <div class="result-fifa-odds">
              <span class="fifa-odds-label">📊 Odds Ranking FIFA</span>
              <span class="fifa-odds-value">${r.fifaOdds.home}x</span>
              <span class="fifa-odds-divider">|</span>
              <span class="fifa-odds-value">${r.fifaOdds.draw}x</span>
              <span class="fifa-odds-divider">|</span>
              <span class="fifa-odds-value">${r.fifaOdds.away}x</span>
            </div>` : ''}
          ` : `<span style="color:var(--silver);font-size:0.8rem;">⏳ Aguardando resultado oficial</span>`}
        </div>`}
      </div>
    `;
  }).join('');

  if (isAdmin) {
    const allTeams = Object.values(GROUPS).flatMap(g => g.teams).sort((a, b) => a.name.localeCompare(b.name));
    const currentChamp = results._champion ? results._champion.name || results._champion : '';
    list.innerHTML += `
      <div class="result-card champ-admin-card">
        <div class="match-header" style="color:var(--yellow);font-weight:700;">👑 CAMPEÃO DA COPA</div>
        <div class="result-row">
          <select class="champion-select" id="champAdminSelect">
            <option value="">— Selecione o campeão —</option>
            ${allTeams.map(t => `<option value="${t.name}" ${currentChamp === t.name ? 'selected' : ''}>${t.flag} ${t.name}</option>`).join('')}
          </select>
          <button class="btn-save-result" onclick="setChampionWinner()">🏆 Definir Campeão</button>
          ${results._champion ? `<button class="btn-save-result" style="background:var(--red);" onclick="clearChampionWinner()">✕ Limpar</button>` : ''}
        </div>
      </div>`;
  }
}

function showMatchBets(matchId) {
  const match = getMatchById(matchId);
  if (!match) return;
  const results = getData('bolao_results', {});
  const r = results[matchId];
  const users = getData('bolao_users', {});
  const allPalpites = getData('bolao_palpites', {});
  const list = [];

  Object.entries(allPalpites).forEach(([uid, bets]) => {
    const p = bets[matchId];
    if (!p) return;
    const profile = users[uid] || {};
    const name = profile.name || uid.slice(0, 8);
    const avatar = profile.avatar || '';
    const pts = r ? calcPoints(p, r) : null;
    list.push({ name, avatar, home: p.home, away: p.away, pts, isYou: uid === currentUser });
  });

  list.sort((a, b) => (b.pts||0) - (a.pts||0) || a.name.localeCompare(b.name));

  const overlay = document.createElement('div');
  overlay.className = 'bets-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const modal = document.createElement('div');
  modal.className = 'bets-modal';
  modal.innerHTML = `
    <div class="bets-modal-header">
      <span>👁 Palpites: ${match.home.name} × ${match.away.name}</span>
      <button class="bets-close" onclick="this.closest('.bets-overlay').remove()">✕</button>
    </div>
    ${r ? `<div class="bets-result-badge">Resultado real: ${r.home} × ${r.away}</div>` : ''}
    <div class="bets-list">
      ${list.length ? list.map(b => `
        <div class="bets-item ${b.isYou ? 'bets-you' : ''} ${b.pts === 5 ? 'bets-exact' : b.pts === 3 ? 'bets-good' : ''}">
          <span class="avatar-circle avatar-circle-sm">${b.avatar || '⚽'}</span>
          <span class="bets-name">${b.isYou ? '⭐ ' : ''}${b.name}</span>
          <span class="bets-score">${b.home} × ${b.away}</span>
          ${b.pts !== null ? `<span class="bets-pts ${'bpts-'+b.pts}">${b.pts > 0 ? '+'+b.pts : '0'}</span>` : '<span class="bets-pts bpts-pending">⏳</span>'}
        </div>`).join('') : '<div class="empty-state"><div class="empty-text">Ninguém palpou nesse jogo ainda.</div></div>'}
    </div>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
function setChampionWinner() {
  const select = document.getElementById('champAdminSelect');
  const name = select.value;
  if (!name) { showToast('Selecione o campeão!', true); return; }
  const team = Object.values(GROUPS).flatMap(g => g.teams).find(t => t.name === name);
  if (!team) return;
  const results = getData('bolao_results', {});
  results._champion = team;
  setData('bolao_results', results);
  showToast(`🏆 Campeão definido: ${name}! Bônus de ${CHAMPION_BONUS}pts para quem acertou!`);
  confetti(100);
  renderResults(currentPhase);
}

function clearChampionWinner() {
  if (!confirm('Limpar o campeão?')) return;
  const results = getData('bolao_results', {});
  delete results._champion;
  setData('bolao_results', results);
  showToast('Campeão removido.');
  renderResults(currentPhase);
}
function saveResult(matchId) {
  if (!currentUserIsAdmin()) {
    showToast('Apenas o admin pode salvar resultados.', true);
    return;
  }

  const h = document.getElementById(`rh-${matchId}`).value;
  const a = document.getElementById(`ra-${matchId}`).value;
  if (h === '' || a === '') { showToast('Preencha o placar real!', true); return; }
  const match = getMatchById(matchId);
  if (match?.phase !== 'Grupos' && Number(h) === Number(a)) {
    showToast('No mata-mata precisa haver um vencedor. Ajuste o placar final.', true);
    return;
  }

  const results = getData('bolao_results', {});
  const existing = results[matchId];
  if (existing?.settled) {
    showToast('Este jogo já foi liquidado. Limpe o resultado primeiro se quiser re-postar.', true);
    return;
  }

  let fifaOdds = null;
  if (match && !match.home.isPlaceholder && !match.away.isPlaceholder) {
    fifaOdds = calcFifaOdds(match.home.name, match.away.name);
  }
  results[matchId] = { home: parseInt(h), away: parseInt(a), fifaOdds };

  settleMatchBets(matchId, { home: parseInt(h), away: parseInt(a) });
  results[matchId].settled = true;

  setData('bolao_results', results);

  renderResults(currentPhase);
  showToast('Resultado salvo! Apostas liquidadas automaticamente.');
  confetti(60);
}

function settleMatchBets(matchId, result) {
  const bets = getData('bolao_bets', {});
  const matchBets = bets[matchId];
  if (!matchBets || !Object.keys(matchBets).length) return;

  const match = getMatchById(matchId);
  const matchLabel = match ? `${match.home.name} × ${match.away.name}` : `Jogo #${matchId}`;
  const outcome = result.home > result.away ? 'home' : result.away > result.home ? 'away' : 'draw';
  const odds = calcBetsOdds(matchId);
  const winningOdd = odds[outcome];

  const users = getData('bolao_users', {});
  let paidTotal = 0;
  let paidCount = 0;

  Object.entries(matchBets).forEach(([uid, bet]) => {
    const amount = bet[outcome] || 0;
    if (amount <= 0) return;
    const payout = +(amount * winningOdd).toFixed(2);
    const profit = +(amount * (winningOdd - 1)).toFixed(2);
    if (!users[uid]) users[uid] = {};
    users[uid].bets_balance = (users[uid].bets_balance || 100) + payout;
    if (!users[uid].bet_history) users[uid].bet_history = [];
    users[uid].bet_history.push({
      matchId,
      matchLabel,
      phase: match?.phase || '',
      outcome,
      amount,
      odd: winningOdd,
      payout,
      profit,
      result: `${result.home}×${result.away}`,
      settledAt: Date.now()
    });
    paidTotal += payout;
    paidCount++;
  });

  Object.entries(matchBets).forEach(([uid, bet]) => {
    const lostAmount = (bet.home||0) + (bet.draw||0) + (bet.away||0) - (bet[outcome]||0);
    if (lostAmount > 0) {
      if (!users[uid]) users[uid] = {};
      if (!users[uid].bet_history) users[uid].bet_history = [];
      users[uid].bet_history.push({
        matchId,
        matchLabel,
        phase: match?.phase || '',
        outcome: 'lost',
        amount: lostAmount,
        odd: 0,
        payout: 0,
        profit: -lostAmount,
        result: `${result.home}×${result.away}`,
        settledAt: Date.now()
      });
    }
  });

  if (paidCount > 0) {
    setData('bolao_users', users);
    showToast(`💰 R$ ${paidTotal.toFixed(2)} pagos a ${paidCount} vencedor(es) (odd: ${winningOdd}x)`);
  }

  delete bets[matchId];
  setData('bolao_bets', bets);
}

function clearResult(matchId) {
  if (!currentUserIsAdmin()) { showToast('Apenas o admin pode remover resultados.', true); return; }
  const results = getData('bolao_results', {});
  const r = results[matchId];
  const wasSettled = r?.settled;
  if (wasSettled && !confirm(`⚠️ Este jogo já foi liquidado (pagamentos feitos). Remover mesmo assim? Os pagamentos NÃO serão estornados.`)) return;
  if (!wasSettled && !confirm(`Remover o resultado do jogo ${matchId}?`)) return;
  delete results[matchId];
  setData('bolao_results', results);
  renderResults(currentPhase);
  showToast(wasSettled ? 'Resultado removido. Pagamentos mantidos.' : 'Resultado removido.');
}

// ============================================================
//  SCORING
// ============================================================
function calcPoints(palpite, result) {
  if (!palpite || !result) return null; // result not yet
  const ph = palpite.home, pa = palpite.away;
  const rh = result.home, ra = result.away;

  // Exact score: 5pts
  if (ph === rh && pa === ra) return 5;

  const pWinner = ph > pa ? 'H' : ph < pa ? 'A' : 'D';
  const rWinner = rh > ra ? 'H' : rh < ra ? 'A' : 'D';
  const pDiff = ph - pa;
  const rDiff = rh - ra;

  // Correct winner + correct goal diff: 3pts
  if (pWinner === rWinner && pDiff === rDiff) return 3;

  // Only correct winner/draw: 1pt
  if (pWinner === rWinner) return 1;

  return 0;
}

function getUserScore(userName) {
  const palpites = getData('bolao_palpites', {})[userName] || {};
  const results = getData('bolao_results', {});
  const users = getData('bolao_users', {});
  let total = 0, exact = 0, result3 = 0, winner1 = 0;
  let streak = 0, maxStreak = 0;
  let topTeam = '', topTeamPts = 0;
  const teamPts = {};

  ALL_MATCHES.forEach(m => {
    const p = palpites[m.id];
    const r = results[m.id];
    const pts = calcPoints(p, r);
    if (pts === null) return;
    total += pts;
    if (pts === 5) exact++;
    else if (pts === 3) result3++;
    else if (pts === 1) winner1++;

    if (pts > 0) { streak++; if (streak > maxStreak) maxStreak = streak; }
    else streak = 0;

    if (r && p) {
      const winner = r.home > r.away ? m.home.name : m.away.name;
      teamPts[winner] = (teamPts[winner] || 0) + pts;
    }
  });

  Object.entries(teamPts).forEach(([team, pts]) => {
    if (pts > topTeamPts) { topTeamPts = pts; topTeam = team; }
  });

  const profile = users[userName];
  const champWinner = results._champion;
  const champBonus = champWinner && profile?.champion === (champWinner.name || champWinner) ? CHAMPION_BONUS : 0;

  return { total: total + champBonus, exact, result3, winner1, maxStreak, topTeam, champPts: champBonus };
}

function getUserAchievements(userName) {
  const score = getUserScore(userName);
  const badges = [];
  if (score.exact >= 1) badges.push({ icon:'🎯', label:'Placar Exato', desc:score.exact === 1 ? '1 acerto' : score.exact + ' acertos' });
  if (score.exact >= 3) badges.push({ icon:'🔥', label:'Mira Infalível', desc:score.exact + ' exatos' });
  if (score.maxStreak >= 3 && score.maxStreak < 6) badges.push({ icon:'📈', label:'Sequência', desc:score.maxStreak + ' seguidos' });
  if (score.maxStreak >= 6) badges.push({ icon:'🚀', label:'Imparável', desc:score.maxStreak + ' seguidos' });
  if (score.total >= 30) badges.push({ icon:'💪', label:'Veterano', desc:score.total + ' pts' });
  if (score.total >= 60) badges.push({ icon:'👑', label:'Lenda', desc:score.total + ' pts' });
  return badges;
}

// ============================================================
//  RANKING
// ============================================================
let rankingPhase = '';
let lastRanking = {};

function getUserScoreByPhase(userName, phase) {
  const palpites = getData('bolao_palpites', {})[userName] || {};
  const results = getData('bolao_results', {});
  let total = 0, exact = 0, result3 = 0, winner1 = 0;
  ALL_MATCHES.filter(m => m.phase === phase).forEach(m => {
    const pts = calcPoints(palpites[m.id], results[m.id]);
    if (pts === null) return;
    total += pts;
    if (pts === 5) exact++;
    else if (pts === 3) result3++;
    else if (pts === 1) winner1++;
  });
  return { total, exact, result3, winner1 };
}

function renderRanking() {
  const users = getData('bolao_users', {});
  const userList = Object.entries(users);
  const results = getData('bolao_results', {});
  const champWinner = results._champion;

  // Save old positions before rendering
  const oldPositions = { ...lastRanking };

  const scored = userList.map(([uid, profile]) => ({
    uid,
    name: profile.name || profile.email || 'Participante',
    isAdmin: profile.isAdmin === true,
    champion: profile.champion || '',
    avatar: profile.avatar || '',
    accentColor: profile.accentColor || '',
    ...(rankingPhase ? getUserScoreByPhase(uid, rankingPhase) : getUserScore(uid))
  }));
  scored.sort((a, b) => b.total - a.total);

  const list = document.getElementById('rankingList');

  if (!scored.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">🏆</div><div class="empty-text">Nenhum participante ainda.</div></div>';
    return;
  }

  list.innerHTML = `
    <div class="ranking-phase-tabs">
      <button class="rphase-tab ${!rankingPhase ? 'active' : ''}" onclick="setRankingPhase('')">Geral</button>
      ${PHASES.map(p => `<button class="rphase-tab ${rankingPhase === p ? 'active' : ''}" onclick="setRankingPhase('${p}')">${phaseLabel(p)}</button>`).join('')}
    </div>
  ` + scored.map((u, i) => {
    const badges = rankingPhase ? [] : getUserAchievements(u.uid);
    const champBonus = !rankingPhase && u.champPts ? `+${u.champPts} champ` : '';
    const accent = u.accentColor || 'var(--green)';
    const isYou = u.uid === currentUser;
    return `
    <div class="ranking-card card-stagger ${i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':''}" style="--i:${i}">
      <div class="rank-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
      <div class="avatar-circle avatar-circle-sm" style="${isYou && accent ? `border-color:${accent};box-shadow:0 0 10px ${accent}60` : ''}">${u.avatar || '⚽'}</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.4rem;flex-wrap:wrap;">
          <div class="rank-name" style="${isYou && accent ? `color:${accent}` : ''}">${u.name}</div>
          ${u.isAdmin ? '<div class="rank-you-badge">ADMIN</div>' : ''}
          ${isYou ? `<div class="rank-you-badge" style="${accent ? `background:${accent}30;border-color:${accent};color:${accent}` : ''}">VOCÊ</div>` : ''}
        </div>
        <div class="rank-breakdown">
          <div class="rank-stat"><span class="stat-exact">★</span><span class="stat-exact">${u.exact}</span><span style="color:var(--silver);">Exatos</span></div>
          <div class="rank-stat"><span class="stat-result">✓</span><span class="stat-result">${u.result3}</span><span style="color:var(--silver);">Result+Diff</span></div>
          <div class="rank-stat"><span class="stat-winner">⬆</span><span class="stat-winner">${u.winner1}</span><span style="color:var(--silver);">Vencedor</span></div>
        </div>
        ${badges.length ? `<div class="rank-badges">${badges.map(b => `<span class="rank-badge" title="${b.desc}">${b.icon} ${b.label}</span>`).join('')}</div>` : ''}
        ${!rankingPhase && u.champion ? `<div class="rank-champion-pick ${champWinner && u.champion === (champWinner.name||champWinner) ? 'rank-champion-correct' : ''}">${u.champion === (champWinner?.name||champWinner) ? '👑 ' : ''}${u.champion}${champWinner && u.champion === (champWinner.name||champWinner) ? ' 🏆' : ''}</div>` : ''}
      </div>
      <div style="text-align:right;">
        <div class="rank-pts">${u.total}</div>
        <div class="rank-pts-label">pontos${champBonus ? ` ${champBonus}` : ''}</div>
        ${!rankingPhase && u.topTeam ? `<div class="rank-top-team" title="Time que mais pontuou">${u.topTeam}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  // Check for overtakes
  if (!rankingPhase && oldPositions[currentUser] !== undefined) {
    const myOld = oldPositions[currentUser];
    const myNew = scored.findIndex(u => u.uid === currentUser) + 1;
    scored.forEach(u => {
      if (u.uid === currentUser) return;
      const oldPos = oldPositions[u.uid];
      if (oldPos === undefined) return;
      if (oldPos > myOld && scored.findIndex(x => x.uid === u.uid) + 1 <= myOld) {
        showToast(`🚀 ${u.name} passou você no ranking! (${myOld}º → ${scored.findIndex(x => x.uid === u.uid) + 1}º)`);
      }
    });
  }

  // Update lastRanking
  lastRanking = {};
  scored.forEach((u, i) => { lastRanking[u.uid] = i + 1; });
}

function setRankingPhase(phase) {
  rankingPhase = phase;
  renderRanking();
}

function toggleEvolution() {
  const container = document.getElementById('evolutionContainer');
  const btn = document.querySelector('.btn-evolution');
  if (container.style.display === 'none') {
    renderEvolution();
    container.style.display = 'block';
    btn.textContent = '📉 Fechar Evolução';
  } else {
    container.style.display = 'none';
    btn.textContent = '📈 Ver Evolução por Fase';
  }
}

function renderEvolution() {
  const users = getData('bolao_users', {});
  const userList = Object.entries(users);
  const container = document.getElementById('evolutionContainer');
  const phases = PHASES.filter(p => ALL_MATCHES.some(m => m.phase === p));

  const phaseScores = {};
  phases.forEach(phase => { phaseScores[phase] = []; });

  userList.forEach(([uid, profile]) => {
    const name = profile.name || uid.slice(0, 8);
    phases.forEach(phase => {
      const score = getUserScoreByPhase(uid, phase);
      phaseScores[phase].push({ uid, name, total: score.total });
    });
  });

  const rankingsPerPhase = {};
  phases.forEach(phase => {
    const sorted = [...phaseScores[phase]].sort((a, b) => b.total - a.total);
    rankingsPerPhase[phase] = {};
    sorted.forEach((u, i) => { rankingsPerPhase[phase][u.uid] = i + 1; });
  });

  container.innerHTML = `
    <div class="evolution-wrap">
      <div class="evolution-title">📈 Posição por Fase</div>
      <div class="evolution-table-wrap">
        <table class="evolution-table">
          <thead>
            <tr>
              <th class="evo-name-col">Participante</th>
              ${phases.map(p => `<th class="evo-phase-col">${phaseLabel(p)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${userList.map(([uid, profile]) => {
              const name = profile.name || uid.slice(0, 8);
              let prev = null;
              return `<tr>
                <td class="evo-name-col ${uid === currentUser ? 'evo-you' : ''}">${name}</td>
                ${phases.map(phase => {
                  const pos = rankingsPerPhase[phase][uid];
                  const pts = phaseScores[phase].find(u => u.uid === uid)?.total || 0;
                  let arrow = '', cls = '';
                  if (prev !== null && pos !== undefined) {
                    if (pos < prev) { arrow = '🟢'; cls = 'evo-up'; }
                    else if (pos > prev) { arrow = '🔴'; cls = 'evo-down'; }
                    else { arrow = '⚪'; cls = 'evo-same'; }
                  }
                  prev = pos;
                  const posDisplay = pos !== undefined ? `${pos}º` : '—';
                  return `<td class="evo-pos ${cls}">${arrow} ${posDisplay} <span class="evo-pts">(${pts})</span></td>`;
                }).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="evo-legend">🟢 subiu &nbsp;🔴 caiu &nbsp;⚪ manteve</div>
    </div>`;
}

// ============================================================
//  MY BETS
// ============================================================
function renderMyBets() {
  const palpites = getData('bolao_palpites', {})[currentUser] || {};
  const results = getData('bolao_results', {});

  const score = getUserScore(currentUser);

  const phaseStats = PHASES.map(phase => {
    let pts = 0, count = 0;
    ALL_MATCHES.filter(m => m.phase === phase).forEach(m => {
      const p = palpites[m.id];
      const r = results[m.id];
      const c = calcPoints(p, r);
      if (c !== null) { pts += c; count++; }
    });
    return { phase, pts, count, avg: count ? (pts/count).toFixed(1) : '—' };
  });

  const topTeamsStat = (() => {
    const teamPts = {};
    ALL_MATCHES.forEach(m => {
      const p = palpites[m.id];
      const r = results[m.id];
      const pts = calcPoints(p, r);
      if (pts && pts > 0 && r) {
        const winner = r.home > r.away ? m.home.name : m.away.name;
        teamPts[winner] = (teamPts[winner] || 0) + pts;
      }
    });
    return Object.entries(teamPts).sort((a,b) => b[1]-a[1]).slice(0, 3);
  })();

  document.getElementById('myBetsSummary').innerHTML = `
    <div class="summary-card">
      <div class="summary-val" style="color:var(--green)">${score.total}</div>
      <div class="summary-label">Total de Pontos</div>
    </div>
    <div class="summary-card">
      <div class="summary-val" style="color:var(--yellow)">${score.exact}</div>
      <div class="summary-label">Placares Exatos (5pts)</div>
    </div>
    <div class="summary-card">
      <div class="summary-val" style="color:var(--green)">${score.result3}</div>
      <div class="summary-label">Result+Diff (3pts)</div>
    </div>
    <div class="summary-card">
      <div class="summary-val" style="color:var(--orange)">${score.winner1}</div>
      <div class="summary-label">Vencedor (1pt)</div>
    </div>
    <div class="summary-card">
      <div class="summary-val" style="color:var(--silver)">${Object.keys(palpites).length}</div>
      <div class="summary-label">Palpites Dados</div>
    </div>
    <div class="summary-card">
      <div class="summary-val" style="color:var(--silver)">${score.maxStreak}</div>
      <div class="summary-label">Maior Sequência</div>
    </div>
  `;

  // Avatar + color picker
  const users = getData('bolao_users', {});
  const myProfile = users[currentUser] || {};
  const currentAvatar = myProfile.avatar || '';
  const currentColor = myProfile.accentColor || '';
  const AVATARS = ['⚽','🏀','🎾','🎯','🎱','🚀','🔥','💪','👑','🦁','🐯','🐺','🦅','🐉','🐲','🎮','🏆','💎','🌟','🌈','⭐','⚡','🦈','🐬','🐸','🦊','🐶','🐱','🦄','🐼','🐨','🐧','🦖','🦋','🐝','🦩','🦚','🌵','🍀','🌺','🍕','🎸','🎨','🚗','✈️','🚁','🛸','⚔️','🛡️','🧠','👽','🤖','🎃','👻'];
  const COLORS = [
    { name:'Verde', hex:'#00C851' }, { name:'Dourado', hex:'#FFD700' },
    { name:'Vermelho', hex:'#FF4444' }, { name:'Azul', hex:'#33B5E5' },
    { name:'Roxo', hex:'#AA66CC' }, { name:'Laranja', hex:'#FF8800' },
    { name:'Rosa', hex:'#FF69B4' }, { name:'Ciano', hex:'#00BFFF' },
    { name:'Branco', hex:'#e0e0e0' }, { name:'Deep Orange', hex:'#FF6D00' }
  ];

  if (!document.getElementById('avatarPickerContainer')) {
    const avatarWrap = document.createElement('div');
    avatarWrap.id = 'avatarPickerContainer';
    avatarWrap.className = 'avatar-picker-wrap';
    avatarWrap.innerHTML = `
      <div class="avatar-picker-title">🎭 Seu Avatar</div>
      <div class="avatar-picker-grid">
        ${AVATARS.map(a => `<div class="avatar-option ${a === currentAvatar ? 'selected' : ''}" onclick="selectAvatar('${a}')">${a}</div>`).join('')}
      </div>
      <div style="margin-top:0.5rem;font-size:0.7rem;color:var(--silver);">Atual: <span id="currentAvatarDisplay" style="font-size:1.2rem;">${currentAvatar || '⚽'}</span></div>
      <div class="avatar-picker-title" style="margin-top:1rem;">🎨 Sua Cor</div>
      <div class="avatar-picker-grid">
        ${COLORS.map(c => `<div class="color-option ${c.hex === currentColor ? 'selected' : ''}" style="background:${c.hex}" onclick="selectAccentColor('${c.hex}')" title="${c.name}"></div>`).join('')}
        <div class="color-option ${!currentColor ? 'selected' : ''}" style="background:var(--gray-mid);border-color:var(--gray-light);color:var(--silver);font-size:0.6rem;" onclick="selectAccentColor('')" title="Padrão (verde)">✕</div>
      </div>
    `;
    document.getElementById('myBetsSummary').after(avatarWrap);
  }

  const extraStats = document.createElement('div');
  extraStats.className = 'extra-stats';
  extraStats.innerHTML = `
    <div class="section-sub" style="margin-top:1rem;margin-bottom:0.5rem;">📊 Aproveitamento por Fase</div>
    <div class="phase-stats-list">
      ${phaseStats.filter(s => s.count > 0).map(s => `
        <div class="phase-stat-item">
          <span class="phase-stat-label">${phaseLabel(s.phase)}</span>
          <span class="phase-stat-bar-wrap">
            <span class="phase-stat-bar" style="width:${Math.min(100, (s.pts/(s.count*5))*100)}%"></span>
          </span>
          <span class="phase-stat-num">${s.pts}/${s.count*5} (${s.avg}/j)</span>
        </div>`).join('')}
    </div>
    ${topTeamsStat.length ? `
    <div class="section-sub" style="margin-top:1rem;margin-bottom:0.5rem;">🏅 Times que mais renderam pontos</div>
    <div class="top-teams-list">
      ${topTeamsStat.map(([team, pts], i) => `
        <div class="top-team-item">
          <span class="top-team-pos">${['🥇','🥈','🥉'][i]||i+1}</span>
          <span class="top-team-name">${team}</span>
          <span class="top-team-pts">${pts} pts</span>
        </div>`).join('')}
    </div>` : ''}
  `;
  document.getElementById('myBetsSummary').after(extraStats);

  const betList = document.getElementById('betReviewList');
  const thirdAssignments = getThirdTeamAssignments(results);
  const matchesWithBets = ALL_MATCHES
    .filter(m => palpites[m.id])
    .map(m => getResolvedMatch(m, results, thirdAssignments));

  if (!matchesWithBets.length) {
    betList.innerHTML = '<div class="empty-state"><div class="empty-icon">🎯</div><div class="empty-text">Você ainda não deu nenhum palpite.</div></div>';
    return;
  }

  betList.innerHTML = matchesWithBets.map((m, mi) => {
    const p = palpites[m.id];
    const r = results[m.id];
    const pts = calcPoints(p, r);

    let chipClass = 'pts-pending', chipLabel = '⏳';
    if (pts === 5) { chipClass = 'pts-5'; chipLabel = '+5'; }
    else if (pts === 3) { chipClass = 'pts-3'; chipLabel = '+3'; }
    else if (pts === 1) { chipClass = 'pts-1'; chipLabel = '+1'; }
    else if (pts === 0) { chipClass = 'pts-0'; chipLabel = '0'; }

    return `
      <div class="bet-review-card card-stagger" style="--i:${mi}">
        <div class="bet-match-name">${flagMarkup(m.home, 'flag flag-inline')} ${m.home.name} × ${m.away.name} ${flagMarkup(m.away, 'flag flag-inline')}</div>
        <div style="display:flex;align-items:center;gap:0.4rem;">
          <div style="font-size:0.68rem;color:var(--silver);">Palpite:</div>
          <div class="bet-score">${p.home}×${p.away}</div>
        </div>
        ${r ? `
          <div style="display:flex;align-items:center;gap:0.4rem;">
            <div style="font-size:0.68rem;color:var(--silver);">Real:</div>
            <div class="bet-real-score">${r.home}×${r.away}</div>
          </div>` : `<div style="font-size:0.68rem;color:var(--silver);">Aguardando</div>`}
        <div class="pts-chip ${chipClass}">${chipLabel}</div>
      </div>
    `;
  }).join('');
}



// ============================================================
//  BRACKET
// ============================================================
function renderBracket() {
  const results = getData('bolao_results', {});
  const thirdAssignments = getThirdTeamAssignments(results);
  const container = document.getElementById('bracketContainer');
  const KO_PHASES = ['32avos','Oitavas','Quartas','Semis','Terceiro','Final'];
  const PHASE_LABELS = { '32avos':'32avos','Oitavas':'Oitavas','Quartas':'Quartas','Semis':'Semis','Terceiro':'3º Lugar','Final':'Final' };

  container.innerHTML = `<div class="bracket-grid">` +
    KO_PHASES.map(phase => {
      const matches = ALL_MATCHES
        .filter(m => m.phase === phase)
        .map(m => getResolvedMatch(m, results, thirdAssignments));
      return `<div class="bracket-round">
        <div class="bracket-round-title">${PHASE_LABELS[phase]}</div>
        ${matches.map(m => {
          const r = results[m.id];
          const hasR = r !== undefined;
          const isPending = m.home.isPlaceholder || m.away.isPlaceholder;
          const homeWin = hasR && r.home > r.away;
          const awayWin = hasR && r.away > r.home;
          return `<div class="bracket-match ${hasR ? 'bracket-done' : ''}">
            <div class="bracket-teams">
              <div class="bracket-team ${homeWin ? 'bracket-winner' : ''}">
                ${flagMarkup(m.home, 'flag flag-inline')}
                <span class="bracket-team-name">${m.home.name}</span>
                ${hasR ? `<span class="bracket-score">${r.home}</span>` : ''}
                ${homeWin ? '<span class="bracket-adv">✅</span>' : ''}
              </div>
              <div class="bracket-team ${awayWin ? 'bracket-winner' : ''}">
                ${flagMarkup(m.away, 'flag flag-inline')}
                <span class="bracket-team-name">${m.away.name}</span>
                ${hasR ? `<span class="bracket-score">${r.away}</span>` : ''}
                ${awayWin ? '<span class="bracket-adv">✅</span>' : ''}
              </div>
            </div>
            ${isPending ? '<div class="bracket-pending">⏳ A definir</div>' : ''}
          </div>`;
        }).join('')}
      </div>`;
    }).join('') +
  `</div>`;
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg, error = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.borderColor = error ? 'var(--red)' : 'var(--green)';
  t.style.color = error ? 'var(--red)' : 'var(--green)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ============================================================
//  THEME
// ============================================================
function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  if (isLight) {
    html.removeAttribute('data-theme');
    localStorage.setItem('bolao_theme', 'dark');
    document.getElementById('themeToggle').textContent = '🌙';
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('bolao_theme', 'light');
    document.getElementById('themeToggle').textContent = '☀️';
  }
}

function initTheme() {
  const saved = localStorage.getItem('bolao_theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
}

// ============================================================
//  INIT
// ============================================================
dataReadyPromise = initFirebaseData();
initTheme();
updateCountdown();
const savedEmail = localStorage.getItem('bolao_login_email');
const savedPass = localStorage.getItem('bolao_login_pass');
if (savedEmail) {
  document.getElementById('loginEmail').value = savedEmail;
  document.getElementById('rememberEmail').checked = true;
  if (savedPass) document.getElementById('loginPass').value = savedPass;
}

setInterval(updateCountdown, 60000);

setInterval(() => {
  const gruposPage = document.getElementById('page-grupos');
  if (gruposPage && gruposPage.classList.contains('active')) renderGroups();
}, 60000);

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('loginPage').style.display !== 'none') {
    const lf = document.getElementById('loginForm');
    if (lf.style.display !== 'none') doLogin();
    else doRegister();
  }
});

dataReadyPromise.then(() => {
  if (!auth || !sessionStorage.getItem('bolao_session')) {
    document.getElementById('loginPage').style.display = 'flex';
    return;
  }
  if (auth.currentUser && !_authHandled) {
    _authHandled = true;
    if (document.getElementById('app').style.display !== 'none') return;
    currentUser = auth.currentUser.uid;
    const profile = appData.bolao_users[currentUser];
    currentUserName = profile?.name || auth.currentUser.email || 'Participante';
    enterApp();
    return;
  }
  let loginTimer = setTimeout(() => {
    document.getElementById('loginPage').style.display = 'flex';
    sessionStorage.removeItem('bolao_session');
  }, 300);
  const unsub = auth.onAuthStateChanged(function autoLogin(user) {
    if (!user) return;
    clearTimeout(loginTimer);
    unsub();
    if (_authHandled) return;
    if (document.getElementById('app').style.display !== 'none') return;
    _authHandled = true;
    currentUser = user.uid;
    isFirebaseReady = false;
    initFirebaseData().then(() => {
      const profile = appData.bolao_users[currentUser];
      currentUserName = profile?.name || user.email || 'Participante';
      enterApp();
    });
  });
});
