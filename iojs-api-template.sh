#!/bin/bash

# iojs-api-template.sh helper script

app="./app.js"
iojs=$(which iojs)

${iojs} --harmony --harmony_arrow_functions --harmony_classes ${app} "$@"
