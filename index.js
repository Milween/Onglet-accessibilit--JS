const tabs = [...document.querySelectorAll('.tab')]

tabs.forEach(tab => tab.addEventListener("click", tabsAnimation))

const tabContents = [...document.querySelectorAll('.tab-content')]

function tabsAnimation(e) {

  const indexToRemove = tabs.findIndex(tab => tab.classList.contains('active-tab'))

  // Lorsque que l'on arrête de cliquer sur un bouton 'aria-selected' passe sur false

  tabs[indexToRemove].setAttribute('aria-selected', 'false');
  
  // Tabs : avec tabindex lorsque l'on arrête de cliquer sur une tabs 'tabindex' passe à -1.
  
  tabs[indexToRemove].setAttribute('tabindex', '-1');
  tabs[indexToRemove].classList.remove('active-tab');
  tabContents[indexToRemove].classList.remove('active-tab-content');
  
  const indexToShow = tabs.indexOf(e.target);

  // Tabs : Lorsque sélectionner la tabs prendre la valeur 'tabindex' de 0.

  tabs[indexToShow].setAttribute('tabindex', '0');
  tabs[indexToShow].setAttribute('aria-selected', 'true');
 
  tabs[indexToShow].classList.add('active-tab');
  tabContents[indexToShow].classList.add('active-tab-content')
}


// Accessibilité de nos tabs :

// On crée une function pour gérer la navigation Grâce à tabindex et la Function de navigation keyCode.

// Lien vers la documentation de keyCode : https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event


tabs.forEach(tab => tab.addEventListener('keydown', arrowNavigation))
let tabFocus = 0;

function arrowNavigation(e) {

  if(e.keyCode === 39 || e.keyCode === 37) {
    tabs[tabFocus].setAttribute('tabindex', -1)

    if(e.keyCode === 39) {
      tabFocus++;

      if(tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === 37) {
      tabFocus--;

      if(tabFocus < 0) {
        tabFocus = tabs.length -1;
      }
    }
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
}