var data = [
    {
        id: 1,
        name: "Vanquisher",
        image: "https://i.imgur.com/A4GZGWN.png",
        type: "Warship",
        price: 0.1 * 10 ** 18,
        priceSPZ: 100,
    },
    {
        id: 2,
        name: "Alpha Fire",
        image: "https://i.imgur.com/RjR5hji.png",
        type: "Warship",
        price: 0.1 * 10 ** 18,
        priceSPZ: 100,
    },
    {
        id: 3,
        name: "Turbo Fire",
        image: "https://i.imgur.com/F2JqkIb.png",
        type: "Warship",
        price: 0.1 * 10 ** 18,
        priceSPZ: 100,
    },
    {
        id: 4,
        name: "Nimble",
        image: "https://i.imgur.com/aPnP0PV.png",
        type: "Warship",
        price: 0.1 * 10 ** 18,
        priceSPZ: 100,
    },
    {
        id: 5,
        name: "Combat Ninja",
        image: "https://i.imgur.com/rmEL6Pj.png",
        type: "Warship",
        price: 0.2 * 10 ** 18,
        priceSPZ: 200,
    },
    {
        id: 6,
        name: "Sonic Shot",
        image: "https://i.imgur.com/9h9fVRq.png",
        type: "Upgrades",
        price: 0.05 * 10 ** 18,
        priceSPZ: 50,
    },
    {
        id: 7,
        name: "Fireball",
        image: "https://i.imgur.com/aED8EHe.png",
        type: "Upgrades",
        price: 0.05 * 10 ** 18,
        priceSPZ: 50,
    },
    {
        id: 8,
        name: "Laser Shot",
        image: "https://i.imgur.com/SMkQOPA.png",
        type: "Upgrades",
        price: 0.05 * 10 ** 18,
        priceSPZ: 50,
    }
]


export default function handler(req, res) {
    var id = parseInt(req.query.id)
    var item = data.find(item => item.id === id)
    return res.status(200).json(item)
}