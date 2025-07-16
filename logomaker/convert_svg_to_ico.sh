#!/bin/bash
set -x

# Convert logo.svg to favicon.ico with extra safety measures
# Use --export-area-page to ensure the entire viewBox is exported
inkscape logo.svg --export-type=png --export-filename=logo_tmp.png -w 256 -h 256 --export-area-page --export-background-opacity=0

# Alternative: you can also try adding padding with --export-area-snap
# inkscape logo.svg --export-type=png --export-filename=logo_tmp.png -w 256 -h 256 --export-area-snap --export-margin=10

convert logo_tmp.png -define icon:auto-resize=16,32,48,64,128,256 favicon.ico
rm logo_tmp.png

# Overwrite logo.svg and favicon.ico in static/img
cp logo.svg ../static/img/logo.svg
cp favicon.ico ../static/img/favicon.ico