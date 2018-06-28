#!/bin/sh

if which yarn > /dev/null; then
  yarn run compile
else
  npm run compile
fi
