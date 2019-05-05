#  Assumes we're in a git repository and sentry cli is installed
echo "pwd"
pwd

echo "installpath $INSTALL_PATH"

echo "installdir $INSTALL_DIR"

#curl -sL https://sentry.io/get-cli

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH
export SENTRY_ORG="petterhoel"
sentry-cli --version
VERSION=`sentry-cli releases propose-version`

# Create a release
sentry-cli releases new -p "buildscreen" "$VERSION"

# Associate commits with the release
sentry-cli releases set-commits --auto "$VERSION"
sentry-cli releases finalize "$VERSION"
