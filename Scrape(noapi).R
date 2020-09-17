library(twitteR)
library(rtweet)
library(ROAuth)
library(httr)
library(quanteda)
library(stringr)
library(plyr)
library(stats)
library(tidyr)
library(broom)
library(tokenizers)
library(stopwords)
library(tidytext)
library(ggplot2)
library(tm) 
library(syuzhet)
library(RSentiment)
library(dplyr)
library(lubridate)
library(reshape2)
library(purrr)
library(readr)
library(ngram)
library(pracma)
library(textreadr)
library(uwo4419)

setwd("c:/twt/api")

#Set API Keys
api_key <- "//"
api_secret <- "//"
access_token <- "//"
access_token_secret <- "//"
setup_twitter_oauth(api_key, api_secret, access_token, access_token_secret)

httroauth <- create_token(app = "//",
             consumer_key = api_key,
             consumer_secret = api_secret,
             access_token = access_token,
             access_secret = access_token_secret)

#Retreive trending topics - eventually see if you can take in the user's geoid and then use that in the availableTrendLocations func instead
trends <- getTrends(2459115) #This is currently the NYC geo id
select_dataframe_rows = function(ds, sel) {
  cnames = colnames(ds)
  rnames = rownames(ds)
  ds = data.frame(ds[sel,])
  colnames(ds) = cnames
  rownames(ds) = rnames[sel]
  return (ds)
}
rownames(trends) = sprintf("Topic %02d", 1:nrow(trends))
topten <- select_dataframe_rows(trends, c(1:10))

#Take trending topics and scrape Twitter based upon them
tweets <- vector()
alltweets <- vector()
for(i in 1:nrow(topten)) {
  tweets <- searchTwitter(topten$query[i], n = 300)
  tweets <- twListToDF(tweets)
  tweets$trending <- topten$name[i]
  alltweets <- rbind(tweets, alltweets)
}
total <- vector()
for(i in length(alltweets)) {
  ongoing <- lookup_tweets(statuses = alltweets$id, parse = TRUE, token = httroauth)
  total <- rbind(total, ongoing)
}
total$trending <- NA

total$trending <- alltweets$trending[match(total$status_id, alltweets$id)]


#Load the dictionary - HuLiu to start, use a different, more Twitter-oriented one later
load("~/R/win-library/3.5/quanteda.dictionaries/data/data_dictionary_HuLiu.rda")

#Apply the dictionary
twcorp <- corpus(total$text)
data <- dfm(twcorp, dictionary = data_dictionary_HuLiu, remove = stop_words, remove_numbers = TRUE, remove_punct = TRUE, remove_symbols = TRUE)

total$positive <- as.numeric(data[,1])
total$negative <- as.numeric(data[,2])
total$sentiment <- total$positive - total$negative

#Filter out the retweets
subtotal <- subset(total, total$is_retweet == FALSE)
trendingtopics <- tibble::tibble(topic = unique(total$trending))

for(i in 1:nrow(trendingtopics)) {
  x <- subset(total, total$trending == trendingtopics$topic[i])
  trendingtopics$positive[i] <- mean(x$positive)
  trendingtopics$negative[i] <- mean(x$negative)
  trendingtopics$sentiment[i] <- mean(x$sentiment)
  
}

trendingtopics$id <- seq.int(nrow(trendingtopics))
trendingtopics$sentiment <- signif(trendingtopics$sentiment, digits = 2)
#Add a row of overalls to build the header if/else
overall <- tibble::tibble(topic = "Overall", positive = mean(trendingtopics$positive), negative = mean(trendingtopics$negative),
                          sentiment = mean(trendingtopics$sentiment), id = 11)
trendingtopics <- rbind(trendingtopics, overall)

#Write to csv which will then be loaded up into the Mongo database powering the backend.
write_as_csv(total, file_name = "tweets.csv", prepend_ids = TRUE, na = "", fileEncoding = "UTF-8")
write.csv(trendingtopics, "ttstat.csv")
