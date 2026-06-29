---
order: 3
---

# Motoren

Jede `motor#.txt`-Datei konfiguriert einen Motor.
`#` steht für die Dateinummer.

Es werden bis zu 4 Motoren unterstützt.
Die tatsächliche Anzahl hängt von der Hardwarekonfiguration ab.

> [!IMPORTANT] WICHTIG
> Motoren setzen das Modul **Open Dynamic Control** voraus.

## Beispiel {#example}

```c100
# Motortreiber auf einen eco-PEN450-Dispenser abstimmen
name:Dispenser
type:eco-PEN450

# Volumetrische und rotative Einheiten freischalten
class:volume
class:angle

# Alle Bewegungen um Faktor 2 skalieren
calibration:200%
```

## Schlüssel {#keys}

### `name`

Anzeigename des Motors.

Maximal 13 Zeichen.

**Standardwert:** _(leer)_

### `type`

Motortyp, der an den Treiber angeschlossen wird.

| Wert         | Klassen           | Beschreibung                           |
|--------------|-------------------|----------------------------------------|
| `eco-PEN180` | `angle`, `volume` | preeflow® eco-PEN XS 180               |
| `eco-PEN300` | `angle`, `volume` | preeflow® eco-PEN300                   |
| `eco-PEN330` | `angle`, `volume` | preeflow® eco-PEN330                   |
| `eco-PEN450` | `angle`, `volume` | preeflow® eco-PEN450                   |
| `eco-PEN600` | `angle`, `volume` | preeflow® eco-PEN600                   |
| `eco-PEN700` | `angle`, `volume` | preeflow® eco-PEN700 3D                |
| `eco-MIX330` | `angle`           | preeflow® eco-DUOMIX330                |
| `eco-MIX450` | `angle`           | preeflow® eco-DUOMIX450                |
| `IGUS-17M1`  | `angle`, `length` | Igus-Schrittmotor mit Encoder, NEMA 17 |
| `IGUS-23M1`  | `angle`, `length` | Igus-Schrittmotor mit Encoder, NEMA 23 |

**Standardwert:** `eco-PEN600`

> [!TIP] TIPP
> Alle Motoren unterstützen die Klasse `angle`.
> Sie dient als gemeinsamer Nenner für synchronisierte Bewegungen, auch wenn keine weiteren Klassen übereinstimmen.

### `drive`

Produktnummer der Motortreiber-Hardware.

| Wert            | Beschreibung                                       |
|-----------------|----------------------------------------------------|
| `P028.001.E001` | Technosoft iPOS3602 VX-CAN (36V, 2A, Encoder, CAN) |

**Standardwert:** `P028.001.E001`

### `class`

Für den Motor freigeschaltete Einheitenklassen.

Jede Klasse entspricht einer physikalischen Dimension der Bewegungsparametrierung.

| Wert     | Beschreibung            |
|----------|-------------------------|
| `volume` | Volumetrische Einheiten |
| `length` | Lineare Einheiten       |
| `angle`  | Rotative Einheiten      |

**Standardwert:** _(keiner)_

> [!NOTE] HINWEIS
> Diese Einstellung kann mehrfach angegeben werden, um mehrere Einheitenklassen zu nutzen.
> Freizuschaltende Klassen müssen zwingend vom ausgewählten [`type`](#type) unterstützt werden.

### `calibration`

Korrekturfaktor für alle Motorbewegungen.

| Wert                  | Beschreibung                                                     |
|-----------------------|------------------------------------------------------------------|
| `1.00%` – `10000.00%` | Bewegungen werden gemäss angegebenem Prozentsatz linear skaliert |

**Standardwert:** `100.00%`
