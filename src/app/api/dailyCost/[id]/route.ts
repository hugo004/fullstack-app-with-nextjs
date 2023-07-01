import { NextRequest, NextResponse } from 'next/server'
import { DailyCost } from '../repositories'
import { prisma } from '../../../../../prisma/client'

export async function GET(request: NextRequest) {
  const paths = request.nextUrl.pathname.split('/')
  const id = paths[paths.length - 1]

  const result = await prisma.dailyCost.findUnique({
    where: {
      id,
    },
  })

  if (result) {
    return NextResponse.json(result, { status: 200 })
  } else {
    return NextResponse.json(
      {
        message: `${id} not found`,
      },
      { status: 404 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const result = await GET(request)
  if (result.status != 200) {
    return result
  }

  const payload: DailyCost = await request.json()
  if (!payload.cost || !payload.date) {
    return NextResponse.json({
      message: 'Missing cost and date time',
    })
  }

  const data: DailyCost = await result.json()

  const res = await prisma.dailyCost.update({
    where: { id: data.id },
    data: {
      cost: payload.cost,
      date: payload.date,
      name: payload.name || data.name,
    },
  })

  return NextResponse.json({
    id: res.id,
  })
}

export async function DELETE(request: NextRequest) {
  const result = await GET(request)
  if (result.status != 200) {
    return result
  }

  const data: DailyCost = await result.json()
  const res = await prisma.dailyCost.delete({
    where: { id: data.id },
  })

  return NextResponse.json({
    message: `${res.id} deleted`,
  })
}
