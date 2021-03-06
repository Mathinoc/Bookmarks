export interface bookmark {
  title: string,
  url: string,
  type?: string,
  thumbnail_url?: string,
  author_name?: string,
  html?:string,

  duration?: number,
  upload_date?: string,

  height?: string,
  width?: string,
  media_url?:string,
  creation_date: number,
}