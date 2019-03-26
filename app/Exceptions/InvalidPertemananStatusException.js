'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidPertemananStatusException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    return response.status(404).json({
      error:'status must be one of these : "menunggu", "teman" , "teman kantor" or "pernah bekerja sama"',
    })
  }
}

module.exports = InvalidPertemananStatusException
