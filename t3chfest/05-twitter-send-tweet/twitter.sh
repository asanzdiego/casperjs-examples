DATE=`date +%Y-%m-%d_%H:%M:%S`
echo $DATE

#USERNAME='t20150213'
USERNAME='caspert3chfest'
echo $USERNAME

casperjs twitter.js $USERNAME $TWITTER_PASSWORD $DATE
