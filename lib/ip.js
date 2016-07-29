
/**
 * Required modules
 */

const net = require( 'net' )


module.exports = {


    /**
     * Check for a private IP address
     *
     * @param   {String}  ip  Incoming IP address
     * @return  {Boolean}     TRUE if IP is private
     */

    isPrivate( ip ) {
        return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test( ip ) ||
            /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test( ip ) ||
            /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test( ip ) ||
            /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test( ip ) ||
            /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test( ip ) ||
            /^f[cd][0-9a-f]{2}:/i.test( ip ) ||
            /^fe80:/i.test( ip ) ||
            /^::1$/.test( ip ) ||
            /^::$/.test( ip )
    },


    /**
     * Check for a valid IP address (IPv4/IPv6)
     *
     * @param   {String}  ip  Incoming IP address
     * @return  {Boolean}     TRUE if IP is valid
     */

    isValid ( ip ) {
        return net.isIP( ip )
    }

}
