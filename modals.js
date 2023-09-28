// Funktion, um das Modal anzuzeigen
const showModal = () => {
    const modal = document.getElementById('startModal');
    const overlay = document.getElementById('modal_overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

// Funktion, um das Modal zu schließen
const closeModal = () => {
    const modal = document.getElementById('startModal');
    const overlay = document.getElementById('modal_overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Eventlistener, um das Modal beim Laden der Seite anzuzeigen
window.addEventListener('load', showModal);

// Eventlistener, um das Modal bei Klick auf das Schließen-Symbol zu schließen
const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', closeModal);

//second modal
const openSecondModal = () => {
    const secondModal = document.getElementById('secondModal');
    const overlay = document.getElementById('modal_overlay');
    secondModal.style.display = 'block';
    overlay.style.display = 'block';
}
const closeSecondModal = () => {
    const secondModal = document.getElementById('secondModal');
    const overlay = document.getElementById('modal_overlay');
    secondModal.style.display = 'none';
    overlay.style.display = 'none';
}

window.addEventListener('load', closeSecondModal)

const restart = document.getElementById('restart');
restart.addEventListener('click', () => {
    // Löse die Seite neu laden aus
    location.reload();
});
const endModal = document.getElementById('endModal')
endModal.addEventListener('click', closeSecondModal)
