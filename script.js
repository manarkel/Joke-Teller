
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable and Enable Button
function toggleButton() {
    button.disabled = !button.disabled;

}

// Passing joke to VoiceRSS Api
function tellMe (joke){
        VoiceRSS.speech({
            key: 'ed17f67ccfbd4e4e879e8635b5a130e6',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}


// Get Jokes from a joke Api
async function getJokes () {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }else {
            joke = data.joke;
        }
        // Text to Speech
        tellMe(joke);
        // Disable Button
        toggleButton();

    }catch (error) {
        console.log('whoops', error);

    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);