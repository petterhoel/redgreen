#  Assumes we're in a git repository and sentry cli is installed
export INSTALL_DIR=$(pwd)
export INSTALL_PATH="${INSTALL_DIR}/sentry-cli"

curl -sL https://sentry.io/get-cli

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH
export SENTRY_ORG="petterhoel"
$INSTALL_PATH --version
#sentry-cli --version
#VERSION=`sentry-cli releases propose-version`

# Create a release
#sentry-cli releases new -p "buildscreen" "$VERSION"

# Associate commits with the release
#sentry-cli releases set-commits --auto "$VERSION"
#sentry-cli releases finalize "$VERSION"
