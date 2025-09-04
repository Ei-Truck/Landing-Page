
let paginaAtual = 1;

function mudarPaginaAtual(direcao) {
    let totalPaginas = document.querySelectorAll('.conteudo').length;
    let novaPagina = paginaAtual + direcao;
    if (novaPagina < 1 || novaPagina > totalPaginas) return;
    mudarPagina(novaPagina, 0); // paginação → sempre scroll no topo
    paginaAtual = novaPagina;
    atualizarSetas();
}

function mudarPagina(num, scrollPos = 0) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.conteudo').forEach(div => div.classList.remove('ativo'));

    // Mostra apenas o escolhido
    const conteudoAtivo = document.getElementById("pagina" + num);
    conteudoAtivo.classList.add("ativo");

    // Atualiza estilo dos botões
    document.querySelectorAll('.paginacao button').forEach(btn => btn.classList.remove('ativo'));
    document.querySelector(`.paginacao button:nth-child(${num + 1})`).classList.add('ativo');

    paginaAtual = num;
    atualizarSetas();

    if (scrollPos !== null) {
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
}

function mudarPaginaNav(num) {
    mudarPagina(num, null);
    setTimeout(() => {
        window.scrollTo({ top: 600 });
    }, 0); // pequeno delay
}

function mudarPaginaNavSobre() {
    mudarPagina(3, null);
    setTimeout(() => {
        window.scrollTo({ top: 2100 });
    }, 0);
}

function mudarPaginaNavSaibaMais() {
    mudarPagina(1, null);
    setTimeout(() => {
        window.scrollTo({ top: 600 });
    }, 0);
}

function atualizarSetas() {
    document.getElementById('prevBtn').style.display = (paginaAtual === 1) ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = (paginaAtual === 3) ? 'none' : 'inline-block';
}

// Inicializa setas
atualizarSetas();



// Header muda para branco ao rolar
const headerEl = document.getElementById('header');
function updateHeader() {
    const threshold = window.innerHeight * 0.15; // após 15% do viewport
    if (window.scrollY > threshold) { headerEl.classList.add('header-white'); }
    else { headerEl.classList.remove('header-white'); }
}
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('load', updateHeader);

// Tabs de "Transforme os dados"
function initTabs(section) {
    const tabs = section.querySelectorAll('.tab');
    const panelVideo = section.querySelector('#panel-video');
    const panelTele = section.querySelector('#panel-tele');

    if (!tabs.length || !panelVideo || !panelTele) return; // segurança

    tabs.forEach(btn => btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.dataset.tab === 'video') {
            panelVideo.classList.remove('hide');
            panelTele.classList.add('hide');
        } else {
            panelTele.classList.remove('hide');
            panelVideo.classList.add('hide');
        }
    }));
}

// Abas grandes dos produtos
const bigTabs = document.querySelectorAll('.big-tab');
const camPanels = {
    multi: document.getElementById('cam-multi'),
    fadiga: document.getElementById('cam-fadiga'),
    cabine: document.getElementById('cam-cabine')
};

bigTabs.forEach(bt => bt.addEventListener('click', () => {
    bigTabs.forEach(b => b.classList.remove('active'));
    bt.classList.add('active');
    const key = bt.dataset.cam;
    Object.keys(camPanels).forEach(k => camPanels[k].classList.remove('active'));
    camPanels[key].classList.add('active');
}));

window.onload = function () {
    mudarPagina(1);

    // Inicializa tabs para cada página
    document.querySelectorAll('.conteudo').forEach(section => {
        initTabs(section);
    });
};
