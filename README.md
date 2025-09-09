# NoBias - Don't be fooled easily

You need to be patient, it takes a while for the AI to gather all the info from google and sort through the fallacies and transcript

NoBias is a youtube bias detector that helps you with fact checking and fallacy finding.

It summarizes the youtube description, Googles and fact checks the title and finds all the fallacies in the youtube video.

Github: https://github.com/Jamcha123/NoBias

The nobias python package: https://pypi.org/project/nobiaspy

```pip install nobiaspy --break-system-packages```

The NPM package: https://www.npmjs.com/package/nobias

```npm i nobias```

How it works:
  
    1. It first gets the Youtube video description and transcript using the Youtube API.
     
    2. Then it gets data from other websites using the Google Search API and scraping sites like https://www.wikipedia.org, https://yourlogicalfallacyis.com and other news sites
     
    3. Lastly it using AI to cross reference the Youtube video transcript and description with a broad dataset from the internet and see if it is bias.

    4. NoBias finds all the Fallacies, Googles and Summarizes the title, Summarizes the youtube video description


Hope you enjoy NoBias and you avoid becoming polarized and ideologically rigid.

