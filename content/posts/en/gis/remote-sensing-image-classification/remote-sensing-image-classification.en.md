---
layout: "Article"
title: "Remote sensing and image classification"
date: "2019-05-19"
description: "Navigation devices, smartphones and weather forecasts are dependent on satellites and without these we have to rely on some services that make our everyday life easier."
category: "GIS"
tags: ["Remote Sensing"]
image: "../../../../../static/assets/img/postImg/fernerkundung-und-bildklassifikation.jpg"
caption: "by USGS on Unsplash"
author: "Max Dietrich"
---


## Remote Sensing

Navigation devices, smartphones and weather forecasts are dependent on satellites and without these we have to rely on some services that make our everyday life easier.

Images of the Earth from satellites or aircraft are constantly being recorded. These remote sensing data often have a resolution of up to 30cm, are recorded in a range from 450nm to 2273nm and are mostly referenced by the operators of the satellites.

These pictures are then sold or even provided by many providers free of charge.

## Copernicus Open Access Hub

On [Sentinel Open Access Hub](https://scihub.copernicus.eu/dhus/#/home) you can find free products from the [Copernicus Program](https://www.d-copernicus.de/), those from the [European Union](https://europa.eu/european-union/index_de) and others operated by the [European Space Agency](https://www.esa.int/ESA) (ESA).

_The Copernicus program basically comprises six satellites ([Sentinel-1](https://de.wikipedia.org/wiki/Sentinel-1), [Sentinel-2](https://de.wikipedia.org/wiki/Sentinel-2), [Sentinel-3](https://de.wikipedia.org/wiki/Sentinel-3), [Sentinel-4](https://de.wikipedia.org/wiki/Sentinel-4 ) (planned start in 2021), [Sentinel-5](https://de.wikipedia.org/wiki/Sentinel-5) and Sentinel-6 (planned start in late 2020) ._

_All of these satellites perform different tasks and help to observe land, sea and the atmosphere._

In the Copernicus Open Access Hub, you can now download all the data provided after registering free of charge. All available data is displayed for download via search criteria and a desired image section, which you can simply draw with a rectangle

**ArcGIS currently supports level 1C products.**

These image files are relatively large and it may take a while (depending on the internet bandwidth) before the ZIP file is downloaded.

## Image classification

These multispectral bands can then be integrated in Arc-GIS or QGIS.

A classification now consists of two main components.

1. Generate [Training Samples](https://pro.arcgis.com/de/pro-app/help/analysis/image-analyst/training-samples-manager.htm) and
2. [Classification](https://data-science-blog.com/blog/2017/12/20/maschine-earning-classification-vs-regression/) based on the training samples and [validation](https: // towardsdatascience.com/supervised-machine-learning-model-validation-a-step-by-step-approach-771109ae0253)

### Generate_Training samples

First, a classification method must be selected (e.g. supervised and pixel-based). This classification method divides individual pixels of the satellite image into thematic classes, e.g.

*	Settlement
*	Forest
*   Water
*	Meadow etc.

Here the system is taught ([Machine Learning](https://de.wikipedia.org/wiki/Maschinelles_Learning)) that, for example, a green pixel stands for the forest class, blue for water, light green for meadow and gray for settlement ,

In order to get the most realistic result possible, one should choose areas / pixels that are as clear as possible for these samples. That For example, there shouldn't be a gray pixel in the class.

When the assignment of samples for each class is done, the actual classification now begins.

### Classification based on training Samples and validation

There are various classification methods that can be used e.g. [Maximum likelihood](https://de.wikipedia.org/wiki/Maximum-Likelihood-Methode). The classification method now only has to be selected and the classification can then be started.

In order to check the quality of the classification, the results are usually validated with e.g. the [_ground truthing._](https://de.wikipedia.org/wiki/Ground_Truth) method.

Then it is checked how many points were classified in the correct class (for example, a settlement was recognized as a settlement). Here one should not be too stingy with the _Validierungssamples_ to achieve a meaningful validation of the image classification.

This can be noted in an Excel list and the overall accuracy of the classification can be easily calculated. Of course you have to write down the wrong and correct classification.

And that's it.

In short, remote sensing is the extraction of geodata or satellite images by satellites and the subsequent methodology (image classification) for evaluating this remote sensing data about the nature of the earth's surface