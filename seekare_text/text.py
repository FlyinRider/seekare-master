import os
import re
import requests
import json
# Prompt the user for the directory path
# path = D:\Project\ElasticSearch\seekare\seekare_text

directory_path = input("Enter the directory path: ")

# server_path = 'credential/serverURL.txt'
# email_path = 'credential/emailAddress.txt'
# passwordPath = 'credential/password.txt'

# with open(server_path, 'r') as file:
#     serverURL = file.read()

# with open(email_path, 'r') as file:
#     adminEmail = file.read()

# with open(passwordPath, 'r') as file:
#     adminPass = file.read()

def transform_sentences(text):
    # Split the text into sentences using periods as separators
    sentences = re.split(r'(?<=[!?])\s+', text)
    
    # Transform each sentence and join them back together
    transformed_text = ' '.join([f'<p>{sentence}</p>' for sentence in sentences])
    transformed_text = transformed_text.replace("<p></p>","<br>")
    transformed_text = transformed_text.replace("<p>   </p>","<br>")
    
    return transformed_text

serverURL = "http://sk-dev-sfo3-01.seekare.org:8080"
# serverURL = "http://localhost:5000"
activeWikiId = "new-wiki"
email = "sunsatel1024@gmail.com"
password = "123123123"
credential = {}
credential["emailOrName"] = email
credential["password"] = password
signInEndpoint = f'{serverURL}/api/v1/users/signin'
createWikiEndpoint = f'{serverURL}/api/v1/wiki/create'
getCategoriesEndpoint = f'{serverURL}/api/v1/questions/tags'
updateCategoriesEndpoint = f'{serverURL}/api/v1/wiki/category'
postBooksToWikiEndpoint = f'{serverURL}/api/v1/wiki/question'
createCategories = f'{serverURL}/api/v1/questions/tags'
deleteWikiId = f'{serverURL}/api/v1/wiki'

headers = {}
loginResponse = requests.post(
    signInEndpoint, data=credential)
token = json.loads(loginResponse.text)["token"]

headers["X-Mdhelp-Token"] = token
# Check if the directory exists

if os.path.exists(directory_path) and os.path.isdir(directory_path):
    # List all files in the directory
    file_list = [f for f in os.listdir(directory_path) if os.path.isfile(
        os.path.join(directory_path, f))]

    # Iterate through the list of files and read their contents
    for filename in file_list:
        if filename.endswith('.txt'):  # Check if the file is a text file
            file_path = os.path.join(directory_path, filename)
            with open(file_path, 'r', errors="ignore") as file:
                file_contents = file.read()
                # Title of file will be the title of book
                title = filename.replace("_", " ").replace(".txt", "")

                patternForIntro = r'intro(.*?)subsection'
                match = re.search(patternForIntro, file_contents, re.DOTALL)
                if match:
                    content = match.group(1).strip()
                    content = transform_sentences(content)
                    content = content.replace("--", "")
                    content = re.sub(r'\n\n', '<br><br>', content)
                else:
                    print("No match found.")    
                # find the subsections

                sections = []
                lines = file_contents.split('\n')
                current_section = {"subsection":'', "subtitle":'', "subcontents":[]}

                for line in lines:
                    if line.startswith('subsection:'):
                        if 'subsection' in current_section and 'subtitle' in current_section:
                            sections.append(current_section)
                        current_section = {'subsection': line.replace(
                            'subsection:', ''), 'subtitle:': '', 'subcontents': []}
                    elif line.startswith('subtitle:'):
                        current_section['subtitle'] = line.replace('subcontents:', '').replace(
                            '**', '<b>').replace('**', '</b>').replace("subtitle:","")
                    else:
                        subcon = line.replace('### ', '&nbsp; &nbsp; &nbsp;')
                        subcon = re.sub(r'\*\*(.*?)\*\*', lambda match: '<b>' + match.group(1) + '</b>', subcon)
                        subcon = transform_sentences(subcon)
                        subcon = subcon.replace('--',"")
                        subcon = re.sub(r'\n\n', '<br><br>', subcon)
                        current_section['subcontents'].append(subcon)

                # Append the last section if both subsection and subtitle are present
                if 'subsection' in current_section and 'subtitle' in current_section:
                    sections.append(current_section)

                data = {}
                data["title"] = title
                data["content"] = content
                response = requests.post(
                    createWikiEndpoint, data=data, headers=headers)
                
                if json.loads(response.text)['status'] == 201:
                    wikiId = json.loads(response.text)['existingWikis'][0]['_id']
                    deleted = requests.delete(f'{deleteWikiId}/{wikiId}', headers=headers)
                    response = requests.post(createWikiEndpoint, data=data, headers=headers)

                if json.loads(response.text)['status'] != 201:
                    bookId = json.loads(response.text)["wiki"]['_id']
                    tagResponse = requests.get(
                        getCategoriesEndpoint, headers=headers)
                    tags = json.loads(tagResponse.text)

                    existingTags = []
                    newTags = []
                    newTagsId = []
                    for section in sections:
                        for tag in tags:
                            if (section["subsection"] == tag["title"]):
                                existingTags.append(tag)
                            else: newTagsId.append(tag)
                    for section in sections:
                        flag = False
                        for existingTag in existingTags:
                            if (existingTag["title"] == section["subsection"]):
                                flag = True
                        if flag is False:
                            newTags.append(section["subsection"])

                    sendTag = []
                    for newTag in newTags:
                        tagdata = {"title" : newTag}
                        requests.post(createCategories, data=tagdata, headers=headers)
                    
                    for newTagId in newTagsId:
                        if newTagId['title'] in newTags:
                            sendTag.append(newTagId["_id"])
                        
                    for existingTag in existingTags:
                        sendTag.append(existingTag["_id"])

                    categoryEndpoint = f'{updateCategoriesEndpoint}/{bookId}'
                    category = {}
                    category["category"] = json.dumps(sendTag)

                    categoryResponse = requests.post(
                        categoryEndpoint, data=category, headers=headers)
                    # categories = json.loads(categoryResponse.text)["categories"]
                    updateWikiEndpoint = f'{postBooksToWikiEndpoint}/{bookId}'

                    wikiData = {}
                    updateQuestion = {}
                    delimiter = " "
                    for section in sections:
                        for existingTag in existingTags:
                            if section["subsection"] == existingTag["title"]:
                                updateQuestion["type"] = existingTag["_id"]
                        updateQuestion["title"] = section["subtitle"]
                        if section['subcontents'] == " ":
                            section['subcontents'] = "<br>"
                        updateQuestion["content"] = delimiter.join(
                            section["subcontents"])
                        updateWiki = requests.post(
                            updateWikiEndpoint, data=updateQuestion, headers=headers)

else:
    print("Invalid directory path or directory does not exist.")
