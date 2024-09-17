const gameGrid = document.getElementById('gameGrid');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const imageCountSelect = document.getElementById('imageCount');
let selectedCards = [];
let matchedCards = 0;
let timeLeft = 15;
let timer;
let images = []; 

const mockAPIImages = [
    "https://via.placeholder.com/100/FF0000/FFFFFF?text=1",
    "https://via.placeholder.com/100/00FF00/FFFFFF?text=2",
    "https://via.placeholder.com/100/0000FF/FFFFFF?text=3",
    "https://via.placeholder.com/100/FFFF00/FFFFFF?text=4",
    "https://via.placeholder.com/100/FF00FF/FFFFFF?text=5",
    "https://via.placeholder.com/100/00FFFF/FFFFFF?text=6",
    "https://via.placeholder.com/100/000000/FFFFFF?text=7",
    "https://via.placeholder.com/100/FFFFFF/000000?text=8",
    "https://via.placeholder.com/100/800000/FFFFFF?text=9",
    "https://via.placeholder.com/100/008000/FFFFFF?text=10",
    "https://via.placeholder.com/100/000080/FFFFFF?text=11",
    "https://via.placeholder.com/100/808000/FFFFFF?text=12",
    "https://via.placeholder.com/100/800080/FFFFFF?text=13",
    "https://via.placeholder.com/100/008080/FFFFFF?text=14",
    "https://via.placeholder.com/100/C0C0C0/FFFFFF?text=15",
    "https://via.placeholder.com/100/FFA500/FFFFFF?text=16"
];

startButton.addEventListener('click', () => {
    const imageCount = parseInt(imageCountSelect.value);
    fetchImages(imageCount);
});


function fetchImages(imageCount) {
    images = mockAPIImages.slice(0, imageCount);
    startGame();
}

function startGame() {
    gameGrid.innerHTML = ''; 
    timeLeft = 15;
    matchedCards = 0;
    selectedCards = [];
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    const shuffledImages = [...images, ...images].sort(() => 0.5 - Math.random());

    shuffledImages.forEach((imageSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imageSrc;
        card.innerHTML = `<img src="${imageSrc}" alt="Card Image">`;
        card.addEventListener('click', handleCardClick);
        gameGrid.appendChild(card);
    });

    timer = setInterval(updateTimer, 1000);
}

function handleCardClick(event) {
    const card = event.target.closest('.card');
    const img = card.querySelector('img');

    if (!img.style.visibility || img.style.visibility === 'hidden') {
        img.style.visibility = 'visible';
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = selectedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards += 2;
        selectedCards = [];

        if (matchedCards === images.length * 2) {
            clearInterval(timer);
            setTimeout(() => alert('You win!'), 300);
        }
    } else {
        setTimeout(() => {
            firstCard.querySelector('img').style.visibility = 'hidden';
            secondCard.querySelector('img').style.visibility = 'hidden';
            selectedCards = [];
        }, 500);
    }
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
        clearInterval(timer);
        setTimeout(() => alert('Time\'s up!'), 300);
    }
}
