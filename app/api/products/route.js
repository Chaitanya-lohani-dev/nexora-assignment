import { NextResponse }  from "next/server";

const products = [
    {
        productId : 1,
        name : "Men Printed Round Neck Cotton Blend Green T-Shirt",
        price: 299,
        sizes : ["S", "M", "L", "XL"],
        image : "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15337332/2021/11/18/3e2f5f4b-1b1f-4dcb-8f7b-3a8e5f5f2f6e1637267208200-MenPrintedRoundNeckCottonBlendGreenT-Shirt1.jpg"
    },
    {
        productId : 2,
        name : "Men Solid Polo Neck Polycotton Black T-Shirt",
        price : 264,
        sizes : ["S", "M", "L", "XL"],
        image : "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15337330/2021/11/18/1e4f3c5a-1c4e-4f6d-8f7b-2a5e5f5f2f6e1637267208135-MenSolidPoloNeckPolycottonBlackT-Shirt1.jpg"
    },
    {
        productId : 3,
        name : "Men Printed Round Neck Cotton Blend Red T-Shirt",
        price : 243,
        sizes : ["S", "M", "L", "XL"],
        image : "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15337328/2021/11/18/5f6f7e8a-2b3c-4d5e-9f7b-4a5e5f5f2f6e1637267208070-MenPrintedRoundNeckCottonBlendRedT-Shirt1.jpg"
    },
    {
        productId : 4,
        name : "Men Solid Mandarin Collar Polycotton Yellow T-Shirt",
        price : 250,
        sizes : ["S", "M", "L", "XL"],
        image : "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15337328/2021/11/18/5f6f7e8a-2b3c-4d5e-9f7b-4a5e5f5f2f6e1637267208070-MenPrintedRoundNeckCottonBlendRedT-Shirt1.jpg"
    },
    {
        productId : 5,
        name : "Men Solid Polo Neck Polyester Navy Blue T-Shirt",
        price : 315,
        sizes : ["S", "M", "L", "XL"],
        image : "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/15337328/2021/11/18/5f6f7e8a-2b3c-4d5e-9f7b-4a5e5f5f2f6e1637267208070-MenPrintedRoundNeckCottonBlendRedT-Shirt1.jpg"
    }
]

export async function GET(request) {
    return NextResponse.json(products);
}
