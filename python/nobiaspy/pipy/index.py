from youtube_transcript_api import FetchedTranscript, YouTubeTranscriptApi
import requests
import argparse
from openai import OpenAI
import os
from google import genai

client = genai.Client(api_key="")

def main(ids: str, lang: str):
    id = (ids.split("="))
    getid = ""
    if(len(id) == 1):
        getid = id[0]
    elif(len(id) > 1):
        getid = id[1]

    link = "https://www.googleapis.com/youtube/v3/videos?key=&part=snippet&id=" + getid
    target = (requests.get(link).json())["items"][0]["snippet"]["title"]
    
    search = " https://www.googleapis.com/customsearch/v1?key=&cx=53b4f01c6912d484d&q=" + target
    searching, ans = (requests.get(search).json())["items"], ""

    for x in searching:
        ans += x["title"] + " " + x["snippet"] + "\n"
    

    api = YouTubeTranscriptApi()
    data = api.fetch(getid).snippets

    texts = ""
    for x in data:
        texts += x.text + "\n"
    fallacies = "strawman fallacy,false cause fallacy,slippery slope fallacy,personal incredulity fallacy,loaded question fallacy,the gambler's fallacy,appeal to authority fallacy,appeal to emotion fallacy,genetic fallacy,begging the question fallacy,bandwagon fallacy,ambiguity fallacy,burden of proof fallacy,composition/division fallacy,false equivalence fallacy,appeal to nature fallacy,the fallacy fallacy,No true Scotsman,Lump of labour fallacy,red herring fallacy"
    response = client.models.generate_content(model="gemini-2.5-flash", contents="hello, can you get the fallacies: " + fallacies + " and fact check this youtube video: " + texts + " using these google searches: " + ans + ", please")
    return response.text

def cli():
    args = argparse.ArgumentParser(prog="nobiaspy", description="enter a youtube video id or url and the language in the cli")
    args.add_argument("-i", "--id", help="enter a youtube id or url")
    args.add_argument("-l", "--lang", help="enter the lang code of the youtube video")
    parser = args.parse_args()

    return main(parser.id, parser.lang)
if __name__ == "__main__":
    print(cli())
