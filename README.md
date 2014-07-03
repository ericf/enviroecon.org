[enviroecon.org][enviroecon]
============================

Website for the [**Investing in a Sustainable Future Conference**][enviroecon] that took place in Cambridge, MA on April 26, 2014. You can [watch the videos][videos] of the four talks and panel session on the website.

This website is open source and available to you to use as inspiration or a template for a conference website you're building. The site is integrated with [**Eventbrite**][eventbrite] so the event can be managed on Eventbrite's platform and the site will stay up to date.

## Running the Site

### 0. Eventbrite integration.

This site integrates with [Eventbrite][eventbrite] as the source of truth data about the event. If you're planning to also use Eventbrite to manage your event, then you'll want to refer to their [developer API docs][eventbrite-dev], as you'll need your [**Personal OAuth Token**][eventbrite-auth] for the site to function properly.

### 1. Install Node.js and Foreman.

This site uses Node.js as the runtime platform, and Foreman is a handy utility to configure and run the site locally.

* __Install Node.js__ from <http://nodejs.org/>.
* __Install Foreman__ from <https://github.com/ddollar/foreman>.

### 2. Clone this Git repo and install dependencies.

Download this site's code by cloning this Git repo (fork it first if you plan to make changes).

```shell
$ git clone git://github.com/ericf/enviroecon.org.git
```

Now install of the sites's npm dependencies:

```shell
$ cd enviroecon.org
$ npm install
```

### 3. Set configuration and environment variables.

The easiest way to configure and run this site locally is to **create a `.env` file** to hold all the configuration and environment variables, and use Foreman to run the site (which will load up the `.env` file).

#### Required Variables

These configuration and environment variables need values specified in order for this site to function properly:

* `EVENTBRITE_OAUTH_TOKEN`: [The OAuth token][eventbrite-auth] used to fetch data from Eventbrite.
* `NODE_ENV`: Signals to site to run in `development` or `production` mode.

#### Optional Variables

Additionally, values for the following configuration variables can be set to enhance the site by adding fancy fonts and analytics via Typekit and Google:

* `GOOGLE_ANALYTICS`: ID of Google Analytics account.
* `TYPEKIT`: ID of Typekit set.

#### Example `.env` File

The following is **an example `.env` file** which sets all the _required_
variables in the `VARIABLE=value` format:

```
EVENTBRITE_OAUTH_TOKEN=123SOMEOAUTHTOKEN456
NODE_ENV=development
```

### 4. Start the server!

Now you're all ready to start up the web server and start using the site! Again, Foreman is used to make this easy:

```shell
$ foreman start
```


[enviroecon]: http://enviroecon.org/
[videos]: http://enviroecon.org/videos/
[eventbrite]: http://www.eventbrite.com/
[eventbrite-dev]: http://developer.eventbrite.com/
[eventbrite-auth]: http://developer.eventbrite.com/docs/auth/
