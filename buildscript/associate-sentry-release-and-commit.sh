#  Assumes we're in a git repository and sentry cli is installed
export INSTALL_DIR=$(pwd)
export INSTALL_PATH="${INSTALL_DIR}/sentry-cli"
export SENTRY_CLI="${INSTALL_PATH}"
curl -sL https://sentry.io/get-cli | bash

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH
export SENTRY_ORG="petterhoel"
$SENTRY_CLI --version
VERSION=`${$SENTRY_CLI} releases propose-version`

# Create a release
$SENTRY_CLI releases new -p "buildscreen" "$VERSION"

# Associate commits with the release
$SENTRY_CLI releases set-commits --auto "$VERSION"
$SENTRY_CLI releases finalize "$VERSION"
