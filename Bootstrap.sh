#!/bin/bash

# Make sure to run this script as sudo su!

export DEBIAN_FRONTEND=noninteractive

echo "[Accelerated/Angular/Bootstrap.sh] Go get some coffee, this might take awhile ..."

echo "[Accelerated/Angular/Bootstrap.sh] -- Installing nodejs"

curl -sL https://deb.nodesource.com/setup_4.x | bash - > /dev/null
apt-get install nodejs -y > /dev/null

echo "[Accelerated/Angular/Bootstrap.sh] -- Installing nodejs application"

npm install --loglevel=error > /dev/null

echo "[Accelerated/Angular/Bootstrap.sh] -- Installing git"

apt-get install git -y > /dev/null

echo "[Accelerated/Angular/Bootstrap.sh] -- Installing global npm packages"

npm install forever -g --loglevel=error > /dev/null
npm install bower -g --loglevel=error > /dev/null

echo "[Accelerated/Angular/Bootstrap.sh] -- Running bower on www directory"

cd www
bower install --loglevel=error --allow-root --force-yes --force -y > /dev/null
cd ..

echo "[Accelerated/Angular/Bootstrap.sh] All done! Go and get started!"
