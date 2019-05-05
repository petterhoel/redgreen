#  Assumes we're in a git repository
#export SENTRY_AUTH_TOKEN=$SENTRY_AUTH
#export SENTRY_ORG="petterhoel"
curl -sL https://sentry.io/get-cli/
sentry-cli --version
#VERSION=`sentry-cli releases propose-version`

# Create a release
#sentry-cli releases new -p "buildscreen" "$VERSION"

# Associate commits with the release
#sentry-cli releases set-commits --auto "$VERSION"
#sentry-cli releases finalize "$VERSION"
