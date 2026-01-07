# create nextjs application----> npx create-next-app@latest ./
# git and github setup
     git--> track and help in maintaning the version of app
     github--> online platform to store and share the code


     tip: always create repo first and later do the coding 
     1. create a empty repo on the github
     2. on local machine follow the step to create a new repo and push it 

     we can use github to see codebase at any point of develpoment ,can see the diff and replacing github.com with github.dev spin up a online editor for that commit codebase-->hence easy debugging

# eslint and prettier
    it is like js coach which oversee the code and guide to write clean and better code (it itself does not change the code ) .you can customise it (define what better code is and it will enforce it)

    prettier--> code stylist maintain the consistant style across the codebase

    ESLint keeps your code correct.
    Prettier keeps your code pretty. 

    eslint is default present .hence install the prettire 
    '''
    npm install -D prettier prettier-plugin-tailwindcss
    '''  

    add a .prettierrc file in the root of your application. it is config file  

    create.prettierignore in the root of your app.it tell prettier we dont care about if they are pretty or not (not part of source code)