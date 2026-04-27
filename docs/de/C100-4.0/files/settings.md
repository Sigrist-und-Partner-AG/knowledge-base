# Einstellungen

Die Datei `settings.txt` enthält systemweite Geräteeinstellungen.

## Beispiel {#example}

```c100
# Beim Start Programm 10 laden
program:10
locked:true
password:correct horse battery staple

# Sprache auf Englisch setzen
language:en
keyboard:us-intl

# Programme komprimiert exportieren
file_compression:delta
```

## Schlüssel {#keys}

### `program`

Programm, das beim Start geladen wird.

Jede Programmnummer ist gültig.
Programm `0` wird bei jedem Start zurückgesetzt.

**Standardwert:** `0`

> [!INFO] HINWEIS
> Diese Einstellung wird nur berücksichtigt, wenn [`locked`](#locked) auf `true` gesetzt ist.

### `locked`

Gibt an, ob das Gerät beim Start gesperrt ist.

| Wert    | Beschreibung |
|---------|--------------|
| `true`  | Gesperrt     |
| `false` | Entsperrt    |

**Standardwert:** `false`

### `password`

Passwort oder Passphrase zum Sperren des Geräts.

- Nur ASCII-Zeichen
- Mindestens ein sichtbares Zeichen
- Maximal 132 Zeichen

**Standardwert:** `1234`

> [!WARNING] WARNUNG
> Dieses Passwort beschränkt nur den Zugriff über das Gerätedisplay.<br>
> Es wird im Klartext gespeichert und bietet keine kryptografische Sicherheit.

### `language`

Sprache der Benutzeroberfläche auf dem Gerätedisplay.

| Wert | Beschreibung |
|------|--------------|
| `en` | Englisch     |
| `de` | Deutsch      |
| `fr` | Französisch  |

**Standardwert:** `de`

> [!INFO] HINWEIS
> Andere zwei- oder dreistellige Sprachcodes werden als `en` behandelt.

### `keyboard`

Tastaturlayout für per USB angeschlossene Tastaturen.

| Wert       | Beschreibung                                         |
|------------|------------------------------------------------------|
| `us-ascii` | Standard US-Layout, nur ASCII                        |
| `us-intl`  | Internationales US-Layout mit lateinischen Zeichen   |
| `de`       | Deutsches Layout mit Eszett (`ß`)                    |
| `ch-de`    | Deutschschweizer Layout mit Umlauten (`ö`, `ä`, `ü`) |
| `ch-fr`    | Westschweizer Layout mit Akzenten (`é`, `à`, `è`)    |

**Standardwert:** `ch-de`

> [!IMPORTANT] WICHTIG
> Diese Einstellung setzt das Modul **Tastaturintegration** voraus.

### `allow_scancodes`

Legt fest, unter welchen Bedingungen Programme per Scancode geladen werden dürfen.

| Wert            | Beschreibung                                                      |
|-----------------|-------------------------------------------------------------------|
| `when_unlocked` | Nur erlaubt, wenn das Gerät entsperrt ist                         |
| `always`        | Immer erlaubt                                                     |
| `incognito`     | Immer erlaubt, doch [`program`](#program) wird nicht aktualisiert |

**Standardwert:** `incognito`

### `file_compression`

Komprimierungsart beim Export von Programmen.

| Wert    | Beschreibung                                             |
|---------|----------------------------------------------------------|
| `none`  | Programmdateien werden unverändert exportiert            |
| `delta` | Es werden nur Abweichungen von Standardwerten exportiert |

**Standardwert:** `none`

### `flowchart_format`

Ausgabeformat für Flussdiagramme.

| Wert  | Beschreibung              |
|-------|---------------------------|
| `pdf` | Portable Document Format  |
| `png` | Portable Network Graphics |
| `svg` | Scalable Vector Graphics  |
| `ps`  | PostScript                |

**Standardwert:** `pdf`

> [!IMPORTANT] WICHTIG
> Diese Einstellung setzt das Modul **Program Link** voraus.

### `flowchart_optimize`

Optimierungsziel für Flussdiagramme.

| Wert     | Beschreibung                                               |
|----------|------------------------------------------------------------|
| `layout` | Optimierte Knotenplatzierung, Kantenführung und Abstände   |
| `speed`  | Möglichst schnelle Erzeugung auf Kosten der Layoutqualität |

**Standardwert:** `layout`

> [!TIP] TIPP
> Bei Flussdiagrammen mit 100 oder mehr Programmen ist `speed` deutlich schneller als `layout`.

> [!IMPORTANT] WICHTIG
> Diese Einstellung setzt das Modul **Program Link** voraus.

### `flowmeter_optimize`

Feinjustierung des thermischen Messverfahrens für Durchflussmessungen.

| Wert            | Beschreibung                                                       |
|-----------------|--------------------------------------------------------------------|
| `reaction_time` | Kontinuierliches Heizen verringert die Reaktionszeit bei Messungen |
| `heat_emission` | Bedarfsgesteuertes Heizen reduziert den Wärmeeintrag ins Medium    |

**Standardwert:** `reaction_time`

> [!TIP] TIPP
> `reaction_time` kann bei stillstehenden Medien zu einem allmählichen Temperaturanstieg führen.
> Bei empfindlichen oder instabilen Medien sollte stattdessen `heat_emission` verwendet werden.

> [!IMPORTANT] WICHTIG
> Diese Einstellung setzt das Modul **Flow & Go** voraus.

### `can_baud_rate`

Baudrate für die Kommunikation mit Motortreibern über den CAN-Bus.

| Wert      | Beschreibung |
|-----------|--------------|
| `125000`  | 125 kbit/s   |
| `250000`  | 250 kbit/s   |
| `500000`  | 500 kbit/s   |
| `1000000` | 1 Mbit/s     |

**Standardwert:** `250000`

> [!TIP] TIPP
> Die Baudrate der Motortreiber liegt standardmässig bei `500000`.
> Bei Verbindungsproblemen kann dieser Wert verwendet werden, um die Initialisierung des CAN-Bus als Ursache auszuschliessen.

> [!IMPORTANT] WICHTIG
> Diese Einstellung setzt das Modul **Open Dynamic Control** voraus.

### `keepalive_timeout`

Zeit, nach der das Gerät bei anhaltender Reaktionslosigkeit automatisch neu gestartet wird.

| Wert             | Beschreibung                                                  |
|------------------|---------------------------------------------------------------|
| `none`           | Automatisches Neustarten ist deaktiviert                      |
| `1s` – `359999s` | Automatisches Neustarten nach der angegebenen Anzahl Sekunden |

**Standardwert:** `none`

> [!INFO] HINWEIS
> Diese Einstellung wird nur berücksichtigt, wenn [`locked`](#locked) auf `true` gesetzt ist.
