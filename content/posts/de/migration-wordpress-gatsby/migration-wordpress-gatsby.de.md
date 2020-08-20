---
layout: "Artikel"
title: "Migration von WordPress nach Gatsby"
date: "2019-10-01"
description: "Der Migrationsprozess von Wordpress nach Gatsby mit vielen hilfreichen Tipps und Tricks."
category: "Web-Development"
tags: ["React", "GatsbyJS", "Javascript","Wordpress"]
image: "../../../../static/assets/img/postImg/gatsby-wordpress-migration.jpg"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
lang: "de"
---

Nachdem ich bei Wordpress immer wieder auf technische Schwierigkeiten gestoßen bin, wenn es zum Beispiel um die Umsetzung von individuellen Layouts, Designs oder Ähnlichem ging, habe ich entschieden mich nach einem anderen CMS umzusehen. Zusätzlich wollte ich das Konzept der ehemaligen Seite GIS-Netzwerk ändern bzw. um weitere Themenbereiche erweitern.

Bei meiner Recherche bin ich so auf den statischen Website-Generator [Gatsby](https://www.gatsbyjs.org/) gestoßen und nachdem ich mich mehr in die Materie eingelesen hab, ist mir die Entscheidung umso einfacher gefallen, die zukünftige Website mit Gatsby zu entwickeln.

_Außerdem hab ich mich immer schon für Frontend-Development interessiert, aber ich hatte bis jetzt nie einen Grund oder besser gesagt eine Idee, wie ich mich damit mehr beschäftigen könnte._

Damit kam mir Gatsby ganz gelegen.

Da ich unendlich viel Zeit mit Recherche usw. verbraten habe, möchte ich hier meine Erfahrungen und eventuell auch ein paaar nützliche Tipps teilen.

## Was ist Gatsby?

Gatsby ist statischer Websiten Generator. Außerdem ist Gatsby Open-Source und kostenlos.

Eine statische Website ist eine Website, die aus zuvor erstellten [HTML-Dateien](https://www.a-coding-project.de/ratgeber/html), [Javascript](https://de.wikipedia.org/wiki/JavaScript) und [CSS](https://de.wikipedia.org/wiki/Cascading_Style_Sheets()-Dateien) besteht, die dann auf einen Webserver hochgeladen werden. Man benötigt weder eine Datenbank noch ein Content-Management-System (CMS), wie zum Beispiel Wordpress.

Wenn man sich eine statische Website erstellen möchte braucht man allerdings Grundkenntnisse in HTML, CSS und Javascript. Ansonsten wird man sich etwas schwer tun. Ein weiterer Nachteil statischen Websiten ist, dass man bei Änderungen die betreffenden Dateien auf dem Webserver ersetzen bzw. löschen muss.

Dadurch, dass die einzelnen Seiten aber nicht erst dynamisch erstellt werden, sondern bereits vorhanden sind und nur vom Webserver heruntergeladen werden müssen, sind statische Websiten im Vergleich zu dynamischen viel, viel schneller. Zusätzlich sind statische Seiten sicherer, da sie nicht gehackt werden können. Eine Datenbank gibt es ja nicht.

## Wie funktioniert Gatsby?

![Credit: https://www.gatsbyjs.org/; How Gatsby works](./how-gatsby-works.png "Credit: https://www.gatsbyjs.org/; How Gatsby works")
Mit Gatsby kann man Daten aus verschiedenen Quellen (CMS, Markdown,APis, JSON, CSV, usw.) abrufen und diese über GraphQL in HTML Dateien rendern/darstellen. Diese Dateien müssen dann wie gesagt nurnoch auf einen Webserver (z.B. [Netlify](https://www.netlify.com/) oder [ZEIT](https://zeit.co/), welche übrigens auch kostenlos sind) hochgeladen werden.

### Bestehenden Content in Markdown konvertieren

Als erstes stellt sich die Frage wie man seinen Content organisieren möchte. Ich habe lange überlegt ob ich Wordpress als [Headless CMS](https://www.diemax.de/rss.xml) nutzen soll, habe mich aber der einfachheit halber dazu entschieden, jeglichen Content in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) zu erstellen.

Da Beiträge in Wordpress nicht als Markdown heruntergeladen werden können habe ich zuerst sämtliche Posts aus Wordpress exportiert.

![Wordpress Beiträge exportieren](https://whiteleydesigns.com/wp-content/uploads/2017/01/export-media.png) _Bildquelle: [WHITELEYDESIGNS](https://whiteleydesigns.com/move-wordpress-blog-posts-featured-images/)_

Man erhält dann eine XML-Datei mit allen Beiträgen. Ich habe die Beiträge ohne eingebettete Bilder exportiert, da ich diese nachträglich noch ändern wollte.

Mithilfe des Python-Tools "[wp2md](https://github.com/dreikanter/wp2md)" kann man die XML-Datei in einzelne Markdown-Dateien konvertieren. Dafür benötigt man zuerst natürlich erst einmal Python, welches du dir auf der offiziellen [Python Website](https://www.python.org/downloads/) herunterladen und installieren kannst.

Nachdem Python installiert ist kannst du mit Python

```py
    pip install git+https://github.com/dreikanter/wp2md
```

den Konverter installieren.

Nun legst du einfach die XML-Datei in einen beliebigen Ordner "deinordner" und führst das Tool mit

```shell
    wp2md -d /export/path/ /pfad/zu/deinordner/wordpress-dump.xml
```

aus.

In "/export/path/" findest du nun alle Beiträge als Markdown-Dateien.

## Gatsby installieren

Auf [gatsbyjs.org](https://www.gatsbyjs.org/tutorial/part-zero/) gibt es ein gutes Tuturial, das zeigt, was man benötigt und wie man es installiert. Da aus meiner Sicht aber auch ein paar unnötige Sachen aufgelistet sind möchte ich hier noch einmal kurz zusammenfassen, was du dringend benötigst um mit Gatsby eine Website zu erstellen.

Damit Gatsby bei dir lokal läuft benötigst du im Prinzip drei Sachen.

*   [Node.js](https://nodejs.org/de/) (JavaScript-Laufzeitumgebung)
*   npm (Paketmanager für JavaScript)
*   Gatsby CLI

Außerdem würde ich dir noch dringend [Visual Studio Code](https://code.visualstudio.com/) empfehlen, falls du noch nicht damit arbeitest.

Nachdem du du Node.js und npm installiert hast (wird beides mit dem gleichen Installationspaket installiert) kannst du mit

```shell
    node --version
    npm --version
```

prüfen ob überhaupt und welche Versionen installiert wurden.

```shell
    npm install -g gatsby-cli
```

Gatsby CLI via npm installieren. Für Gatsby gibt es im Prinzip drei wichtige Commands:

```shell
shell gatsby new [Projektname/Ordner] [ggfs. Gatsby-Starter]
``` 
Erstellt ein neues Gatsby Projekt optional mit einem Starter. [Gatsby Starters](https://www.gatsbyjs.org/starters/?v=2) sind im Prinzip Themes mit bereits vorkonfigurierten Funktionen. Kann man sich wie Wordpress Themes vorstellen
```shell 
gatsby develop
``` 
Startet den Development-Server, damit man bestehende Projekt als Website sieht.

```shell 
gatsby build
``` 
"Baut" ein Gatsby Projekt zusammen, welches dann auf einem Webspace hochgeladen werden kann.

## Gatsby Projekt erstellen

Gatsby Starters bieten die Möglichkeit bereits vorkonfigurierte Gatsby Projekte zu verwenden und so sich eine Menge Zeit zu sparen. Es gibt allerdings bereits knapp 250 Starters und die Auswahl fällt dabei nicht ganz einfach. Nach unzähligem hin und her hab ich beschlossen [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter) von [Vagr9K](https://github.com/Vagr9K) zu verwenden, da dieses Starter Theme vorab schon mit ein paar wichtigen Components wie zum Beispiel für SEO kommt.

_Informationen zur Projektstruktur und Gatsby allgemein findest du unter [Gatsby.js Tutorials](https://www.gatsbyjs.org/tutorial/) und ich würde dringend empfehlen dieses Tutorial sich erstmal komplett durchzulesen, sofern man mit Gatsby noch nicht vertraut ist._

Mit 
```shell
gatsby new diemax https://github.com/Vagr9K/gatsby-advanced-starter
``` 
installiert man dieses Starter-Theme mit `cd diemax` kommt man in den Projektordner und mit `gatsby develop` wird der Development Server gestartet. Auf [http://localhost:8000](http://localhost:8000) sollte man nun das aktuelle Starter Theme sehen. Nun kannst du dieses Theme anpassen wie du willst.

Für mich war erstmal das wichtigste, dass die zuvor erstellten Markdown Dateien als Beiträge in diesem Projekt gerendert werden.

## Posts aus Markdown-Dateien generien lassen

Dafür muss man erstmal alle Markdown Dateien in dem Projektordner ablegen. Meine Verzeichnisstruktur für den Content sieht so aus:

```md
    content
        - pages
        - posts
            - geoinformatik
            - webdevelopment
```

Nach "Geoinformatik hab ich nun alle Markdown Dateien verschoben. Nun muss man in der "gatsby-config.js" Gatsby noch "mitteilen", dass die Dateien dort liegen. In der "gatsby-config.js" suchst du nun nach "gatsby-source-filesystem". Das ist ein vorinstalliertes Plugin, mit dem festgelegt wird wo Gatsby nach Dateien suchen soll.

In meinem Fall schaut das nun so aus, damit alle Posts erkannt werden:

```js
    resolve: "gatsby-source-filesystem",
          options: {
            name: "posts",
            path: `${__dirname}/content/posts`
          }
        },
```

In dem Ordner "posts" kann ich nun beliebig viele Kategorien und neue Beiträge erstellen. Damit jeder Beitrag einer Kategorie zugeordnet wird und später auch diese Kategorien als seperate Seiten erstellt werden, muss die Kategorie in jedem Beitrag festgelegt werden. Außerdem muss noch deklariert werden, dass es sich um einen Post handelt. Für diesen Beitrag schaut das so aus:

```md
    ---
    layout: "post"
    title: "Migration von WordPress nach Gatsby"
    date: "2019-10-01"
    category: "Web Development"
    tags: ["Wordpress", "Gatsby", "React","Static Site","Markdown"]
    cover: "gatsby.logo.jpg"
    ---

    Nachdem ich bei Wordpress....
```

Mein Ziel war es nun, dass je nach Kategorie die Posts unterschiedlich generiert werden, damit ich zum Beispiel für jeden Post einer Kategorie ein unterschiedliches Design verwenden kann.

In dem "src/templates" Ordner findest du ein Template, das definiert, wie der Blog Post letztendlich ausschaut. Ich hab diese bestehende "post.jsx" in "post-[category]" umbenannt und für jede Kategorie die ich verwende kopiert. Das einzigste was du in der kopierten Datei machen musst ist, den namen der GraphQL Abfrage zu ändern, da diese eindeutig sein muss. Die GraphQL Query findest du ganz unten in der Datei. Bei mir heißt das nun zum Beispiel "PostGeoinformatikBySlug", "PostWebdevelopmentBySlug" usw.

In "gatsby-node.js" wird definiert wie und welche Daten aus den Markdown-Dateien verwendet werden um die Seiten für Beiträge zu generieren. Das passiert mit "createPage", was bereits in dem Starter vorhanden ist.

```js
    exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators
```
Nun müssen die kopierten Templates in dieser Datei mit

```js
    const postGeoinformatikTemplate = path.resolve('src/templates/post-geoinformatik.js');
    const postGeoinformatikTemplate = path.resolve('src/templates/post-web-development.js');
```

eingefügt werden.

In jeder Markdown-Datei sollte sich nun ein Feld "category" befinden, dass die Kategorie definiert. Mit diesem Feld werden wir die Posts jetzt filtern. Bei mir schaut das nun so aus:

```js
    if (edge.node.frontmatter.layout === 'post' && edge.node.frontmatter.category === 'Geoinformatik' ) { //post gis
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
          } else if (edge.node.frontmatter.layout === 'post' && edge.node.frontmatter.category === 'Web Development' ) { //web development
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

Dieser Code-Block macht nichts anderes als in jeder Markdown Datei die Kategorie und dasLayout zu überprüfen und die Daten an das richtige Template weiterzuleiten. Wenn das Layout "post" und die Kategorie "gis" ist dann wird die Markdown-Datei mit der "post-geoinformatik.js" Template Datei gerendert. Wenn das Layout "post" und die Kategorie "web-development" ist dann wird die Markdown-Datei mit der "post-web-development.js" Template Datei gerendert. Die Idee hierfür kam von [SAMUEL W. Building Gatsby With Multiple Post Type](https://desktopofsamuel.com/building-gatsby-with-multiple-post-type).

Die createPage Funktion für Kategorien und Tags ist bereits vorhanden, das heißt diese Seiten werden automatisch erstellt.

Wenn du nun mit gatsby develop den Development Server startest und auf [http://localhost:8000](http://localhost:8000) gehst solltest du deine Beiträge aus Wordpress nun sehen.

##Design der neuen Website

Nächster Schritt ist nun das Frontend zu erstellen. Falls du noch nicht sehr viel Erfahrung mit ReactJS hast lohnt es sich einen Blick in die Gatsby [https://www.gatsbyjs.org/starters/?v=2](Starter%20Library) zu werfen. Alle dort aufgelisteten Starter sind ebenfalls auf Github zu finden, wo man sich dann den Source Code zu Gemüte führen kann und eventuell ein paar nützliche Ideen entdeckt.

## Seite erstellen und Upload

Mit `gatsby build` wird deine Seite erstellt. Diese findest du nun in dem Unterordner "public". Alles was du nun tun musst, ist den Public Ordner in das Root Verzeichnis deiner Domain zu kopieren. Fertig.

## Weiterleitungen von alten auf neuen Content

Natürlich wollte ich auch dass Google Suchergebnisse usw. auf die neue Seite weiterleiten und nicht auf einer Fehlerseite enden. Dies kann man mit 301 Redirects geschickt machen.

Dafür habe ich in Wordpress einfach das Plugin [Export All URLs](https://de.wordpress.org/plugins/export-all-urls/) installiert und alle veröffentlichten Posts inkl. URLs als CSV-Datei exportiert.

![Export All URLs](https://ps.w.org/export-all-urls/assets/screenshot-1.png?rev=1806526) _Bildquelle: [Atlas_Gondal](https://profiles.wordpress.org/atlas_gondal/)_

In Excel hab ich dann mit einer einfachen "VERKETTEN" Funktion alle Redirects erstellt, z.B.

```html
    Redirect 301 /alter-pfad/ https://wwww.neue-seite/neuer-pfad/
    Redirect 301 /fernerkundung-satellitenbilder-downloaden/ https://www.gis-netzwerk/hochaufloesende-satellitenbilder-downloaden
```

diese Redirects in einer .htaccess Datei gespeichert und diese im Root-Verzeichnis der alten Domain hochgeladen.

Damit werden sämtliche Besucher, die über Google oder andere Links kommen, auf die neue Domain und auf die richtige Seite weitergeleitet.

Der Umzug und Aufbau der neuen Seite hat bei mir etwa eine Woche gedauert, wobei ich schätzungweise 3/4 dieser Zeit erstmal recherchiert hab, wie das Ganze überhaupt funktioniert.