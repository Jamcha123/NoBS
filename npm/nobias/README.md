#nobias npm package

nobias - find fallacies and fact check youtube videos

to use nobias you need an openai key.
openai website: https://platform.openai.com/docs/overview

nobias is a npm package that allows you to find fallacies and fact checks youtube videos.

1. install it: ``` npm install nobias ```

2. import it: ``` import nobias from 'nobias' ```

3. initialize it: ```const obj = new nobias()```

function list:

    1. await factChecker(<youtubeid or youtubeurl>, <language>, {apikey: <your openai api key>}) // its a async promise so use await

arguments: 

    1. factChecker() has a youtubeid or url argument that you either enter the url or the id of the youtube video

    2. factChecker() also has a language argument where you enter the language of the youtube video

    3. also don't forget to add your openai key to the factChecker function as a dictionary


github: https://github.com/Jamcha123/NoBias

the nobias python package: https://pypi.org/project/nobiaspy


hope you enjoy fact checking videos and finding logically fallacies