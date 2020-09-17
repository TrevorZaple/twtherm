# twtherm
A "temperature-check" of emotional sentiment in Twitter trending topics utilizing a MERN stack. 

Initial Upload Notes:

TWTherm is a web app that has the following workflow:

1. Scrapes Twitter using an R script:  
  1a. Trending topics are retrieved from Twitter.  
  1b. Tweets are collected for each topic (300 each currently).  
  1c. Tweets are saved to a csv file.  
  1d. The csv file is uploaded to a MongoDB collection.  
  
 (Currently the automated nature of step 1 is handled by Windows Task Scheduler, running an Rscript.exe (for the R script) and a batch file (for the Mongo import). These competences will be transferred more "in-app" in future iterations).
 
 2. The same R script above then applies a sentiment dictionary (currently the Hiu-Lu dictionary) to derive emotional sentiment scores. These scores are then saved as a csv file and imported into the MongoDB collection. (See the note from section 1 for automation explanation).
 
 3. The React app builds a page out of components that retrieve data from the Mongo collection and display the score alongside the name of the trending topic. The background of each data "bubble" is either red or green based on the score itself. Negative scores feature a red background and positive a green background. The data retrieval process is handled by Express in a server.js file running parallel to the React app. 
 
 Things that still need to be done:
 
 Lots.
 
 It works but it's clunky.   
 -Automate the scrape/dictionary/import function within the app itself instead of relying on system task scheduling.  
 -Improve the overall look of the app; this uses Emotion for its css functions so it's pretty much just a matter of getting better at designing with Emotion.  
 -Add a button beside each bubble that takes the user to the Twitter page for that trending topic, labelled something like "What is this?"  
 ~~The header ("Today's forecast: ") is eventually going to have a line that changes depending on the overall sentiment of the ten topics. The R script currently collects this information but I've been trying to change the state.line on an if/else basis in React and haven't managed to quite get it down.~~    
-The header now displays a sun or a storm depending on the overall sentiment of the trending topics. Eventually these little logos will be something better, right now they're just clipart. 
