import argparse
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

endpoint = "https://aistudioaiservices308224805493.services.ai.azure.com/models"
model_name = "DeepSeek-V3-0324"

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential("")
)

def main(statement: str):
    fallacies = "strawman, slippery slope,fixed pie,bandwagon,begging the question,the texas sharpshooter,false cause,the fallacy fallacy,tu quoque,the gambler's fallacy,no true scotsman,anecdotal,personal incredulity,burden of proof,composition/division,black-or-white,middle ground,appeal to emotion,ad hominem,loaded question,appeal to authority,appeal to nature"
    response = client.complete(
        messages=[
            UserMessage(content="is there a fallacy in this statement: " + statement + ", here is a list of fallacies: " + fallacies)
        ],
        max_tokens=2048,
        temperature=0.8,
        top_p=0.1,
        model=model_name
                )
    return response.choices[0].message.content

def tool():
    args = argparse.ArgumentParser(prog="statepy", description="statepy checks for fallacies in a giving statement")
    args.add_argument("-s", "--statement", help="enter a statement and statepy uses AI to find fallacies in it")
    parser = args.parse_args()
    return main(parser.statement)

if __name__ == "__main__":
    print(tool())