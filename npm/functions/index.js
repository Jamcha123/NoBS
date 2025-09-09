import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import {OpenAI} from 'openai'

const facts = async (key, script, fallacies, searches) => {
    const ai = new OpenAI({apiKey: key})
    const response = await ai.chat.completions.create({
        model: "gpt-4o-search-preview-2025-03-11",
        web_search_options: {search_context_size: "high"},
        messages: [
            {
                role: "user",
                content: [
                    {type: "text", text: "how many fallacies: " + fallacies + " are in this youtube transcript: " + script + " and can you fact check it using google searches: " + searches + ", thank you"}
                ]
            }
        ]
    })
    return response.choices[0].message["content"]
}
export const checker = functions.https.onRequest({cors: true}, async (req, res) => {
    const {transcript, fallacies, searches, apikey} = req.query

    return res.status(200).send((await facts(apikey, transcript, fallacies, searches)))
})