#Overview:
GroupMe Bot that, once complete, will deliver LSJUMB Altoz charts upon request

#Steps for uploading new chartz:
1. Download PDF chartz from online folder and save to local directory
2. run command
```
for file in *.jpg; do convert -density 300 -depth 8 -quality 85 "[filename].pdf" "[image_directory]/${file%.*}.jpg
```
to convert all PDF files into jpeg images
3. run command
```
python groupme-image-service.py
```
to locally obtain all groupme image service URLs for chartz

#More Information:
GroupMe API info: https://dev.groupme.com

Deployed using heroku: https://heroku.com

Starter code courtesy https://github.com/groupme/bot-tutorial-nodejs#get-bot-id