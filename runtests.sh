#/bin/bash
export KAFFEESATZTESTDB=coffeedb_test

mongo $KAFFEESATZTESTDB --eval "db.dropDatabase()"

server/runtests.sh
admin/runtests.sh
app/runtests.sh

mongo $KAFFEESATZTESTDB --eval "db.dropDatabase()"
