import { NextResponse }  from "next/server";

const products = [
    {
        productId : 1,
        name : "Men Printed Round Neck Cotton Blend Green T-Shirt",
        price: 299,
        sizes : ["S", "M", "L", "XL"],
        image : "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/y/n/9/xxl-os-my-life-olive-xxl-tripbroz-original-imaheyfpvcz9wufe.jpeg?q=70"
    },
    {
        productId : 2,
        name : "Men Solid Polo Neck Polycotton Black T-Shirt",
        price : 264,
        sizes : ["S", "M", "L", "XL"],
        image : "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/n/7/u/m-mt416-metronaut-original-imahew48xt4ta6bw.jpeg?q=70"
    },
    {
        productId : 3,
        name : "Men Printed Round Neck Cotton Blend Red T-Shirt",
        price : 243,
        sizes : ["S", "M", "L", "XL"],
        image : "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/r/c/p/l-fs49-red-bang-c25-leotude-original-imahejwhhxpy4gwx.jpeg?q=70"
    },
    {
        productId : 4,
        name : "Men Solid Mandarin Collar Polycotton Yellow T-Shirt",
        price : 250,
        sizes : ["S", "M", "L", "XL"],
        image : "https://rukminim2.flixcart.com/image/612/612/kziqvm80/t-shirt/j/h/l/s-ausk0134-ausk-original-imagbgdaejenny4w.jpeg?q=70"
    },
    {
        productId : 5,
        name : "Men Solid Polo Neck Polyester Navy Blue T-Shirt",
        price : 315,
        sizes : ["S", "M", "L", "XL"],
        image : "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/e/d/h/s-nc-polo101-airforce-insprie-original-imahecychcykbfd8.jpeg?q=70"
    }
]

export async function GET(request) {
    return NextResponse.json(products);
}
