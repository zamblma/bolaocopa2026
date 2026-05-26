// ============================================================
//  DATA
// ============================================================
const GROUPS = {
  A: { teams: [
    {name:'México',flag:'🇲🇽'},{name:'África do Sul',flag:'🇿🇦'},
    {name:'Coreia do Sul',flag:'🇰🇷'},{name:'Tchéquia',flag:'🇨🇿'}
  ]},
  B: { teams: [
    {name:'Canadá',flag:'🇨🇦'},{name:'Bósnia e Herzegovina',flag:'🇧🇦'},
    {name:'Catar',flag:'🇶🇦'},{name:'Suíça',flag:'🇨🇭'}
  ]},
  C: { teams: [
    {name:'Brasil',flag:'🇧🇷'},{name:'Marrocos',flag:'🇲🇦'},
    {name:'Haiti',flag:'🇭🇹'},{name:'Escócia',flag:'🏴'}
  ]},
  D: { teams: [
    {name:'Estados Unidos',flag:'🇺🇸'},{name:'Paraguai',flag:'🇵🇾'},
    {name:'Austrália',flag:'🇦🇺'},{name:'Turquia',flag:'🇹🇷'}
  ]},
  E: { teams: [
    {name:'Alemanha',flag:'🇩🇪'},{name:'Curaçao',flag:'🇨🇼'},
    {name:'Costa do Marfim',flag:'🇨🇮'},{name:'Equador',flag:'🇪🇨'}
  ]},
  F: { teams: [
    {name:'Países Baixos',flag:'🇳🇱'},{name:'Japão',flag:'🇯🇵'},
    {name:'Suécia',flag:'🇸🇪'},{name:'Tunísia',flag:'🇹🇳'}
  ]},
  G: { teams: [
    {name:'Bélgica',flag:'🇧🇪'},{name:'Egito',flag:'🇪🇬'},
    {name:'Irã',flag:'🇮🇷'},{name:'Nova Zelândia',flag:'🇳🇿'}
  ]},
  H: { teams: [
    {name:'Espanha',flag:'🇪🇸'},{name:'Cabo Verde',flag:'🇨🇻'},
    {name:'Arábia Saudita',flag:'🇸🇦'},{name:'Uruguai',flag:'🇺🇾'}
  ]},
  I: { teams: [
    {name:'França',flag:'🇫🇷'},{name:'Senegal',flag:'🇸🇳'},
    {name:'Iraque',flag:'🇮🇶'},{name:'Noruega',flag:'🇳🇴'}
  ]},
  J: { teams: [
    {name:'Argentina',flag:'🇦🇷'},{name:'Argélia',flag:'🇩🇿'},
    {name:'Áustria',flag:'🇦🇹'},{name:'Jordânia',flag:'🇯🇴'}
  ]},
  K: { teams: [
    {name:'Portugal',flag:'🇵🇹'},{name:'RD Congo',flag:'🇨🇩'},
    {name:'Uzbequistão',flag:'🇺🇿'},{name:'Colômbia',flag:'🇨🇴'}
  ]},
  L: { teams: [
    {name:'Inglaterra',flag:'🏴'},{name:'Croácia',flag:'🇭🇷'},
    {name:'Gana',flag:'🇬🇭'},{name:'Panamá',flag:'🇵🇦'}
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

  // Group stage (12 groups x 6 matches = 72)
  Object.entries(GROUPS).forEach(([g, data]) => {
    const teams = data.teams;
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
          label: `Grupo ${g}`
        });
      }
    }
  });

  const add = (matchId, phase, homeRef, awayRef, label) => {
    matches.push({
      id: matchId,
      phase,
      group: null,
      homeRef,
      awayRef,
      home: placeholderTeam(homeRef),
      away: placeholderTeam(awayRef),
      label
    });
  };

  // FIFA World Cup 2026 official knockout bracket match numbers.
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

function placeholderTeam(label) {
  return { name: label || 'A definir', flag: '🏳️', isPlaceholder: true };
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
const STORAGE_KEYS = ['bolao_users', 'bolao_palpites', 'bolao_results'];

let db = null;
let auth = null;
let usersRef = null;
let palpitesRef = null;
let resultsRef = null;
let adminRef = null;
let dataReadyPromise = null;
let isFirebaseReady = false;
let isApplyingRemoteData = false;

let appData = {
  bolao_users: {},
  bolao_palpites: {},
  bolao_results: {}
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

function saveLocalData() {
  STORAGE_KEYS.forEach(key => localStorage.setItem(key, JSON.stringify(appData[key] || {})));
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
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.firebaseConfig);
    auth = firebase.auth(app);
    db = firebase.firestore(app);
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
        isAdmin: data.isAdmin === true
      };
    });

    appData.bolao_palpites = {};
    palpitesSnap.forEach(doc => {
      appData.bolao_palpites[doc.id] = doc.data().matches || {};
    });

    if (resultsSnap.exists) {
      appData.bolao_results = resultsSnap.data().matches || {};
    }
    saveLocalData();
    isApplyingRemoteData = false;

    usersRef.onSnapshot(snapshot => {
      isApplyingRemoteData = true;
      appData.bolao_users = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        appData.bolao_users[doc.id] = {
          name: data.name || data.email || 'Participante',
          email: data.email || '',
          isAdmin: data.isAdmin === true
        };
      });
      saveLocalData();
      isApplyingRemoteData = false;
      refreshCurrentView();
    });

    palpitesRef.onSnapshot(snapshot => {
      isApplyingRemoteData = true;
      appData.bolao_palpites = {};
      snapshot.forEach(doc => {
        appData.bolao_palpites[doc.id] = doc.data().matches || {};
      });
      saveLocalData();
      isApplyingRemoteData = false;
      refreshCurrentView();
    });

    resultsRef.onSnapshot(snapshot => {
      if (!snapshot.exists) return;
      isApplyingRemoteData = true;
      appData.bolao_results = snapshot.data().matches || {};
      saveLocalData();
      isApplyingRemoteData = false;
      refreshCurrentView();
    }, error => {
      console.error('Erro ao sincronizar resultados:', error);
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

  try {
    const credential = await auth.signInWithEmailAndPassword(email, pass);
    currentUser = credential.user.uid;
    await initFirebaseData();

    const profile = appData.bolao_users[currentUser];
    currentUserName = profile?.name || credential.user.email;

    errEl.style.display = 'none';
    enterApp();
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
    enterApp();
    showToast(isFirst ? 'Conta criada! Você é o admin.' : 'Conta criada!');
  } catch (error) {
    showError(errEl, authErrorMessage(error));
  }
}

function logout() {
  if (auth) auth.signOut();
  currentUser = null;
  currentUserName = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
}

function enterApp() {
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

  if (name === 'ranking') renderRanking();
  if (name === 'minhasApostas') renderMyBets();
  if (name === 'palpites') renderMatches('Grupos');
  if (name === 'resultados') renderResults('Grupos');
}

// ============================================================
//  GROUPS
// ============================================================
function renderGroups() {
  const grid = document.getElementById('groupsGrid');
  grid.innerHTML = Object.entries(GROUPS).map(([g, data]) => `
    <div class="group-card">
      <div class="group-header">
        <div class="group-letter">${g}</div>
        <div class="group-name">Grupo ${g}</div>
      </div>
      <div class="group-teams">
        ${data.teams.map(t => `
          <div class="team-row">
            ${flagMarkup(t)}
            <div class="team-name">${t.name}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================================
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

function switchPhase(phase, btn, type) {
  currentPhase = phase;
  document.querySelectorAll(type === 'match' ? '#phaseTabs .phase-tab' : '#resultPhaseTabs .phase-tab')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (type === 'match') renderMatches(phase);
  else renderResults(phase);
}

function renderMatches(phase) {
  const palpites = getData('bolao_palpites', {});
  const userP = palpites[currentUser] || {};
  const matches = getMatchesForPhase(phase);
  const list = document.getElementById('matchList');

  if (!matches.length) { list.innerHTML = '<div class="empty-state"><div class="empty-icon">⚽</div><div class="empty-text">Nenhum jogo nesta fase.</div></div>'; return; }

  list.innerHTML = matches.map(m => {
    const p = userP[m.id];
    const hasP = p !== undefined;
    return `
      <div class="match-card ${hasP ? 'has-palpite' : ''}" id="mc-${m.id}">
        <div class="match-header">
          <span>${m.label}</span>
          ${hasP ? `<span class="palpite-saved">✓ Palpite salvo: ${p.home} × ${p.away}</span>` : ''}
        </div>
        <div class="match-teams">
          <div class="match-team">
            ${flagMarkup(m.home)}
            <div class="match-team-name">${m.home.name}</div>
          </div>
          <div class="match-vs">VS</div>
          <div class="match-team right">
            <div class="match-team-name">${m.away.name}</div>
            ${flagMarkup(m.away)}
          </div>
        </div>
        <div class="score-input-wrap">
          <input class="score-input" type="number" min="0" max="99" id="ph-${m.id}"
            value="${hasP ? p.home : ''}" placeholder="0">
          <span class="score-sep">×</span>
          <input class="score-input" type="number" min="0" max="99" id="pa-${m.id}"
            value="${hasP ? p.away : ''}" placeholder="0">
          <div class="score-spacer"></div>
          <button class="btn-save-palpite" onclick="savePalpite(${m.id})">💾 Salvar</button>
        </div>
      </div>
    `;
  }).join('');
}

function savePalpite(matchId) {
  const h = document.getElementById(`ph-${matchId}`).value;
  const a = document.getElementById(`pa-${matchId}`).value;
  if (h === '' || a === '') { showToast('Preencha os dois placares!', true); return; }

  const palpites = getData('bolao_palpites', {});
  if (!palpites[currentUser]) palpites[currentUser] = {};
  palpites[currentUser][matchId] = { home: parseInt(h), away: parseInt(a) };
  setData('bolao_palpites', palpites);

  const card = document.getElementById(`mc-${matchId}`);
  if (card) {
    card.classList.add('has-palpite');
    const header = card.querySelector('.match-header');
    let badge = header.querySelector('.palpite-saved');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'palpite-saved';
      header.appendChild(badge);
    }
    badge.textContent = `✓ Palpite salvo: ${h} × ${a}`;
  }
  showToast('Palpite salvo!');
}

// ============================================================
//  RESULTS
// ============================================================
function renderResultPhaseTabs() {
  const tabs = document.getElementById('resultPhaseTabs');
  tabs.innerHTML = PHASES.map((p, i) => `
    <button class="phase-tab ${i === 0 ? 'active' : ''}"
      onclick="switchPhase('${p}',this,'result')">${phaseLabel(p)}</button>
  `).join('');
}

function renderResults(phase) {
  if (!currentUserIsAdmin()) {
    document.getElementById('resultList').innerHTML = '<div class="empty-state"><div class="empty-icon">🔒</div><div class="empty-text">Apenas o admin pode mexer nos resultados.</div></div>';
    return;
  }

  const results = getData('bolao_results', {});
  const matches = getMatchesForPhase(phase);
  const list = document.getElementById('resultList');

  list.innerHTML = matches.map(m => {
    const r = results[m.id];
    const hasR = r !== undefined;
    return `
      <div class="result-card">
        <div class="match-header" style="margin-bottom:0.5rem;">
          <span style="font-weight:700;font-size:0.85rem;">${flagMarkup(m.home, 'flag flag-inline')} ${m.home.name} × ${m.away.name} ${flagMarkup(m.away, 'flag flag-inline')}</span>
          ${hasR ? `<span class="result-saved-badge">✓ ${r.home}×${r.away}</span>` : ''}
        </div>
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
        </div>
      </div>
    `;
  }).join('');
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
  results[matchId] = { home: parseInt(h), away: parseInt(a) };
  setData('bolao_results', results);

  renderResults(currentPhase);
  showToast('Resultado salvo! Pontos recalculados.');
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
  let total = 0, exact = 0, result3 = 0, winner1 = 0;

  ALL_MATCHES.forEach(m => {
    const p = palpites[m.id];
    const r = results[m.id];
    const pts = calcPoints(p, r);
    if (pts === null) return;
    total += pts;
    if (pts === 5) exact++;
    else if (pts === 3) result3++;
    else if (pts === 1) winner1++;
  });

  return { total, exact, result3, winner1 };
}

// ============================================================
//  RANKING
// ============================================================
function renderRanking() {
  const users = getData('bolao_users', {});
  const userList = Object.entries(users);

  const scored = userList.map(([uid, profile]) => ({
    uid,
    name: profile.name || profile.email || 'Participante',
    isAdmin: profile.isAdmin === true,
    ...getUserScore(uid)
  }));
  scored.sort((a, b) => b.total - a.total);

  const list = document.getElementById('rankingList');

  if (!scored.length) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">🏆</div><div class="empty-text">Nenhum participante ainda.</div></div>';
    return;
  }

  list.innerHTML = scored.map((u, i) => `
    <div class="ranking-card ${i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':''}">
      <div class="rank-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;">
          <div class="rank-name">${u.name}</div>
          ${u.isAdmin ? '<div class="rank-you-badge">ADMIN</div>' : ''}
          ${u.uid === currentUser ? '<div class="rank-you-badge">VOCÊ</div>' : ''}
        </div>
        <div class="rank-breakdown">
          <div class="rank-stat"><span class="stat-exact">★</span><span class="stat-exact">${u.exact}</span><span style="color:var(--silver);">Exatos</span></div>
          <div class="rank-stat"><span class="stat-result">✓</span><span class="stat-result">${u.result3}</span><span style="color:var(--silver);">Result+Diff</span></div>
          <div class="rank-stat"><span class="stat-winner">⬆</span><span class="stat-winner">${u.winner1}</span><span style="color:var(--silver);">Vencedor</span></div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="rank-pts">${u.total}</div>
        <div class="rank-pts-label">pontos</div>
      </div>
    </div>
  `).join('');
}

// ============================================================
//  MY BETS
// ============================================================
function renderMyBets() {
  const palpites = getData('bolao_palpites', {})[currentUser] || {};
  const results = getData('bolao_results', {});

  const score = getUserScore(currentUser);

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
  `;

  const betList = document.getElementById('betReviewList');
  const thirdAssignments = getThirdTeamAssignments(results);
  const matchesWithBets = ALL_MATCHES
    .filter(m => palpites[m.id])
    .map(m => getResolvedMatch(m, results, thirdAssignments));

  if (!matchesWithBets.length) {
    betList.innerHTML = '<div class="empty-state"><div class="empty-icon">🎯</div><div class="empty-text">Você ainda não deu nenhum palpite.</div></div>';
    return;
  }

  betList.innerHTML = matchesWithBets.map(m => {
    const p = palpites[m.id];
    const r = results[m.id];
    const pts = calcPoints(p, r);

    let chipClass = 'pts-pending', chipLabel = '⏳';
    if (pts === 5) { chipClass = 'pts-5'; chipLabel = '+5'; }
    else if (pts === 3) { chipClass = 'pts-3'; chipLabel = '+3'; }
    else if (pts === 1) { chipClass = 'pts-1'; chipLabel = '+1'; }
    else if (pts === 0) { chipClass = 'pts-0'; chipLabel = '0'; }

    return `
      <div class="bet-review-card">
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
//  INIT
// ============================================================
dataReadyPromise = initFirebaseData();

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const lf = document.getElementById('loginForm');
    if (lf.style.display !== 'none') doLogin();
    else doRegister();
  }
});
