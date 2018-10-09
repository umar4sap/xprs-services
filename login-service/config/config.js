

var environments={}

environments.prod={
    AUTH0_UI_CLIENT_ID: process.env.AUTH0_UI_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_XPRS_USERID: process.env.AUTH0_xprs_USERID,
    AUTH0_XPRS_PASSWORD: process.env.AUTH0_xprs_PASSWORD,
    AUTH0_REALM: process.env.AUTH0_CLIENT_REALM_DB,
    env:"prod",
    port:"7074",
    service:"signup-login"

}

environments.staging={
    AUTH0_UI_CLIENT_ID: process.env.AUTH0_UI_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_XPRS_USERID: process.env.AUTH0_xprs_USERID,
    AUTH0_XPRS_PASSWORD: process.env.AUTH0_xprs_PASSWORD,
    AUTH0_REALM: process.env.AUTH0_CLIENT_REALM_DB,
    env:"staging",
    port:"7073",
    service:"signup-login"
}
environments.dev={
    AUTH0_UI_CLIENT_ID: process.env.AUTH0_UI_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_XPRS_USERID: process.env.AUTH0_xprs_USERID,
    AUTH0_XPRS_PASSWORD: process.env.AUTH0_xprs_PASSWORD,
    AUTH0_REALM: process.env.AUTH0_CLIENT_REALM_DB,
    env:"dev",
    port:"7072",
    service:"signup-login"
}


module.exports = environments;