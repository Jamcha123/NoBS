import requests
import os
import argparse
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
ai = OpenAI(api_key=os.getenv("KEY"))
def main(id: str, language: str):
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
    
    snippet = ""
    for x in targets:
        snippet += x["title"] + " " + x["snippet"] + "\n"

    f1 = open("index.txt", "r")
    target = f1.read().split("\n")
    f1.close()

    fallacies = ""
    for x in target: 
        link = "https://www.googleapis.com/customsearch/v1?key=" + os.getenv("SEARCH") + "&cx=53b4f01c6912d484d&q=" + x
        data = (requests.get(link).json())["items"]
        for y in data:
            fallacies += str(y["title"]) + " " + str(y["snippet"]) + "\n"

    target = "Find all the fallacies in this youtube video transcript: " + ans + ", list of fallacies: " + fallacies + " and fact check it aganist these google searches: " + snippet
    response = ai.responses.create(
        model="o4-mini",
        input=target
    )
    f2 = open("nobias.txt", "w")
    f2.write(str(response.output_text))
    f2.close()

if __name__ == "__main__":
    args = argparse.ArgumentParser(prog="nobiaspy", description="NoBiaspy is a python cli tool to find logically fallacies in youtube transcripts and it also fact checks it using google search api")
    args.add_argument("-i", "--id", help="enter the youtube id to check for logically fallacies")
    args.add_argument("-l", "--language", help="enter the language of the given youtube video")
    parser = args.parse_args()
    print(main(parser.id, parser.language))