# Motors

Each `motor#.txt` file configures the corresponding motor.
`#` is the file number.

Up to 4 motors are supported.
The actual number depends on the hardware configuration.

> [!IMPORTANT]
> Motors require the **Open Dynamic Control** module.

## Example

```c100
# Configure the motor drive for use with an eco-PEN450 dispenser
name:Dispenser
type:eco-PEN450

# Enable parameterization in both volumetric and angular units
class:volume
class:angle

# Scale up all motion by a factor of 2
calibration:200%
```

## Keys

### `name`

The display name of the motor.

It may contain up to 13 characters.

**Default:** _(empty)_

### `type`

The type of motor connected to the drive.

| Value        | Classes           | Description                              |
|--------------|-------------------|------------------------------------------|
| `eco-PEN180` | `angle`, `volume` | preeflow® eco-PEN XS 180                 |
| `eco-PEN300` | `angle`, `volume` | preeflow® eco-PEN300                     |
| `eco-PEN330` | `angle`, `volume` | preeflow® eco-PEN330                     |
| `eco-PEN450` | `angle`, `volume` | preeflow® eco-PEN450                     |
| `eco-PEN600` | `angle`, `volume` | preeflow® eco-PEN600                     |
| `eco-PEN700` | `angle`, `volume` | preeflow® eco-PEN700 3D                  |
| `eco-MIX330` | `angle`           | preeflow® eco-DUOMIX330                  |
| `eco-MIX450` | `angle`           | preeflow® eco-DUOMIX450                  |
| `IGUS-17M1`  | `angle`, `length` | Igus stepper motor with encoder, NEMA 17 |
| `IGUS-23M1`  | `angle`, `length` | Igus stepper motor with encoder, NEMA 23 |

**Default:** `eco-PEN600`

> [!TIP]
> All motors support the `angle` class.
> It serves as a common denominator for synchronized motion, even when no other classes are shared.

### `drive`

The product number of the motor drive hardware.

| Value           | Description                                        |
|-----------------|----------------------------------------------------|
| `P028.001.E001` | Technosoft iPOS3602 VX-CAN (36V, 2A, encoder, CAN) |

**Default:** `P028.001.E001`

### `class`

The unit classes enabled for the motor.

Each class corresponds to a physical dimension for motion parameterization.

| Value    | Description        |
|----------|--------------------|
| `volume` | Volumetric units   |
| `length` | Linear units       |
| `angle`  | Angular units      |

**Default:** _(none)_

> [!NOTE]
> This setting may be specified multiple times to enable more than one unit class.<br>
> Only classes supported by the selected motor [`type`](#type) can be enabled.

### `calibration`

The correction factor applied to all motor motion.

| Value                 | Description                                            |
|-----------------------|--------------------------------------------------------|
| `1.00%` – `10000.00%` | Motion is scaled linearly by the given percentage |

**Default:** `100.00%`
