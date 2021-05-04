import { getData, writeData, appendToSheet } from './lib/gsheet-interface'
import { GoogleApisParams, GetDataParams, PostDataParams } from './types'

// --- Http Handlers
const headers = {
  /* Required for CORS support to work */
  // Not required for deployment
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handler(event, context) {
  var httpMethod = event.httpMethod
  let res: any = 'Api Call Complete'
  switch (httpMethod) {
    case 'POST':
      const body: GoogleApisParams = JSON.parse(event.body)
      await handlePostRequests(body as PostDataParams)
      break

    case 'GET':
      const params: GoogleApisParams = event.queryStringParameters
      res = JSON.stringify(await handleGetRequests(params as GetDataParams))
      break
    default:
  }

  return {
    statusCode: 200,
    headers,
    body: res,
  }
}

const SHEET_NAME = 'RAW'
async function handlePostRequests(data: PostDataParams) {
  switch (data.function) {
    case 'default':
      return writeData(
        data.range,
        data.data,
        process.env.GSHEET_LOG_ID,
        SHEET_NAME,
      )
    default:
  }
}

async function handleGetRequests(data: GetDataParams) {
  switch (data.function) {
    case 'default':
      return getData(data.range, process.env.GSHEET_LOG_ID, SHEET_NAME)
    default:
  }
}
