#! /bin/sh
# 发布hexo
# npm i hexo -g
hexo clean
hexo generate

cd slide
git submodule init
git submodule update
cd ..
# 发布nodeppt
echo 'nodeppt generate'
# npm i nodeppt -g
nodeppt generate slide ./public/slide -a

sed -i "" "s/<title>nodePPT List/<title>三水清的分享 - Powered by nodePPT/g" public/slide/index.html


cd public

rm -rf debug.log
rm -rf slide/.git*

git init
git add -A
date_str=`date "+DATE: %m/%d/%Y%nTIME: %H:%M:%S"`
git commit -m "build with nodeppt on $date_str"
echo 'push remote github'
git push -u git@github.com:ksky521/ksky521.github.io.git master:master --force

