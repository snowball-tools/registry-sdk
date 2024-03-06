#!/bin/bash
# NOTE: protoc is required

set -e

REPO_ROOT=$(pwd)
I=$REPO_ROOT/proto
DEST_TS=$REPO_ROOT/src/proto2/

echo "Generating protobuf files"

mkdir -p $DEST_TS

protoc \
  --plugin=$REPO_ROOT/node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=$DEST_TS \
  --proto_path=$I \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages" \
  $(find $REPO_ROOT/proto/cerc -iname "*.proto")
