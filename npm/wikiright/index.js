import axios from 'axios';
import {GoogleGenAI} from '@google/genai'
import { OpenAI } from 'openai/client.js';

const ai = new GoogleGenAI({apiKey: ""})

export default class wikiright{
    async checker(wiki, pages){
        const link = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + wiki + "&limit=" + pages
        const webby = (await axios.get(link))["data"]["pages"][0]["title"]

        const summary = (await axios.get("https://en.wikipedia.org/w/rest.php/v1/page/" + wiki))["data"]["source"]

        const search = "https://www.googleapis.com/customsearch/v1?key=&cx=53b4f01c6912d484d&q=" + webby

        const target = (await axios.get(search))["data"]["items"]
        let ans = ""
        for(let i = 0; i != target.length; i++){
            ans += target[i]["title"] + " " + target[i]["snippet"]
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "can you fact check this wikipedia article: " + summary + " (in a short summary like 100 - 50 words) with these google searches data: " + ans + ", thany you",
        });
        return response.text
    }
}
const obj = new wikiright()
console.log(await obj.checker("Killing_of_Charlie_Kirk", 20))