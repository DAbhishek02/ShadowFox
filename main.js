// Load Players
if (document.getElementById("player-list")) {
  fetch("data/players.json")
    .then(res => res.json())
    .then(players => {
      const container = document.getElementById("player-list");
      players.forEach(player => {
        // Fallback image if not found
        const imgSrc = player.image && player.image !== '' ? player.image : 'images/default_player.png';
        container.innerHTML += `
          <div class="player-card">
            <img src="${imgSrc}" alt="${player.name}" width="150" onerror="this.onerror=null;this.src='images/default_player.png';" />
            <h3>${player.name}</h3>
            <p>${player.role} | Age: ${player.age ? player.age : ''}</p>
            ${player.battingAverage ? `<p>Batting Avg: ${player.battingAverage}</p>` : ""}
            ${player.totalRuns ? `<p>Total Runs: ${player.totalRuns}</p>` : ""}
            ${player.wickets ? `<p>Wickets: ${player.wickets}</p>` : ""}
          </div>
        `;
      });
    });
}

// Load Matches
if (document.getElementById("match-schedule")) {
  fetch("data/matches.json")
    .then(res => res.json())
    .then(matches => {
      const list = document.getElementById("match-schedule");
      list.innerHTML = '';
      renderMatches(matches, matches);
    });
}

function renderMatches(matches, allMatches) {
  const list = document.getElementById("match-schedule");
  list.innerHTML = '';
  matches.forEach((match, idx) => {
    list.innerHTML += `
      <li>
        <strong>${match.date}</strong>: 
        <a href="#" class="team-link" data-team="${match.team1}">${match.team1}</a> vs 
        <a href="#" class="team-link" data-team="${match.team2}">${match.team2}</a> at ${match.venue} — ${match.time}
        <br>
        <a href="match.html?match=${idx}" class="match-link">View Match Details</a> |
        <a href="https://www.jiocinema.com/sports/ipl" target="_blank" class="watch-link" style="color:#d32f2f;font-weight:bold;">Watch Live</a>
      </li>
    `;
  });
  // Add click event for team filter
  document.querySelectorAll('.team-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const team = this.getAttribute('data-team');
      const filtered = allMatches.filter(m => m.team1 === team || m.team2 === team);
      renderMatches(filtered, allMatches);
      // Show 'Show All' button
      showAllButton(allMatches);
    });
  });
}

function showAllButton(allMatches) {
  let btn = document.getElementById('show-all-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'show-all-btn';
    btn.textContent = 'Show All Matches';
    btn.style.margin = '16px auto 24px auto';
    btn.style.display = 'block';
    btn.style.background = '#1a237e';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.padding = '10px 24px';
    btn.style.borderRadius = '8px';
    btn.style.fontWeight = 'bold';
    btn.style.cursor = 'pointer';
    btn.onclick = function() {
      renderMatches(allMatches, allMatches);
      btn.remove();
    };
    document.getElementById('match-schedule').parentNode.insertBefore(btn, document.getElementById('match-schedule'));
  }
}

// Home Page Upcoming Matches
if (document.getElementById("upcoming-matches")) {
  fetch("data/matches.json")
    .then(res => res.json())
    .then(matches => {
      const container = document.getElementById("upcoming-matches");
      matches.slice(0, 3).forEach(match => {
        container.innerHTML += `
          <div>
            <p>${match.date} - vs <strong>${match.opponent}</strong></p>
          </div>
        `;
      });
    });
}