#!/bin/sh
cd /Users/CP/Dropbox/code/nodejs/blog-native/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" >access.log
