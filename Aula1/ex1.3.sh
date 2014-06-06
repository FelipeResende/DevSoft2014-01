#!/bin/sh
wget ${1} -O "download" -q
grep ${2} "download" | wc -l
rm download
