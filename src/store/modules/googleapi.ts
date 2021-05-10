import { ActionType, GetterType, MutationType } from '@/store/types'
import { GetDataParams, PostDataParams } from '../../../functions/types'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex'
import api from '../../api'
import { State as RootState } from '../index'
import { BookListing } from '@/types'

export type State = {
  books: Array<BookListing>
}

const state = {
  books: [] as Array<BookListing>,
} as State

const getters: GetterTree<State, RootState> = {
  [GetterType.GET_BOOKS]: (state: State): Array<BookListing> => {
    return state.books
  },
  [GetterType.GET_BOOK]: (state: State) => (
    listingId: string,
  ): BookListing | undefined => {
    return state.books.find((book) => book.listingId == listingId)
  },
}

const actions: ActionTree<State, RootState> = {
  [ActionType.FETCH_BOOKS]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'default',
      range: 'A2:N',
    }
    const rows = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    const books = rows.map((row: Array<any>) =>
      convertGSheetRowToBookListing(row),
    )
    commit(MutationType.UPDATE_BOOKS, books)
  },

  [ActionType.WRITE_DATA]: async (
    { commit }: ActionContext<State, RootState>,
    { cell, data }: { cell: string; data: string },
  ) => {
    const params: PostDataParams = {
      function: 'default',
      range: cell,
      data: data,
    }
    await api.post(`/.netlify/functions/googleapi`, params)
  },
}

const mutations: MutationTree<State> = {
  [MutationType.UPDATE_BOOKS]: (state: State, books: Array<BookListing>) => {
    state.books = books
  },
}

const googleapi: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
}

export default googleapi

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
