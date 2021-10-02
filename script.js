const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCount = document.getElementById('count');
const totalPrice = document.getElementById('total');
const movieSelect = document.getElementById('movies');
let ticketPrice = +movieSelect.value;

const loadMovieData = () =>{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats && selectedSeats.length) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
        seatCount.innerText = selectedSeats.length;
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if (selectedMovieIndex) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    if (selectedMoviePrice) {
        totalPrice.innerText = +selectedMoviePrice * selectedSeats.length;
    }
};

loadMovieData();

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndex));

    const selectedSeatsCount = selectedSeats.length;

    seatCount.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * ticketPrice;
    setMovieData(selectedSeatsCount, ticketPrice)
};

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
       e.target.classList.toggle('selected');
       updateSelectedCount();
   }
});

