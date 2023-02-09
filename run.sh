#!/bin/bash
set -e

cd $(dirname "$0")
mkdir -p logs

while :
do
  DATE=$(date "+%Y_%m_%d")
  date | tee -a logs/logs_$DATE.txt
  # TODO: Update your path to the node binary if necessary
  node index.js 2>&1 | tee -a logs/logs_$DATE.txt
  sleep 5
done