/* ********** language toggle ********** */
((d) => {
  const $btnTranslate = d.querySelector(".btn-translate"),
    $selectors = d.querySelectorAll("[data-section]");

  let spanish = "ES",
    english = "EN";

  const getLanguage = async (languague) => {
    let res = await fetch("assets/languages.json"),
      json = await res.json();

    let languageLowercase = languague.toLowerCase(),
      dataLanguague = json.translation[languageLowercase];

    //console.log(dataLanguague);

    $selectors.forEach((el) => {
      const section = el.dataset.section,
        value = el.dataset.value;

      //console.log(section, value);
      //console.log(dataLanguague[section][value]);
      el.innerHTML = dataLanguague[section][value];
    });
  };

  $btnTranslate.addEventListener("click", (e) => {
    let textLanguage = $btnTranslate.lastElementChild.textContent;

    if (textLanguage === english) {
      getLanguage(textLanguage);
      $btnTranslate.lastElementChild.textContent = spanish;
    } else {
      getLanguage(textLanguage);
      $btnTranslate.lastElementChild.textContent = english;
    }
  });
})(document);

/* ********** Menu ********** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** theme-toggle ********** */
((d, w, ls) => {
  const $btn = d.querySelector(".btn-theme-toggle");
  let prefersDark = w.matchMedia("(prefers-color-scheme: dark)").matches,
    lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
            <path
              d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
            <path
              d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
          </svg>`,
    darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;

  function lightMode() {
    ls.setItem("theme", "light");
    d.body.classList.add("light");
    d.body.classList.remove("dark");
    $btn.innerHTML = lightIcon;
  }

  function darkMode() {
    ls.setItem("theme", "dark");
    d.body.classList.remove("light");
    d.body.classList.add("dark");
    $btn.innerHTML = darkIcon;
  }

  if (ls.getItem("theme") === null) {
    if (prefersDark) {
      ls.setItem("theme", "dark");
    } else {
      ls.setItem("theme", "light");
    }
  }

  if (ls.getItem("theme") === "dark") darkMode();
  if (ls.getItem("theme") === "light") lightMode();

  $btn.addEventListener("click", (e) =>
    ls.getItem("theme") === "dark" ? lightMode() : darkMode()
  );
})(document, window, localStorage);

/* ********** Typed ********** */
(() => {
  const typed = new Typed(".typed", {
    stringsElement: "#typed-texts", // ID del elemento que contiene cadenas de texto a mostrar.
    typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
    startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
    backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
    smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
    shuffle: false, // Alterar el orden en el que escribe las palabras.
    backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
    loop: true, // Repetir el array de strings
    loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
    showCursor: true, // Mostrar cursor palpitanto
    cursorChar: "|", // Caracter para el cursor
    contentType: "html", // 'html' o 'null' para texto sin formato
  });
})();

/* ********** Year ********** */
((d) => {
  const $year = d.getElementById("year");
  let yearData = new Date().getFullYear();

  $year.innerHTML = yearData;
})(document);
