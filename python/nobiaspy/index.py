import requests
import os
import argparse
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
ai = OpenAI(api_key=os.getenv("KEY"))
def main(id: str, language: str):
    fallacies = "strawman fallacy,false cause fallacy,slippery slope fallacy,personal incredulity fallacy,loaded question fallacy,the gambler's fallacy,appeal to authority fallacyappeal to emotion fallacy,genetic fallacy,begging the question fallacy,bandwagon fallacy,ambiguity fallacy,burden of proof fallacy,composition/division fallacy,false equivalence fallacy,appeal to nature fallacy,the fallacy fallacy,No true Scotsman,Lump of labour fallacy,red herring fallacy".split(",")

    api = YouTubeTranscriptApi()
    targets = api.fetch(id, languages=[language]).snippets
    ans = ""
    for x in targets:
        ans += x.text + "\n"
    
    link = "https://www.googleapis.com/youtube/v3/videos?key=" + os.getenv("YOUTUBE") + "&part=snippet&id=" + id
    data = (requests.get(link).json())["items"][0]["snippet"]
    title, description = data["title"], data["description"]

    link = "https://www.googleapis.com/customsearch/v1?key=" + os.getenv("SEARCH") + "&cx=53b4f01c6912d484d&q=" + title
    targets = (requests.get(link).json())["items"]
    
    google = ""
    for x in targets:
        google += x["title"] + " " + x["snippet"] + "\n"

    logic = ""
    for x in fallacies: 
        link = "https://www.googleapis.com/customsearch/v1?key=" + os.getenv("SEARCH") + "&cx=53b4f01c6912d484d&q=" + x
        data = (requests.get(link).json())["items"]
        for y in data:
            logic += str(y["title"]) + " " + str(y["snippet"]) + "\n"

    target = "fact check and find the fallacies of this transcript: " + ans + ", fallacies: " + logic + ", google searches for fact checking: " + google + " in the same language of the script"
    response = ai.responses.create(
        model="o4-mini",
        input=target
    )
    f2 = open("nobias.txt", "w")
    f2.write(str(response.output_text))
    f2.close()

    f3 = open("nobias.txt", "r")
    ans = f3.read()
    f3.close()

    return ans

def tool():
    args = argparse.ArgumentParser(prog="nobiaspy", description="NoBiaspy is a python cli tool to find logically fallacies in youtube transcripts and it also fact checks it using google search api")
    args.add_argument("-i", "--id", help="enter the youtube id to check for logically fallacies")
    args.add_argument("-l", "--language", help="enter the language of the given youtube video")
    parser = args.parse_args()

    return main(parser.id, parser.language)
print(tool())