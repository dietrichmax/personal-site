---
layout: "post"
title: "Migration from WordPress to Gatsby"
date: "2019-10-01"
description: "After I encountered technical difficulties with Wordpress time and again, for example when it came to implementing individual layouts, designs or the like, I decided to look for another CMS"
category: "Web-Development"
tags: ["React", "GatsbyJS", "Javascript","Wordpress"]
image: "../../../../../static/assets/img/postImg/gatsby-wordpress-migration.jpg"
caption: "Gatsby"
author: "Max Dietrich"
---

After I encountered technical difficulties with Wordpress time and again, for example when it came to implementing individual layouts, designs or the like, I decided to look for another CMS. In addition, I wanted to change the concept of the former GIS network site or expand it to include other subject areas.

During my research, I came across the static website generator [Gatsby] (https://www.gatsbyjs.org/) and after reading more about the matter, the decision was even easier for me, the future website to develop with Gatsby.

_Also, I've always been interested in frontend development, but I've never had a reason, or rather an idea, how I could deal with it more._

With that Gatsby came in handy.

Since I have spent an infinite amount of time researching etc., I would like to share my experiences and possibly a few useful tips here.

## What is Gatsby?

Gatsby is a static website generator. Gatsby is also open source and free.

A static website is a website that is created from previously created [HTML files](https://www.a-coding-project.de/ratgeber/html), [Javascript](https://de.wikipedia.org/wiki/JavaScript) and [CSS](https://de.wikipedia.org/wiki/Cascading_Style_Sheets () files), which are then uploaded to a web server. 
You don't need a database or a content management system (CMS) like Wordpress.

If you want to create a static website, you need a basic knowledge of HTML, CSS and Javascript. Otherwise you will have a hard time. 
Another disadvantage of static websites is that you have to replace or delete the relevant files on the web server when making changes.

Because the individual pages are not created dynamically, and already exist and only have to be downloaded from the web server, static websites are much, much faster than dynamic ones. In addition, static pages are more secure because they cannot be hacked. There is no database.

## How does Gatsby work?

![Credit: https://www.gatsbyjs.org/; How Gatsby works](./how-gatsby-works.png "Credit: https://www.gatsbyjs.org/; How Gatsby works")
With Gatsby you can retrieve data from different sources (CMS, Markdown, APis, JSON, CSV, etc.) and render / display them in HTML files using GraphQL. As mentioned, these files then only have to be uploaded to a web server (e.g. [Netlify] (https://www.netlify.com/) or [ZEIT] (https://zeit.co/), which are also free of charge, by the way) ,


### Convert existing content to markdown

The first question is how you want to organize your content. I have long considered whether I should use Wordpress as Headless CMS, but for the sake of simplicity (and i actually don't like the new editor) I decided to put all content in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Since posts in Wordpress cannot be downloaded as a markdown, I first exported all posts from Wordpress.

![Wordpress Export Posts](https://whiteleydesigns.com/wp-content/uploads/2017/01/export-media.png) _Image source: [WHITELEYDESIGNS](https://whiteleydesigns.com/move-wordpress-blog -posts-featured images /) _

You will then receive an XML file with all contributions. I exported the articles without embedded pictures because I wanted to change them later.

Using the Python tool "[wp2md](https://github.com/dreikanter/wp2md)" you can convert the XML file into individual markdown files. Of course, you first need Python, which you can download and install on the official [Python website](https://www.python.org/downloads/).

After Python is installed you can use Python

```py
    pip install git+https://github.com/dreikanter/wp2md
```

to install the converter.

Now you simply put the XML file in any folder "your folder" and run the tool with 

```shell
    wp2md -d /export/path/ /path/to/your/wordpress-dump.xml
```

In "/export/path/" you will now find all posts in markdown files.

## Install GatsbyJS

There is a good tutorial on [gatsbyjs.org](https://www.gatsbyjs.org/tutorial/part-zero/) that shows what you need and how to install it. 
As I think there are also a few unnecessary things listed, I would like to summarize what you urgently need to create a website with Gatsby.

In order for Gatsby to run locally with you, you basically need three things.

* [Node.js](https://nodejs.org/de/)(JavaScript runtime environment)
* npm (package manager for JavaScript)
* Gatsby CLI

I would also strongly recommend [Visual Studio Code](https://code.visualstudio.com/) if you are not yet working with it.

After you have installed Node.js and npm (both are installed with the same installation package) you can use

```shell
    node --version
    npm --version
```

to check whether and which versions have been installed.

![npm/Node Version](https://www.gatsbyjs.org/static/9b2d2f490c2b7a1b7e0d84da65674648/7e8ce/01-node-npm-versions.png) _Image Source: [Gatsby](https://www.gatsbyjs.org/tutorial/part-zero/)_

You should get such a message with your installed version. If so, you can now go on with

```shell
    npm install -g gatsby-cli
```

This will install the GatsbyJS ClI. 
For the Gatsby CLI there are basically three important commands.

* ```shell
shell gatsby new [projectname/folder] [ggfs. Gatsby-Starter]
``` 
Creates a new Gatsby project with a starter. [Gatsby Starters](https://www.gatsbyjs.org/starters/?v=2) are basically themes with pre-configured functions.

*   ```shell 
gatsby develop
``` 
Starts the development server so that you can see the existing project as a website.

*   ```shell 
gatsby build
```Builds a Gatsby project, which can then be uploaded to a web space.

## Create a Gatsby project

Gatsby Starters offer the possibility to use pre-configured Gatsby projects and save a lot of time. However, there are already almost 250 starters and the selection is not easy. After countless back and forth I decided to use [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter) from [Vagr9K] (https://github.com/Vagr9K) because this Starter Theme comes with some important components such as SEO.

< Information on the project structure and Gatsby in general can be found at [Gatsby.js Tutorials](https://www.gatsbyjs.org/tutorial/) and I would strongly recommend reading this tutorial completely, if you are not yet familiar with Gatsby._


```shell
gatsby new gis-netzwerk https://github.com/Vagr9K/gatsby-advanced-starter
``` 
If you install this starter theme with `cd gis-netzwerk` you get into the project folder and with` gatsby develop` the development server is started. On [http://localhost: 8000](http://localhost: 8000) you should now see the current starter theme. Now you can customize this theme as you want.

For me, the most important thing was that the previously created markdown files were rendered as contributions to this project.

## Dynamically generate posts from Markdown files

First you have to put all markdown files in the project folder. My directory structure for the content looks like this:

```md
    content
        - pages
        - posts
            - gis
            - web-development
```

I moved all content to "gis" (i hadnt't any web-development posts yet). 
Now you have to" tell "Gatsby in" gatsby-config.js "that the files are in the folder 'content/posts/gis'. 
In "gatsby-config.js" you are now looking for" gatsby-source-filesystem ". 
This is a pre-installed plugin that defines where Gatsby should look for files.

In my case it looks like this so that all posts are recognized:

```js
    resolve: "gatsby-source-filesystem",
          options: {
            name: "posts",
            path: `${__dirname}/content/posts`
          }
        },
```

In the "posts" folder I can now create as many categories and new posts as I want. 
So that each post is assigned to a category and these categories are later created as separate pages, the category must be specified in each post. 
It must also be declared that it is a post. For this post it looks like this:

```md
    ---
    layout: "post"
    title: "Migration from WordPress to Gatsby"
    date: "2019-10-01"
    category: "Web-Development"
    tags: ["Wordpress", "Gatsby", "React","Static Site","Markdown"]
    cover: "gatsby.logo.jpg"
    ---

    Actual content....
```

My goal was to generate the posts differently depending on the category so that I could use a different design for each post in a category, for example.

In the "src/templates" folder you will find a template that defines what the blog post will look like. I renamed this existing "post.jsx" to "post-[category]" and copied it for every category I use. 
The only thing you have to do in the copied file is to change the name of the GraphQL query, as it has to be unique. 
The GraphQL query can be found at the bottom of the file. 
For me this means now for example "PostGISBySlug", "PostWebdevelopmentBySlug" etc.

"Gatsby-node.js" defines how and which data from the markdown files are used to generate the pages for contributions. This happens with "createPage", which is already available in the starter.
```js
    exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators
```
Now the copied templates must be included in this file with

```js
    const postGIS = path.resolve('src/templates/post-gis.js');
    const postWebDevelopment = path.resolve('src/templates/post-web-development.js');
```

In each markdown file there should now be a "category" field that defines the category. With this field we will now filter the posts. For me it looks like this:

```js
    if (edge.node.frontmatter.layout === 'post' && edge.node.frontmatter.category === 'GIS' ) { //post gis
          createPage({
            path: edge.node.fields.slug,
            component: postGIS,
            context: {
              slug: edge.node.fields.slug,
              category: edge.node.frontmatter.category,
              timetoread: edge.node.frontmatter.timetoread,
              tags: edge.node.frontmatter.tags,
              date: edge.node.frontmatter.date,
            }
          });
          } else if (edge.node.frontmatter.layout === 'post' && edge.node.frontmatter.category === 'Web-Development' ) { //web development
            createPage({
              path: edge.node.fields.slug,
              component: postWebDevelopment,
              context: {
                slug: edge.node.fields.slug,
                category: edge.node.frontmatter.category,
                timetoread: edge.node.frontmatter.timetoread,
                tags: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
              }
            });
          } else if (edge.node.frontmatter.layout === 'page')  { //page
            createPage({
              path: edge.node.fields.slug,
              component: page,
              context: {
                slug: edge.node.fields.slug,
              }
            });
          }

      });
```

This code block does nothing other than check the category and layout in each markdown file and forward the data to the correct template. 
If the layout is "post" and the category is "gis" then the markdown file is rendered with the "post-gis.js" template file. 
If the layout is "post" and the category is "web-development" then the markdown file is rendered with the "post-web-development.js" template file. 

The idea for this came from [SAMUEL W. Building Gatsby With Multiple Post Type](https://desktopofsamuel.com/building-gatsby-with-multiple-post-type).

The createPage function for categories and tags already exists, which means that these pages are created automatically.

If you now start the Development Server with gatsby develop and go to [http://localhost:8000](http://localhost:8000) you should now see your posts from Wordpress.

## Frontend

The next step is to create the front end. 
If you don't have a lot of experience with ReactJS it is worth taking a look at the Gatsby [https://www.gatsbyjs.org/starters/?v=2[(Starter%20Library). 
All the starters listed there can also be found on Github, where you can then get to the source code and possibly discover a few useful ideas.

## Build and Deploy

With `gatsby build` your page/webapp will be build. 
You can now find the result in the subfolder "public". 
Now all you have to do is copy the public folder into the root directory of your domain.

## Redirects from old to new content

Of course, I also wanted Google to redirect search results etc. to the new page and not end up on an error page. 
This can be done with 301 redirects.

For this I simply installed the plugin [Export All URLs](https://de.wordpress.org/plugins/export-all-urls/) in Wordpress and exported all published posts including URLs as a CSV file.

![Export All URLs](https://ps.w.org/export-all-urls/assets/screenshot-1.png?rev=1806526) _Bildquelle: [Atlas_Gondal](https://profiles.wordpress.org/atlas_gondal/)_

In Excel I created all redirects with a simple "CHAIN" function, e.g.

```html
    Redirect 301 /alter-pfad/ https://wwww.neue-seite.de//neuer-pfad/
    Redirect 301 /fernerkundung-satellitenbilder-downloaden/ https://www.diemax.de/hochaufloesende-satellitenbilder-downloaden-fernerkundung
```

These redirects then have to be saved in a .htaccess file and uploaded to the root folder.

This will redirect all visitors who come through Google or other links to the new domain and to the correct page.

It took me about a week to move and set up the new site, although I estimated that 3/4 of the time had been spent researching how the whole thing works.