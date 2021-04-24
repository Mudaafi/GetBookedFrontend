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
  ON_LOAN,
  AVAILABLE,
}
