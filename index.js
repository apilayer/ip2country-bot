
/**
 * Required modules
 */

const os = require('os');
const http = require( 'http' )
const cluster = require('cluster')
const ip = require( './lib/ip' )
const app = require( './lib/app' )
const Bot = require( 'messenger-bot' )
const bot = new Bot( require( './config.json' ) )


bot.on( 'message', ( payload, reply ) => {

    const msg = payload.message.text

    if ( ! msg ) {
        return
    }

    // Invalid IP
    if ( ! ip.isValid( msg ) ) {
        return app.handleInvalidIP( msg, reply )
    }

    // Private IP
    if ( ip.isPrivate( msg ) ) {
        return app.handlePrivateIP( msg, reply )
    }

    // Lookup IP
    return app.lookupValidIP( msg, reply )

} )


bot.on( 'error', ( error ) => console.log( error.message ) )


if ( cluster.isMaster ) {
    os.cpus().forEach( _ => cluster.fork( _ ) )
} else {
    http.createServer( bot.middleware() ).listen( 3000 )
}
