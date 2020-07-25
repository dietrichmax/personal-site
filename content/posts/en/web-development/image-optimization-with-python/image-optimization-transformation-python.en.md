---
layout: "post"
title: "Image optimization and transformation with Python"
date: "2020-07-25"
description: "With proper optimized images you can save ton of bandwidth, hosting storage and build time"
category: "Web-Development"
tags: ["Python", "GatsbyJS", "Javascript"]
image: "../../../../../static/assets/img/postImg/bildbearbeitung-mit-python.jpg"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
---

At the beginning i used super large images from [ESA](https://www.esa.int/ "European Space Agency") which had a file size up to 53mb with 8926x5663 resultion.

Overall the website took about 1 GB of storage in Github and on my hosting which isn't really optimized but i didn't care because of free plans and due to the fact that i hadn't that much posts so the build time for Gatsby was also still fine for me.

From time to time i got more posts and images coming with them and at some point a local build for Gatsby took suddenly about 30 minutes. 😴

So i looked for a way to optimize all my existing images automatically and found Pillow.

## Pillow

[Pillow](https://pillow.readthedocs.io/en/stable/ "Pillow") is a Python Imaging Library to edit all kind of images.
You can install it with

```py
pip install Pillow
```

and import it into your script like

```py
from PIL import Image
```

## Optimize and resize images 

All of my post images are stored in a separate "/images/_in-use" folder because the website is multilingual and i wanted to use the same image for one post in different languages.

So i am opening all images in this folder and store them into an array.

```py 
count = 0
image_list = []
basewidth = 1920

for file in glob.iglob('path/to/images/*.jpg'):
    im=Image.open(file)
    image_list.append(os.path.basename(file))
```
(The variable **count** is needed later to keep the right image name.)

I just wanted to resize all images so that all images have the same width(=**basewidth**). The height should change automatically because i wanted to keep the ratio.
And to keep the ratio you have to know what it actually is and calculate the new height with it.

```py
    width, height = im.size
    wpercent = (basewidth / float(im.size[0]))
    hsize = int((float(im.size[1]) * float(wpercent)))
```

With **basewidth** and the calculated **hsize** you now can actually rescale the image.

```py
    newImage = im.resize((basewidth, hsize), Image.LANCZOS)
```
(Lanczos is optimizing the new image even more. See [Lanczos Release Notes](https://pillow.readthedocs.io/en/3.0.x/releasenotes/2.7.0.html "Lanczos Release Notes")).

Only thing left to do is to save the new image.
```py
    newPath = 'static/assets/img/postImg/{}.jpg'.format(image_list[count].replace(".jpg", ""))
    newImage.save(newPath,optimize=True,quality=90)
```
From the folder 'static/assets/img/postImg/' i am using the images for my posts. With **optimize=True** you can save some more kilobytes.

Overall the Pyton script now optimizes all jpg-images in your specified folder, which means they will be resized to a width of 1920 px while the ratio will be kept and saved to a new destination folder.

With **if width > basewidth:** you can check if the original width of the image is greater than your desired width and only resize it if thats true.

The whole script looks like this:
```py
from PIL import Image
import glob, os

count = 0
image_list = []
basewidth = 1920

types = ('*.jpg', '*.png', '*.web')

for file in glob.iglob('V:/Websites/GIS-Netzwerk/images/_in-use/posts/*.jpg'):
    im=Image.open(file)
    image_list.append(os.path.basename(file))
    width, height = im.size
    wpercent = (basewidth / float(im.size[0]))
    hsize = int((float(im.size[1]) * float(wpercent)))
    newImage = im.resize((basewidth, hsize), Image.LANCZOS)
    newPath = 'static/assets/img/postImg/{}.jpg'.format(image_list[count].replace(".jpg", ""))
    newImage.save(newPath,optimize=True,quality=90)
    print('Optimized "{}"'.format(image_list[count]))
    count +=1 

```

Now you can also add a new script **img-optimize** or put it before your build command in your package json.
```json
    "img-optimize": "py ./src/utils/resize_images.py",
    "build": "py ./src/utils/resize_images.py && gatsby build"
```

