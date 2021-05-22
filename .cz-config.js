const { defaultTypes, defaultScopes, defaultMessages } = require('./lib/cz')

const types = defaultTypes()
const scopes = defaultScopes()
const messages = defaultMessages()
const breakingChangesTypes = ['feat', 'fix']
const allowBreakingChanges = types.reduce((acc,cur)=>{
  if(breakingChangesTypes.includes(cur.raw)){
    acc.push(cur.value)
  }
  return acc
},[])

module.exports = {
  types,
  scopes,
  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  /*
    scopeOverrides: {
      fix: [
        { name: 'merge' },
        { name: 'style' },
        { name: 'e2eTest' },
        { name: 'unitTest' }
      ]
    },
   */
  messages,
  // allowCustomScopes: true,
  allowBreakingChanges,
  // skip any questions you want
  // skipQuestions: [],

  subjectLimit: 100,
  // breaklineChar: '|',
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
}
