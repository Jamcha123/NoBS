import {OpenAI} from 'openai'
import fs from 'fs'
import axios from 'axios'
import * as cheerio from 'cheerio'
import {YoutubeTranscript, fetchTranscript} from 'youtube-transcript-plus'
import ModelClient, {isUnexpected} from '@azure-rest/ai-inference'
import {AzureKeyCredential} from '@azure/core-auth'

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
        const link = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAdCP1jtNteYDLMsBBrbUlrxdOExlUEt3s&part=snippet&id=" + youtubeid
        const {title, description} = (await axios.get(link))["data"]["items"][0]["snippet"]

        const search = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAdCP1jtNteYDLMsBBrbUlrxdOExlUEt3s&cx=53b4f01c6912d484d&q=" + title
        const  {items} = (await axios.get(search))["data"]

        let google = ""
        for(let i = 0; i != items.length; i++){
            google += items[i]["title"] + " " + items[i]["snippet"] + "\n"
        }
        return {"fallacies": fallacies, "google": google, "transcript": ans}
    }
}