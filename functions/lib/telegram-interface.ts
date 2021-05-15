import axios from 'axios'
import {
  convertError,
  TeleInlineKeyboard,
  TeleReplyKeyboard,
} from './tele-types'

const TELE_API = 'https://api.telegram.org/bot'

/**
 * Sends a message via the bot
 * @param bot_key
 * @param chat_id
 * @param text
 * @param reply_markup
 * @returns
 */
export async function sendMessage(
  bot_key: string,
  chat_id: number,
  text: string,
  reply_markup:
    | TeleInlineKeyboard
    | TeleReplyKeyboard = {} as TeleInlineKeyboard,
) {
  return new Promise((resolve, reject) => {
    axios
      .post(TELE_API + bot_key + '/sendMessage', {
        chat_id: chat_id,
        text: text,
        parse_mode: 'HTML',
        reply_markup: reply_markup,
      })
      .then((res) => {
        const msgDetails = res.data.result
        console.log(`Message posted (id: ${msgDetails.message_id})`)
        resolve(res.data)
      })
      .catch((err) => {
        reject(convertError(err))
      })
  })
}
