# Flowmeters

Each `flowmeter#.txt` file configures one flowmeter.
`#` is the file number.

Up to 4 flowmeters are supported.
The configuration order is not significant.

> [!IMPORTANT]
> Flowmeters require the **Flow & Go** module.

## Example

```c100
# Auto-detect an SLF3S-1300F flowmeter at boot
name:Purge Flow
type:SLF3S-1300F
serial:autodetect

# Set the fluid base to isopropyl alcohol
base:IPA

# Fine-tune the sampling parameters
offset:10.41
calibration:97.2%
```

## Keys

### `name`

The display name of the flowmeter.

It may contain up to 13 characters.

**Default:** _(empty)_

### `type`

The type of sensor connected via USB.

| Value         | Description                                         |
|---------------|-----------------------------------------------------|
| `SLF3S-0600F` | Sensirion SLF3S-0600F (flow rates up to ±2 ml/min)  |
| `SLF3S-1300F` | Sensirion SLF3S-1300F (flow rates up to ±40 ml/min) |

**Default:** `SLF3S-0600F`

### `serial`

The serial number of the sensor connected via USB.

Since configuration order is not significant, sensors are linked by serial number at boot.

| Value         | Description                                              |
|---------------|----------------------------------------------------------|
| `autodetect`  | The first unassigned sensor of [`type`](#type) is linked |
| 1 – 10 digits | The sensor with the matching serial number is linked     |

**Default:** `autodetect`

> [!INFO]
> Once a sensor is auto-detected, [`serial`](#serial) is replaced with the actual serial number.

### `base`

The fluid base that best describes the measured medium.

| Value | Description                     |
|-------|---------------------------------|
| `H20` | The medium is water-based       |
| `IPA` | The medium is isopropanol-based |

**Default:** `IPA`

> [!TIP]
> Use `IPA` if the medium is not clearly water-based.

### `offset`

The offset subtracted from each sample to correct for sensor drift.

| Value                  | Description                                       |
|------------------------|---------------------------------------------------|
| `-1000.00` – `1000.00` | Each sample is adjusted by the specified constant |

**Default:** `0.00`

> [!INFO]
> Negative offsets increase the resulting sample value.

### `calibration`

The correction factor applied to all measurements.

| Value                 | Description                                                      |
|-----------------------|------------------------------------------------------------------|
| `10.00%` – `1000.00%` | Measurements are scaled linearly by the given percentage |

**Default:** `100.00%`
