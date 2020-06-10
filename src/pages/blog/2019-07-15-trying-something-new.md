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

As a full stack developer and internet systems engineer for well over a decade now, much of this project was known territory for me. Blogging about it, however, is something I'm new at. So, if things seem out of place or I've lost context somehow, please let me know in the comments and I'll do my best to close the gaps to make this a friendly source for anyone working with EC2 instances using Amazon's flavor of Linux, Apache, PHP and of course, WordPress. Okay, let's go!

### Background

I've been helping a few friends out with their web properties for about as long as I've been working in web technology. Back in 2007 Godaddy hosting was a nice thing. They were a known quantity in the hosting service arena and they had decent support. The price of their entry-level offerings could get you a slim VPS running Linux/Apache PHP and a small Wordpress for under \$80 a year. That and a free selection of other features, including MySQL access for up to 25 databases made it a clear winner for folks who want to try out running their blog without a huge upfront payout. It was a pretty sweet deal.

### How Far We've Come

Times have changed. Numerous competitors in the Web Hosting space exist, some with better pricing, features, and stability than legacy providers who're still going strong; the web isn't shrinking. Godaddy has since stratified their userbase and pricing, especially with long-term customers, but has made little progress with their entry-level VPS hosting service quality. One of my friends has reached the stage where renewing this old-school VPS at Godaddy doesn't making sense.

In discussing the options an idea came to me: there must be a way to get a low-traffic WordPress site running on a 1GB VPS at Amazon, even with MySQL. Why not? Not including the price of domain renewals it's currently $7.62 monthly for an AWS EC2 T3.micro container with a lowest price of $2.87 a month if you prepay for 3 years usage. Check out the options using the [Amazon Simple Services Calculator](https://calculator.s3.amazonaws.com/index.html).

Can a 1GB VPC really serve an entire Wordpress installation? MySQL uses a bunch of system resources and so can Apache, if the configuration isn't substantially customized. And then there's PHP. All with 1GB running on AMI Linux. Why not! Let's give it a go.

## First Steps

I chose the 2018.3 AMI Redhat Fedora based image for my EC2 OS. This is Amazon's customized Linux image designed for best performance on Amazon's platform, because we need to squeeze everything we can out of this T3.micro. After running `yum update` once and rebooting the instance, I installed some additional system packages to support the full Wordpress installation:

```bash
yum install mod24_ssl php70-fpm php70-gd fcgi mod24_fcgid
```

This adds SSL support to the existing Apache server, as well as support for running PHP 7 using FPM and FCGI plugins with PHP GD graphic library support added for Wordpress image upload processing.

### Configuring Apache

First, I turned off as many Apache shared modules as I could to keep the `httpd` process as small as possible per listener thread:

```bash
vim /etc/httpd/conf.modules.d/00-base.conf
```

```apacheconf
##
# This file loads most of the modules included with the Apache HTTP
# Server itself.
#

LoadModule access_compat_module modules/mod_access_compat.so
#LoadModule actions_module modules/mod_actions.so
LoadModule alias_module modules/mod_alias.so
LoadModule allowmethods_module modules/mod_allowmethods.so
LoadModule auth_basic_module modules/mod_auth_basic.so
LoadModule auth_digest_module modules/mod_auth_digest.so
#LoadModule authn_anon_module modules/mod_authn_anon.so
LoadModule authn_core_module modules/mod_authn_core.so
#LoadModule authn_dbd_module modules/mod_authn_dbd.so
#LoadModule authn_dbm_module modules/mod_authn_dbm.so
LoadModule authn_file_module modules/mod_authn_file.so
#LoadModule authn_socache_module modules/mod_authn_socache.so
LoadModule authz_core_module modules/mod_authz_core.so
#LoadModule authz_dbd_module modules/mod_authz_dbd.so
#LoadModule authz_dbm_module modules/mod_authz_dbm.so
#LoadModule authz_groupfile_module modules/mod_authz_groupfile.so
LoadModule authz_host_module modules/mod_authz_host.so
#LoadModule authz_owner_module modules/mod_authz_owner.so
LoadModule authz_user_module modules/mod_authz_user.so
LoadModule autoindex_module modules/mod_autoindex.so
#LoadModule cache_module modules/mod_cache.so
#LoadModule cache_disk_module modules/mod_cache_disk.so
#LoadModule cache_socache_module modules/mod_cache_socache.so
#LoadModule data_module modules/mod_data.so
#LoadModule dbd_module modules/mod_dbd.so
LoadModule deflate_module modules/mod_deflate.so
LoadModule dir_module modules/mod_dir.so
#LoadModule dumpio_module modules/mod_dumpio.so
#LoadModule echo_module modules/mod_echo.so
LoadModule env_module modules/mod_env.so
LoadModule expires_module modules/mod_expires.so
#LoadModule ext_filter_module modules/mod_ext_filter.so
LoadModule filter_module modules/mod_filter.so
LoadModule headers_module modules/mod_headers.so
LoadModule http2_module modules/mod_http2.so
#LoadModule include_module modules/mod_include.so
#LoadModule info_module modules/mod_info.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule logio_module modules/mod_logio.so
#LoadModule macro_module modules/mod_macro.so
#LoadModule mime_magic_module modules/mod_mime_magic.so
LoadModule mime_module modules/mod_mime.so
LoadModule negotiation_module modules/mod_negotiation.so
#LoadModule remoteip_module modules/mod_remoteip.so
#LoadModule reqtimeout_module modules/mod_reqtimeout.so
#LoadModule request_module modules/mod_request.so
LoadModule rewrite_module modules/mod_rewrite.so
LoadModule setenvif_module modules/mod_setenvif.so
LoadModule slotmem_plain_module modules/mod_slotmem_plain.so
LoadModule slotmem_shm_module modules/mod_slotmem_shm.so
#LoadModule socache_dbm_module modules/mod_socache_dbm.so
#LoadModule socache_memcache_module modules/mod_socache_memcache.so
LoadModule socache_shmcb_module modules/mod_socache_shmcb.so
LoadModule status_module modules/mod_status.so
#LoadModule substitute_module modules/mod_substitute.so
#LoadModule suexec_module modules/mod_suexec.so
# This module will cause Apache to fail to load if there is no DNS
# LoadModule unique_id_module modules/mod_unique_id.so
LoadModule unixd_module modules/mod_unixd.so
#LoadModule userdir_module modules/mod_userdir.so
LoadModule version_module modules/mod_version.so
LoadModule vhost_alias_module modules/mod_vhost_alias.so
LoadModule watchdog_module modules/mod_watchdog.so
```

Then I adjusted how Apache would serve requests in `/etc/httpd/conf.modules.d/00-mpm.conf` To get the most of our 1G of RAM, I chose the Event worker type. Here's what the Apache docs have to say about it:

> The event Multi-Processing Module (MPM) is designed to allow more requests to be served simultaneously by passing off some processing work to the listeners threads, freeing up the worker threads to serve new requests.

Wordpress is still a mostly old-school, server-side rendered app that makes a couple dozen HTTP requests to load its initial resources. Things like CSS, images, HTML content, widgets and several JavaScript libraries are all processed through the Apache server. While much of this content is cached by the browser for subsequent requests, the Apache Event MPM module is designed to handle these additional rapid-fire requests more efficiently. **What this translates to is faster delivery of many resources, while managing memory as best as possible.** Configuring this module to be conservative on processes so it will run well enough alongside PHP-FPM and MySQL is important:

```bash
vim /etc/httpd/conf.modules.d/00-mpm.conf
```

```apacheconf
# Select the MPM module which should be used by uncommenting exactly
# one of the following LoadModule lines.

# prefork MPM: Implements a non-threaded, pre-forking web server
# See: http://httpd.apache.org/docs/2.4/mod/prefork.html
#
# NOTE: If enabling prefork, the httpd_graceful_shutdown SELinux
# boolean should be enabled, to allow graceful stop/shutdown.
#
#LoadModule mpm_prefork_module modules/mod_mpm_prefork.so

# worker MPM: Multi-Processing Module implementing a hybrid
# multi-threaded multi-process web server
# See: http://httpd.apache.org/docs/2.4/mod/worker.html
#
#LoadModule mpm_worker_module modules/mod_mpm_worker.so

# event MPM: A variant of the worker MPM with the goal of consuming
# threads only for connections with active processing
# See: http://httpd.apache.org/docs/2.4/mod/event.html
#
LoadModule mpm_event_module modules/mod_mpm_event.so
ServerLimit 10
ThreadsPerChild 5
ThreadLimit 5
MaxRequestWorkers 50
MinSpareThreads 4
```

These settings keep the number of `httpd` processes around 7 or so, with a minimum of 5 and max of 10 worker processes + the 1 root process that manages the workers. The root process is about 10M for me with the workers running anyware between 6M and 14M. That's roughly 100M of our 1G allotment of RAM, if we're running at max workers. Not bad!

### PHP FPM Setup
