
/**
 * Required modules
 */

const ip = require( './ip' )
const ip2countrify = require( 'ip2countrify' )


/**
 * Handle incoming messages
 *
 * @param   {Function}  bot  Bot instance function
 * @return  mixed
 */

module.exports = ( bot ) => {

    // Greetings
    bot.setGreetingText( 'Hey there! Tell me a IP, I will map the right country.' );


    // Hear, hear
    bot.hear( [ 'hello', 'hi', 'hey', 'help' ], ( payload, chat ) => {

        return chat.say( "👋\n\nHey there! Tell me a IP,\nI will map the right country." );

    } );
    bot.hear( [ 'thanks', 'thank you', 'bye', 'cu' ], ( payload, chat ) => {

        return chat.say( "👍\n\nYou are welcome." );

    } );


    // Incomming messages
    bot.on( 'message', ( payload, chat, data ) => {

        const text = payload.message.text

        if ( ! text || data.captured ) {
            return
        }

        // Invalid IP
        if ( ! ip.isValid( text ) ) {
            return chat.say( "😢\n\nTell me a valid IP (IPv4 or IPv6),\nI will map the right country." )
        }

        // Private IP
        if ( ip.isPrivate( text ) ) {
            return chat.say( "😝\n\nReserved IP address?\nYou are kidding me." )
        }

        // Lookup IP
        return lookupValidIP( text, chat )

    } )

}


/**
 * Start country lookup for a valid IP address
 *
 * @param   {String}    text  Incoming IP address
 * @param   {Function}  chat  Bot instance function
 * @return  void
 */

const lookupValidIP = ( text, chat ) => {

    ip2countrify.lookup( text, ( ip, result, error ) => {

        if ( error ) {
            return chat.say( "😢\n\nNothing found for this IP." )
        }

        const countryName = result.countryName
        const countryCode = result.countryCode.toLowerCase()

        return chat.sendGenericTemplate( [
            {
                'title': countryName,
                'image_url': `https://cdn.rawgit.com/sergejmueller/ip2country-bot/master/flags/${countryCode}.png`
            }
        ], {
            typing: true
        } )

    } )

}
