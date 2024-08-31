<h1 align="center"> SHOPPER BACKEND </h1>
<p align="center">API de um serviço que gerencia a leitura individualizada de
consumo de água e gás. Para facilitar a coleta da informação, o serviço utiliza IA para
obter a medição através da foto de um medidor.</p>
<h2 align="center">ENDPOINTS</h2>

## UPLOAD
#### POST: http://localhost:/](http://localhost:3000/upload
#### [ 
    {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" ou "GAS"
    }
  ]

## CONFIRM
#### PATCH: http://localhost:3000/confirm
#### [ 
    {
    "measure_uuid": "string",
    "confirmed_value": integer
    }
  ]

## LIST
#### GET: http://localhost:3000/<customer code>/list 
#### GET: http://localhost:3000/<customer code>/list/?measure_type=


  
