const alphabetCarousel = document.getElementById('alphabetCarousel');
const moviesGrid = document.getElementById('movies-grid');
const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(65 + i));
let activeLetter = 'A';

function createAlphabetButtons() {
  letters.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.classList.toggle('active', letter === activeLetter);
    btn.addEventListener('click', () => {
      activeLetter = letter;
      updateActiveButton();
      renderMoviesByLetter(letter);
    });
    alphabetCarousel.appendChild(btn);
  });
}

function updateActiveButton() {
  const buttons = alphabetCarousel.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.letter === activeLetter);
  });
}

function getBaseTitle(title) {
  return title.split(' (')[0].split(' -')[0].trim();
}

let movies = [];

function renderMoviesByLetter(letter) {
  moviesGrid.innerHTML = '';

  const filtered = movies.filter(movie => {
    const baseTitle = getBaseTitle(movie.titulo).toUpperCase();
    return baseTitle.startsWith(letter);
  });

  if(filtered.length === 0){
    moviesGrid.innerHTML = `<p style="grid-column: 1/-1; color:#777; text-align:center;">Nenhum filme encontrado para a letra "${letter}".</p>`;
    return;
  }

  filtered.forEach(movie => {
    const card = document.createElement('a');
    card.href = movie.link;
    card.target = "_blank";
    card.className = 'movie-card';

    card.innerHTML = `
      <img src="${movie.src}" alt="${movie.titulo}" loading="lazy" />
      <div class="movie-info">
        <h3 class="movie-title">${movie.titulo}</h3>
      </div>
    `;

    moviesGrid.appendChild(card);
  });
}

// Carrega JSON externo
fetch('filmes.json')
  .then(response => response.json())
  .then(data => {
    movies = [...data.lancamentos, ...data.emAlta];
    createAlphabetButtons();
    renderMoviesByLetter(activeLetter);
  })
  .catch(err => {
    moviesGrid.innerHTML = '<p style="color:#f44; text-align:center;">Erro ao carregar filmes.</p>';
    console.error('Erro ao carregar JSON:', err);
  });

  const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const body = document.body;

// Toggle sidebar open/close
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  body.classList.toggle('sidebar-open');
});

// Fechar sidebar clicando fora dela (no fundo escurecido)
body.addEventListener('click', (e) => {
  if (body.classList.contains('sidebar-open')) {
    if (!sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove('active');
      body.classList.remove('sidebar-open');
    }
  }
});

// Toggle submenu categorias
document.querySelectorAll('.categoria').forEach(categoria => {
  categoria.addEventListener('click', () => {
    categoria.classList.toggle('expanded');
    const submenu = categoria.nextElementSibling;
    if (submenu) {
      submenu.classList.toggle('expanded');
    }
  });
});
