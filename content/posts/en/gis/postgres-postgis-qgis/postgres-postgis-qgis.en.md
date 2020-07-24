---
layout: "post"
title: "Install PostgreSQL with PostGIS and set it up in QGIS"
date: "2019-03-12"
description: "Here you will find instructions on how to install PostgreSQL on Windows, expand the database with PostGIS and connect the PostgreSQL database with Q-GIS."
category: "GIS"
tags: ["PostgreSQL", "PostGIS", "QGIS"]
image: "./postgres-postgis.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---


## Install PostgreSQL database on Windows

Here you will find instructions on how to install PostgreSQL on Windows, expand the database with PostGIS and connect the PostgreSQL database with Q-GIS.

On [PostgreSQL Database Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads "PostgreSQL Database Download") you will find the right installer for your operating system. The installer will then guide you through the installation process.

### Installation of PostgreSQL

You can leave the default directory as the installation directory, unless PostgreSQL does not want to install on another specific directory.

Next you can assign a password for your "superuser" database. Make sure that you enter a password here that you can remember.

In the following step you can specify a port for the server. Unless you have an important reason to change this, you can also use the default value here.

You should also leave the default value in the next mask, unless you know what you are doing here.

Then comes the message that the setup is ready to install. By confirming with Next, PostgreSQL will be installed on your computer.

Under "P" you should now find "pgAdmin 4" and "Application Stack Builder" in your installed programs.

Here we now need pgAdmin 4, which we open with a browser of your choice.

Now click on the server symbol in the top left next to the lettering "Servers". Then you will see the created database with the installed version number of PostgreSQL. There should now be a red cross over the database icon. This means that you are currently not connected to the database.

If you now click on this symbol, a new window opens, in which you will be asked for the password that you assigned during the installation. If you have entered the correct password, you will be connected to the database.

If you now click on the database icon again, further levels will be shown where you can see the table of the database. In addition, information about the database appears in the main window. Now you could also create new tables here, delete old ones etc.

That was it. So installing a PostgreSQL database is not that difficult.

Since this database cannot handle geographic objects, you now need the PostGIS extension for PostgreSQL.

## Install PostGIS on Windows

You will also find the Application Stack Builder among your installed programs.

After you start this, a welcome message appears and you have to select the PostgreSQL version you just installed from the pull-down list. After confirming with "continue", applications appear that you can install for PostgreSQL.

Under "Spatial Extensions" you will find the current PostGIS bundle for PostgreSQL.

Select this once and click on "Next". Now you can select a directory in which PostGIS should be installed.

The Stack Builder now downloads the necessary data and after confirming with "Next" you can select the database to be expanded with PostGIS or, if necessary, create a new database.

Now an installation directory is selected again and PostGIS is finally installed.

After the installation shows "Completed", the window can be closed and the installation can be completed.

Let's get to the final.

## Set up PostgreSQL database in QGIS

Now QGIS will open. In QGIS you now select "Open data source management".

We go to the PostgreSQL tab and create a new database connection for PostgreSQL under "New".

* Name: Here you can choose a name for the connection
* Host: localhost
* Port: 5432
* Database: postgres (unless another one was created)

Now you can use the "Test connection" option to check whether everything has been entered correctly. If so, the message "Connection to postgres was successful."

Now we click on "Ok". The connection name now appears at the top of the selection menu.

When we close the data source management, we see in the browser that the PostgreSQL database appears under PostGIS.