const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  console.log('tell me:', joke);
  VoiceRSS.speech({
    key: 'de6b114e64ce40819595fed2a3180d5f',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log('Whoops', error);
  }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);