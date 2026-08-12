# 5. STM32 Example

[TOC]

## 5.1 Program Path

The source code for this section is located in [3. Example Program\04 STM32\rosrobotcontrollerm4\Hiwonder\System\line_follower.c](https://drive.google.com/drive/folders/1JLYz9dkVzSFnhPxKPBtufmKAGgX7gxhH?usp=sharing).

Open the project file with **Keil5**. Installation details for the software can be found in the directory [2. Softwares\05 STM32 Tool\Set Development Environment](https://drive.google.com/drive/folders/1ZTW-E3Hhul1iq4YMXpTD9fDCfKm4EjnA?usp=sharing).

## 5.2 Hardware Connections

**1. STM32 Controller**

<img src="../_static/media/chapter_5/media/image1.png" class="common_img" style="width:400px;"/>

**2. 4-ch Line Follower Sensor**

<img src="../_static/media/chapter_5/media/image2.png" class="common_img" style="width:400px;"/>

<img src="../_static/media/chapter_5/media/image3.png" class="common_img" style="width:400px;"/>

### 5.2 Interface Description

| Pin  | Description  |
| :--: | :----------: |
|  5V  | Power input  |
| GND  | Power ground |
|  S1  |     PC1      |
|  S2  |     PC0      |
|  S3  |     PE3      |
|  S4  |     PE2      |

## 5.3 Program Outcome

Use **J-Link RTT Viewer** to display the output, as shown in the figure below.

<img src="../_static/media/chapter_5/media/image4.png" class="common_img" style="width:700px;"/>

The printed values `0` and `1` indicate whether the four line following channels are detecting the black line or the white surface.

## 5.4 Specifications

|          Item          |                        Specification                         |
| :--------------------: | :----------------------------------------------------------: |
|   Operating voltage    |                            DC 5 V                            |
|   Operating current    |                            140 mA                            |
| Operating temperature  |                         0°C to 50°C                          |
| Sensitivity adjustment |              Miniature potentiometer adjustment              |
|  Communication method  |                          GPIO input                          |
|     PWR indicator      |               Lights up after power is applied               |
|         Probe          | The sensor has four probes. Each probe includes one infrared transmitter and one infrared receiver. |
|    Operating method    |            All four probes operate independently.            |

## 5.5 Source Code Analysis

The program uses the **STM32F4 HAL** library to configure `PC0`, `PC1`, `PE2`, and `PE3` on the `STM32F407VET6` as input pins for detection, as shown in the figure below.

<img src="../_static/media/chapter_5/media/image5.png" class="common_img" style="width:700px;"/>

* **PID Control**

<img src="../_static/media/chapter_5/media/image6.png" class="common_img" style="width:600px;"/>

The program reads the state of each line following channel and stores each result in a Boolean variable named `s1`, `s2`, `s3`, and `s4`.

The `line_follower` function has three parameters, which represent the proportional, integral, and derivative coefficients of the PID controller.

Three static floating-point variables are defined:

`error`, the current error

`last_error`, the previous error

`integral`, the accumulated error

<img src="../_static/media/chapter_5/media/image7.png" class="common_img" style="width:500px;"/>

The `if-else` logic calculates the error value based on the states of the four line following channels.

Each condition corresponds to a specific sensor combination and produces a different error value. A more detailed explanation is provided below.

<img src="../_static/media/chapter_5/media/image8.png" class="common_img" style="width:600px;"/>

The function returns the output of the PID controller. This output is then used to adjust the angular velocity of the chassis so the vehicle can stay on the line.

The program also calculates the accumulated error with `integral += error`, then limits the integral value to the range from `-80` to `80`.

<img src="../_static/media/chapter_5/media/image9.png" class="common_img" style="width:600px;"/>

This limit prevents the integral term from becoming too large, and the value is limited to the range from `-80` to `80`.

<img src="../_static/media/chapter_5/media/image10.png" class="common_img" style="width:600px;"/>

The PID output is calculated with `kp`, `ki`, and `kd`, which are the proportional, integral, and derivative coefficients. The returned output is then used to adjust the driving direction of the chassis.

`kp * error` is the proportional term. It makes the controller output proportional to the current position offset.

`ki * integral` is the integral term. It makes the controller output proportional to the accumulated offset over time.

`kd * error - last_error` is the derivative term. It makes the controller output proportional to the rate of change of the position offset.

<img src="../_static/media/chapter_5/media/image11.png" class="common_img" style="width:500px;"/>

### Detailed Logic Explanation

The following section explains how the code determines the current chassis offset, or error, from the four sensor readings `s1`, `s2`, `s3`, and `s4`.

This error value is then used by the PID controller to adjust the driving direction of the vehicle.

The sensor readings are Boolean values. `true` means the corresponding sensor detects the line, and `false` means no line is detected. In this setup, `s2` and `s3` are positioned at the center of the robot, while `s1` and `s4` are placed on the left and right sides.

<img src="../_static/media/chapter_5/media/image12.png" class="common_img" style="width:500px;"/>

When only `s2` detects the line, the chassis is considered to be offset to the left, so the error is set to `-1`.

<img src="../_static/media/chapter_5/media/image13.png" class="common_img" style="width:500px;"/>

When both `s1` and `s2` detect the line, the chassis is considered to be farther to the left, so the error is set to `-2`.

<img src="../_static/media/chapter_5/media/image14.png" class="common_img" style="width:500px;"/>

When only `s1` detects the line, the chassis is considered to be heavily offset to the left, so the error is set to `-6`.

<img src="../_static/media/chapter_5/media/image15.png" class="common_img" style="width:500px;"/>

When only `s3` detects the line, the chassis is considered to be offset to the right, so the error is set to `+1`.

<img src="../_static/media/chapter_5/media/image16.png" class="common_img" style="width:500px;"/>

When both `s3` and `s4` detect the line, the chassis is considered to be farther to the right, so the error is set to `+2`.

<img src="../_static/media/chapter_5/media/image17.png" class="common_img" style="width:500px;"/>

When only `s4` detects the line, the chassis is considered to be heavily offset to the right, so the error is set to `+6`.

<img src="../_static/media/chapter_5/media/image18.png" class="common_img" style="width:200px;"/>

In all other cases, such as when no sensor detects the line or all sensors detect the line, the program treats the chassis as not being offset and sets the error to `0`.

> [!NOTE]
>
> **Do not reverse the positive and negative terminals.**
