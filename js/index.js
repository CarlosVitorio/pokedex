const nome = document.querySelector('.name');
const numero = document.querySelector('.number');
const poke = document.querySelector('.pokemon-img');
const form = document.querySelector('.form');
const input = document.querySelector('.pesquisa');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let Fpokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    nome.innerHTML = 'carregando...';
    numero.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data){
        poke.style.display = 'block';
        nome.innerHTML = data.name;
        numero.innerHTML = data.id;
        poke.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        Fpokemon = data.id;
    } else{
        poke.style.display = 'none';
        nome.innerHTML = 'Nao encontrado';
        numero.innerHTML = '';
    }
}


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
} );

next.addEventListener('click', () =>{
    Fpokemon++
    renderPokemon(Fpokemon);
} );

prev.addEventListener('click', () =>{
    if (Fpokemon > 1){
        Fpokemon--
        renderPokemon(Fpokemon);
    }
    
} );

renderPokemon(Fpokemon);