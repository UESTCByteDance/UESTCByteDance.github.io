#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
# npm run docs:build

git init
git add -A
git commit -m 'deploy'
# 进入生成的文件夹
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# 修改为你的                github用户名/仓库名
# git push --set-upstream main master
git push -f git@github.com:UESTCByteDance/UESTCByteDance.github.io.git main:page
cd -