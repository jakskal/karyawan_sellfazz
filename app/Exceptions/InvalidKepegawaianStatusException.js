'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidKepegawaianStatusException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    return response.status(404).json({
      error:'kepegawaian status must be : telah or sedang',
    })
  }
}

module.exports = InvalidKepegawaianStatusException
