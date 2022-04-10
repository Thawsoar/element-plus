#!/usr/bin/env sh

# abort on errors
# set -e
cd ../
rm -rf docs/.vitepress/dist
# # build
# pnpm run docs:build

# # navigate into the build output directory
cd docs/.vitepress/dist

# if you are deploying to a custom domain
echo 'www.happyfly.top' > CNAME

git init
git add -A
git commit -m 'docs: deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:Thawsoar/element-plus.git master:gh-pages
git push -f git@github.com:wingsheep/wingsheep.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
