## Consideraciones
face-recognition es una librería que ya no se le generan actualizaciones por ende:
### En Windows
Se usara la librería dlib, para instalar dlib puede seguir la siguiente guía:
https://medium.com/analytics-vidhya/how-to-install-dlib-library-for-python-in-windows-10-57348ba1117f
Es necesario utilizar Python en su vieron: 3.10.x o menor (es posible que Python muy antiguos tampoco se pueda utilizar, revisar la documentación en caso de ser necesario: https://pypi.org/project/face-recognition/)
### Linux
No existen inconveniente con las versiones de Python actuales, pero es necesario instalar :
`apt-get update && apt-get install -y build-essential cmake`
