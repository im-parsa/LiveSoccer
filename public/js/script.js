const competitionTableUrl =
    (phaseId, langId) =>
      `https://sportapi.widgets.sports.gracenote.com/football/gettable/phaseid/${phaseId}/languagecode/${langId}.json?c=115&module=football&type=standing`,

  compFlag = (code) => `https://alexsobolenko.github.io/flag-icons/flags/4x3/${code}.svg`,
  teamLogo = (id) => `https://images.sports.gracenote.com/images/lib/basic/sport/football/club/logo/small/${id}.png`,
  compLogo = (id) => `https://images.sports.gracenote.com/images/lib/basic/sport/football/competition/logo/small/${id}.png`,

  compSelectEl = document.querySelector('.comp-select'),
  compNameEl = document.querySelector('.comp-name'),
  themeSwitch = document.querySelector('#themeSwitch'),
  themeSwitchIcon = document.querySelector('.themeSwitchIcon'),
  compFlagEl = document.querySelector('.comp-flag'),
  compLoadingEl = document.querySelector('.comp-loading'),
  compTableBodyEl = document.querySelector('.comp-table-body'),
  competitions =
    [
      {compId:  52, phaseId: 167860, langId: 1, country: 'eng', name: 'Premier League' },
      {compId:  67, phaseId: 168197, langId: 1, country: 'esp', name: 'LaLiga' },
      {compId:  56, phaseId: 167919, langId: 1, country: 'deu', name: 'Bundesliga' },
      {compId:  53, phaseId: 168951, langId: 1, country: 'ita', name: 'Serie A' },
      {compId:  54, phaseId: 167978, langId: 1, country: 'fra', name: 'Ligue 1' },
      {compId:   2, phaseId: 167633, langId: 1, country: 'nld', name: 'Eredivisie' },
      {compId:  48, phaseId: 167628, langId: 1, country: 'bel', name: 'Pro League' },
      {compId:  57, phaseId: 168944, langId: 1, country: 'tur', name: 'Süper Lig'},
      {compId:  69, phaseId: 168416, langId: 1, country: 'prt', name: 'Liga Portugal'},
      {compId:  79, phaseId: 165923, langId: 2, country: 'swe', name: 'Allsvenskan'},
      {compId: 199, phaseId: 166840, langId: 2, country: 'bra', name: 'Série A'},
      {compId: 197, phaseId: 168368, langId: 2, country: 'arg', name: 'Liga Profesional'},
      {compId: 978, phaseId: 167645, langId: 2, country: 'can', name: 'Premier League'},
      {compId: 105, phaseId: 165917, langId: 2, country: 'jpn', name: 'J1 League'},
    ],

  loadTableData = async (comp) =>
  {
    compLoading(true)
    compTableBodyEl.innerHTML = '';
    compNameEl.innerText = comp.name
    compFlagEl.src = compFlag(comp.country);

    const response = await fetch(competitionTableUrl(comp.phaseId, comp.langId));
    const data = await response.json();

    data.forEach((team) =>
    {
      compTableBodyEl.append(createTeamTableRow(team))
    })
    compLoading(false)
  },

  createTeamTableRow = (team) =>
  {
    const tableRowEl = document.createElement('tr');
    tableRowEl.classList.add('comp-table-team-row');
    tableRowEl.innerHTML =
      `
            <td class='rank'>${team.c_Rank}</td>
            <td class='team'>
                <img src='${teamLogo(team.n_TeamID)}' title=${team.c_Team}' alt='${team.c_Team}' alt='${team.c_Team}'>
                <span class='name-full'>${team.c_Team}</span>
                <span class='name-short'>${team.c_TeamShort}</span>
            </td>
            <td class='played'>${team.n_Matches}</td>
            <td class='won'>${team.n_MatchesWon}</td>
            <td class='drawn'>${team.n_MatchesDrawn}</td>
            <td class='lost'>${team.n_MatchesLost}</td>
            <td class='for'>${team.n_GoalsFor}</td>
            <td class='against'>${team.n_GoalsAgainst}</td>
            <td class='difference'>${team.n_GoalsFor - team.n_GoalsAgainst}</td>
            <td class='points'>${team.n_Points}</td>
        `
    return tableRowEl;
  },

  compLoading = (load) =>
  {
    load? compLoadingEl.classList.add('load') : compLoadingEl.classList.remove('load');
  },

  themeSwitchF = () =>
  {
    let htmlElement = document.querySelector(`html`),
      theme = localStorage.getItem('theme') || 'light';

    if (theme === 'dark')
    {
      themeSwitchIcon.classList.add('fa-moon');
      themeSwitchIcon.classList.remove('fa-sun');

      htmlElement.setAttribute('theme', 'dark');
    }
    else if (theme === 'light')
    {
      themeSwitchIcon.classList.add('fa-sun');
      themeSwitchIcon.classList.remove('fa-moon');

      htmlElement.setAttribute('theme', 'light');
    }
  }

loadTableData(competitions[0]).then(() => console.log('loadTableData function loaded'));
themeSwitchF();

competitions.forEach((comp,index)=>
{
  const compBtnEl = document.createElement('div');
  compBtnEl.classList.add('comp');

  const compRadioEl = document.createElement('input');
  compRadioEl.type = 'radio';
  compRadioEl.name='comp';
  compRadioEl.id = comp.compId;
  compRadioEl.checked = index === 0;

  const compLabelEl = document.createElement('label');
  compLabelEl.setAttribute('for',comp.compId);

  const compImgEl = document.createElement('img');
  compImgEl.src = compLogo(comp.compId);
  compLabelEl.append(compImgEl);
  compBtnEl.append(compRadioEl, compLabelEl)
  compLabelEl.addEventListener('click', ()=>
  {
    loadTableData(comp).then(() => console.log('loadTableData function loaded'))
  })
  compSelectEl.append(compBtnEl)
})

themeSwitch.addEventListener('click', () =>
  {
    let htmlElement = document.querySelector(`html`),
      theme = localStorage.getItem('theme') || 'light';

    if (theme === 'dark')
    {
      themeSwitchIcon.classList.add('fa-sun');
      themeSwitchIcon.classList.remove('fa-moon');

      localStorage.setItem('theme', 'light');
      htmlElement.setAttribute('theme', 'light');
    }
    else if (theme === 'light')
    {
      themeSwitchIcon.classList.add('fa-moon');
      themeSwitchIcon.classList.remove('fa-sun');
      localStorage.setItem('theme', 'dark');
      htmlElement.setAttribute('theme', 'dark');
    }
  }
)
