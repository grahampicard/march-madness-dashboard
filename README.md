Steps for installation:

1. Clone https://github.com/grahampicard/march-madness-dashboard.git
2. Install yarn package manager (https://yarnpkg.com/en/) - pip for JS
3. (locally)> yarn intall package.json

Steps for update:
1. replace JSON files in src/data/
2. (locally)> yarn build
3. replace all build files on linux server
4. (linux)> sudo service apache2 restart
