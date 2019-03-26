'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NoChangeException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error,{response}) {
    return response.status(404).json({
      error:'no change due to update',
    })
  }
}

module.exports = NoChangeException
