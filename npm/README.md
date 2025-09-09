#nobias npm package

nobias - find fallacies and fact check youtube videos

nobias is a npm package that allows you to find fallacies and fact checks youtube videos.

1. install it: ``` npm install nobias ```

2. import it: ``` import nobias from 'nobias' ```

3. initialize it: ```const obj = new nobias()```

function list:

    1. await factChecker(<youtubeid or youtubeurl>, <language>) // its a async promise so use await

arguments: 

    1. factChecker() has a youtubeid or url argument that you enter the url or id of the youtube video

    2. factChecker() also has a language argument where you enter the language of the youtube video

hope you enjoy fact checking videos and finding logically fallacies