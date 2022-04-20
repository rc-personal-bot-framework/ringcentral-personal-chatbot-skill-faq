# ringcentral-personal-chatbot-skill-faq

Simple FAQ bot matching by keywords for [ringcentral-personal-chatbot-js](https://github.com/ringcentral/ringcentral-personal-chatbot-js).

![ ](screenshots/setting.png)
![ ](screenshots/s1.png)

## Quick start

First, need create a AWS account, we will use free local AWS dynamodb, and put your aws credentials in `~/.aws/credentials`, check [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

Let's start a simple chatbot server and login to it with you sandbox RingCentral account, and you account will auto respond to keywords set by you.

```bash
# get the code
git clone git@github.com:rc-personal-bot-framework/ringcentral-personal-chatbot-skill-faq.git
cd ringcentral-personal-chatbot-skill-faq

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later

# start local dynamodb
npm run dynamo
```

Login to [developer.ringcentral.com](https://developer.ringcentral.com/) and create REST API App:

- Application Type: Public
- Platform Type: Browser-based
- Carrier: accept the default values
- Permissions Needed: Accounts, Team messaging, Read Accounts, Webhook Subscriptions
- Set OAuth Redirect URI: Using your ngrok HTTPS URL from above, enter in the following value: `https://xxxx.ap.ngrok.io/rc/oauth`.

```bash
cp .env.sample .env
# then fill all required fields in .env, you can get client ID / secret from app setting

# run sample hello bot
npm start

# start client dev server
npm run c

```

Then visit [https://xxxx.ap.ngrok.io](https://xxxx.ap.ngrok.io) to login, after auth, you can set `Bot skill: FAQ`'s keywords and answers from its setting page. Then try the keywords with another account.

## Build and run in production

```bash
# build
npm run build

# run prodcution code
npm run p
# or
node -r dotenv/config bin/rcpf.js example-bots/hello.js

# proxy for production code
npm run ngrok-p
```

## How to use a bot skill

[https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-js/blob/master/docs/write-use-a-skill.md](https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-js/blob/master/docs/write-use-a-skill.md)

## Real bot using FAQ skill

[https://github.com/rc-personal-bot-framework/ringcentral-personal-bot-template-js](https://github.com/rc-personal-bot-framework/ringcentral-personal-bot-template-js)

## License

MIT
