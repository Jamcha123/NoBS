import {OpenAI} from 'openai'
import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'
import {YoutubeTranscript, fetchTranscript} from 'youtube-transcript-plus'
import dotenv from 'dotenv'

dotenv.config()
const ai = new OpenAI({apiKey: process.env["KEY"]})

export default class nobias{
    async factChecker(youtubeurl, language){
        let youtubeid = youtubeurl.split("=")
        if(youtubeid.length == 1){
            youtubeid = youtubeid[0]
        }else{
            youtubeid = youtubeid[1]
        }
        
        let fallacies = "strawman fallacy,false cause fallacy,slippery slope fallacy,personal incredulity fallacy,loaded question fallacy,the gambler's fallacy,appeal to authority fallacy,appeal to emotion fallacy,genetic fallacy,begging the question fallacy,bandwagon fallacy,ambiguity fallacy,burden of proof fallacy,composition/division fallacy,false equivalence fallacy,appeal to nature fallacy,the fallacy fallacy,No true Scotsman,Lump of labour fallacy,red herring fallacy".split(",")
        const items1 = new Promise((resolve) => {
            fetchTranscript(youtubeid, {lang: language}).then((value) => {
                resolve(value)
            })
        })
        const target = await items1
        let ans = ""
        for(let i = 0; i != target.length; i++){
            ans += target[i]["text"] + "\n"
        }

        let words = ""
        for(let i = 0; i != fallacies.length; i++){
            words += fallacies[i] + "\n"
        }
        const link = "https://www.googleapis.com/youtube/v3/videos?key=" + process.env["YOUTUBE"] + "&part=snippet&id=" + youtubeid
        const {title, description} = (await axios.get(link))["data"]["items"][0]["snippet"]

        const search = "https://www.googleapis.com/customsearch/v1?key=" + process.env["YOUTUBE"] + "&cx=53b4f01c6912d484d&q=" + title
        const  {items} = (await axios.get(search))["data"]

        let google = ""
        for(let i = 0; i != items.length; i++){
            google += items[i]["title"] + " " + items[i]["snippet"] + "\n"
        }

        const response = await ai.chat.completions.create({
            model: "gpt-4o-search-preview-2025-03-11",
            web_search_options: {search_context_size: "high"},
            messages: [
                {
                    role: "user", 
                    content: [
                        {type: "text", text: "find all the fallacies and fact check this transcript: " + ans + " and here is the list of fallacies: " + fallacies + " and here is the google searches snippets: " + google + ", thank you"}
                    ]
                }
            ]
        })
        fs.createWriteStream("nobias.txt", "utf-8").write(response.choices[0].message["content"])
        return response.choices[0].message["content"]
    }
}
const obj = new nobias()
console.log(await obj.factChecker("https://www.youtube.com/watch?v=GlkCw1U8oXE", "en"))