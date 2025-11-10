// Dynamische Cards laden
fetch('json/cards.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cardsContainer');
    data.forEach(card => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <h3>${card.title}</h3>
        <p>${card.description}</p>
      `;
      if(card.link) {
        div.addEventListener('click', ()=> window.location.href = card.link);
      }
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Fehler beim Laden der Cards:", err));