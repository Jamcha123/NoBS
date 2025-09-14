#nobias npm package - don't be fooled
be patient the AI needs to go though all the data and fallacies to fact check the video

How to use: 

    first you need an openai api key: https://platform.openai.com/docs/overview

    second: npm install nobias

    third, add it: const obj = new nobias()


function list:

    1. await factChecker(<youtubeid or youtubeurl>, <language>, {apikey: <your openai api key>})


arguments of factChecker:

    1. youtubeurl (the youtube video url to fact check and find fallacies, you can use just the id too)

    2. language (the language code of said video e.g en, sv, es, de, fr and etc)

    3. {apikey: <your openai key>} (just your openai key so you can fact check)


openai: https://platform.openai.com/docs/overview

github: https://github.com/Jamcha123/NoBias

my github sponsor profile (if you want to sponser me): https://github.com/sponsors/Jamcha123


hope you enjoy fact checking videos and finding logically fallacies