# Decisiones de diseño

## HTML

    Me basé en el diseño de la cátedra del profesor donde se explicaba la tarea. Un diseño simple, donde en la pagina principal se muestran principalmente botones que te llevan a las distintas instancias que se pide, tales como: 

    - inicio.html: página principal para navegar entre los archivos.
    - registro.html: página donde un usuario puede registrarse para enviar un avistamiento luego.
    - informar.html: página en la cual un usuario puede registrar un avistamiento de un ave.
    - listado.html: en este apartado se espera que se muestren los avistamientos registrados. Por ahora solo presenta unos **placeholder** que puse por mi cuenta con 4 aves distintas   
    - estadisticas.html: aquí, como en listado.html, puse nuevamente otros **placeholder** de imágenes con estadísticas que fui creando en un excel (me las inventé por ahora, por lo que no las hice 100% verídicas). Se espera que en un futuro si muestre estadísticas reales.

## CSS

    Para el apartado visual, me decidí por algo simple por ahora, aunque no descarto que en un futuro lo modifique para que se vea mejor. Pero por ahora no quise complicarme más de la cuenta.  

## JavaScript

    Tanto la parte de 'select.js', 'validation_informar.js' y 'validation_registro.js' seguí la lógica de los auxiliares. Para la parte de validar el **RUT**, busqué en internet la expresión regular para un **RUT** con puntos y guión, es decir: '9.999.999-9', pero esto puede traer vulneraciones, pues puedes inventarte un **RUT** cualquiera.

    Por otro lado, el apartado de 'listado.js', donde se encuentra toda la lógica de filtro y paginación fue donde más se complicó. Preferí usar Date(), para que el trabajo con fechas y horas me sea más simple a la hora de ordenar. Esto implica que el formato que se espera en el archivo html sea de la forma: "AAAA-MM-DDTHH:MM", por lo que dentro de la etiqueta <article>, se incluyó *data-fecha* con dicha información. Cada filtro lleva su información correspondiente, por lo que basta con obtener el atributo correspondiente mediante los atributos e ir comparando con los demás valores. 