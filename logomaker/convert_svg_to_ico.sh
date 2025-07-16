#!/bin/bash
set -x

# Convert logo.svg to favicon.ico
inkscape logo.svg --export-type=png --export-filename=logo_tmp.png -w 256 -h 256
convert logo_tmp.png -define icon:auto-resize=16,32,48,64,128,256 favicon.ico
rm logo_tmp.png

# Overwrite logo.svg and favicon.ico in static/img
cp logo.svg ../static/img/logo.svg
cp favicon.ico ../static/img/favicon.ico
