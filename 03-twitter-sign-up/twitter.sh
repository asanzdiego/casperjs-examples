DATE=`date +%Y%m%d`
USERNAME='t'$DATE

echo $USERNAME

casperjs twitter.js $USERNAME $TWITTER_PASSWORD
