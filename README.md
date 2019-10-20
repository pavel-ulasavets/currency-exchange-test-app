## What is this app about

**NOTE:** an application is built for testing purposes only

This is a small web-widget implementing simple currency exchange functionality
for a fixed basket of currencies. For now these are

- USD
- EUR
- GBP
- PLN

At the moment an application does not allow to configure this list.

![app screenshot]: (https://github.com/pavel-ulasavets/currency-exchange-test-app/blob/master/images/app_screenshot.png)


## How to use

Currently, the application can be checke in 3 ways:

- via spinning a web-server locally
  To do that you need to pull repository and run the following comands

  ```
    git clone git@github.com:pavel-ulasavets/currency-exchange-test-app.git
    npm install
    npm run start
  ```
- checking a deployed version by the following URL
  http://currency-exchange-test-app.us-east-2.elasticbeanstalk.com

- or building in into your website using the following code excerpt:

  ```
  <iframe src="http://currency-exchange-test-app.us-east-2.elasticbeanstalk.com" width=350 height=350>
  ```
