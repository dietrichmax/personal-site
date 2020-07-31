---
layout: "Article"
title: "Ultimate guide to Incremental Gatsby Builds on Google Cloud Build with deploying to Firebase"
date: "2020-07-26"
description: "Ultimate guide to automate your Gatsby builds on Google Cloud Build with deploying to Firebase."
category: "Web-Development"
tags: ["GatsbyJS", "Adsense", "React"]
image: "../../../../../static/assets/img/postImg/gatsby-google-cloud-build-firebase-deploy.jpg"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
---

With Google Cloud you can automate your whole workflow from building up to deploying to firebase hosting.

**What will you need?**

+ Firebase Hosting
+ Firebase Storage
+ Cloud Build
+ Cloud Scheduler (optional)

## Firebase Hosting

To set up Firebase you will need an Google Cloud Account which has billing enabled and at least one project.
You can add the Firebase SDK with:

```
npm install --save firebase
```

and configure it with

```
firebase init
```

In the process you can enable **Hosting** and **Storage**, set your upload folder and so on.
You can also have a look at the Offical [Google Firebase Docs](https://firebase.google.com/docs/cli#install-cli-windows "Google Firebase Docs") for setting up Firebase.

In the end it will also create a **firebase.json** where you can copy/paste the following to host your Gatsby site.

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json", 
      "**/.*", 
      "**/node_modules/**"],
    "headers": [
      {
        "source": "**/*",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "static/**",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "page-data/**",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      }
    ],
  }
}
```
When you have build your Gatsy site and **public** folder is present you can upload it to your Firebase Hosting with:

```
firebase deploy
```

If you want to use your custom domain (gis-netzwerk.com) you have to go to Hosting in the Firebase console where you will find DNS-records to point your domain to your FIrebase Hosting.
You can also create a second domain (www.gis-netzwerk.com) which will redirect automatically to your root domain.

In your project settings you can find your Firebase configurations which look like:

```
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "{.firebaseapp.com",
  databaseURL: "https:// projectId.firebaseio.com",
  projectId: " projectId",
  storageBucket: " projectId.appspot.com",
  messagingSenderId: "1",
  appId: "2",
  measurementId: "G-123"
};
```

You probably want to save these as environment variables.
## Firebase Storage

Why Firebase Storage and not 'normal' Cloud Storage?
Because the free plan of Firebase quite generous.
With Firebase Storage you will get for free
+ 5GB Storage
+ 1GB Downloads per day
+ 20K Upload operations per day
+ 50k Download operations per day
in any region while the free plan for Cloud Storage is restricted to the regions **US-WEST1**, **US-CENTRAL1** and **US-EAST1**.

To enable Firebase hosting you just have to go to the Firebase console and set up Cloud Storage there. It will automatically create two buckets in Cloud Storage which will have the free plan of Firebase.

The bucket names are gonna be like
**staging.$PROJECT_ID.appspot.com** and **$PROJECT_ID.appspot.com**

The only downside is you cant set individual names for your buckets but we just want to store some cache folders there so it doesn't really matter.

## Cloud Build

env variables

set timeout

anayltics plugin as dynamic plugin

    "build-incremental": "GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true gatsby build --log-pages",

**Creating Trigger**

![Trigger settings](Trigger_settings.png "Trigger settings]")
### Speeding up your builds

+ **Image optimization**

from ~ 1800 sec  to ~ 620 sec for building time

from 2700 sec to 1200 sec overall

-> Just with image optimization


+ **Incremental builds**

cache redux public

cache builders
save_cache
restore_cache

life cycle delete after x days
+ **parallel image processing**

### Set Cloud Scheduler (optional)

![Cloud Scheduler Settings](cloud_scheduler.png "Cloud Scheduler Settings]")


```yaml
steps: 
# Restore cache
  - name: "gcr.io/$PROJECT_ID/restore_cache"
    id: Restoring cache...
    waitFor: ["-"]
    args:
    - "--bucket=gs://staging.$PROJECT_ID.appspot.com"
    waitFor: ["-"] # Begin immediately
# Install dependencies
  - name: node:10.16.0
    id: Installing dependencies...
    entrypoint: npm
    args: ["install"] 
    waitFor:
      - Restoring cache...
# Create file with env-variables
  - name: node:10.16.0
    id: Creating Envirnonment variables...
    entrypoint: npm
    args: ["run", "create-env"]
    env:
    - "TOKEN=${_TOKEN}"
    - "CLIENT_EMAIL=${_CLIENT_EMAIL}"
    - "PRIVATE_KEY=${_PRIVATE_KEY}"
    - "MAIL_CHIMP=${_MAIL_CHIMP}"
    - "GA_ID=${_GA_ID}"
    - "GA_VIEW_ID=${_GA_VIEW_ID}"
    - "IG_TOKEN=${_IG_TOKEN}"
    - "FIREBASE_API_KEY=${_FIREBASE_API_KEY}"
    - "FIREBASE_APP_ID=${_FIREBASE_APP_ID}"
    - "FIREBASE_AUTH_DOMAIN=${_FIREBASE_AUTH_DOMAIN}"
    - "FIREBASE_DB_URL=${_FIREBASE_DB_URL}"
    - "FIREBASE_MEASUREMENT_ID=${_FIREBASE_MEASUREMENT_ID}"
    - "FIREBASE_MESSAGE_SENDER_ID=${_FIREBASE_MESSAGE_SENDER_ID}"
    - "FIREBASE_PROJECT_ID=${_FIREBASE_PROJECT_ID}"
    - "FIREBASE_STORAGE_BUCKET=${_FIREBASE_STORAGE_BUCKET}"
    - "GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true"
    waitFor: ["-"] # Begin immediately
 # Install Firebase   
  - name: node:10.16.0 
    id: Installing Firebase...
    entrypoint: npm 
    args: ["install", "firebase-tools"]
    waitFor:
      - Installing dependencies...
# Gatsby build
  - name: node:10.16.0
    id: Building Gatsby site...
    entrypoint: npm
    args: ["run", "build"]
    waitFor:
      - Installing dependencies...
      - Creating Envirnonment variables...
# Deploy
  - name: node:10.16.0 
    id: Deploying to Firebase...
    entrypoint: "./node_modules/.bin/firebase" 
    args: ["deploy", "--project", "$PROJECT_ID", "--token", "$_TOKEN"]
    waitFor:
      - Installing Firebase...
      - Building Gatsby site...
# Save cache
  - name: 'gcr.io/$PROJECT_ID/save_cache'
    id: Saving cache...
    args:
    - '--bucket=gs://staging.$PROJECT_ID.appspot.com'
    - '--path=.cache'
    - '--path=public'
    - '--path=node_modules'
    waitFor:
      - Building Gatsby site...
    
timeout: 60m0s
```
see [cloudbuild.yaml](https://github.com/DaTurboD/GIS-Netzwerk/blob/master/cloudbuild.yaml "cloudbuild.yaml")