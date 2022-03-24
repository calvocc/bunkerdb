# BunkerDB - Evaluación para frontend dev

## Requerimientos

- node >= 12.8.1
- npm >= 6.15.5

## Setup (tanto frontend como backend)

1. Instalar dependencias con `npm install`
2. Levantar servidor de desarrollo con `npm start`

## Definición funcional

Se deberá implementar una pequeña aplicación que mostrará un gráfico de barras, una tabla y permitirá crear, editar o eliminar nuevas entradas en la tabla.

### Dominio de la aplicación

Se cuenta con un conjunto de redes (por ejemplo: Facebook, Instagram, Twitter, etc.), donde cada red tiene un conjunto de cuentas asociado. A su vez, cada cuenta tendrá un conjunto de métricas asociado.

### Gráfico de barras

Cada barra del gráfico representa el valor de una métrica determinada. El usuario podrá seleccionar, mediante un select, qué métrica quiere representar en la gráfica.

El usuario podrá también seleccionar si agrupar el gráfico por redes o no.

- En caso de que elija agrupar por redes, se mostrará una barra por cada una de las redes, y el alto de la barra representará la suma de los valores que tiene cada cuenta de la red en la métrica seleccionada.
- En caso de que no se agrupe por redes, deberá mostrarse una barra por cada cuenta.

### Tabla

- Cada fila de la tabla muestra el nombre de la red, la cuenta y los valores de las métricas.
- La fila final muestra los totales de cada métrica.
- Al hacer click en el botón "Crear nueva cuenta" se mostrará un modal con un formulario en donde el usuario ingrese los siguientes datos:

  - Red a la que pertenece la cuenta
  - Nombre de la cuenta
  - Valores de las métricas

- Al hacer click en el botón de edición de alguna de las filas de la tabla, se deberá mostrar el mismo formulario con los datos precargados. Una vez que el usuario confirma, se cierra el modal y se impactan los cambios en el sistema.
- Al hacer click en el botón de eliminar en alguna de las filas de la tabla, se deberá mostrar un diálogo pidiendo confirmación de eliminación; en caso de que el usuario confirme, se debe eliminar la cuenta correspondiente del sistema.

## Consideraciones técnicas

### Frontend

- Se cuenta aplicación base generada por `create-react-app` en la carpeta `frontend`, la cual debe ser utilizada como punto de inicio.
- El gráfico de barras **debe** ser implementado desde cero, sin utilizar ninguna biblioteca.
- No existen restricciones en cuanto al state management de la aplicación. Se pueden utilizar las técnicas y/o bibliotecas que el implementador considere adecuadas.
- En cuanto al manejo de estilos y componentes de UI no existen restricciones, puede implementarse con o sin bibliotecas de terceros.

### Backend

Se cuenta con una API REST en la carpeta `backend` (cuyo código no podrá ser modificado), la cual debe ser consumida desde la aplicación de frontend. Los endpoints implementados son los siguientes:

- `GET /metrics`
  - **Descripción:** devuelve las métricas disponibles
  - **Ejemplo de response:**
    ```
    [
      { id: "reach", label: "Reach" },
      { id: "impressions", label: "Impressions" },
      { id: "views", label: "Views" },
      { id: "publications", label: "Publications" },
    ]
    ```
- `GET /networks`
  - **Descripción:** Retorna las redes existentes en el sistema.
  - **Ejemplo de response:**
    ```
    [
      { id: "facebook", label: "Facebook", color:'#3b5998' },
      { id: "instagram", label: "Instagram", color:'#d83787'  },
      { id: "twitter", label: "Twitter" , color:'#598dca' },
      { id: "youtube", label: "Youtube" , color:'#ff0102' },
    ]
    ```
- `GET /accounts`

  - **Descripción:** Retorna todas las cuentas existentes en el sistema, incluyendo para cada cuenta los valores de las métricas y la red que tiene asociados.
  - **Ejemplo de response:**
    ```
    [
      {
        "id": "f3b3b731-4051-44f9-95de-48ea3e1b61bf",
        "name": "Upton - Price",
        "metrics": [
            {
                "id": "reach",
                "value": 293
            },
            {
                "id": "impressions",
                "value": 356
            },
            {
                "id": "views",
                "value": 333
            },
            {
                "id": "publications",
                "value": 75
            }
        ],
        "networkId": "twitter"
      },
      { ... },
      ...
    ]
    ```

- `POST /account`

  - **Descripción:** Crea una nueva cuenta en el sistema. En el body del request se deberá incluir: el nombre de la cuenta, los valores de sus métricas y el identificador de la red a la que está asociada.
  - **Ejemplo de request:**
    ```
    {
      "name": "BunkerDB",
      "metrics": [
            {
                "id": "reach",
                "value": 293
            },
            {
                "id": "impressions",
                "value": 356
            },
            {
                "id": "views",
                "value": 333
            },
            {
                "id": "publications",
                "value": 75
            }
        ],
      "networkId": "facebook"
    }
    ```

- `PUT /account/{id}`

  - **Descripción:** Actualiza la cuenta con el id especificado por parámetro. Se deberán incluir todos los atributos de la cuenta (incluso los que no se modifiquen).
  - **Ejemplo de request:**
    ```
    PUT /account/4591e27a-40da-4acb-8e9a-10cb49cc5333
    {
      "name": "BunkerDB",
      "metrics": [
            {
                "id": "reach",
                "value": 77
            },
            {
                "id": "impressions",
                "value": 356
            },
            {
                "id": "views",
                "value": 333
            },
            {
                "id": "publications",
                "value": 2
            }
        ],
      "networkId": "facebook"
    }
    ```

- `DELETE /account/{id}`
  - **Descripción:** Elimina del sistema la cuenta con el id pasado por parámetro.
  - **Ejemplo de request:**
    ```
    DELETE /account/4591e27a-40da-4acb-8e9a-10cb49cc5333
    ```

## Ejemplo de aplicación

Se pretendre lograr una aplicación similar a la siguiente: 

![ref-final-app](https://user-images.githubusercontent.com/1123263/123203682-1a339f00-d48d-11eb-85cd-bad79be67f21.gif)
