document.getElementById('contatoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Mostra o alerta customizado
    const customAlert = document.getElementById('customAlert');
    customAlert.classList.add('show');

    // Esconde o alerta após 3 segundos
    setTimeout(() => {
        customAlert.classList.remove('show');
    }, 3000);

    this.reset(); // Limpa o formulário após envio
});

// Selecionando o ícone do hambúrguer e o menu
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu-list');

// Função para alternar a classe 'active' no menu
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Exemplo simples para rolar o carrossel
function rolarCarrossel(direcao) {
    const carrossel = document.querySelector('.carousel');
    const larguraItem = carrossel.querySelector('.carousel-item').offsetWidth + 16; // item + gap
    carrossel.scrollBy({ left: direcao * larguraItem, behavior: 'smooth' });
}

const botoesCategoria = document.querySelectorAll('.categorias button');
const produtos = document.querySelectorAll('.card');
const campoBusca = document.getElementById('campoBusca');

// Filtro por categoria
botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesCategoria.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        const categoria = botao.getAttribute('data-categoria');

        produtos.forEach(produto => {
            if (categoria === 'todos' || produto.dataset.categoria === categoria) {
                produto.style.display = 'block';
            } else {
                produto.style.display = 'none';
            }
        });
    });
});


// Seleciona elementos
const modal = document.getElementById('modalPet');
const fechar = document.querySelector('.fechar');
const modalImg = document.getElementById('modalImagem');
const modalNome = document.getElementById('modalNome');
const modalDescricao = document.getElementById('modalDescricao');
const contatoBtn = document.getElementById('contatoBtn');

// Captura todos os botões "Adotar"
document.querySelectorAll('.adotar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.pet-card');
        const img = card.querySelector('img').src;
        const nome = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        // Preenche o modal
        modalImg.src = img;
        modalNome.textContent = nome;
        modalDescricao.textContent = desc;

        // Exibe o modal
        modal.style.display = 'block';
    });
});

// Fechar modal no X
fechar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar clicando fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Ação do botão Quero Adotar
contatoBtn.addEventListener('click', () => {
    window.location.href = "mailto:contato@aventurapet.com?subject=Quero Adotar " + modalNome.textContent;
});