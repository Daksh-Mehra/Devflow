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

    Linting is the process of statically analyzing code to detect errors and enforce coding standards.
     The ESLint ignorePatterns rule excludes specified files or directories from the linting process, so ESLint does not analyze or report issues for them.

# tailwind css setup 
     we can extend the tailwind by directly defining the new themes etc in the global.css

     The @custom-variant dark directive defines a custom dark-mode variant that applies styles when elements are inside a .dark parent, enabling class-based dark mode styling.

     In Tailwind CSS v4, the default border color was changed to currentColor, making borders automatically inherit the text color unless explicitly overridden.

# tailwind theming 
     we can extend it more with 
     @layer base(foundational styles)
     @layer components
     @layer utilities

     npm i -D @tailwindcss/typography --legacy-peer-deps

# setup fonts

     to set up fonts 
     1.create fonts folder in the app and install fonts from the google font 
     2.in the layout configure them (wieghts,src,variable)
     3.use them in the layout body 
     4.extend the fonts theme in the global css --font-inter=var(--font-inter)

localFont remove the need of external network request to fetch fonts, improving website performance and ensuring font availability even without internet access.(by getting fonts from the local machine)

${inter.className} make it the default font of the application

# assets and metadata

     place all the assets in the public folder

     metadata is the info about the website which help web crawler to understand the content of the website and help in seo and visibility 

     sync--first pull and then push

     in the vscode settings.json we can exclude some files to make the folder tree for clean 

     files.exclude:{
       "**/.next": true,
       "**/.vscode": true,
       "**/node_modules": true
       "next-env.d.ts": true
     }

#chapter 6
#file based routing
     nextjs comes with file based routing means folder are used to define to route and pages are used to create the ui for that route segment 

     name of the folder should be lowercase as the name of the folder as the route name,then create the special ui file page.tsx in the folder

## nested routes
    to create nested route just nest the folder inside the another folder
## dynamic routes
    same as nested routes but slight change
    instead of knowing the route name before hand ,the route is determined by changing data in the application

    project/[] to create a dynamic route wrap the folder name in the square brackets notifying that content inside is a varaible

    to access the value pass as the dynamic route segment we use params props  and it is pass to the page component
## route groups
    help us in organizing the routes without affecting the url structure

    () to create a route group



# chapter 7
## birth of the server components

react allow us to create interface using components that live on the browser .Basically, every React app lived entirely in the browser. Your whole application is downloaded as a bundle of JavaScript, like getting a complete LEGO set dumped on your desk at once.

problem-- meta team found themselves shipping large amounts of js to the client which was causing performance issues

enter the rsc (react server componenet) -components can now run on the server and send only the necessary HTML to the user.The core concept was that components could now be split into client components and server components, each serving different purposes in a single application.

Server Components would manage data-heavy, non-interactive parts of the app, leaving only interactive elements to be handled by client components. This made React apps feel more like traditional server-rendered websites, with the added benefits of React’s dynamic UI.
The App Router made Server Components the default

## client vs server paradigm


client is the device we are using and it send request to the server and display the response and server is powerfull computer that process the request and return the response.

app directory structure allow us to decide where we want to render the components or sections -->client or server 

hence components are divided into client (run or render on the client)and server components(run or render on the server)

but why we want to render small component on the server? reduce the client side bundle size and improve the performance(initail load time) 

it combine fetching and sending the data to component to fetching data within the components

benefits:
small js bundle
enhance seo
faster inital page load
improve performance

but how to decide which component to render where?-> depends that the components does

if that component required clicking button,entering info in input fields ,trigger event,using react hooks then it should be rendered on the client(as they relie on the browser capabilities)

and if it required fetching data ,display staic content,perform sever side computation --server components

if required user interactivity 
yes --client components
no --server components

default is server components
for client use ""use client""


client side are primarily render on the client but they are prerender on the server to ensure smooth ue and performance.
nextjs perform static rendering (for both components)it render necesssay component on the server without compromising functionality 

we can put server components inside the client components "use client" is a dividing line which make all the module imported becomes client code hence console inside the server component will be shown in the browser(hence do not include server component inside the client component)

questions What are the different types of components in Next.js and explain their difference?

What are the benefits of server-side rendering?

features of the app directory regarding the client server rendering?

## different rndering strategies

rendering is the process of creating ui from the code we written

environment where the code is running there are two main environments
1.client
2.server

how our website is made:
compilation process is completed(high level programming language to machine code).aur application goes through build time and run time

build time-we as developer are compiling the code .(npm run dev)

run time-website is running and user is interacting with it(involves handling user interactions, input teracting with api)

run time environment is the environment where the code is running during its execution.it provides lib,services that support the execution of the code(Nodejs is js rte allow us to run js code outside the browser)

nextjs has two rte (nodejs runtime(has access to all nodejs features ) and edge runtime(lightweight with subset of nodejs features
))

we can change them 

export const runtime = "nodejs" | "edge"
nodejs is default
(put at the top)

Nextjs provide 3 rendering strategies on the server

static stie generation --it happen at build time .during the process the content is genetated into html,css and js files(it does require server at runtime and then can stored on the cdn and served to the client as it is )

(so they are cached and used in subsequent requests hence faster performance and less server load) 

use case documentation where content remain same and if we want to change the data then we can change it at build time(by rebuilding the page)
limitation:cannot handle dynamic content as it is generated at build time

incremental static regeneration--it happen at runtime .it is used when we need to update the content of the page dynamically without rebuilding the page(on demand or user request)
meaning some parts are build at build time and some parts are build at runtime

reduce build time and improve performance
use case :article are ssg and their list is isr

server side rendering- render the page for each request at runtime .it is mainly used when high server side computations are required(this dynamic nature makes cacheing difficult and increases server load) but useful when real time updates are required

default -ssg but we can use different rendering in the same app

how to decide 

is the content remain same?for each request
yes-ssg no-
is the content update frequently?like every seconds yes -ssr no-isr

# chapter 8 light and dark themes

## set up the themes

first intall npm i next-themes

sometime we get error here becoz package does not support the current react version so instead of downgrading the react we tell the package manger to use our current react version .
so in the package.json we add 
 },
  "packageManager": "npm@10.7.0",
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom"
  }}
  to tell the package manager to use our current react version

  next we create context folder in the root and create a file called theme.tsx
   with the code '''"use client"
import { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import React from 'react'

const ThemeProvider = ({children,...props}:ThemeProviderProps) => {
  return (<NextThemesProvider {...props}>{children}</NextThemesProvider>
  )
}

export default ThemeProvider
   '''

   then in the layout we import the theme provider and wrap the app in it so we can access the theme context from anywhere in the app

   """
   export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${space_grotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

   """
   the suppressHydrationWarning is only for the warning due to the next theme change the html on the browser and not for the rest of the app hrdration error

   Wrapping everything in a Client ThemeProvider does not turn all children into Client Components or remove SSR. Only the ThemeProvider runs on the client & your pages and components still render on the server unless they use "use client".
## installing the shadcn
     it is component ui library
     install it using 
     """
     npx shadcn@latest init"""
     """
     npx shadcn@latest add dropdown-menu
     """

     use documentation of shadcn

## creating navbar

     the most important is to architect the code better so that anyone can undertstand the code(use meaningful variable names,files and folder names)

     implement the navbar as we want it in all the pages import it into the layout


## creating theme toggle
     implement theme.tsx and import it into the navbar 

     in short to implement dark and light theme we first install next theme and create themeprovider which wrap the app in it and create navbar and theme toggle (use shadcn dark mode code)

# chapter 9 authentication
  authentication helps us in identifying the user and authorization helps in determining the permission of the user

  types of authentication

  session based 
  token based
  basic auth
  oath providers
  
  ## http state managemenet mechanisms

  ## create auth routes

  create sign-in and sign-out routes and make the navbar disappear in them using route group.each route is allowed to have its own layout 

  so create two route groups auth with layout without navbar and root with layout with navbar

  ## create auth layout and social auth form

  create the auth layout and social auth form compoonent

  ## setup nextauth with github provider
    we are gonna use auth.js 
    run "npm install next-auth@beta"

    set up environment by running "npx auth secret" this will create .env.local file with auth secret

    next create auth.ts and then create api route handlers and last a proxy.ts file

    now register your app with github and get the id and secret and add github to the provider in the auth.ts file

## implement github signin
"npm install sonner"

create constants->routes.ts which contain routes and their correspoding names 
why do this ? this helps in maintaining the code(only one place to change for overall app effect)  and reduce typing errors