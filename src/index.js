fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isGoodDog: !pup.isGoodDog }),
  });

  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pups => {
    const dogBar = document.getElementById('dog-bar');
    pups.forEach(pup => {
      const span = document.createElement('span');
      span.textContent = pup.name;
      span.addEventListener('click', () => showPupInfo(pup));
      dogBar.appendChild(span);
    });
  });

  function showPupInfo(pup) {
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = `
      <img src="${pup.image}" />
      <h2>${pup.name}</h2>
      <button>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
    `;
    const button = dogInfo.querySelector('button');
    button.addEventListener('click', () => toggleGoodDog(pup));
  }

  function toggleGoodDog(pup) {
    const newStatus = !pup.isGoodDog;
    fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isGoodDog: newStatus }),
    })
    .then(response => response.json())
    .then(updatedPup => {
      showPupInfo(updatedPup);
    });
  }
  
  const filterButton = document.getElementById('good-dog-filter');
filterButton.addEventListener('click', () => {
  const filterOn = filterButton.textContent.includes('OFF');
  filterButton.textContent = `Filter good dogs: ${filterOn ? 'ON' : 'OFF'}`;
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups => {
      const filteredPups = filterOn ? pups.filter(pup => pup.isGoodDog) : pups;
      const dogBar = document.getElementById('dog-bar');
      dogBar.innerHTML = '';
      filteredPups.forEach(pup => {
        const span = document.createElement('span');
        span.textContent = pup.name;
        span.addEventListener('click', () => showPupInfo(pup));
        dogBar.appendChild(span);
      });
    });
});
