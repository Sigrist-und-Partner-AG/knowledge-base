# Settings

The `settings.txt` file contains system-wide device settings.

## Example

```c100
# Load program 10 at boot
program:10
locked:true
password:correct horse battery staple

# Set locale to English
language:en
keyboard:us-intl

# Compress programs on export
file_compression:delta
```

## Keys

### `program`

The program to be loaded at boot.

Any program number is valid.
Program `0` is non-persistent.

**Default:** `0`

> [!INFO]
This setting only takes effect if [`locked`](#locked) is set to `true`.

### `locked`

Whether the device is locked at boot.

| Value   | Description |
|---------|-------------|
| `true`  | Locked      |
| `false` | Unlocked    |

**Default:** `false`

### `password`

The password the device is locked with.

It must contain:

- Only ASCII characters
- At least one non-whitespace character
- At most 132 characters

**Default:** `1234`

> [!WARNING]
> This password only restricts access via the device display.<br>
> It is stored in plaintext and provides no cryptographic security.

### `language`

The language for the user interface shown on the device display.

| Value | Description |
|-------|-------------|
| `en`  | English     |
| `de`  | German      |
| `fr`  | French      |

**Default:** `de`

> [!INFO]
> Any other two- or three-letter language code is treated as `en`.

### `keyboard`

The keyboard layout for USB-connected physical keyboards.

| Value      | Description                                      |
|------------|--------------------------------------------------|
| `us-ascii` | Standard US layout, restricted to ASCII          |
| `us-intl`  | International US layout with Latin characters    |
| `de`       | German layout with eszett (`ß`)                  |
| `ch-de`    | Swiss-German layout with umlauts (`ö`, `ä`, `ü`) |
| `ch-fr`    | Swiss-French layout with accents (`é`, `à`, `è`) |

**Default:** `ch-de`

> [!IMPORTANT]
> This setting requires the **Keyboard Integration** module.

### `allow_scancodes`

Controls under which conditions program selection via scancodes is permitted.

| Value           | Description                                                                     |
|-----------------|---------------------------------------------------------------------------------|
| `when_unlocked` | Only allowed when the device is unlocked                                        |
| `always`        | Always allowed                                                                  |
| `incognito`     | Always allowed, but program selection is not persisted to [`program`](#program) |

**Default:** `incognito`

### `file_compression`

The compression applied to program files when backed up.

| Value   | Description                                       |
|---------|---------------------------------------------------|
| `none`  | Program files are exported as-is                  |
| `delta` | Only differences from default values are exported |

**Default:** `none`

### `flowchart_format`

The output file format when rendering flowcharts.

| Value | Description               |
|-------|---------------------------|
| `pdf` | Portable Document Format  |
| `png` | Portable Network Graphics |
| `svg` | Scalable Vector Graphics  |
| `ps`  | PostScript                |

**Default:** `pdf`

> [!IMPORTANT]
> This setting requires the **Program Link** module.

### `flowchart_optimize`

The optimization target when rendering flowcharts.

| Value    | Description                                                            |
|----------|------------------------------------------------------------------------|
| `layout` | Optimized spacing, node placement, edge routing, and overlap reduction |
| `speed`  | Rendering speed is prioritized over layout quality                     |

**Default:** `layout`

> [!TIP]
> Prefer `speed` over `layout` for flowcharts with 100 or more programs.

> [!IMPORTANT]
> This setting requires the **Program Link** module.

### `flowmeter_optimize`

The thermal optimization mode affecting flowmeter measurements.

| Value           | Description                                          |
|-----------------|------------------------------------------------------|
| `reaction_time` | Continuous heating enables faster response times     |
| `heat_emission` | On-demand heating reduces heat input into the medium |

**Default:** `reaction_time`

> [!TIP]
> With `reaction_time`, a stagnant medium will gradually increase in temperature.
> Consider switching to `heat_emission` when handling a medium with sensitive or changing properties.

> [!IMPORTANT]
> This setting requires the **Flow & Go** module.

### `can_baud_rate`

The CAN bus baud rate for communication with motor drives.

| Value     | Description |
|-----------|-------------|
| `125000`  | 125 kbit/s  |
| `250000`  | 250 kbit/s  |
| `500000`  | 500 kbit/s  |
| `1000000` | 1 Mbit/s    |

**Default:** `250000`

> [!TIP]
> The default baud rate for motor drives is `500000`.
> Consider switching to this value if you are experiencing motor connection issues and want to rule out bus initialization as the root cause.

> [!IMPORTANT]
> This setting requires the **Open Dynamic Control** module.

### `keepalive_timeout`

The time the device may remain unresponsive before it is restarted automatically.

| Value            | Description                                                     |
|------------------|-----------------------------------------------------------------|
| `none`           | Automatic recovery is disabled                                  |
| `1s` – `359999s` | Automatic recovery occurs after the specified number of seconds |

**Default:** `none`

> [!INFO]
> This setting only takes effect if [`locked`](#locked) is set to `true`.
