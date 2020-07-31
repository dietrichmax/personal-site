---
layout: "Artikel"
title: "PostgreSQL mit PostGIS installieren und in QGIS einrichten"
date: "2019-03-12"
description: "Hier findest du eine Anleitung, wie du auf Windows PostgreSQL installieren kannst, die Datenbank mit PostGIS erweiterst und die PostgreSQL Datenbank mit QGIS verbindest."
category: "GIS"
tags: ["PostgreSQL", "PostGIS", "QGIS"]
image: "../../../../../static/assets/img/postImg/postgres-postgis.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
author: "Max Dietrich"
---


## PostgreSQL Datenbank installieren auf Windows

Hier findest du eine Anleitung, wie du auf Windows PostgreSQL installieren kannst, die [Datenbank](/gis/geo-datenbank-optionen/ "GIS- und Geo-Datenbanken") mit PostGIS erweiterst und die PostgreSQL Datenbank mit Q[GIS](/gis/was-ist-gis "Was ist GIS?") verbindest.

Auf [PostgreSQL Database Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads "PostgreSQL Database Download") findest du den passenden Installer für dein Betriebssystem. Der Installer führt dich anschließend bequem durch den Installationsprozess.

### Installation von PostgreSQL

Als Installationsverzeichnis kannst du das Standardverzeichniss lassen, sofern PostgreSQL nicht auf einem anderen bestimmten Verzeichniss installieren willst.

Als nächstes kannst du ein Passwort für deinen Datenbank "superuser" vergeben. Achte darauf, dass du hier ein Passwort vergibst, das du dir merken kannst.

Im folgenden Schritt kannst du einen Port für den Server angeben. Sofern du keinen wichtigen Grund hast dies zu ändern, kannst du auch hier den Standardwert verwenden.

Auch in der nächsten Maske solltest du den Standardwert belassen, außer du weißt was du hier tust.

Anschließend kommt die Meldung, dass das Setup bereit zum Installieren ist. Mit der Bestätigung auf Next wird PostgreSQL auf deinem Rechner installiert.

Unter "P" solltest du nun bei deinen installierten Programmen "pgAdmin 4" und "Application Stack Builder" finden.

Hier brauchen wir nun den pgAdmin 4, welchen wir mit einem Browser deiner Wahl öffnen.

Nun klickst du auf das Server Symbol links oben neben dem Schriftzug "Servers". Anschließend wird dir die erstellte Datenbank mit der installierten Versionsnummer von PostgreSQL angezeigt. Über dem Datenbanksymbol sollte nun ein rotes Kreuz sein. Das bedeutet, dass du momentan nicht mit der Datenbank verbunden bist.

Wenn du nun auf dieses Symbol klickst geht ein neues Fenster auf, bei dem du nach dem Passwort gefragt wirst, das du bei der Installation vergeben hast. Sofern du das richtige Passwort eingegeben hast, wirst du mit der Datenbank verbunden.

Wenn du nun erneut auf das Datenbank Symbol klickst werden weitere Ebenen eingeblendet, wo du die Tabelle der Datenbank sehen kannst. Außerdem erscheinen in dem Hauptfenster Informationen zu der Datenbank. Nun könntest du hier auch neue Tabellen anlegen, alte Löschen usw.

Das wars auch schon. Eine PostgreSQL Datenbank zu installieren ist also gar nicht so schwer.

Da diese Datenbank aber noch nicht mit geografischen Objekten umgehen kann, benötigst du nun die Erweiterung PostGIS für PostgreSQL.

## PostGIS auf Windows installieren

Unter deinen installierten Programmen findest du auch den Application Stack Builder.

Nachdem du diesen startest erscheint eine Willkommensmeldung und du musst die eben installierte PostgreSQL Version in der ausklappbaren Liste auswählen. Nach der Bestätigung auf "weiter" erscheinen Anwendungen die du für PostgreSQL installieren kannst.

Unter "Spatial Extensions" findest du das aktuelle PostGIS Bundle für PostgreSQL.

Dieses einmal anwählen und auf "Weiter" klicken. Nun kannst du noch ein Verzeichnis auswählen, in dem PostGIS installiert werden soll.

Der Stack Builder lädt die erforderlichen Daten nun herunter und nach einer Bestätigung auf "Weiter" kann man die Datenbank auswählen, die mit PostGIS erweitert werden soll oder ggfs. auch eine neue Datenbank erstellen.

Nun wird wiedermal ein Installationsverzeichnis gewählt und endlich PostGIS installiert.

Nachdem die Installation "Completed" anzeigt, kann das Fenster geschlossen und die Installation abgeschlossen werden.

Kommen wir zum Finale.

## PostgreSQL Datenbank in QGIS einrichten

Jetzt wird QGIS geöffnet. In QGIS wählst du nun "Datenquellenverwaltung öffnen".

Wir gehen auf den Reiter PostgreSQL und legen unter "Neu" eine neue Datenbankverbindung für PostgreSQL an.

*   Name: Hier kannst du dir einen Namen für die Verbindung aussuchen
*   Host: localhost
*   Port: 5432
*   Datenbank: postgres (sofern keine andere erstellt wurde)

Nun kann mit mit der Option "Verbindung testen" überprüfen, ob alles richtig eingeben wurde. Falls ja kommt die Meldung "Verbindung zu postgres war erfolgreich."

Nun klicken wir auf "Ok". Es erscheint nun der Verbindungsnamen oben in dem Auswahlmenü.

Wenn wir die Datenquellenverwaltung schließen sehen wir im Browser, dass unter PostGIS die PostgreSQL Datenbank auftaucht.