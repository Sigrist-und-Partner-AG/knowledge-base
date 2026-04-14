# Analog Inputs

Each `input#.txt` file configures a single analog input.
`#` is the file number.

Up to 6 analog inputs are supported:

| File         | Name              | Description                                        |
|--------------|-------------------|----------------------------------------------------|
| `input1.txt` | A1 (AIR OUT)      | Internal pressure sensor monitoring "AIR OUT"      |
| `input2.txt` | A2 (AIR PRESSURE) | Internal pressure sensor monitoring "AIR PRESSURE" |
| `input3.txt` | A3                | External analog input (optional)                   |
| `input4.txt` | A4                | External analog input (optional)                   |
| `input5.txt` | A5                | External analog input (optional)                   |
| `input6.txt` | A6                | External analog input (optional)                   |

Internal analog input files are recreated automatically at boot if missing.

> [!IMPORTANT]
> External analog inputs require the **Analog Input** hardware extension.

## Example

```ini
# Treat analog input as a percentage
name:Fill level
unit:%

# Define operating range
min:0%
max:100%

# Map input signals to operating range
# 0V --> 0%
# 5V --> 100%
signal_min:0V
signal_max:5V
```

## Keys

### `name`

The display name of the analog input.

It may contain up to 13 characters.

**Default:** _(empty)_

### `unit`

The unit to which input voltages are converted.

It may contain up to 4 characters.

**Default:** _(empty)_

### `min`

The minimum value supported by the analog input.
Values below this are clamped.

| Value                       | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `-10000.000` – `+10000.000` | The value in the configured [`unit`](#unit) (with optional unit suffix) |

**Default:** `-10000.000`

::: info
[`max`](#max) > [`min`](#min) must hold.
:::

### `max`

The maximum value supported by the analog input.
Values above this are clamped.

| Value                       | Description                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `-10000.000` – `+10000.000` | The value in the configured [`unit`](#unit) (with optional unit suffix) |

**Default:** `+10000.000`

::: info
[`max`](#max) > [`min`](#min) must hold.
:::

### `signal_min`

The input signal voltage corresponding to [`min`](#min).

| Value                | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `0.000V` – `10.000V` | The specified number of volts is mapped to the minimum value |

**Default:** `0.000V`

::: info
[`signal_min`](#signal_min) ≠ [`signal_max`](#signal_max) must hold.
:::

### `signal_max`

The input signal voltage corresponding to [`max`](#max).

| Value                | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `0.000V` – `10.000V` | The specified number of volts is mapped to the maximum value |

**Default:** `10.000V`

::: info
[`signal_min`](#signal_min) ≠ [`signal_max`](#signal_max) must hold.
:::
