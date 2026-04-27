# Analogeingänge

Jede `input#.txt`-Datei konfiguriert einen Analogeingang.
`#` steht für die Dateinummer.

Es werden bis zu 6 Analogeingänge unterstützt:

| Datei        | Name              | Beschreibung                            |
|--------------|-------------------|-----------------------------------------|
| `input1.txt` | A1 (AIR OUT)      | Interner Drucksensor für "AIR OUT"      |
| `input2.txt` | A2 (AIR PRESSURE) | Interner Drucksensor für "AIR PRESSURE" |
| `input3.txt` | A3                | Externer Analogeingang (optional)       |
| `input4.txt` | A4                | Externer Analogeingang (optional)       |
| `input5.txt` | A5                | Externer Analogeingang (optional)       |
| `input6.txt` | A6                | Externer Analogeingang (optional)       |

Für interne Analogeingänge werden fehlende Dateien beim Start automatisch erstellt.
Für externe Analogeingänge ist dies nur der Fall, wenn die Eingangsspannung über `0V` liegt (Sensor angeschlossen).

> [!IMPORTANT] WICHTIG
> Externe Analogeingänge setzen die Beschaltungsvariante **Analog** voraus.

## Beispiel {#example}

```c100
# Analogsignal in Prozent umrechnen
name:Füllstand
unit:%

# Zulässigen Wertebereich festlegen
min:0%
max:100%

# Spannungen auf den Wertebereich abbilden
# 0V --> 0%
# 5V --> 100%
signal_min:0V
signal_max:5V
```

## Schlüssel {#keys}

### `name`

Anzeigename des Analogeingangs.

Maximal 13 Zeichen.

**Standardwert:** _(leer)_

### `unit`

Zieleinheit, in welche die Eingangsspannung umgerechnet wird.

Maximal 4 Zeichen.

**Standardwert:** _(leer)_

### `min`

Zulässiger Minimalwert in der Zieleinheit.
Kleinere Werte werden auf diesen begrenzt.

| Wert                        | Beschreibung                                                       |
|-----------------------------|--------------------------------------------------------------------|
| `-10000.000` – `+10000.000` | Der Wert in der Zieleinheit [`unit`](#unit) (optional mit Einheit) |

**Standardwert:** `-10000.000`

> [!INFO] HINWEIS
> Es gilt [`max`](#max) > [`min`](#min).

### `max`

Zulässiger Maximalwert in der Zieleinheit.
Grössere Werte werden auf diesen begrenzt.

| Wert                        | Beschreibung                                                       |
|-----------------------------|--------------------------------------------------------------------|
| `-10000.000` – `+10000.000` | Der Wert in der Zieleinheit [`unit`](#unit) (optional mit Einheit) |

**Standardwert:** `+10000.000`

> [!INFO] HINWEIS
> Es gilt [`max`](#max) > [`min`](#min).

### `signal_min`

Eingangsspannung, die dem [`min`](#min)-Wert entspricht.

| Wert                 | Beschreibung                                                |
|----------------------|-------------------------------------------------------------|
| `0.000V` – `10.000V` | Die angegebene Spannung wird auf den Minimalwert abgebildet |

**Standardwert:** `0.000V`

> [!INFO] HINWEIS
> Es gilt [`signal_min`](#signal_min) ≠ [`signal_max`](#signal_max).

### `signal_max`

Eingangsspannung, die dem [`max`](#max)-Wert entspricht.

| Wert                 | Beschreibung                                                |
|----------------------|-------------------------------------------------------------|
| `0.000V` – `10.000V` | Die angegebene Spannung wird auf den Maximalwert abgebildet |

**Standardwert:** `10.000V`

> [!INFO] HINWEIS
> Es gilt [`signal_min`](#signal_min) ≠ [`signal_max`](#signal_max).
