import { getData, writeData, appendToSheet } from './lib/gsheet-interface'
import { GoogleApisParams, GetDataParams, PostDataParams } from './types'
import { BookListing, AboutSection, MemberSection, Faq } from '../src/types'

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

const BOOKS_SHEET_NAME = 'RAW'
const STATICS_SHEET_NAME = 'Statics'
async function handlePostRequests(data: PostDataParams) {
  switch (data.function) {
    case 'default':
      return writeData(
        data.range,
        data.data,
        process.env.GSHEET_LOG_ID,
        BOOKS_SHEET_NAME,
      )
    default:
  }
}

async function handleGetRequests(data: GetDataParams) {
  switch (data.function) {
    case 'books':
      var rows = await getData(
        'A2:N',
        process.env.GSHEET_LOG_ID,
        BOOKS_SHEET_NAME,
      )
      rows = rows.filter((row) => row[0] != null && row[0] != '')
      return rows.map((row: Array<any>) => convertGSheetRowToBookListing(row))
    case 'about':
      // Should probably pull data for each section in separate requests to avoid bloated nulls
      var rows = await getData(
        'B8:I',
        process.env.GSHEET_LOG_ID,
        STATICS_SHEET_NAME,
      )
      return convertToAboutObjects(rows)
    case 'faqs':
      var rows = await getData(
        'J8:K',
        process.env.GSHEET_LOG_ID,
        STATICS_SHEET_NAME,
      )
      rows = rows.filter((row) => row[0] != null && row[0] != '')
      return rows.map((row: Array<any>) => convertGSheetRowToFaq(row))
    case 'links':
      var rows = await getData(
        'M8:M',
        process.env.GSHEET_LOG_ID,
        STATICS_SHEET_NAME,
      )
      rows = rows.filter((row) => row[0] != null && row[0] != '')
      return rows
    default:
  }
}

// -- Helper functions

function convertGSheetRowToBookListing(row: Array<any>) {
  const ID = 0 //"A";
  const TITLE = 1 //"B";
  const AUTHOR = 2 //"C";
  const ISBN = 3 //"D";
  const SYNOPSIS = 4 //"E";
  const IMAGE_FRONT = 5 //"F";
  const IMAGE_BACK = 6 //"G";
  const LENDER_NAME = 7 //"H";
  const LENDER_USERNAME = 8 //"I";
  const LENDER_CHATID = 9 //"J";
  const BORROWER_NAME = 10 //"K";
  const BORROWER_USERNAME = 11 //"L";
  const BORROWER_CHATID = 12 //"M";
  const STATUS = 13 //"N";

  return {
    listingId: row[ID],
    title: row[TITLE],
    author: row[AUTHOR],
    isbn: row[ISBN],
    synopsis: row[SYNOPSIS],
    imgFrontUrl: row[IMAGE_FRONT],
    imgBackUrl: row[IMAGE_BACK],

    lenderName: row[LENDER_NAME],
    lenderTeleUser: row[LENDER_USERNAME],
    lenderTeleId: row[LENDER_CHATID],

    status: row[STATUS],
    borrowerName: row[BORROWER_NAME],
    borrowerTeleUser: row[BORROWER_USERNAME],
    borrowerTeleId: row[BORROWER_CHATID],
  } as BookListing
}

function convertToAboutObjects(rows: Array<Array<any>>) {
  const ABOUT_US_TITLE = 0 //"B";
  const ABOUT_US_TEXT = 1 //"C";
  const ACTIVE_TEAM_NAME = 2 //"D";
  const ACTIVE_TEAM_TITLE = 3 //"E";
  const ACTIVE_TEAM_IMG = 4 //"F";
  const OLD_TEAM_NAME = 5 //"G";
  const OLD_TEAM_TITLE = 6 //"H";
  const OLD_TEAM_IMG = 7 //"I";

  let aboutUsObjects = []
  let activeMemberObjects = []
  let oldMembersObjects = []

  rows.forEach((row) => {
    aboutUsObjects.push({
      title: row[ABOUT_US_TITLE],
      text: row[ABOUT_US_TEXT],
    } as AboutSection)

    activeMemberObjects.push({
      name: row[ACTIVE_TEAM_NAME],
      title: row[ACTIVE_TEAM_TITLE],
      img: row[ACTIVE_TEAM_IMG],
    } as MemberSection)

    oldMembersObjects.push({
      name: row[OLD_TEAM_NAME],
      title: row[OLD_TEAM_TITLE],
      img: row[OLD_TEAM_IMG],
    } as MemberSection)
  })

  aboutUsObjects = aboutUsObjects.filter(
    (obj: AboutSection) => obj != null && obj != undefined && obj.title != null,
  )
  activeMemberObjects = activeMemberObjects.filter(
    (obj: MemberSection) => obj != null && obj != undefined && obj.name != null,
  )
  oldMembersObjects = oldMembersObjects.filter(
    (obj: MemberSection) => obj != null && obj != undefined && obj.name != null,
  )
  return [aboutUsObjects, activeMemberObjects, oldMembersObjects]
}

function convertGSheetRowToFaq(row: Array<any>) {
  const QUESTION = 0 //"J";
  const ANSWER = 1 //"K";

  return {
    qn: row[QUESTION],
    ans: row[ANSWER],
  } as Faq
}
