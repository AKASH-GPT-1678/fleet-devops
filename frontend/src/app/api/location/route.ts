// // app/api/location/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import redis from '@/app/utils/redis';
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const deliveryId = searchParams.get('deliveryId');

//     if (!deliveryId) {
//       return NextResponse.json(
//         { error: 'Missing deliveryId parameter' },
//         { status: 400 }
//       );
//     }


//     const key = `delivery_location:${deliveryId}`;

//     // Get all hash fields
//     const data = await redis.hgetall(key);

//     // Check if hash exists and has data
//     if (!data || Object.keys(data).length === 0) {
//       return NextResponse.json(
//         { error: 'Delivery location not found' },
//         { status: 404 },
     
//       );
//     }

//     // Return the hash data
//     return NextResponse.json({
//       success: true,
//       deliveryId,
//       location: data,
//       status: 200
//     });

//   } catch (error) {
//     console.error('Redis error:', error);
//     return NextResponse.json(
//       {
//         error: 'Internal server error',
//         message: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }
