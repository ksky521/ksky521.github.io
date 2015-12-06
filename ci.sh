#! /bin/sh
# 发布hexo
hexo clean
hexo generate

# 发布nodeppt
nodeppt generate slide ./public/slide -a

cd public

rm -rf debug.log
rm -rf slide/.git*

git init
git add -A
date_str=`date "+DATE: %m/%d/%Y%nTIME: %H:%M:%S"`
git commit -m "build with nodeppt on $date_str"
echo 'push remote github'
git push -u git@github.com:ksky521/ksky521.github.io.git master:master --force

