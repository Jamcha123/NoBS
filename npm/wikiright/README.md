#wikiright - wikipedia fact checker

wikiright uses google search api and wikipedia rest api to fact check wikipedia article you enter

just enter a wikipedia article full name and page limit then run ```node . ```

how to use: 

    1. npm i wikiright

    2. import wikiright from 'wikiright'

    3. const obj = new wikiright()

function list: 

    1. await checker(<wiki>, <pages>)

arguments: 

    1. wiki - add the wikipedia article full name

    2. pages - the wikipedia page limit 

Hope you enjoy fact checking wikipedia articles

