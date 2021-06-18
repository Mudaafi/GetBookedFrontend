import { ActionType, GetterType, MutationType } from '@/store/types'
import {
  BorrowParams,
  GetDataParams,
  PostDataParams,
} from '../../../functions/lib/types'
import {
  ActionContext,
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex'
import api from '../../api'
import { State as RootState } from '../index'
import {
  AboutSection,
  BookListing,
  BookListingStatus,
  Faq,
  MemberSection,
  Rules,
} from '@/types'

export type State = {
  books: { [id: string]: BookListing }
  booksIdArr: string[]
  aboutSections: AboutSection[]
  activeMembers: MemberSection[]
  oldMembers: MemberSection[]
  faqs: Faq[]
  rules: Rules[]
  teleLink: string
  instaLink: string
  registerLink: string
  currentPhase: (Date | null)[] // [start_of_phase, end_of_phase]
}

const state = {
  books: {} as { [id: string]: BookListing },
  booksIdArr: [] as string[],
  aboutSections: [],
  activeMembers: [],
  oldMembers: [],
  faqs: [],
  rules: [],
  teleLink: 'https://t.me/joinchat/AAAAAEfCMKTFggfLHNXOzw',
  instaLink: 'https://www.instagram.com/nusms/',
  registerLink:
    'https://docs.google.com/forms/d/e/1FAIpQLSfr79Mrgb15zfnj5XPbcyPiv1f3v4H-VJ8vgDcwd1mnHwrAhw/viewform?usp=sf_link',
  currentPhase: [],
} as State

const getters: GetterTree<State, RootState> = {
  [GetterType.BOOKS]: (state: State): Array<BookListing> => {
    return state.booksIdArr.map((id: string) => state.books[id])
  },
  [GetterType.BOOK]: (state: State) => (
    listingId: string,
  ): BookListing | undefined => {
    return state.books[listingId]
  },
  [GetterType.ABOUT_SECTIONS]: (state: State): AboutSection[] => {
    return state.aboutSections
  },
  [GetterType.ACTIVE_MEMBERS]: (state: State): MemberSection[] => {
    return state.activeMembers
  },
  [GetterType.OLD_MEMBERS]: (state: State): MemberSection[] => {
    return state.oldMembers
  },
  [GetterType.FAQS]: (state: State): Faq[] => {
    return state.faqs
  },
  [GetterType.RULES]: (state: State): Rules[] => {
    return state.rules
  },
  [GetterType.TELE_LINK]: (state: State): string => {
    return state.teleLink
  },
  [GetterType.INSTA_LINK]: (state: State): string => {
    return state.instaLink
  },
  [GetterType.REGISTER_LINK]: (state: State): string => {
    return state.registerLink
  },
  [GetterType.PHASE_START]: (state: State): Date | null => {
    return state.currentPhase[0]
  },
  [GetterType.PHASE_END]: (state: State): Date | null => {
    return state.currentPhase[1]
  },
  [GetterType.IS_WITHIN_PHASE]: (state: State) => (date: Date) => {
    if (state.currentPhase.length == 0) return false
    const storedStartDate = state.currentPhase[0]
    const storedEndDate = state.currentPhase[1]

    // Define new variables to prevent mutation
    let startDate
    let endDate
    if (typeof storedStartDate == 'string')
      startDate = new Date(storedStartDate)
    else startDate = storedStartDate == null ? null : new Date(storedStartDate)
    if (typeof storedEndDate == 'string') endDate = new Date(storedEndDate)
    else endDate = storedEndDate == null ? null : new Date(storedEndDate)

    // Check if within phase
    if (endDate != null) endDate.setDate(endDate.getDate() + 1)
    if (startDate == null) return false
    if (date >= startDate) {
      return endDate == null ? true : date <= endDate
    }
  },
}

const actions: ActionTree<State, RootState> = {
  [ActionType.FETCH_BOOKS]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'books',
    }
    const books = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_BOOKS, books)
  },
  [ActionType.WRITE_DATA]: async (
    // eslint-disable-next-line
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

  [ActionType.FETCH_ABOUT]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'about',
    }
    const aboutUsObjects = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_ABOUT, aboutUsObjects)
  },
  [ActionType.FETCH_FAQS]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'faqs',
    }
    const faqs = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_FAQS, faqs)
  },
  [ActionType.FETCH_RULES]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'rules',
    }
    const rules = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_RULES, rules)
  },
  [ActionType.FETCH_LINKS]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'links',
    }
    const links = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_LINKS, links)
  },

  [ActionType.VERIFY_USER]: async (
    // eslint-disable-next-line
    { commit }: ActionContext<State, RootState>,
    username: string,
  ) => {
    const params: PostDataParams = {
      function: 'verifyUser',
      data: username,
    }
    return (await api.post(`/.netlify/functions/googleapi`, params)).data
  },

  [ActionType.REGISTER_USER]: async (
    // eslint-disable-next-line
    { commit }: ActionContext<State, RootState>,
    code: string,
  ) => {
    const params: PostDataParams = {
      function: 'registerUser',
      data: code,
    }
    const registrationResult = (
      await api.post(`/.netlify/functions/googleapi`, params)
    ).data
    return registrationResult
  },

  [ActionType.BORROW_BOOK]: async (
    // eslint-disable-next-line
    { commit }: ActionContext<State, RootState>,
    borrowParams: BorrowParams,
  ) => {
    const params: PostDataParams = {
      function: 'borrow',
      data: borrowParams,
    }
    return (await api.post(`/.netlify/functions/googleapi`, params)).data
  },
  [ActionType.LOG_USER]: async (
    // eslint-disable-next-line
    { commit }: ActionContext<State, RootState>,
  ) => {
    const params: PostDataParams = {
      function: 'logEntry',
      data: '',
    }
    return (await api.post(`/.netlify/functions/googleapi`, params)).data
  },
  [ActionType.FETCH_PHASE]: async ({
    commit,
  }: ActionContext<State, RootState>) => {
    const params: GetDataParams = {
      function: 'phase',
    }
    const dates = (
      await api.get(`/.netlify/functions/googleapi`, { params: params })
    ).data
    commit(MutationType.UPDATE_PHASE, dates)
  },
}

const mutations: MutationTree<State> = {
  [MutationType.UPDATE_BOOKS]: (state: State, books: Array<BookListing>) => {
    const filteredBooks = books.filter(
      (book) => book.status != BookListingStatus.DELETED,
    )
    const mappedBooks = filteredBooks.reduce((map, book) => {
      map[book.listingId] = book
      return map
    }, {} as { [id: string]: BookListing })
    state.books = mappedBooks
    state.booksIdArr = filteredBooks.map((book) => book.listingId)
  },
  [MutationType.UPDATE_ABOUT]: (
    state: State,
    aboutObjects: Array<AboutSection[] | MemberSection[]>,
  ) => {
    state.aboutSections = aboutObjects[0] as AboutSection[]
    state.activeMembers = aboutObjects[1] as MemberSection[]
    state.oldMembers = aboutObjects[2] as MemberSection[]
  },
  [MutationType.UPDATE_FAQS]: (state: State, faqs: Faq[]) => {
    state.faqs = faqs
  },
  [MutationType.UPDATE_RULES]: (state: State, rules: Rules[]) => {
    state.rules = rules
  },
  [MutationType.UPDATE_LINKS]: (state: State, links: string[]) => {
    state.teleLink = links[0]
    state.instaLink = links[1]
    state.registerLink = links[2]
  },
  [MutationType.UPDATE_PHASE]: (state: State, dateStrArr: string[]) => {
    const dates = dateStrArr.map(function (elem) {
      if (elem == '' || elem == null) return null
      const dateParts = elem.split('/').map((elem) => parseInt(elem))
      return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
    })
    state.currentPhase = dates
  },
}

const googleapi: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
}

export default googleapi
