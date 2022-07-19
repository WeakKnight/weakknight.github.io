## Plotting Color Gamut

### Color Matching Function


```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
import Library as lib

fig, ax = plt.subplots(figsize=(10, 10))

t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

ax.plot(t, x, 'r')
ax.plot(t, y, 'g')
ax.plot(t, z, 'b')

plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_2_0.png" width="60%"/>
    



```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection='3d')
t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

ax.set_xlabel('X')
ax.set_ylabel('Z')
ax.set_zlabel('Y')
ax.set_xlim(0, 2)
ax.set_ylim(0, 2)
ax.set_zlim(0, 2)

ax.invert_yaxis()
ax.view_init(30, 130)
# plt.xlabel("X")
ax.plot(x, z, y, 'r')
# axx.show()
plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_3_0.svg" width="60%"/>
    



```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection='3d')
t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

ax.set_xlabel('X')
ax.set_ylabel('Z')
ax.set_zlabel('Y')
ax.set_xlim(0, 2)
ax.set_ylim(0, 2)
ax.set_zlim(0, 2)

ax.invert_yaxis()
ax.view_init(30, 130)
# plt.xlabel("X")
# ax.plot(surface_x, surface_z, surface_y)
ax.plot(x, z, y, 'r')
ax.plot_trisurf([1.0,0.0,0.0], [0.0,1.0,0.0], [0.0, 0.0, 1.0], color=[0.3,0.5,0.65, 0.25])
# axx.show()
plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_4_0.svg" width="60%"/>
    



```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection='3d')
t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

proj_x_list = []
proj_y_list = []
proj_z_list = []
for index in range(20, len(x) - 37):
    sum_val = x[index] + y[index] + z[index] 
    proj_x_list.append(x[index]/sum_val)
    proj_y_list.append(y[index]/sum_val)
    proj_z_list.append(z[index]/sum_val)
    ax.plot([x[index], 0],[z[index], 0],[y[index], 0],'b--')
    ax.plot([proj_x_list[index - 20], 0],[proj_z_list[index - 20], 0],[proj_y_list[index - 20], 0],'b--')

ax.scatter(x, z, y, color=[1.0, 0.0, 0.0])

ax.set_xlabel('X')
ax.set_ylabel('Z')
ax.set_zlabel('Y')
ax.set_xlim(0, 2)
ax.set_ylim(0, 2)
ax.set_zlim(0, 2)

ax.invert_yaxis()
ax.view_init(30, 130)

ax.plot(x, z, y, 'r')
ax.plot_trisurf([1.0,0.0,0.0], [0.0,1.0,0.0], [0.0, 0.0, 1.0], color=[0.3,0.5,0.65, 0.25])
ax.scatter(proj_x_list, proj_z_list,proj_y_list)
plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_5_0.svg" width="60%"/>
    



```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

fig, ax = plt.subplots(figsize=(10, 10))

t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

proj_x_list = []
proj_y_list = []
proj_z_list = []

for index in range(20, len(x) - 37):
    sum_val = x[index] + y[index] + z[index] 
    proj_x_list.append(x[index]/sum_val)
    proj_y_list.append(y[index]/sum_val)
    proj_z_list.append(z[index]/sum_val)

proj_x_list.append(proj_x_list[0])
proj_y_list.append(proj_y_list[0])
proj_z_list.append(proj_z_list[0])

ax.plot(proj_x_list, proj_y_list, color = [0.0, 0.0, 0.0])
plt.plot([0.0, 1.0], [1.0, 0.0], "b--")

plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_6_0.png" width="60%"/>
    


### Color Conversion Matrix Computation


```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

sRGB = lib.sRGB
Rec2020 = lib.Rec2020

fig, ax = plt.subplots(figsize=(10, 10))

t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

proj_x_list = []
proj_y_list = []
proj_z_list = []

for index in range(20, len(x) - 37):
    sum_val = x[index] + y[index] + z[index] 
    proj_x_list.append(x[index]/sum_val)
    proj_y_list.append(y[index]/sum_val)
    proj_z_list.append(z[index]/sum_val)

proj_x_list.append(proj_x_list[0])
proj_y_list.append(proj_y_list[0])
proj_z_list.append(proj_z_list[0])

plt.plot([0.0, 1.0], [1.0, 0.0], "b--")

ax.plot(proj_x_list, proj_y_list, color = [0.0,0.0, 0.0])

# sRGB
plt.scatter(sRGB.Red[0], sRGB.Red[1], color = [1.0, 0.0, 0.0])
plt.scatter(sRGB.Green[0], sRGB.Green[1], color = [0.0, 1.0, 0.0])
plt.scatter(sRGB.Blue[0], sRGB.Blue[1], color = [0.0, 0.0, 1.0])
plt.scatter(sRGB.White[0], sRGB.White[1], color = [1.0, 1.0, 1.0], edgecolors=[0.0,0.0,0.0])
plt.plot([sRGB.Red[0], sRGB.Blue[0]], [sRGB.Red[1], sRGB.Blue[1]], "b--")
plt.plot([sRGB.Blue[0], sRGB.Green[0]], [sRGB.Blue[1], sRGB.Green[1]], "b--")
plt.plot([sRGB.Red[0], sRGB.Green[0]], [sRGB.Red[1], sRGB.Green[1]], "b--")

# Rec2020
plt.scatter(Rec2020.Red[0], Rec2020.Red[1], color = [1.0, 0.0, 0.0])
plt.scatter(Rec2020.Green[0], Rec2020.Green[1], color = [0.0, 1.0, 0.0])
plt.scatter(Rec2020.Blue[0], Rec2020.Blue[1], color = [0.0, 0.0, 1.0])
plt.plot([Rec2020.Red[0], Rec2020.Blue[0]], [Rec2020.Red[1], Rec2020.Blue[1]], "b--")
plt.plot([Rec2020.Blue[0], Rec2020.Green[0]], [Rec2020.Blue[1], Rec2020.Green[1]], "b--")
plt.plot([Rec2020.Red[0], Rec2020.Green[0]], [Rec2020.Red[1], Rec2020.Green[1]], "b--")

plt.xlim(0, 1)
plt.ylim(0, 1)
plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_8_0.png" width="60%"/>
    



```python
import numpy as np

# sRGB Primary
XYZ_R_709 = np.array([0.64, 0.33, 0.03])
XYZ_G_709 = np.array([0.3, 0.6, 0.1])
XYZ_B_709 = np.array([0.15, 0.06, 0.79])
XYZ_W_709 = np.array([0.3127/ 0.329, 1.0, 0.3583 / 0.329])

# scaler_r * XYZ_R_709 + scaler_g * XYZ_G_709 + scaler_b * XYZ_B_709 = XYZ_W_709 => XYZ_RGB(3x3) * scaler_rgb(3x1) = XYZ_W => scaler_rgb = inverse(XYZ_RGB) * XYZ_W 
XYZ_RGB_709 = np.array([XYZ_R_709, XYZ_G_709, XYZ_B_709])
scaler_rgb = np.dot(XYZ_W_709, np.linalg.inv(XYZ_RGB_709))

sRGB_2_XYZ = np.array([scaler_rgb[0] * XYZ_R_709, scaler_rgb[1] * XYZ_G_709, scaler_rgb[2] * XYZ_B_709])
print("White Scaler:\n", scaler_rgb)
print("sRGB To XYZ:\n", sRGB_2_XYZ)
```

    White Scaler:
     [0.64436062 1.1919478  1.20320526]
    sRGB To XYZ:
     [[0.4123908  0.21263901 0.01933082]
     [0.35758434 0.71516868 0.11919478]
     [0.18048079 0.07219232 0.95053215]]
    


```python
%matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import numpy as np
from matplotlib.text import OffsetFrom
from mpl_toolkits.mplot3d import Axes3D
import Library as lib

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection='3d')
t = lib.spectrum_range(3.0)
x = list(map(lib.color_match_x, t))
y = list(map(lib.color_match_y, t))
z = list(map(lib.color_match_z, t))

proj_x_list = []
proj_y_list = []
proj_z_list = []
for index in range(20, len(x) - 37):
    sum_val = x[index] + y[index] + z[index] 
    proj_x_list.append(x[index]/sum_val)
    proj_y_list.append(y[index]/sum_val)
    proj_z_list.append(z[index]/sum_val)

ax.set_xlabel('X')
ax.set_ylabel('Z')
ax.set_zlabel('Y')
ax.set_xlim(0, 2)
ax.set_ylim(0, 2)
ax.set_zlim(0, 2)

ax.invert_yaxis()
ax.view_init(30, 160)

ax.plot_trisurf([1.0,0.0,0.0], [0.0,1.0,0.0], [0.0, 0.0, 1.0], color=[0.3,0.5,0.65, 0.25])
ax.plot(proj_x_list, proj_z_list,proj_y_list)
ax.plot([0.0, 0.4123908], [0.0, 0.01933082], [0.0, 0.21263901], "r-")
ax.plot([0.4123908, 0.4123908 + 0.35758434], [0.01933082, 0.01933082 + 0.11919478], [0.21263901, 0.21263901 + 0.71516868], "g--")
ax.plot([0.4123908, 0.4123908 + 0.18048079], [0.01933082, 0.01933082 + 0.95053215], [0.21263901, 0.21263901 + 0.07219232], "b--")
ax.plot([0.4123908 + 0.18048079, 0.4123908 + 0.18048079 + 0.35758434], [0.01933082 + 0.95053215, 0.01933082 + 0.95053215 + 0.11919478], [0.21263901 + 0.07219232, 0.21263901 + 0.07219232 + 0.71516868], "g--")

ax.plot([0.0, 0.35758434], [0.0, 0.11919478], [0.0, 0.71516868], "g-")
ax.plot([0.35758434, 0.35758434 + 0.18048079], [0.11919478, 0.11919478 + 0.95053215], [0.71516868, 0.71516868 + 0.07219232], "b--")
ax.plot([0.35758434 + 0.18048079, 0.35758434 + 0.18048079 + 0.4123908], [0.11919478 + 0.95053215, 0.11919478 + 0.95053215 + 0.01933082], [0.71516868 + 0.07219232, 0.71516868 + 0.07219232 + 0.21263901], "r--")

ax.plot([0.35758434, 0.35758434 + 0.4123908], [0.11919478, 0.11919478 + 0.01933082], [0.71516868, 0.71516868 + 0.21263901], "r--")
ax.plot([0.35758434 + 0.4123908, 0.35758434 + 0.4123908 + 0.18048079], [0.11919478 + 0.01933082, 0.11919478 + 0.01933082 + 0.95053215], [0.71516868 + 0.21263901, 0.71516868 + 0.21263901 + 0.07219232], "b--")

ax.plot([0.0, 0.18048079], [0.0, 0.95053215], [0.0, 0.07219232], "b-")
ax.plot([0.18048079, 0.18048079 + 0.35758434], [0.95053215, 0.95053215 + 0.11919478], [0.07219232, 0.07219232 + 0.71516868], "g--")
ax.plot([0.18048079, 0.18048079 + 0.4123908], [0.95053215, 0.95053215 + 0.01933082], [0.07219232, 0.07219232 + 0.21263901], "r--")

ax.plot([0.0, 0.18048079 + 0.35758434 + 0.4123908], [0.0, 0.95053215 + 0.11919478 + 0.01933082], [0.0, 0.07219232 + 0.71516868 + 0.21263901], color=[0.1, 0.1, 0.1])
ax.scatter(0.3127/ 0.329, 0.3583 / 0.329, 1.0, color = [1.0, 1.0, 1.0], edgecolors=[0.0, 0.0, 0.0])
ax.scatter(0.3127, 0.3583, 0.329, color = [1.0, 1.0, 1.0], edgecolors=[0.0, 0.0, 0.0])

# Linear Color Position
lin = np.array([5.0, 0.5, 1.2])
r_axis = np.array([0.4123908,  0.21263901, 0.01933082])
g_axis = np.array([0.35758434, 0.71516868, 0.11919478])
b_axis = np.array([0.18048079, 0.07219232, 0.95053215])

lin_XYZ = lin[0] * r_axis + lin[1] * g_axis + lin[2] * b_axis

ax.plot([0.0, lin_XYZ[0]], [0.0, lin_XYZ[2]], [0.0, lin_XYZ[1]], color = lin/(lin+1))
ax.scatter(lin_XYZ[0], lin_XYZ[2], lin_XYZ[1], color = lin/(lin+1), edgecolors=[0.0, 0.0, 0.0])

plt.show()
```


<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/color_gamut_vis/output_10_0.svg" width="60%"/>
    

