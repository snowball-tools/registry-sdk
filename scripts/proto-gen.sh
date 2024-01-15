#!/bin/bash
# NOTE: protoc is required

set -e

REPO_ROOT=$(pwd)
I=$REPO_ROOT/proto
DEST_TS=$REPO_ROOT/src/proto/

echo "Generating protobuf files"

mkdir -p $DEST_TS

protoc \
  --plugin=protoc-gen-ts=$REPO_ROOT/node_modules/.bin/protoc-gen-ts \
  --ts_out=$DEST_TS \
  --proto_path=$I \
  $(find $REPO_ROOT/proto/vulcanize -iname "*.proto")

SED='sed -i'
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED='sed -i ""'
fi

echo "Removing gRPC references..."
# https://github.com/tharsis/evmosjs/tree/main/packages/proto#note

for file in $(find $REPO_ROOT/src/proto -type f)
do
  line=$(grep -n '@grpc/grpc-js' $file | cut -f1 -d':')
  if [[ -n "$line" ]] && [[ "$line" -gt 0 ]]; then
    echo "Processing file: $file"
    $SED "${line}d" ${file}
    functions=$(grep -n 'interface GrpcUnaryServiceInterface' $file | cut -f1 -d':')
    $SED "${functions},\$d" ${file}
    echo '}' >> $file
  fi
  $SED '1s#^#/* eslint-disable */\n#' $file
  $SED '1s#^#// @ts-nocheck\n#' $file
done
