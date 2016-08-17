
/**
 * Required modules
 */

const os = require('os');
const cluster = require('cluster')
const BootBot = require( 'bootbot' )
const app = require( './lib/app' )
const config = require( './config.json' )
const bot = new BootBot( config )


bot.module( app );


if ( cluster.isMaster ) {
    os.cpus().forEach( () => cluster.fork() )
} else {
    bot.start()
}
