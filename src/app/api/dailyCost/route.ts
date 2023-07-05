import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma/client'
import { DailyCost } from './repositories'
import moment from 'moment'

export async function GET(request: NextRequest) {
  // queryable params
  const name = request.nextUrl.searchParams.get('name')
  const cost = request.nextUrl.searchParams.get('cost')
  const startDate = request.nextUrl.searchParams.get('startDate')
  const endDate = request.nextUrl.searchParams.get('endDate')

  const result = await prisma.dailyCost.findMany({
    where: {
      name: {
        contains: name || undefined,
      },
      cost: cost ? Number(cost) : undefined,
      date:
        startDate || endDate
          ? {
              gte: startDate
                ? moment(startDate).startOf('day').toISOString()
                : undefined,
              lte: endDate
                ? moment(endDate).endOf('day').toISOString()
                : undefined,
            }
          : undefined,
    },
    orderBy: {
      date: 'desc',
    },
  })
  return NextResponse.json(result, { status: 200 })
}

export async function POST(request: NextRequest) {
  const payload: DailyCost = await request.json()

  if (!payload.cost || !payload.date) {
    return NextResponse.json({
      message: 'Missing cost and date time',
    })
  }
  const res = await prisma.dailyCost.create({
    data: payload,
  })

  return NextResponse.json(
    {
      id: res.id,
    },
    { status: 201 }
  )
}
