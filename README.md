#### Visualización de Datos | LTD - LED - UTDT

*En un principio, nos gustaría mencionar que nos enfocamos en la base de datos completa SUACI 2021. Por ello en todos los gráficos vamos a tener manejo y modificación de datos, para hacer todas estas transformaciones usamos Python. Vale la pena destacar un canal común en todas nuestras visualizaciones: El color amarillo para los datos. La explicación de esta elección es que tomamos la posición de ser un comunicado de la eficiencia de los sistemas de la ciudad probablemente por el gobierno mismo, por consecuente, consideramos acertado el amarillo.*

## **Gráfico de Área: Evolución por mes de la cantidad de consultas, cerradas y totales**

###Manejo de datos###
En primer lugar, nos interesó mostrar en términos generales que el *SUACI* es eficiente, que cumple su rol. Tenemos un gráfico que muestra en el eje X cada mes y en el eje Y la cantidad de casos. Hay dos líneas (una para los casos cerrados y otra para los casos totales)  que muestran para cada mes la cantidad de casos que hubieron. Para lograr esto en un principio, manejamos los datos, nos interesó agrupar por mes la cantidad de casos totales y la cantidad de casos cerrados.

###Decisiones Visuales###
En cuanto a la visualización como `marca` elegimos un gráfico de área, con la cantidad de consultas en el eje Y y los meses en el eje X, vale la pena recalcar que como tenemos tantas consultas como `canal` deshicimos expresarlo en miles de consultas. En adición, como `marca` implementamos dos curvas, una para la cantidad totales de consultas y otra para la cantidad de consultas cerradas; como `canal` nos interesó que el área de aquella que muestra la cantidad de consultas resueltas esté pintada del color amarillo caracteristico; mientras que la otra (que resalta la diferencia, es decir las consultas no resueltas) este en gris. Creemos que de esta forma se ve una gran área amarilla que representa el dato que nos es beneficioso y relegamos un poco al fondo el dato menos favorable. A su vez, decidimos agregar en el área coloreada la cantidad de consultas resueltas a lo largo del año y bajo el área gris la cantidad de consultas no resueltas. Los `canales` fueron ambas del mismo color blanco, pero mayor tamaño al dato que nos interesó destacar y menor tamaño a las que quedaron sin resolver.


## **Gráfico de Barras: Tiempo promedio de resolución por Canal**

###Manejo de datos###
En segundo lugar, nos interesó entender centrarnos en el funcionamiento de los distintos Canales del `SUACI` y si estos estaban siendo efectivos o no. Tenemos un gráfico que muestra el tiempo promedio por Canal desde que se abre una solicitud hasta que se cierra. Para lograr esto en un principio, manejamos los datos, lógicamente nos centramos en los casos ya cerrados, (los no cerrados no los tomamos). Agrupamos cada Canal con la cantidad de consultas cerradas y con el total de horas desde que los casos se abrían hasta que se cerraban.

###Decisiones Visuales###
En cuanto a la visualización como `marca` elegimos un gráfico de barras, con los canales en el eje Y y las horas promedio en el eje X. Optamos como `canal` ordenar los Canales de forma que aquellos con menor tiempo promedio estén arriba y los de mayor promedio estén abajo. Así, el Canal con el tiempo mínimo se vuelve el más importante. A su vez, para accentuarlo utilizamos el `canal` del color, a la barra más corta la pintamos de amarillo y adjuntamos una `marca` más: el número de horas promedio, del mismo color. De esta forma, creemos que destacamos de forma correcta, lo que como “Empresa” nos interesa destacar


## **Mapa de calor: Proporción de casos cerrados por barrio**

###Manejo de datos###

Por último, tenemos el mapa, nos interesó entender como se comporta la proporción de casos resueltos con respecto al total de casos por barrio, queríamos entender si es más bien heterogéneo u homogéneo. Lo primero, como en los casos previos, fue transformar los datos. Decidimos agrupar cada Barrio con el total de casos y con el total de casos cerrados, así con una división teníamos el promedio.
En cuanto a la visualización, como `marca` insertamos arriba un rectángulo como leyenda de los colores, que va del blanco al amarillo, precisamente a menor porcentaje más blanco el color. En un principio, habíamos elegido como escala de los porcentajes del 0 al 100, sin embargo, como el menor porcentaje de entre los barrios era 60% quedaba todo amarillo y perdía la gracia del grafico. Por esto mismo lo reajustamos y la leyenda va del 60% al 100%, siendo este último el amarillo y el 60% blanco. En adición, decidimos establecer como `marca` que al apoyar el mouse sobre un barrio te brinde las siguientes informaciones: El nombre del barrio y el porcentaje de consultas resueltas; para que el usuario pueda ver con precisión todas las informaciones. Finalmente, nos parecía una `marca` interesante y fundamental destacar con una flecha los Barrios y las proporciones exactas del mínimo y el máximo; el `canal` fue simplemente hacerla a la derecha del mapa, evidentemente para que no estorbe y sea legible. De esta forma, se nota bien que las diferencias son muy leves entre los distintos barrios.

## **Extra**

###BOTI###
Boti, es auxiliar a los gráficos. Ayuda a dar contexto y a contar la historia general de la página web. Dado que podría llegar a ser molesto a la hora de interpretar los gráficos con mayor profundidad, programamos la opción de eliminar a Boti. Solo hace falta hacer click sobre su imagen y confirmar que ya no lo necesitamos y Boti se va de la página web.



