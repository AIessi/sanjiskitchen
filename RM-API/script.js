function getCharacters(done){
    const results = fetch("https://rickandmortyapi.com/api/character");
    results
        .then(response => response.json())
        .then(data =>{
            done(data)
        });
}

getCharacters(data => {
    data.results.forEach(character => {
        const article = document.createRange().createContextualFragment(/*html*/`
        <article>
            <div class="image-container">
                <img src="${character.image}" alt="character">
            </div>
            <h2>${character.name}</h2>
            <span>${character.status}</span>
        `);
        
        const main = document.querySelector("main");
        main.append(article);
    });
})