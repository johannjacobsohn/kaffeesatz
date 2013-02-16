#/bin/bash
set -x
set -e

export KAFFEESATZTESTDB=coffeedb_test

mongo $KAFFEESATZTESTDB --eval "db.dropDatabase()"
git submodule update --init --recursive
server/runtests.sh
admin/runtests.sh
app/runtests.sh

mongo $KAFFEESATZTESTDB --eval "db.dropDatabase()"
