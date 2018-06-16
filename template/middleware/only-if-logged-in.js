/**
* 1. Some pages should only be visible if the user is logged in, and some
*   should only be visible when the user it NOT logged in. This middleware
*   checks whether the user is logged in, and redirects if we are on the
*   way to a page the user should not access.
*
* 2. We are only able to determine if the user is logged in when this
*   middleware is running in the browser, because the browser cookies used
*   to store login status are not available on the server either (a) when
*   the user accesses the page, or (b) when static pages are generated.
*
* 3. If this middleware is running on the server, forward to a page named
*   'authservice-redirect', which will route back to this page (within the browser),
*   which will cause this middleware to run again (on the browser).
*/
import URL from 'url'



/*
 *  Customise this function according to your application needs...
 *
 *  The returned object can optionally return two variables
 *  that define where to go, according to whether the user
 *  is currently logged in.
 *
 *    ifNotLoggedIn
 *      - Go here if the user is not logged in. In most cases
 *        this will take the user to the login screen.
 *    ifLoggedIn
 *      - Redirect if the user is currently logged in. This is not
 *        commonly used, but can be useful if you show a different set
 *        of pages and menu options once the user logs in. This can help
 *        them get back onto a page with sensible menu options, if they
 *        accidentally go to a 'not logged in' page.
 */
function rulesForPath(path) {
  // Pages that require login.
  if (path.startsWith('/user/')) {
    return { ifNotLoggedIn: '/login' }
  }

  // Pages that must NOT be logged in.
  //if (path.startsWith('/hide-when-logged-in')) {
  //  return { ifLoggedIn: '/' }
  //}

  // No rules for this page
  return { }
}




/**
***     The middleware begins here.
**/
export default function (ctx) {


  let def = {
    pathname: ctx.route.path
  }
  if (ctx.route.query) {
    def.query = ctx.route.query
  }
  if (ctx.route.hash) {
    def.hash = ctx.route.hash
  }
  let requiredPath = URL.format(def)
  console.log(`*** requiredPath: ${requiredPath}`)

  // Get the rules that apply to this URL
  let rules = rulesForPath(requiredPath)


  if (process.server) {

    // We are running on the server, so we can't tell if the user is
    // logged in. Forward to a page that will check in the browser,
    // then forward to the required page, depending upon whether the
    // user is logged in or not.
    if (rules.ifLoggedIn || rules.ifNotLoggedIn) {
      console.log(`***********************************************************************`)
      console.log(`**  REDIRECT MIDDLEWARE, RUNNING ON SERVER`)
      console.log(`**    ${requiredPath}`)
      console.log(`**  This is a protected page.`)
      if (rules.ifLoggedIn) {
        console.log(`**     - if logged in, go to ${rules.ifLoggedIn}`)
      }
      if (rules.ifNotLoggedIn) {
        console.log(`**     - if not logged in, go to ${rules.ifNotLoggedIn}`)
      }
      console.log(`**  Here on the server, we cannot determine if we are logged in, so we`)
      console.log(`**  need to delay any redirecting decision until we're running on the`)
      console.log(`**  browser. Let's return a page to run on the browser that will forward`)
      console.log(`**  to this required page, so this middleware runs there on the browser.`)
      console.log(`***********************************************************************`)
      return ctx.redirect({
        path: '/authservice-redirect',
        query: {
          requiredPath: requiredPath
        }
      })
    } else {
      console.log(`***********************************************************************`)
      console.log(`**  REDIRECT MIDDLEWARE, SERVER SIDE`)
      console.log(`**    ${requiredPath}`)
      console.log(`**  This is not a protected page.`)
      console.log(`***********************************************************************`)
    }
  } else {

    // We are running on the client (in the browser)
    if (rules.ifLoggedIn || rules.ifNotLoggedIn) {

      // See if we have credentials, so can make a decision.
      const haveCredentials = (
        typeof(ctx.app.$nuxtAuthservice) !== 'undefined'
        &&
        typeof(ctx.app.$nuxtAuthservice.user) !== 'undefined'
        &&
        ctx.app.$nuxtAuthservice.user !== null
      );
      console.log(`haveCredentials: ${haveCredentials}`);

      if (haveCredentials) {
        // We ARE logged in
        if (rules.ifLoggedIn) {
          console.log(`************************************`)
          console.log(`**  REDIRECT MIDDLEWARE, CLIENT SIDE`)
          console.log(`**    ${requiredPath}`)
          console.log(`**  This page redirects if logged in, and we`)
          console.log(`**  are logged in, so we will redirecting to`)
          console.log(`**  ${rules.ifLoggedIn}`)
          return ctx.redirect(rules.ifLoggedIn)
        } else {
          console.log(`************************************`)
          console.log(`**  REDIRECT MIDDLEWARE, CLIENT SIDE`)
          console.log(`**    ${requiredPath}`)
          console.log(`**  This page redirects if not logged`)
          console.log(`**  in, but we are logged in so can`)
          console.log(`**  proceed to the page.`)
        }
      } else {
        // We are NOT logged in
        if (rules.ifNotLoggedIn) {
          console.log(`************************************`)
          console.log(`**  REDIRECT MIDDLEWARE, CLIENT SIDE`)
          console.log(`**    ${requiredPath}`)
          console.log(`**  This page requires login, but we`)
          console.log(`**  are not logged in. Redirecting to`)
          console.log(`**  ${rules.ifNotLoggedIn}`)
          return ctx.redirect(rules.ifNotLoggedIn)
        } else {
          console.log(`************************************`)
          console.log(`**  REDIRECT MIDDLEWARE, CLIENT SIDE`)
          console.log(`**    ${requiredPath}`)
          console.log(`**  This page requires login, and we`)
          console.log(`**  are logged in. Proceeding to page.`)
        }
      }
    } else {
      console.log(`************************************`)
      console.log(`**  REDIRECT MIDDLEWARE, CLIENT SIDE`)
      console.log(`**    ${requiredPath}`)
      console.log(`**  This is not a protected page.`)
      console.log(`************************************`)
    }
  }
}
