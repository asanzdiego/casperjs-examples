DATE=`date +%Y%m%d`
USERNAME='t'$DATE

#USERNAME='caspert3chfest'

echo $USERNAME

casperjs twitter.js $USERNAME $TWITTER_PASSWORD
