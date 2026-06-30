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
  return getGroupMatches(group).every(m => results[m.id] && results[m.id].settled);
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

  // Chaveamento predeterminado da FIFA 2026
  const fixedMap = {
    '3ABCDF': 'D','3CDFGH': 'F','3CEFHI': 'E','3EHIJK': 'K',
    '3BEFIJ': 'B','3AEHIJ': 'I','3EFGIJ': 'J','3DEIJL': 'L'
  };
  const thirdByGroup = Object.fromEntries(thirds.map(team => [team.group, team]));
  const out = {};
  for (const [ref, group] of Object.entries(fixedMap)) {
    if (thirdByGroup[group]) out[thirdByGroup[group].matchRef || ref] = group;
  }
  // Mapeia cada partida de 32avos que tem ref 3xyz
  const assignments = {};
  ALL_MATCHES.filter(m => m.phase === '32avos').forEach(m => {
    const ref = (m.homeRef?.startsWith('3') ? m.homeRef : m.awayRef?.startsWith('3') ? m.awayRef : null);
    if (ref && fixedMap[ref] && thirdByGroup[fixedMap[ref]]) {
      assignments[m.id] = fixedMap[ref];
    }
  });
  return assignments;
}

function getMatchById(matchId) {
  return ALL_MATCHES.find(match => match.id === Number(matchId));
}

function getMatchWinner(matchId, results) {
  const match = getResolvedMatch(getMatchById(matchId), results);
  const result = results[matchId];
  if (!match || !result || !result.settled) return null;
  if (result.home !== result.away) return result.home > result.away ? match.home : match.away;
  return result.winner === 'home' ? match.home : result.winner === 'away' ? match.away : null;
}

function getMatchLoser(matchId, results) {
  const match = getResolvedMatch(getMatchById(matchId), results);
  const result = results[matchId];
  if (!match || !result || !result.settled) return null;
  if (result.home !== result.away) return result.home > result.away ? match.away : match.home;
  return result.winner === 'home' ? match.away : result.winner === 'away' ? match.home : null;
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
const STORAGE_KEYS = ['bolao_users', 'bolao_palpites', 'bolao_results'];

let db = null;
let unsubscribeUsers = null, unsubscribePalpites = null, unsubscribeResults = null;
let auth = null;
let usersRef = null;
let palpitesRef = null;
let resultsRef = null;
let adminRef = null;

let dataReadyPromise = null;
let isFirebaseReady = false;
let isApplyingRemoteData = false;
let _authHandled = false;
let currentGroup = '';
let currentPhase = 'Grupos';
let matchSearch = '';

let appData = {
  bolao_users: {},
  bolao_palpites: {},
  bolao_results: {},

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

function saveLocalData(fromSnapshot) {
  STORAGE_KEYS.forEach(key => {
    const newData = appData[key] || {};
    if (key === 'bolao_users') {

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
    usersRef = db.collection('bolao_users');
    palpitesRef = db.collection('bolao_palpites');
    resultsRef = db.collection('bolao_config').doc('results');
    adminRef = db.collection('bolao_config').doc('admin');
    if (!auth.currentUser) {
      isFirebaseReady = true;
      return;
    }

    const [usersSnap, palpitesSnap, resultsSnap] = await Promise.all([
      usersRef.get(),
      palpitesRef.get(),
      resultsRef.get()
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
        };
    });

    appData.bolao_palpites = {};
    palpitesSnap.forEach(doc => {
      appData.bolao_palpites[doc.id] = doc.data().matches || {};
    });

    if (resultsSnap.exists) {
      appData.bolao_results = resultsSnap.data().matches || {};
    }

    // Migra resultados antigos (sem settled) e remove 32avos que estavam corrompidos
    for (const key of Object.keys(appData.bolao_results)) {
      if (key === '_champion') continue;
      const match = ALL_MATCHES.find(m => m.id === Number(key));
      if (match && match.phase === '32avos') {
        delete appData.bolao_results[key];
      } else if (!appData.bolao_results[key].settled) {
        appData.bolao_results[key].settled = true;
      }
    }

    // Carrega resultados reais dos grupos se ainda nao foram carregados
    if (!hasRealResults(appData.bolao_results)) {
      preencherResultadosReais(appData.bolao_results);
    }

    // Salvando local + Firebase para que o onSnapshot nao restaure dados velhos
    try {
      await resultsRef.set({
        matches: appData.bolao_results || {},
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.error('Erro ao salvar cleanup 32avos no Firebase:', e);
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
          champion: data.champion || ''
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

function hasRealResults(results) {
  for (const key of Object.keys(results)) {
    if (key === '_champion') continue;
    const match = ALL_MATCHES.find(m => m.id === Number(key));
    if (match && match.phase === 'Grupos' && results[key].home !== undefined) {
      return true;
    }
  }
  return false;
}

function preencherResultadosReais(results) {
  const dados = {
    1:[2,0],2:[1,0],3:[3,0],4:[1,0],5:[1,1],6:[2,1],
    7:[1,1],8:[6,0],9:[1,2],10:[3,1],11:[1,4],12:[1,1],
    13:[1,1],14:[3,0],15:[3,0],16:[4,2],17:[1,0],18:[0,1],
    19:[4,1],20:[2,0],21:[2,3],22:[0,0],23:[1,0],24:[2,0],
    25:[7,1],26:[2,1],27:[1,2],28:[0,2],29:[0,0],30:[1,0],
    31:[2,2],32:[5,1],33:[3,1],34:[1,1],35:[4,0],36:[5,1],
    37:[1,1],38:[0,0],39:[5,1],40:[1,1],41:[3,1],42:[2,2],
    43:[0,0],44:[4,0],45:[1,0],46:[0,0],47:[2,2],48:[1,1],
    49:[3,1],50:[3,0],51:[4,1],52:[5,0],53:[2,3],54:[1,4],
    55:[3,0],56:[2,0],57:[3,1],58:[3,3],59:[2,1],60:[3,1],
    61:[1,1],62:[5,0],63:[0,0],64:[3,1],65:[0,1],66:[1,3],
    67:[4,2],68:[0,0],69:[2,0],70:[2,1],71:[1,0],72:[1,0]
  };
  for (const [id, [h, a]] of Object.entries(dados)) {
    results[id] = { home: h, away: a, winner: null, settled: true };
  }
}

function enterApp() {
  sessionStorage.setItem('bolao_session', '1');
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('headerUserName').textContent = currentUserName || currentUser;
  cleanupResults();
  renderGroups();
  renderPhaseTabs();
  renderResultPhaseTabs();
  showPage('grupos', document.querySelector('.nav-btn[data-page="grupos"]'));
}

function showError(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
}

function cleanupResults() {
  const results = getData('bolao_results', {});
  let changed = false;
  for (const key of Object.keys(results)) {
    if (key === '_champion') continue;
    if (!results[key].settled) {
      results[key].settled = true;
      changed = true;
    }
  }
  if (changed) setData('bolao_results', results);
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

  grid.innerHTML = nextHtml + renderBracketInGroups() + Object.entries(GROUPS).map(([g, data], gi) => {
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

}

function renderBracketGrid(matchIdsByRound, results, thirdAssignments, labels) {
  const roundNames = labels || ['32avos', 'Oitavas', 'Quartas', 'Semifinal'];
  const rounds = matchIdsByRound.length;
  const totalRows = Math.pow(2, rounds);
  const isNormal = matchIdsByRound[0].length >= matchIdsByRound[rounds - 1].length;

  const rowPos = (r, mi) => Math.pow(2, isNormal ? r : rounds - r - 1) * (2 * mi + 1);
  const rowSpan = (r) => Math.pow(2, isNormal ? r + 1 : rounds - r);

  const card = (id) => {
    const m = getResolvedMatch(ALL_MATCHES.find(x => x.id === id), results, thirdAssignments);
    if (!m) return '';
    const res = results[id];
    const hasR = res !== undefined;
    const w = hasR ? getMatchWinner(id, results) : null;
    const hw = w && w.name === m.home.name;
    const aw = w && w.name === m.away.name;
    return `<div class="bg-match ${hasR ? 'bg-done' : ''}">
      <div class="bg-team ${hw ? 'bg-win' : ''}"><span class="bg-flag">${flagMarkup(m.home,'flag flag-inline')}</span><span class="bg-name">${m.home.name}</span>${hasR ? `<span class="bg-score">${res.home}</span>` : ''}${hw ? '<span class="bg-adv">✅</span>' : ''}</div>
      <div class="bg-team ${aw ? 'bg-win' : ''}"><span class="bg-flag">${flagMarkup(m.away,'flag flag-inline')}</span><span class="bg-name">${m.away.name}</span>${hasR ? `<span class="bg-score">${res.away}</span>` : ''}${aw ? '<span class="bg-adv">✅</span>' : ''}</div>
    </div>`;
  };

  const rowY = (row) => (row - 0.5) / totalRows;
  const colX = (col) => (col - 0.5) / rounds;

  let html = `<div class="bg-round-labels">`;
  matchIdsByRound.forEach((_, r) => { html += `<div class="bg-round-label">${roundNames[r] || ''}</div>`; });
  html += '</div>';
  html += `<div class="bg-grid" style="grid-template-columns: repeat(${rounds}, 1fr); grid-template-rows: repeat(${totalRows}, 1.4rem);">`;

  // Match cards
  matchIdsByRound.forEach((ids, r) => {
    ids.forEach((id, mi) => {
      const pos = rowPos(r, mi);
      const spanEnd = pos + rowSpan(r);
      html += `<div class="bg-cell" style="grid-column:${r+1};grid-row:${pos}/${spanEnd};z-index:1">${card(id)}</div>`;
    });
  });

  // SVG connector overlay
  const vbW = rounds * 100;
  const vbH = totalRows * 100;
  html += `<svg class="bg-svg" viewBox="0 0 ${vbW} ${vbH}" preserveAspectRatio="none" style="grid-column:1/-1;grid-row:1/-1;">`;

  for (let r = 0; r < rounds - 1; r++) {
    const cur = matchIdsByRound[r];
    const nxt = matchIdsByRound[r + 1];
    const feedCol = cur.length >= nxt.length ? r : r + 1;
    const convCol = cur.length >= nxt.length ? r + 1 : r;
    const pairs = Math.min(cur.length, nxt.length);

    for (let k = 0; k < pairs; k++) {
      const fr = feedCol;
      const pos1 = rowPos(fr, 2 * k);
      const pos2 = rowPos(fr, 2 * k + 1);
      const end2 = pos2 + rowSpan(fr);

      const cr = convCol;
      const convPos = rowPos(cr, k);
      const convCen = convPos + rowSpan(cr) / 2;

      const xF = colX(fr + 1) * vbW;
      const xC = colX(cr + 1) * vbW;
      const y1 = rowY(pos1) * vbH;
      const y2 = rowY(end2) * vbH;
      const yM = (y1 + y2) / 2;
      const yCC = rowY(convCen) * vbH;

      html += `<line x1="${xF}" y1="${y1}" x2="${xF}" y2="${y2}" class="bg-svg-line"/>`;
      html += `<line x1="${Math.min(xF, xC)}" y1="${yM}" x2="${Math.max(xF, xC)}" y2="${yM}" class="bg-svg-line"/>`;
      html += `<line x1="${xC}" y1="${yCC}" x2="${xC}" y2="${yM}" class="bg-svg-line"/>`;
    }
  }

  html += '</svg></div>';
  return html;
}

function renderFullBracket(results, thirdAssignments, compact = false) {
  const leftRounds = [
    [73, 75, 74, 77, 76, 78, 79, 80],
    [90, 89, 91, 92],
    [97, 98],
    [101],
  ];
  const rightRounds = [
    [102],
    [100, 99],
    [96, 95, 94, 93],
    [85, 87, 86, 88, 81, 82, 83, 84],
  ];

  const finalMatch = getResolvedMatch(ALL_MATCHES.find(m => m.id === 104), results, thirdAssignments);
  const thirdMatch = getResolvedMatch(ALL_MATCHES.find(m => m.id === 103), results, thirdAssignments);

  const rCard = (m) => {
    const r = results[m.id]; const hR = r !== undefined;
    const w = hR ? getMatchWinner(m.id, results) : null;
    const hw = w && w.name === m.home.name; const aw = w && w.name === m.away.name;
    return `<div class="bracket-match ${hR ? 'bracket-done' : ''}"><div class="bracket-teams">
      <div class="bracket-team ${hw ? 'bracket-winner' : ''}">${flagMarkup(m.home,'flag flag-inline')}<span class="bracket-team-name">${m.home.name}</span>${hR ? `<span class="bracket-score">${r.home}</span>` : ''}${hw ? '<span class="bracket-adv">✅</span>' : ''}</div>
      <div class="bracket-team ${aw ? 'bracket-winner' : ''}">${flagMarkup(m.away,'flag flag-inline')}<span class="bracket-team-name">${m.away.name}</span>${hR ? `<span class="bracket-score">${r.away}</span>` : ''}${aw ? '<span class="bracket-adv">✅</span>' : ''}</div>
    </div></div>`;
  };

  const title = compact ? '<div class="section-title" style="margin:0;">🏆 CHAVEAMENTO</div>' : '';

  return `<div class="bracket-container">
    ${title}
    <div class="bracket-two-sides">
      <div class="bracket-half">
        <div class="bracket-half-title">🏴 Chave Esquerda</div>
        <div class="bracket-half-content">${renderBracketGrid(leftRounds, results, thirdAssignments)}</div>
      </div>
      <div class="bracket-center">
        <div class="bracket-center-card"><div class="bracket-round-title">🏆 Final</div>${rCard(finalMatch)}</div>
        <div class="bracket-center-card"><div class="bracket-round-title">🥉 3º Lugar</div>${rCard(thirdMatch)}</div>
      </div>
      <div class="bracket-half">
        <div class="bracket-half-title">🏴 Chave Direita</div>
        <div class="bracket-half-content">${renderBracketGrid(rightRounds, results, thirdAssignments, ['Semifinal', 'Quartas', 'Oitavas', '32avos'])}</div>
      </div>
    </div>
  </div>`;
}

function renderBracketInGroups() {
  const results = getData('bolao_results', {});
  const thirdAssignments = getThirdTeamAssignments(results);
  return renderFullBracket(results, thirdAssignments, true);
}

function renderPhaseTabs() {
  const tabs = document.getElementById('phaseTabs');
  tabs.innerHTML = PHASES.map(p => `
    <button class="phase-tab ${p === currentPhase ? 'active' : ''}"
      onclick="switchPhase('${p}',this,'match')">${phaseLabel(p)}</button>
  `).join('');
}

function phaseLabel(p) {
  const map = { Grupos:'Grupos', '32avos':'Fase de 32', Oitavas:'Oitavas', Quartas:'Quartas', Semis:'Semis', Terceiro:'3\u00ba Lugar', Final:'Final' };
  return map[p] || p;
}

function getTeamByName(name) {
  return Object.values(GROUPS).flatMap(g => g.teams).find(t => t.name === name) || { name, flag: '\uD83C\uDFF3\uFE0F' };
}

function saveChampion() {
  const select = document.getElementById('championSelect');
  const teamName = select.value;
  if (!teamName) { showToast('Selecione um time!', true); return; }
  const users = getData('bolao_users', {});
  if (!users[currentUser]) users[currentUser] = {};
  users[currentUser].champion = teamName;
  setData('bolao_users', users);
  showToast('Campe\u00e3o definido: ' + teamName + ' \uD83D\uDC51');
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
  showToast(hex ? '\uD83C\uDFA8 Cor definida!' : '\uD83C\uDFA8 Cor padr\u00e3o restaurada');
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
  showToast('\uD83C\uDFAD Avatar: ' + emoji);
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
    const el = document.getElementById('mc-' + matchId);
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
  container.innerHTML = '<button class="group-pill ' + (!currentGroup ? 'active' : '') + '" data-group="" onclick="filterByGroup(\'\')">Todos</button>\n    ' + groups.map(g => '<button class="group-pill ' + (currentGroup === g ? 'active' : '') + '" data-group="' + g + '" onclick="filterByGroup(\'' + g + '\')">Grupo ' + g + '</button>').join('');
  container.style.display = currentPhase === 'Grupos' ? 'flex' : 'none';
}

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
    const isLocked = m.id !== 73 && m.date && new Date() > new Date(m.date + '-03:00');
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
  if (match && match.id !== 73 && match.date && new Date() > new Date(match.date + '-03:00')) {
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
    const hasR = r !== undefined && r.settled === true;
    const matchDate = m.date ? new Date(m.date + '-03:00') : null;
    const started = matchDate && new Date() > matchDate;
    return `
      <div class="result-card card-stagger" style="--i:${mi}">
        <div class="match-header" style="margin-bottom:0.5rem;">
          <span style="font-weight:700;font-size:0.85rem;">${flagMarkup(m.home, 'flag flag-inline')} ${m.home.name} × ${m.away.name} ${flagMarkup(m.away, 'flag flag-inline')}</span>
          ${hasR ? `<span class="result-saved-badge">✓ ${r.home}×${r.away}</span>` : ''}
          ${started ? `<button class="btn-view-bets" onclick="showMatchPalpites(${m.id})" title="Ver palpites dos participantes">👁</button>` : ''}
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
        </div>
        ${m.phase !== 'Grupos' ? `
        <div class="result-winner-row">
          <label class="winner-option ${hasR && r.winner === 'home' ? 'winner-selected' : ''}">
            <input type="radio" name="winner-${m.id}" value="home" ${hasR && r.winner === 'home' ? 'checked' : ''} onchange="this.parentElement.classList.add('winner-selected');document.querySelectorAll('.winner-option').forEach(el=>{if(el!==this.parentElement)el.classList.remove('winner-selected')})">
            🏆 ${m.home.name}
          </label>
          <span class="winner-vs">avançou</span>
          <label class="winner-option ${hasR && r.winner === 'away' ? 'winner-selected' : ''}">
            <input type="radio" name="winner-${m.id}" value="away" ${hasR && r.winner === 'away' ? 'checked' : ''} onchange="this.parentElement.classList.add('winner-selected');document.querySelectorAll('.winner-option').forEach(el=>{if(el!==this.parentElement)el.classList.remove('winner-selected')})">
            🏆 ${m.away.name}
          </label>
        </div>` : ''}` : `
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
          ${hasR && r.winner ? `<div class="winner-display">🏆 ${r.winner === 'home' ? m.home.name : m.away.name} avançou</div>` : ''}
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

function showMatchPalpites(matchId) {
  const match = getMatchById(matchId);
  if (!match) return;
  const results = getData('bolao_results', {});
  const r = results[matchId];
  const users = getData('bolao_users', {});
  const allPalpites = getData('bolao_palpites', {});
  const list = [];

  Object.entries(allPalpites).forEach(([uid, userPalpites]) => {
    const p = userPalpites[matchId];
    if (!p) return;
    const profile = users[uid] || {};
    const name = profile.name || uid.slice(0, 8);
    const avatar = profile.avatar || '';
    const pts = r ? calcPoints(p, r) : null;
    list.push({ name, avatar, home: p.home, away: p.away, pts, isYou: uid === currentUser });
  });

  list.sort((a, b) => (b.pts||0) - (a.pts||0) || a.name.localeCompare(b.name));

  const overlay = document.createElement('div');
  overlay.className = 'pmp-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const modal = document.createElement('div');
  modal.className = 'pmp-modal';
  modal.innerHTML = `
    <div class="pmp-modal-header">
      <span>👁 Palpites: ${match.home.name} × ${match.away.name}</span>
      <button class="pmp-close" onclick="this.closest('.pmp-overlay').remove()">✕</button>
    </div>
    ${r ? `<div class="pmp-result-badge">Resultado real: ${r.home} × ${r.away}</div>` : ''}
    <div class="pmp-list">
      ${list.length ? list.map(b => `
        <div class="pmp-item ${b.isYou ? 'pmp-you' : ''} ${b.pts === 5 ? 'pmp-exact' : b.pts === 3 ? 'pmp-good' : ''}">
          <span class="avatar-circle avatar-circle-sm">${b.avatar || '⚽'}</span>
          <span class="pmp-name">${b.isYou ? '⭐ ' : ''}${b.name}</span>
          <span class="pmp-score">${b.home} × ${b.away}</span>
          ${b.pts !== null ? `<span class="pmp-pts ${'ppts-'+b.pts}">${b.pts > 0 ? '+'+b.pts : '0'}</span>` : '<span class="pmp-pts ppts-pending">⏳</span>'}
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
  const isKnockout = match && match.phase !== 'Grupos';
  if (isKnockout && Number(h) === Number(a)) {
    const winnerRadio = document.querySelector(`input[name="winner-${matchId}"]:checked`);
    if (!winnerRadio) {
      showToast('Empate no mata-mata! Selecione quem avançou (pênaltis).', true);
      return;
    }
  }

  const results = getData('bolao_results', {});
  const existing = results[matchId];
  if (existing?.settled) {
    const ok = confirm('⚠️ Este jogo já foi liquidado (pagamentos já foram feitos). Se re-salvar, NOVOS pagamentos serão feitos em cima dos atuais. Deseja continuar?');
    if (!ok) return;
    delete results[matchId];
  }

  let winner = isKnockout ? (document.querySelector(`input[name="winner-${matchId}"]:checked`)?.value || null) : null;

  results[matchId] = { home: parseInt(h), away: parseInt(a), winner };
  results[matchId].settled = true;

  setData('bolao_results', results);

  renderResults(currentPhase);
  showToast('Resultado salvo! Apostas liquidadas automaticamente.');
  confetti(60);
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
  // Clear inputs directly to avoid race condition with Firebase snapshot
  const rh = document.getElementById(`rh-${matchId}`);
  const ra = document.getElementById(`ra-${matchId}`);
  if (rh) rh.value = '';
  if (ra) ra.value = '';
  // Remove the saved-badge
  const card = document.querySelector(`#resultList .result-card .match-header`);
  if (card) {
    const badge = card.querySelector('.result-saved-badge');
    if (badge) badge.remove();
  }
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
    const r = results[m.id] && results[m.id].settled ? results[m.id] : null;
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
    const r = results[m.id] && results[m.id].settled ? results[m.id] : null;
    const pts = calcPoints(palpites[m.id], r);
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
  container.innerHTML = renderFullBracket(results, thirdAssignments, false);
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
