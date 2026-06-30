---
order: 4
---

# Flussmeter

Jede `flowmeter#.txt`-Datei konfiguriert einen Flussmeter.
`#` steht für die Dateinummer.

Es werden bis zu 4 Flussmeter unterstützt.
Die Konfigurationsreihenfolge spielt keine Rolle.

> [!IMPORTANT] WICHTIG
> Flussmeter setzen das Modul **Flow & Go** voraus.

## Beispiel {#example}

```c100
# Flussmeter des Typs SLF3S-1300F automatisch erkennen
name:Spülfluss
type:SLF3S-1300F
serial:autodetect

# Mediumsbasis auf Isopropanol setzen
base:IPA

# Abtastparameter feinjustieren
offset:10.41
calibration:97.2%
```

## Schlüssel {#keys}

### `name`

Anzeigename des Flussmeters.

Maximal 13 Zeichen.

**Standardwert:** _(leer)_

### `type`

Typ des per USB angeschlossenen Sensors.

| Wert          | Beschreibung                                      |
|---------------|---------------------------------------------------|
| `SLF3S-0600F` | Sensirion SLF3S-0600F (Flussraten bis ±2 ml/min)  |
| `SLF3S-1300F` | Sensirion SLF3S-1300F (Flussraten bis ±40 ml/min) |

**Standardwert:** `SLF3S-0600F`

### `serial`

Seriennummer des per USB angeschlossenen Sensors.

Da die Konfigurationsreihenfolge keinen Einfluss hat, werden Sensoren beim Start über ihre Seriennummer zugeordnet.

| Wert           | Beschreibung                                                           |
|----------------|------------------------------------------------------------------------|
| `autodetect`   | Der erste freie Sensor mit kompatiblem [`type`](#type) wird zugeordnet |
| 1 – 10 Ziffern | Der Sensor mit der passenden Seriennummer wird zugeordnet              |

**Standardwert:** `autodetect`

> [!NOTE] HINWEIS
> Wird ein Sensor automatisch erkannt, wird [`serial`](#serial) durch die tatsächliche Seriennummer ersetzt.

### `base`

Basisflüssigkeit, welche dem zu messenden Medium am ehesten entspricht.

| Wert  | Beschreibung                       |
|-------|------------------------------------|
| `H2O` | Das Medium basiert auf Wasser      |
| `IPA` | Das Medium basiert auf Isopropanol |

**Standardwert:** `IPA`

> [!TIP] TIPP
> Grundsätzlich sollte `IPA` verwendet werden, wenn das Medium nicht eindeutig wasserbasiert ist.

### `offset`

Offset zur Korrektur des Sensordrifts, der von jeder Messung abgezogen wird.

| Wert                   | Beschreibung                                             |
|------------------------|----------------------------------------------------------|
| `-1000.00` – `1000.00` | Jede Messung wird um die angegebene Konstante korrigiert |

**Standardwert:** `0.00`

> [!NOTE] HINWEIS
> Negative Offsets erhöhen den resultierenden Messwert.

### `calibration`

Korrekturfaktor für alle Messungen.

| Wert                  | Beschreibung                                                    |
|-----------------------|-----------------------------------------------------------------|
| `10.00%` – `1000.00%` | Messungen werden gemäss angegebenem Prozentsatz linear skaliert |

**Standardwert:** `100.00%`
