import React from 'react';
import { Grid, Hidden, makeStyles } from '@material-ui/core';

import RightSidebar from 'app/main/layouts/ClientLayout/RightSidebar';
import TagList from 'app/main/shared-components/TagList';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '87vh',
    overflow: 'hidden auto',
    margin: 'auto',
    color: theme.palette.text.primary,
    '& h1': {
      textAlign: 'center',
    },
    '& ul': {
      listStyleType: 'lower-roman',
    },

    '& p': {
      '&.underline': {
        textDecoration: 'underline',
      },
    },
  },
}));
const Privacy = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <div className={classes.root}>
          <h1>
            MDHELP <br />
            PRIVACY POLICY AGREEMENT
          </h1>
          <p>
            We at Mdhelp (“Mdhelp,” “Our,” “we,” or “us”) values its users'
            privacy as we know that you care about how your personal information
            is used and shared and we take that seriously. Please read the
            following to learn more about your privacy as this Privacy Policy
            ("Policy") will help you understand how we collect and use personal
            information from those who visit our website or make use of our
            online newsletters and services, and what we will and will not do
            with the information we collect. By using or accessing the Services
            in any manner, you acknowledge that you accept the practices and
            policies outlined in this Privacy Policy, and you hereby consent
            that we will collect, use, and share your information in the
            following ways.
          </p>
          <p>
            This Privacy Policy includes additional notices that may apply to
            you if you are a California consumer. Please see the section further
            below titled "California Privacy Rights" for more details.
          </p>
          <h2>Changes to this Privacy Policy</h2>
          <p>
            We reserve the right to make changes to this Policy at any given
            time. If you want to make sure that you are up to date with the
            latest changes, we advise you to frequently visit this page. If at
            any point in time Mdhelp decides to make use of any personally
            identifiable information on file, in a manner vastly different from
            that which was stated when this information was initially collected,
            the user or users shall be promptly notified by email. Users at that
            time shall have the option as to whether to permit the use of their
            information in this separate manner.
          </p>
          <h2>What does this Privacy policy cover?</h2>
          <p>
            This Policy applies to Mdhelp, and it governs any and all data
            collection and usage by us. Through the use of
            <a href='https://www.mdhelp.io'>www.mdhelp.io</a>., you are
            therefore consenting to the data collection procedures expressed in
            this Policy.
          </p>
          <p>
            We gather various types of Personal Information from our users, as
            explained in more detail below, and we use this Personal Information
            internally in connection with our Services, including to
            personalize, provide, and improve our Services, to allow you to set
            up a user account and profile, to contact you, to fulfill your
            requests for certain Newsletters from us, and to analyze how you use
            the Services. In certain cases, we may also share some Personal
            Information with third parties, but only as described below.
          </p>
          <p>
            Please note that this Policy does not govern the collection and use
            of information by companies that Mdhelp does not control, nor by
            individuals not employed or managed by us. If you visit a website
            that we mention or link to, be sure to review its privacy policy
            before providing the site with information. It is highly recommended
            and suggested that you review the privacy policies and statements of
            any website you choose to use or frequent to better understand the
            way in which websites garner, make use of and share the information
            collected.
          </p>
          <h2>Information We Collect</h2> <h3>A. Information You Provide:</h3>
          <p>
            <strong>“Personal Data"</strong> means any information which, either
            alone or in combination with other information we hold about you,
            identifies you as an individual, including, for example, your
            contact information such as your name, email address, telephone
            number, age, as well as any other non-public information about you
            that is associated with or linked to any of the foregoing data.
          </p>
          <p>
            <strong>"Anonymous Data"</strong> means data that is not associated
            with or linked to your Personal Data; Anonymous Data does not, by
            itself, permit the identification of individual persons. We collect
            Personal Data and Anonymous Data and a few other categories of
            information, from a few different sources, as described below.
          </p>
          <p>We receive the information you provide to us when you:</p>
          <ul>
            <li>
              Create an account with us to log into our website, We may collect
              certain Personal Date from you, such as your first and last name,
              email, mailing address and phone number;
            </li>
            <li>
              By also using our service, you may provide us with the demographic
              information that is not unique to you such as your gender and ZIP
              code.
            </li>
            <li>
              Account information, such as online password and other log-in
              details used to access the Mdhelp service (where available);
            </li>
            <li>
              When you post a User Generated content or provide us with service
              feedback on our site, the information contained in such
              user-generated content will be stored on our servers and will be
              available to be seen by other users who make use of the Mdhelp
              service.
            </li>
            <li>
              We also collect other types of Personal Data that you provide to
              us voluntarily, such as your operating system and version and
              other requested information if you contact us via email regarding
              support for the Services.
            </li>
          </ul>
          <p>
            Please note that you can choose not to provide us with certain
            information, but this may limit the features of the website or
            Services you are able to use.
          </p>
          <h3> B. Automated information collection </h3>
          <p>
            We may collect certain information (which does not identify you as
            an individual) about your use of the Site through the use of
            tracking technologies or by other passive means. This “passively
            collected” information includes, but is not limited to, the domain
            name of the website that allowed you to navigate to the Site, search
            engines used, the internet protocol (IP) address used, the length of
            time spent on the Site, the pages you looked at on the Site, other
            websites you visited before and after visiting the Site, the type of
            internet browser you have, the frequency of your visits to the Site,
            and other relevant statistics, including the following:
          </p>
          <ul>
            <li>
              <u>Log Information:</u> When you access the Site, our servers
              automatically record information that your browser sends whenever
              you visit a website. These server logs may include information
              such as your web request, IP address, browser type, browser
              language, the date and time of your request, and one or more
              cookies (small text files containing a string of characters) that
              may uniquely identify your browser.
            </li>
            <li>
              <u>Cookies:</u> When you log-in to the website to use the services
              through the Site as a Log-In User, we send one or more cookies
              (small text files containing a string of characters) to your
              computer that uniquely identifies your browser. We use cookies to
              improve the quality of the Site by storing user preferences and
              tracking user trends. Most web browsers accept cookies
              automatically but can be configured not to do so or to notify the
              user when a cookie is being sent. Cookies alone tell us nothing
              about who you are. Pixel tags generate a generic notice of a visit
              to the Site. Pixel tags are used in conjunction with cookies to
              anonymously track the activity on the Site by a particular browser
              on a particular site.
            </li>
            <li>
              <u>Links:</u> The Site and newsletters may include links in a
              format that enables us to keep track of whether these links have
              been followed by IP addresses. We use this information to improve
              the quality of our products and design.
            </li>
            <li>
              <u>Web Beacons:</u> Web beacons (also known as “pixel tags” or
              “clear GIFs”) are 1×1 single-pixel graphics that allow us to count
              the number of users who have visited or accessed the Site and to
              recognize users by accessing our cookies. Web beacons can collect
              the IP address of the computer that the web beacon is sent to, the
              URL of the page the Web beacon comes from, and the time the web
              beacon was viewed. We may employ web beacons to facilitate Site
              administration and navigation, to track the actions of users of
              the Site, to compile aggregated statistics about Site usage and
              response rates, and to provide an enhanced online experience for
              visitors to the Site.
            </li>
            <li>
              <u>Analytics Services:</u> We use third-party analytics services
              ("Analytics Services"), to help analyze how users use our Sites
              and interact with our newsletters. The information generated by
              the cookies or other technologies about your use of our Sites
              and/or Mdhelp Service (the "Analytics Information") is transmitted
              to the Analytics Services. The Analytics Services use Analytics
              Information to compile reports on user activity. The Analytics
              Services may also transfer the Analytics Information to third
              parties where required to do so by law, or where such third
              parties process Analytics Information on their behalf. Each
              Analytics Service's ability to use and share Analytics Information
              is restricted by such Analytics Service's terms of use and privacy
              policy. By using a Site or Services provided by Mdhelp, you
              consent to the processing of data about you by Analytics Services
              in the manner and for the purposes set out above.
            </li>
          </ul>
          <h3>
            C. Information automatically collected by third-parties about you
          </h3>
          <p>
            Some embedded content on the Site may be served by third-party
            content providers. Please note that these companies may also use
            cookies or other similar technologies to collect data about you,
            both on the Site and throughout the Internet. Data collection and
            use by those third-parties is subject to the privacy policies of
            those third-parties
          </p>
          <p>
            Please rest assured that this site will only collect personal
            information that you knowingly and willingly provide to us by way of
            surveys, completed membership forms, and emails. It is the intent of
            this site to use personal information only for the purpose for which
            it was requested, and any additional uses specifically provided for
            on this Policy.
          </p>
          <h2>What We Use Your Personal Information</h2>
          <p>
            For Generally, Mdhelp uses the information gathered to provide,
            improve, and develop our Site and the Services we provide to you, to
            communicate with you, to offer you a better service, and to protect
            us and our users. When you interact with or make use of the Mdhelp
            service, we use a variety of technologies to process the personal
            information that we collect about you for various reasons.
          </p>
          <ul>
            <li>facilitate the creation of and secure your Mdhelp account;</li>
            <li>identify you as a user of our service </li>
            <li>
              Personalize your experience with our products and services and we
              may make use of personal information to assist in the operation of
              our website and to ensure delivery of the services you need and
              request. At times, we may find it necessary to use personally
              identifiable information as a means to keep you informed of other
              possible products and/or services that may be available to you
              from www.mdhelp.io
            </li>
            <li>
              Allow you to participate in certain features of the Site and
              services such as Mdhelp’s market research to understand the
              interests and preferences of our existing users;
            </li>
            <li>
              measure and analyze audience traffic, including tracking user
              interests, trends, and patterns;
            </li>
            <li>
              help recognize you as a previous visitor and save and remember
              your preferences and settings and deliver to you appropriate
              interest-based content;
            </li>
            <li>
              send newsletters, surveys, offers, and other promotional materials
              and for other marketing purposes;
            </li>
            <li>
              understand whether our users read e-mail messages and click on
              links within those messages;
            </li>
            <li>
              Increase and maintain the safety and security of our products,
              services and community and prevent misuse;
            </li>
            <li>
              To understand, diagnose, troubleshoot, and fix issues with the
              Mdhelp Service
            </li>
            <li> Communicate with you and provide customer support; </li>
            <li>
              Operate, evaluate, develop, manage and improve our Service
              (including operating, administering, analyzing and improving our
              products and services; developing new products and services;
              managing and evaluating the effectiveness of our communications;
              performing accounting, auditing, billing reconciliation and
              collection activities and other internal functions;
            </li>
            <li>
              Protect against, identify and prevent fraud and other criminal
              activity, claims and other liabilities;
            </li>
            <li>
              To fulfill contractual obligations with third parties, for
              example, licensing agreements and to take appropriate action with
              respect to reports of intellectual property infringement and
              inappropriate content.
            </li>
            <li>
              Comply with and enforce applicable legal requirements, relevant
              industry standards and policies, including this Privacy Notice and
              our Terms of Service.
            </li>
          </ul>
          <h2>Personal Information That We Share </h2>
          <p>
            We do not sell, rent, trade, or otherwise share personal information
            collected through the Site because we are committed to maintaining
            your trust, except as described below:
          </p>
          <ul>
            <li>
              Service Providers: We may provide collected data to our service
              providers. They may use your data to perform services for us and
              may have access to, store and process your personal data to
              provide services on our behalf.
            </li>
            <li>
              Subsidiaries and Affiliates: We may share personal information or
              any information collected through the Site with our subsidiaries
              and affiliates for the purposes for which you provided the
              information or as reasonably necessary for our internal
              administrative and business purposes.
            </li>
            <li>
              Merger and Acquisition: We may disclose or transfer personal
              information or any information collected through your usage of our
              Service to third parties who acquire all or a portion of Mdhelp’s
              business, whether such acquisition is by way of merger,
              consolidation, or purchase of all or a portion of our assets, or
              in connection with any bankruptcy or reorganization proceeding
              brought by or against us.
            </li>
            <li>
              Compliance with laws: We may disclose personal information or any
              information collected through the Site and your usage of the
              Mdhelp Service if we are required to do so by law or pursuant to
              legal process, in response to a request from government officials,
              law enforcement authorities or a valid subpoena, or as necessary
              or appropriate in connection with an investigation of illegal
              activity, including without limitation to prevent, investigate,
              detect or prosecute any criminal offense or attack.
            </li>
            <li>
              v. Consent: We may share personal information in accordance with
              any consent you provide.
            </li>
          </ul>
          <h2>Data Retention and Deletion</h2>
          <p>
            We keep your personal data only as long as necessary to provide you
            with the Mdhelp Service and for legitimate and essential business
            purposes, such as maintaining the performance of the Mdhelp Service,
            making data-driven business decisions about new features and
            offerings, complying with our legal obligations, and resolving
            disputes. We keep some of your personal data for as long as you are
            a user of the Mdhelp Service. For example, we keep your playlists,
            song library, and account information.
          </p>
          <p>
            If you request, we will delete or anonymize your personal data so
            that it no longer identifies you, unless we are legally allowed or
            required to maintain certain personal data, including situations
            such as the following:
          </p>
          <ul>
            <li>
              If there is an unresolved issue relating to your account, such as
              an outstanding credit on your account or an unresolved claim or
              dispute we will retain the necessary personal data until the issue
              is resolved;
            </li>
            <li>
              Where we need to retain the personal data for our legal, tax,
              audit, and accounting obligations, we will retain the necessary
              personal data for the period required by applicable law; and/or,
            </li>
            <li>
              Where necessary for our legitimate business interests such as
              fraud prevention or to maintain the security of our users.
            </li>
          </ul>
          <h2>Keeping Your Data Safe</h2>
          <p>
            As a matter of policy, we are committed to protecting your data and
            as such, Mdhelp takes precautions to protect your information. When
            you submit sensitive information via the website, your information
            is protected both online and offline. Wherever we collect sensitive
            information (e.g. credit card information), that information is
            encrypted and transmitted to us in a secure way.
          </p>
          <p>
            As a matter of policy, we are committed to protecting your data and
            as such, Mdhelp takes precautions to protect your information. When
            you submit sensitive information via the website, your information
            is protected both online and offline. Wherever we collect sensitive
            information (e.g. credit card information), that information is
            encrypted and transmitted to us in a secure way.
          </p>
          <p>
            While we use encryption to protect sensitive information transmitted
            online, we also protect your information offline. Only employees who
            need the information to perform a specific job (for example, billing
            or customer service) are granted access to personally identifiable
            information. The computers and servers in which we store personally
            identifiable information are kept in a secure environment. This is
            all done to prevent any loss, misuse, unauthorized access,
            disclosure or modification of the user's personal information under
            our control.
          </p>
          <h2>Non-Marketing Purposes</h2>
          <p>
            We at Mdhelp greatly respects your privacy. Nevertheless, we do
            maintain and reserve the right to contact you if needed for
            non-marketing purposes (such as bug alerts, security breaches,
            account issues, and/or changes in Mdhelp products and services). In
            certain circumstances, we may use our website, newsletters, or other
            public means to post a notice.
          </p>
          <h2>
            <a href='/privacy/california'>California Privacy Rights</a>
          </h2>
          <p>
            California Consumer Privacy Act of 2018; Effective January 1, 2020:
          </p>
          <p>
            If you’re a California resident, you may have some additional
            privacy rights regarding the disclosure of your personal data by
            Mdhelp, or its affiliates and subsidiaries, or to a third-party and
            we have prepared additional disclosures and notices consistent with
            the California Consumer Privacy Act (CCPA). Please see our CCPA
            policy for more about such rights.
          </p>
          <p>
            California residents may not be discriminated against for exercising
            any of the rights described above.
          </p>
          <h2>Children under the Age of 13</h2>
          <p>
            Mdhelp's website is not directed to and does not knowingly collect
            personally identifiable information from, children under the age of
            thirteen (13). If it is determined that such information has been
            inadvertently collected on anyone under the age of thirteen (13), we
            shall immediately take the necessary steps to ensure that such
            information is deleted from our system's database, or in the
            alternative, that verifiable parental consent is obtained for the
            use and storage of such information. Anyone under the age of
            thirteen (13) must seek and obtain parent or guardian permission to
            use this website.
          </p>
          <h2>Unsubscribe or Opt-Out</h2>
          <p>
            If you have subscribed to our e-mail newsletters, you will always
            have the opportunity to unsubscribe from future mailings by logging
            into your account and modifying your preferences. You will also have
            the opportunity to "opt-out" of commercial e-mail from the
            applicable Mdhelp service by following the unsubscribe instructions
            provided in the e-mail you receive or by contacting us directly.
            Mdhelp will continue to adhere to this Policy with respect to any
            personal information previously collected.
          </p>
          <h2>Links to Other Websites</h2>
          <p>
            Our website does contain links to affiliate and other websites.
            Mdhelp does not claim nor accept responsibility for any privacy
            policies, practices and/or procedures of other such websites.
            Therefore, we encourage all users and visitors to be aware when they
            leave our website and to read the privacy statements of every
            website that collects personally identifiable information. This
            Privacy Policy Agreement applies only and solely to the information
            collected by our website.
          </p>
          <h2>Notice to European Union Users</h2>
          <p>
            Mdhelp’s operations are located primarily in the United States. If
            you provide information to us, the information will be transferred
            out of the European Union (EU) and sent to the United States. By
            providing personal information to us, you are consenting to its
            storage and use as described in this Policy.
          </p>
          <h2>Acceptance of Terms</h2>
          <p>
            By using this website, you are hereby accepting the terms and
            conditions stipulated within the Privacy Policy Agreement. If you
            are not in agreement with our terms and conditions, then you should
            refrain from further use of our sites. In addition, your continued
            use of our website following the posting of any updates or changes
            to our terms and conditions shall mean that you agree and acceptance
            of such changes.
          </p>
          <h2>How to Contact Us</h2>
          <p>
            If you have any questions or concerns regarding the Privacy Policy
            Agreement related to our website, please feel free to contact us.
          </p>
        </div>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Privacy;
