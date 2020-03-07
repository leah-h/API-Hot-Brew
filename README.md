# Hot Brew API

#### About this project
This project serves as the back-end server for a REACT e-commerce application which can be found 
[here](http://hot-brew.herokuapp.com/).

A [live demo](https://api-hot-brew.herokuapp.com/) is available for you to check out.

#### Installation
To install in your local computer, enter the following in your terminal: 

```$ git clone https://github.com/leah-h/API-Hot-Brew.git```

then 

```$ npm install``` 

for the required project dependencies.


#### How to use
Start the server by entering the command in terminal:

```$ npm start```
or 
```node index.js```

For local use, either in browser or using Postman, enter the required routes to call the API. 

```http://localhost:3001/api/products```

You should then get the following response from the server:
```
[ {
         "productId": "8rqYuEnD0F9PD8OLz5Z2",
         "flavorProfile": "Cocoa, toasted marshmallow, graham cracker",
         "type": "blend",
         "imageUrl": "https://images.unsplash.com/photo-1550681560-af9bc1cb339e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
         "category": "coffee beans",
         "size ": "12oz.",
         "size": "12oz",
         "price": 17,
         "description": "Named after John Coltrane’s Giant Steps, this dense and substantial coffee is not unlike the jazz visionary's signature \"sheets of sound.” Our darkest blend, comprising organic coffees from Uganda, Papua New Guinea, and Sumatra, is downright viscous in the cup. Just like Coltrane’s ability to cascade into high-pitched octaves with maximum control, this coffee’s inflections of stone fruit lighten without losing focus. Improvisations of milk or cream—in any proportion—shine.",
         "productName": "Giant Steps"
     },
     {
         "productId": "BzalgmlYtUSsRqntdFNl",
         "description": "Tailored for Blue Bottle by the UK company Ecoffee Cup, our new EcoCup is designed to deliver a sleek, reusable takeaway option that is a pleasure to use. Built from bamboo fiber and other plant-based materials, the environmentally friendly cup is dishwasher safe, and looks as good as it feels in the hand.",
         "productName": "Hot Brew x Ecoffee Cup",
         "flavorProfile": "Our stylish reusable EcoCup",
         "type": "cups and mugs",
         "imageUrl": "https://blue-bottle-cms.global.ssl.fastly.net/hbhhv9rz9/image/upload/c_thumb,h_576,w_576/v1559170039/br6j48cwehezs98y8knd.jpg",
         "category": "cups and mugs",
         "size": "12oz.",
         "price": 16
     },
    ...
]
```

See index.js for all other available routes. 

#### Technologies/Frameworks Used
- Firebase (Database)
- Express

#### Contributors
- [Leah Harrichand](https://github.com/leah-h)
- [Christina Jones](https://github.com/cmejones)






