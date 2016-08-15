
/**
 * Required modules
 */

const ip2countrify = require( 'ip2countrify' )


module.exports = {


    /**
     * Handle requests with a invalid IP address
     *
     * @param   {String}    msg    Incoming message
     * @param   {Function}  reply  Bot instance function
     * @return  void
     */

    handleInvalidIP( msg, reply ) {

        if ( msg.toLowerCase().includes( 'thank' ) ) {
            return reply( {
                'text': "👍\n\nYou are welcome."
            } )
        }

        return reply( {
            'text': "👋\n\nTell me a valid IP,\nI will map the right country."
        } )

    },


    /**
     * Handle requests with a private IP address
     *
     * @param   {String}    ip     Incoming IP address
     * @param   {Function}  reply  Bot instance function
     * @return  void
     */

    handlePrivateIP( ip, reply ) {

        return reply( {
            'text': "😝\n\nReserved IP address?\nYou are kidding me."
        } )

    },


    /**
     * Start lookup for a valid IP address
     *
     * @param   {String}    ip     Incoming IP address
     * @param   {Function}  reply  Bot instance function
     * @return  void
     */

    lookupValidIP( ip, reply ) {

        ip2countrify.lookup( ip, ( ip, result, error ) => {

            if ( error ) {
                return reply( {
                    'text': "😢\n\nNothing found for this IP."
                } )
            }

            const countryName = result.countryName
            const countryCode = result.countryCode.toLowerCase()

            return reply( {
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

    }


}
