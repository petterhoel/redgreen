#  Assumes we're in a git repository and sentry cli is installed
export SENTRY_CLI="/usr/local/bin/sentry-cli"
curl -sL https://sentry.io/get-cli | bash

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH
export SENTRY_ORG="petterhoel"
$SENTRY_CLI --version
VERSION=`${SENTRY_CLI} releases propose-version`

# Create a release
$SENTRY_CLI --log-level INFO releases new -p "buildscreen" "$VERSION"

# Associate commits with the release
$SENTRY_CLI --log-level INFO releases set-commits --auto "$VERSION"
$SENTRY_CLI --log-level INFO releases finalize "$VERSION"
