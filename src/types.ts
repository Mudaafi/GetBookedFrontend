export interface BookListing {
  listingId: string
  title: string
  author: string
  isbn?: string
  synopsis: string
  imgFrontUrl: string
  imgBackUrl?: string

  lenderName: string
  lenderTeleUser: string
  lenderTeleId: string

  status: BookListingStatus
  borrowerName?: string
  borrowerTeleUser?: string
  borrowerTeleId?: string
}

export enum BookListingStatus {
  ON_LOAN = 'On Loan',
  AVAILABLE = 'Available',
  NEW = 'New!',
  RESERVED = 'Reserved',
  DELETED = 'Deleted',
}

export interface Faq {
  qn: string
  ans: string
}

export interface AboutSection {
  title: string
  text: string
}

export interface MemberSection {
  name: string
  title?: string
  img: string
}
