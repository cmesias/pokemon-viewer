// Author: Carl Mesias

document.addEventListener('DOMContentLoaded', function() {

    // get reference to button that gets pokemon
    let mainContainer = document.querySelector("#pokemon-container");
    let getPkmnBtn = document.querySelector("#get-pokemon");
    let getRandPkmnBtn = document.querySelector("#rand-pokemon");
    let pkmnInput = document.querySelector("#pokemon-id");
    let playAudioBtns = document.querySelector(".play-audio-btn");

    // listen for clicks of button
    getPkmnBtn.addEventListener('click', function() {

        // if input value is a number
        if (typeof pkmnInput.value === 'number') {
            loadPokemon(pkmnInput.value, (pokemon) => {
                // console.log(pokemon):
            });
        } 

        // if input value isn't a number, make it lowercase
        else {
            let string = "" + pkmnInput.value;
            loadPokemon(string.toLowerCase(), (pokemon) => {
                // console.log(pokemon):
            });
        }

    });

    // listen for clicks of button
    getRandPkmnBtn.addEventListener('click', function() {
        loadPokemon(getRandPokeId(), (pokemon) => {
            // console.log(pokemon):
        });
    });

    // function that loads a pokemon
    const loadPokemon = (id, cb) => {
        let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png`;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => {

            // create div (pokemon)
            let div = document.createElement("div");
            div.classList.add("pokemon")

            // create img (pokemon image, front default)
            let img = document.createElement("img");
            img.classList.add("poke-img");
            img.src = data.sprites.front_default;
            div.append(img);                                 // append to div

            // create img (pokemon image, back default)
            let checkForImg2 = data.sprites.front_default;
            if (checkForImg2) {
                let img2 = document.createElement("img");
                img2.classList.add("poke-img");
                img2.src = checkForImg2;       
                div.append(img2);                           // append to div
            }

            // create img (pokemon image, front shiny)
            let checkForImg3 = data.sprites.front_shiny;
            if (checkForImg3) {
                let img2 = document.createElement("img");
                img2.classList.add("poke-img");
                img2.src = checkForImg3;       
                div.append(img2);                           // append to div
            }

            // create p (pokemon name)
            let p = document.createElement('p');
            p.classList.add("poke-name");
            p.innerHTML = `<b>Pokemon name</b>: ${data.name}`;
            div.append(p);                                  // append to div

            // create p (pokemon id)
            let p2 = document.createElement('p');
            p2.classList.add("poke-id");
            p2.innerHTML = `<b>Pokemon id</b>: ${data.id}`;
            div.append(p2);                                 // append to div

            // create btn to play audio (pokemon SFX)
            let sfx = document.createElement("audio");
            sfx.classList.add("poke-sfx");
            sfx.src = data.cries.latest;                    // Add src audio
            sfx.controls = true;                            // Add the controls attribute
            div.append(sfx);                                // append to div

            // append div to main container
            mainContainer.append(div);

            // callback
            cb(data)
        });
    };

    
    // get initial random pokemon
    loadPokemon(getRandPokeId(), function() {});
});

// returns a number based on max number of pokemon (1 - 1025, inclusive)
function getRandPokeId() {
    return Math.floor( Math.random() * 1024 + 1);
}