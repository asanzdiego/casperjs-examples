DATE=`date +%Y-%m-%d_%H:%M:%S`
echo $DATE

USERNAME='caspert3chfest'
echo $USERNAME

casperjs twitter.js $USERNAME $TWITTER_PASSWORD $DATE
