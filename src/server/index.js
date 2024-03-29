import Faq from './model'
import extendApp from './app'

Faq.sync()

const { RINGCENTRAL_CHATBOT_SERVER, SERVER_HOME = '/' } = process.env
const appHome = RINGCENTRAL_CHATBOT_SERVER + SERVER_HOME
export const name = 'Bot skill: FAQ'
export const description = 'Respond to any keywords user defined with corresponding answer'
export const homepage = RINGCENTRAL_CHATBOT_SERVER
  ? appHome
  : 'https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-skill-faq#readme'

function dequote (str = '') {
  return str.slice(1, -1)
}

function check (str, all) {
  if (/^[\u4e00-\u9fa5]+$/.test(str)) {
    return all.includes(str)
  }
  return new RegExp(`(^|(\\s+))${str}((\\s+)|$)`).test(all)
}

function hasKeywords (ks, txt) {
  for (const k of ks) {
    if (
      (k.startsWith('"') && k.endsWith('"') && txt === dequote(k)) ||
      (
        (!k.startsWith('"') || !k.endsWith('"')) &&
        check(k, txt)
      )
    ) {
      return true
    }
  }
  return false
}

export const onPostAdd = async ({
  text, // original text
  textFiltered, // text without metion user
  group,
  user,
  handled, // hanlded by prev skills
  shouldUseSignature // should use signature like "sent by bot skill xxx" in message.
}) => {
  if (handled) {
    return false
  }

  await Faq.sync()
  const faqIds = user.data && user.data.faqIds
    ? user.data.faqIds
    : []
  const q = faqIds.map(id => {
    return {
      id
    }
  })
  const faqs = !q.length
    ? []
    : await Faq.batchGet(q)
  let res = ''

  for (const faq of faqs) {
    const ks = faq.keywords.split(',').map(r => r.trim())
    if (hasKeywords(ks, textFiltered)) {
      res = faq.answer
      await Faq.update({
        count: (faq.count || 0) + 1
      }, {
        where: {
          id: faq.id
        }
      })
      break
    }
  }
  if (!res && textFiltered === 'faq-help') {
    let cmds = faqs
      .sort((a, b) => b.keywords.toLowerCase() > a.keywords.toLowerCase() ? -1 : 1)
      .map(f => f.keywords)
      .reduce((p, k) => {
        return p + `* ${k}\n`
      }, '')
    cmds = cmds || 'No keywords yet'
    res = `**Keywords list:**\n${cmds}`
  }
  if (res) {
    const sign = shouldUseSignature
      ? `\n(sent by [${exports.name}](${exports.homepage}))`
      : ''
    await user.sendMessage(group.id, {
      text: res + sign
    })
    return true
  } else {
    return false
  }
}

export const appExtend = extendApp
export const settingPath = '/skill/faq/setting'
