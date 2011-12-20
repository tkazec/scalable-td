#!/bin/bash
# $ bash build.sh containerdir

SRCDIR="$( cd "$( dirname "$0" )" && pwd )"
OUTDIR="$1/scalable-td"

rm -rf $OUTDIR
cp -R $SRCDIR $OUTDIR
cd $OUTDIR

rm build.sh
rm -rf .git

yuicompressor -o index.css index.css

closure --language_in ECMASCRIPT5 --js index.js --js_output_file index.js