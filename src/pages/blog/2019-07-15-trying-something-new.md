---
templateKey: blog-post
title: Switching from GoDaddy VPS Hosting to an AWS 1GB T3 EC2 Container
date: 2019-07-15T15:04:10.000Z
featuredpost: true
featuredimage: /img/jungle-path.jpg
description: How I switched a low-traffic WordPress website from GoDaddy to AWS
tags:
  - apache
  - aws
  - ec2
  - php
  - wordpress
---

![jungle](/img/jungle-path.jpg)

## A New Start

Having been employed as a full stack developer and internet systems engineer for.. well over a decade now, much of this project was known territory for me. Blogging about it, however, is something I'm new at. So, if things seem out of place or I've lost context on you somehow, please let me know in the comments and I'll do my best to close the gaps to make this a friendly source for anyone working with EC2 instances using Amazon's flavor of Linux, Apache, PHP and of course, WordPress. Okay, let's go!

I've been helping a few friends out with their web properties for about as long as I've been working in web technology. Back in 2007 Godaddy hosting was a nice thing. They were a known quantity in the hosting service arena and they had decent support. The price of their entry-level offerings could get you a slim VPS running Linux/Apache PHP and a small Wordpress for under \$80 a year. That and a free selection of other features, including MySQL access for up to 25 databases made it a clear winner for folks who want to try out running their blog without a huge upfront payout. It was a pretty sweet deal.

## How Far We've Come

Times have changed. Numerous competitors in the Web Hosting space exist, some with better pricing, features, and stability than legacy providers who're still going strong; the web isn't shrinking. Godaddy has since stratified their userbase and pricing, especially with long term customers but has made little progress with their entry-level, legacy VPS hosting service quality. One of my friends and former clients has reached this stage where renewals at Godaddy aren't making sense.

In discussing the options an idea came to me: there's gotta be a way to get a low-traffic WordPress site running on a 1GB VPS at Amazon. Even with MySQL. Why not? Not including the price of domain renewals it's currently $7.62 monthly for a T3.micro container with a lowest price of $2.87 a month if you purchase the container for 3 years in advance. Check out the options using the [Amazon Simple Services Calculator](https://calculator.s3.amazonaws.com/index.html).

But can a 1GB VPC really serve an entire Wordpress installation? MySQL uses a buttload of system resources. So can Apache if the configuration isn't substantially customized. And then there's PHP. All with 1GB running on AMI Linux. What the hell, let's give it a go.

## The Packages

```jsx
class VideoAnnotater extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      showInput: false,
      newInputShown: false,
      annotation: {
        text: "",
        duration: 7,
        opacity: 0.75
      },
      offset: { x: 0, y: 0 }
    };
    this.state = this.initialState;
  }

  setDefaultState = () => {
    this.setState(this.initialState);
  };
}
```

```css{numberLines:42}
/* all.sass overrides: */
code[class*="language-"] {
  padding: 0 0 0 inherit;
}

code span.token.tag {
  padding: 0;
  font-size: 1em;
  height: 1em;
  background-color: inherit;
  white-space: pre-line;
}

code span.token.attr-name {
  padding-left: 0.5em;
}
```

## What the updates mean to you

The Specialty Coffee Association of America (SCAA), founded in 1982, is a non-profit trade organization for the specialty coffee industry. With members located in more than 40 countries, SCAA represents every segment of the specialty coffee industry, including:

- producers
- roasters
- importers/exporters
- retailers
- manufacturers
- baristas

For over 30 years, SCAA has been dedicated to creating a vibrant specialty coffee community by recognizing, developing and promoting specialty coffee. SCAA sets and maintains quality standards for the industry, conducts market research, and provides education, training, resources, and business services for its members.

Coffee cupping, or coffee tasting, is the practice of observing the tastes and aromas of brewed coffee. It is a professional practice but can be done informally by anyone or by professionals known as "Q Graders". A standard coffee cupping procedure involves deeply sniffing the coffee, then loudly slurping the coffee so it spreads to the back of the tongue.

The coffee taster attempts to measure aspects of the coffee's taste, specifically the body (the texture or mouthfeel, such as oiliness), sweetness, acidity (a sharp and tangy feeling, like when biting into an orange), flavour (the characters in the cup), and aftertaste. Since coffee beans embody telltale flavours from the region where they were grown, cuppers may attempt to identify the coffee's origin.