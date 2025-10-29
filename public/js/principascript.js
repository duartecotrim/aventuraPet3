git // Dados dos pets como array de objetos (mantendo tudo junto)
const pets = [
    {
      nome: "Bidu",
      idade: 2,
      localizacao: "São Paulo",
      foto_url: "https://place-puppy.com/300x300",
      interesses: ["Carinhoso", "Brincalhão", "Vacinas em dia"],
      comunicacao: "Latidos suaves",
      linguagem_amor: "Lambidas",
      signo: "Touro",
      procurando: "Família amorosa",
      distancia: "2km",
      orientacao: "Indefinido",
      bebida: "Água",
      pet: "Cachorro",
      email_usuario: "dono@exemplo.com"
    },
    {
      nome: "Mimi",
      idade: 3,
      localizacao: "Rio de Janeiro",
      foto_url: "https://placekitten.com/300/300",
      interesses: ["Sonecas", "Arranhadores", "Miados fofos"],
      comunicacao: "Miados longos",
      linguagem_amor: "Ronronar",
      signo: "Virgem",
      procurando: "Pessoa tranquila",
      distancia: "5km",
      orientacao: "Indefinido",
      bebida: "Leite",
      pet: "Gato",
      email_usuario: "dona@exemplo.com"
    }
  ];
  
  let currentIndex = 0;
  
  function carregarPet(index) {
    const pet = pets[index];
  
    if (!pet) {
      alert("Sem mais pets por hoje!");
      return;
    }
  
    document.querySelector(".profile-image img").src = pet.foto_url;
    document.querySelector(".profile-image img").alt = `Foto de ${pet.nome}`;
    document.querySelector(".top-info h2").textContent = `${pet.nome}, ${pet.idade} anos`;
    document.querySelector(".location").textContent = `📍 ${pet.localizacao}`;
  
    const interessesContainer = document.querySelector(".interesses");
    interessesContainer.innerHTML = "";
    pet.interesses.forEach(interesse => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = interesse;
      interessesContainer.appendChild(span);
    });
  
    document.querySelector(".caracteristicas").innerHTML = `
      <p><strong>Estilo de comunicação:</strong> ${pet.comunicacao}</p>
      <p><strong>Linguagem do amor:</strong> ${pet.linguagem_amor}</p>
      <p><strong>Signo:</strong> ${pet.signo}</p>
      <p><strong>Procurando:</strong> ${pet.procurando}</p>
      <p><strong>Distância:</strong> ${pet.distancia}</p>
      <p><strong>Orientação:</strong> ${pet.orientacao}</p>
      <p><strong>Bebida:</strong> ${pet.bebida}</p>
      <p><strong>Pet:</strong> ${pet.pet}</p>
    `;
  }
  
  function animarEProximo(direcao, callback) {
    const card = document.querySelector(".profile-card");
    card.classList.add(`swipe-${direcao}`);
    setTimeout(() => {
      card.classList.remove(`swipe-${direcao}`);
      callback();
    }, 500);
  }
  
  function enviarMensagem(email, mensagem) {
    alert(`Mensagem enviada para ${email}:\n\n${mensagem}`);
  }
  
  function mostrarSuperLike() {
    const superlike = document.createElement("div");
    superlike.textContent = "⭐ SUPER LIKE!";
    superlike.className = "superlike-msg";
    document.body.appendChild(superlike);
    setTimeout(() => superlike.remove(), 2000);
  }
  
  // Usar querySelector com classes porque no seu HTML só tem classes, não ids.
  document.querySelector(".dislike").addEventListener("click", () => {
    animarEProximo("left", () => {
      enviarMensagem(pets[currentIndex].email_usuario, `Você rejeitou o pet ${pets[currentIndex].nome}.`);
      currentIndex = (currentIndex + 1) % pets.length;
      carregarPet(currentIndex);
    });
  });
  
  document.querySelector(".like").addEventListener("click", () => {
    enviarMensagem(pets[currentIndex].email_usuario, `Alguém curtiu muito o ${pets[currentIndex].nome} e quer adotá-lo! ❤️`);
    animarEProximo("right", () => {
      currentIndex = (currentIndex + 1) % pets.length;
      carregarPet(currentIndex);
    });
  });
  
    animarEProximo("right", () => {
      currentIndex = (currentIndex + 1) % pets.length;
      carregarPet(currentIndex);
    });
  
  // Inicializa com o primeiro pet
  window.addEventListener("DOMContentLoaded", () => {
    carregarPet(currentIndex);
  });
  