
/**
 * Required modules
 */

const http = require( 'http' )
const ip = require( './lib/ip' )
const Bot = require( 'messenger-bot' )
const ip2countrify = require( 'ip2countrify' )
const bot = new Bot( require( './config.json' ) )


bot.on( 'error', ( error ) => {
    console.log( error.message )
} )


bot.on( 'message', ( payload, reply ) => {
    const text = payload.message.text

    if ( ! text ) {
        return
    }

    // Invalid IP
    if ( ! ip.isValid( text ) ) {

        if ( text.toLowerCase().includes( 'thank' ) ) {
            return reply( {
                'text': "👍\n\nYou are welcome."
            } )
        }

        return reply( {
            'text': "👋\n\nTell me a valid IP,\ni will map the right country."
        } )
    }

    // Reply private IP
    if ( ip.isPrivate( text ) ) {
        return reply( {
            'text': "😝\n\nReserved IP address?\nYou are kidding me."
        } )
    }

    // Lookup IP
    ip2countrify.lookup( text, ( ip, result, error ) => {

        if ( error ) {
            return reply( {
                'text': "😢\n\nNothing found for this IP."
            } )
        }

        const countryName = result.countryName
        const countryCode = result.countryCode.toLowerCase()

        reply( {
            'attachment': {
                'type': 'template',
                'payload': {
                    'template_type': 'generic',
                    'elements': [ {
                        'title': countryName,
                        'image_url': `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png1000px/${countryCode}.png`
                    } ]
                }
            }
        } )

    } )

} )


http.createServer( bot.middleware() ).listen( 3000 )
